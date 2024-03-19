import { AppImages } from '@/Assets/Images';
import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import Container from '@/Components/Core/Container';
import { request_welcome_screen_data } from '@/Redux/Actions/publicDataActions';
import { is_user_logged_in } from '@/Redux/Selectors';
import { Config } from '@/react-native-config';
import { translate } from '@/translations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { I18nManager, Text, View } from 'react-native';
import SplashScreen from 'react-native-bootsplash';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import styles from './style';

const mapDispatchToProps = {
  request_welcome_screen_data,
};

const mapStateToProps = ({ params }) => {
  return {
    welcome_data_list: params.welcome_screen_data
      ? params.welcome_screen_data['procash/section']?.blocks
        ? params.welcome_screen_data['procash/section'].blocks
        : []
      : [],
    is_member: is_user_logged_in(params) || false,
  };
};

class Welcome extends Component<any> {
  state = {
    index: 0,
  };
  swiper: any;

  componentDidMount() {
    this.props.request_welcome_screen_data();
    SplashScreen.hide();
  }

  set_flag = async () => {
    await AsyncStorage.setItem(
      'IS_FIRST_USE',
      JSON.stringify({ is_first_use: false }),
    );
  };

  onIndexChanged = index => {
    if (index == this.props.welcome_data_list.length - 1) {
      this.set_flag();
    }
    this.setState({ index });
  };

  swiper_swipe = index => {
    let i = +index;
    if (i < this.props.welcome_data_list.length - 1) {
      i = +1;
      this.swiper.scrollBy(i, true);
    } else {
      this.reset_to_home_stack();
    }
  };

  reset_to_home_stack = () => {
    this.set_flag();
    if (this.props.is_member) {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } else {
      this.props.navigation.reset({
        index: 1,
        routes: [{ name: 'Home' }, { name: 'Signup' }],
      });
    }
  };

  renderPagination = () => {
    // By default, dots only show when `total` >= 2
    if (this.props.welcome_data_list.length <= 1) return null;

    let dots = [] as any;
    const ActiveDot = this.props.activeDot || (
      <View style={styles.activeDotStyle} />
    );
    const Dot = this.props.dot || <View style={styles.dotStyle} />;
    for (let i = 0; i < this.props.welcome_data_list.length; i++) {
      dots.push(
        i === this.state.index
          ? React.cloneElement(ActiveDot, { key: i })
          : React.cloneElement(Dot, { key: i }),
      );
    }
    return dots;
  };

  render() {
    const { welcome_data_list } = this.props;
    return (
      <Container>
        <View style={styles.logoContainer}>
          <FastImage
            source={AppImages.app_icon}
            style={styles.app_icon}
            resizeMode={FastImage.resizeMode.contain}
          />
          <TouchableOpacity
            style={styles.skip_img}
            onPress={() => this.reset_to_home_stack()}>
            <Text style={styles.skip_text}>{translate('skip')}</Text>
          </TouchableOpacity>
        </View>
        <Swiper
          loop={false}
          ref={swiper => {
            this.swiper = swiper;
          }}
          showsPagination={false}
          onIndexChanged={index => this.onIndexChanged(index)}>
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
        <View style={styles.footer}>{this.renderPagination()}</View>
        <TouchableOpacity
          style={styles.apply_btn}
          onPress={() => {
            this.swiper_swipe(this.state.index);
          }}>
          <Icons.AntDesign
            name={I18nManager.isRTL ? 'left' : 'right'}
            color={Theme.COLORS.white}
            size={18}
          />
        </TouchableOpacity>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
