import React, {Component} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  ScrollContent,
  HeaderBackButton,
} from '@components/core';
import Swiper from 'react-native-swiper';
import {GradientFooter} from '@components/generic';
import {translate} from '@translations';
import {AppImages} from '@assets/Images';
import Config from 'react-native-config';
import styles from './style';
import FastImage from 'react-native-fast-image';

const mapDispatchToProps = {};

const mapStateToProps = ({params}) => {
  return {
    welcome_data_list: params.welcome_screen_data
      ? params.welcome_screen_data['procash/section']?.blocks
        ? params.welcome_screen_data['procash/section'].blocks
        : []
      : [],
  };
};

class HowItWorks extends Component {
  state = {
    index: 0,
  };
  onIndexChanged = (index) => {
    this.setState({index});
  };

  renderPagination = () => {
    // By default, dots only show when `total` >= 2
    if (this.props.welcome_data_list.length <= 1) return null;

    let dots = [];
    const ActiveDot = this.props.activeDot || (
      <View style={styles.activeDotStyle} />
    );
    const Dot = this.props.dot || <View style={styles.dotStyle} />;
    for (let i = 0; i < this.props.welcome_data_list.length; i++) {
      dots.push(
        i === this.state.index
          ? React.cloneElement(ActiveDot, {key: i})
          : React.cloneElement(Dot, {key: i}),
      );
    }
    return dots;
  };

  render() {
    const {welcome_data_list} = this.props;

    return (
      <Container>
        <Header>
          <HeaderLeft>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </HeaderLeft>
          <HeaderTitle>
            <Text style={styles.headerTitle}>{translate('how_it_works')}</Text>
          </HeaderTitle>
          <HeaderRight />
        </Header>
        <ScrollContent style={{backgroundColor: 'transparent'}}>
          <Swiper
            loop={false}
            showsPagination={false}
            onIndexChanged={(index) => this.onIndexChanged(index)}>
            {welcome_data_list?.length > 0 ? (
              welcome_data_list?.map((introSlide, index) => {
                return (
                  <View style={styles.swiper_content} key={index}>
                    <FastImage
                      source={{
                        uri: introSlide.image
                          ? introSlide.image
                          : Config.EMPTY_IMAGE_URL,
                      }}
                      style={styles.swiper_image}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={styles.welcome_title}>
                      {introSlide.title[Config.LANG]}
                    </Text>
                    <Text style={styles.welcome_desc}>
                      {introSlide.content[Config.LANG]}
                    </Text>
                  </View>
                );
              })
            ) : (
              <View />
            )}
          </Swiper>
        </ScrollContent>
        <View style={styles.footer}>{this.renderPagination()}</View>
        <GradientFooter
          button_title={translate('view_offers')}
          main_title={''}
          sub_title={translate('hiw_gr_sub_title')}
          image={AppImages.gr_home_img}
          buttonClick={() => this.props.navigation.navigate('Home')}
        />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HowItWorks);
