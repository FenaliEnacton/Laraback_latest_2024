import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
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
import {GradientFooter} from '@components/generic';
import {translate} from '@translations';
import {AppImages} from '@assets/Images';
import {request_faqs} from '@app_redux/Actions';
import {Theme} from '@assets/Theme';
import HTMLView from 'react-native-htmlview';
import Icon from '@assets/icons';
import styles from './style';

const mapDispatchToProps = {
  request_faqs,
};

const mapStateToProps = ({params}) => {
  return {
    faqs_info: params.faqs_info || [],
  };
};

class FAQs extends Component {
  state = {
    par_index: null,
    que_index: null,
  };

  componentDidMount() {
    this.props.request_faqs();
  }

  toggle = (par_index, child_index) => {
    if (
      this.state.par_index === par_index &&
      this.state.que_index === child_index
    ) {
      this.setState({par_index: null, que_index: null});
    } else {
      this.setState({par_index, que_index: child_index});
    }
  };

  render() {
    const {faqs_info} = this.props;
    const {par_index, que_index} = this.state;
    return (
      <Container>
        <Header>
          <HeaderLeft>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </HeaderLeft>
          <HeaderTitle>
            <Text style={styles.headerTitle}>{translate('faqs')}</Text>
          </HeaderTitle>
          <HeaderRight />
        </Header>
        <ScrollContent>
          {faqs_info.map((e, index) => {
            return (
              <View style={styles.screen_content}>
                <Text style={styles.sectionTitle}>{e.name}</Text>
                {e.faq.map((q, i) => {
                  return (
                    <View style={styles.faq_card}>
                      <TouchableOpacity
                        style={styles.faq_card_head}
                        onPress={() => this.toggle(index, i)}>
                        <Text style={styles.faq_title}>{q.title}</Text>
                        <Icon.AntDesign
                          name={
                            par_index === index && que_index === i
                              ? 'up'
                              : 'down'
                          }
                          color={Theme.COLORS.primary}
                          size={14}
                        />
                      </TouchableOpacity>
                      {par_index === index && que_index === i ? (
                        <HTMLView
                          style={styles.faq_content}
                          value={q.content}
                          stylesheet={StyleSheet.create({
                            ...Theme.fontStyles.html_view_txtStyles,
                          })}
                        />
                      ) : null}
                    </View>
                  );
                })}
              </View>
            );
          })}
          <GradientFooter
            button_title={translate('contact_us')}
            main_title={''}
            sub_title={translate('faq_gr_sub_title')}
            image={AppImages.gr_faq_img}
            buttonClick={() => this.props.navigation.navigate('ContactUs')}
          />
        </ScrollContent>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FAQs);
