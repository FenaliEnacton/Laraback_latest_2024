import React, {Component} from 'react';
import {
  View,
  Text,
  I18nManager,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  ScrollContent,
  HeaderBackButton,
  BottomModal,
  CloseButton,
  KeyboardAwareContent,
  LangSupportTxtInput,
  Toast,
  Loader,
} from '@components/core';
import Icon from '@assets/icons';
import {GradientFooter} from '@components/generic';
import {
  ActivityNavigationList,
  EmailVerification,
  NavigationList,
} from '@components/user';
import Share from 'react-native-share';
import {translate} from '@translations';
import {Theme} from '@assets/Theme';
import HTMLView from 'react-native-htmlview';
import Clipboard from '@react-native-community/clipboard';
import {is_user_logged_in} from '@app_redux/Selectors';
import {get_referral_link} from '@user_redux/Selectors';
import {AppImages} from '@assets/Images';
import {request_refer_n_earn_info} from '@app_redux/Actions';
import {request_user_referral_invite} from '@user_redux/Actions';
import {get_user_internal_nav_list} from '@assets/RouterList';
import Config from 'react-native-config';
import styles from './style';
import {Formik, ErrorMessage} from 'formik';
import {string, object} from 'yup';
import {get_currency_string} from '@user_redux/Utils';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
const NAV_LIST_1 = get_user_internal_nav_list([10003, 10004]);
const bottom_modal = React.createRef();

const mapDispatchToProps = {
  request_refer_n_earn_info,
  request_user_referral_invite,
};

const mapStateToProps = ({params}) => {
  return {
    refer_n_earn_info: params.refer_n_earn_info || {},
    is_member: is_user_logged_in(params) || false,
    referral_link: get_referral_link(params) || '',
    loading: params.loading,
    app_settings: params.app_settings || {},
    user_info: params.user_info || {},
    bonus_types: params.bonus_types || {},
  };
};

class ReferNEarn extends Component {
  state = {
    emails: '',
    show_bottom_modal: false,
    modal_type: 'terms',
  };

  componentDidMount() {
    this.props.request_refer_n_earn_info();
  }

  copy_referral_url = () => {
    Clipboard.setString(this.props.referral_link);
    Toast.successBottom(translate('copied'));
  };

  handle_social_share = () => {
    const shareOptions = {
      title: Config.APP_NAME,
      message: `${translate('join_refer')}\n`,
      url: this.props.referral_link,
      // social: Share.Social[type],
    };
    Share.open(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  is_email_valid = email => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  send_invite_link = values => {
    if (values.email) {
      let emails = values.email.split(',');
      if (emails.every(this.is_email_valid)) {
        this.props.request_user_referral_invite(values.email);
      } else {
        Toast.errorBottom('Please enter valid email');
      }
    }
  };

  handle_invite_now_click = () => {
    if (!this.props.is_member) {
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    const {
      refer_n_earn_info,
      is_member,
      app_settings,
      user_info,
      referral_link,
      bonus_types,
    } = this.props;
    const refer_n_earn_list = refer_n_earn_info['procash/section']?.blocks
      ? refer_n_earn_info['procash/section']?.blocks
      : [];
    const {modal_type} = this.state;
    const email_schema = object().shape({
      email: string()
        .trim()
        // .email(translate('email_is_not_valid'))
        .max(255)
        .required(translate('required_field')),
    });
    return (
      <Container>
        <Header>
          <HeaderLeft>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </HeaderLeft>
          <HeaderTitle>
            <Text style={styles.headerTitle}>{translate('refer_n_earn')}</Text>
          </HeaderTitle>
          <HeaderRight />
        </Header>
        {is_member ? (
          <KeyboardAwareContent>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={['#f5e3e6', '#d9e4f5']}
              style={[styles.gradientCard]}>
              <LottieView
                source={AppImages.referNEarn_bg}
                style={styles.screen_img}
                loop
                autoPlay
              />
            </LinearGradient>
            {/* <Text style={styles.screen_title}>
              {translate('refer_n_earn')}{' '}
              {user_info.referral_percent
                ? user_info.referral_percent
                : Config.REFERRAL_PERCENT}
              % {translate('bonus_from_your_friend')}
            </Text> */}
            <View style={styles.bonus_types}>
              <View style={{flexDirection: 'row'}}>
                <Icon.MaterialCommunityIcons
                  name={'account-cash'}
                  color={Theme.COLORS.secondary}
                  size={15}
                  style={{marginRight: 5}}
                />
                <Text style={styles.bonus_text}>
                  {user_info.referral_percent
                    ? user_info.referral_percent
                    : app_settings.cashback.referral_percent}
                  {translate('rewards_make')}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Icon.Ionicons
                  name={'wallet'}
                  color={Theme.COLORS.secondary}
                  size={15}
                  style={{marginRight: 5}}
                />
                <Text style={styles.bonus_text}>
                  {translate('joins_earn')}
                  {get_currency_string(bonus_types.refer_bonus.amount)}{' '}
                  {translate('referral_bonus')}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Icon.FontAwesome5
                  name={'user-friends'}
                  color={Theme.COLORS.secondary}
                  size={15}
                  style={{marginRight: 5}}
                />
                <Text style={styles.bonus_text}>
                  {translate('will_earn')}{' '}
                  {get_currency_string(bonus_types.join_with_refer.amount)}{' '}
                  {translate('join_bonus')}
                </Text>
              </View>
            </View>
            {/* <View style={styles.hiw_box}>
              <Text
                style={styles.hiw_text}
                onPress={() =>
                  this.setState({show_bottom_modal: true, modal_type: 'hiw'})
                }>
                {translate('how_it_works')}{' '}
              </Text>
              <Icon.Entypo
                name={'chevron-down'}
                color={Theme.COLORS.secondary}
                size={18}
              />
            </View> */}
            <View style={styles.hiw_card}>
              {refer_n_earn_list.map((e, index) => {
                return (
                  <>
                    <View style={{flexDirection: 'column', width: 50}}>
                      <View style={styles.hiw_icon_card}>
                        <FastImage
                          source={{
                            uri: e.image ? e.image : Config.EMPTY_IMAGE_URL,
                          }}
                          style={styles.hiw_img}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </View>
                      <Text style={styles.hiwText}>{e.title[Config.LANG]}</Text>
                    </View>
                    {index != refer_n_earn_list.length - 1 ? (
                      <View style={styles.line} />
                    ) : null}
                  </>
                );
              })}
            </View>
            {/* {this.props.user_info?.email_verified_at ? (
              <> */}
            <Text style={styles.input_title}>
              {translate('copy_invite_friend')}
            </Text>
            <TouchableOpacity
              style={styles.linkCard}
              onPress={() => this.copy_referral_url()}>
              <Text style={styles.email} numberOfLines={1}>
                {referral_link}
              </Text>
              <View style={styles.copy_btn}>
                <Icon.FontAwesome
                  name={'copy'}
                  color={Theme.COLORS.primary}
                  size={18}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.sub_title}>{translate('unique_referral')}</Text>
            <View style={styles.share_box}>
              <Text style={styles.referLinkTitle}>
                {translate('share_social_network')}
              </Text>
              <View style={styles.socialShareBox}>
                {/* {Social_Share_List.map((item, index) => {
                return ( */}
                <TouchableOpacity
                  style={styles.socialBtn}
                  onPress={() => this.handle_social_share()}>
                  <Icon.AntDesign
                    name={'sharealt'}
                    color={Theme.COLORS.secondary}
                    size={20}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.orView}>
              <View style={styles.separator} />
              <Text style={styles.OrText}>{translate('or')}</Text>
              <View style={styles.separator} />
            </View>
            <Text style={[styles.input_title, {marginTop: 20}]}>
              {translate('invite_by_email')}
            </Text>
            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={email_schema}
              onSubmit={values => this.send_invite_link(values)}>
              {({handleBlur, handleChange, values, handleSubmit}) => {
                return (
                  <>
                    <View style={styles.email_input}>
                      <LangSupportTxtInput
                        style={styles.textInput}
                        placeholder={translate('enter_emails')}
                        value={values.email}
                        keyboardType={'email-address'}
                        onBlur={handleBlur('email')}
                        onChangeText={handleChange('email')}
                        name="email"
                      />
                      <TouchableOpacity
                        style={[
                          styles.copy_btn,
                          {backgroundColor: Theme.COLORS.cb_rates},
                        ]}
                        onPress={handleSubmit}>
                        <Icon.Feather
                          name={'send'}
                          color={Theme.COLORS.secondary}
                          size={18}
                        />
                      </TouchableOpacity>
                    </View>
                    <ErrorMessage name="email">
                      {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                    </ErrorMessage>
                  </>
                );
              }}
            </Formik>
            <Text
              style={styles.tnc_title}
              onPress={() =>
                this.setState({
                  show_bottom_modal: true,
                  modal_type: 'terms',
                })
              }>
              {translate('terms_n_condition')}
            </Text>
            <Text
              style={styles.hiw_text}
              onPress={() =>
                this.setState({show_bottom_modal: true, modal_type: 'hiw'})
              }>
              {translate('how_it_works')}{' '}
            </Text>

            <NavigationList
              list={NAV_LIST_1}
              navigation={this.props.navigation}
              style={styles.navListStyle}
              containerStyle={{
                marginVertical: 20,
                alignItems: 'center',
              }}
              numberOfLines={2}
              textStyle={styles.routeText}
            />
            {/* </>
            ) : (
              <EmailVerification />
            )} */}
          </KeyboardAwareContent>
        ) : (
          <ScrollContent>
            <View style={styles.how_to_refer_box}>
              {refer_n_earn_list.map((e, index) => {
                return (
                  <View style={styles.refer_tab} key={index.toString()}>
                    <FastImage
                      source={{uri: e.image ? e.image : Config.EMPTY_IMAGE_URL}}
                      style={styles.refer_img}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    <View style={styles.refer_row}>
                      <Text style={styles.refer_title}>
                        {e.title[Config.LANG]}
                      </Text>
                      <Text style={styles.refer_desc}>
                        {e.content[Config.LANG]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
            <GradientFooter
              button_title={translate('invite_now')}
              main_title={''}
              sub_title={translate('home_gr_sub_title').replace(
                '{:cashback_percent}',
                app_settings?.cashback?.referral_percent
                  ? app_settings?.cashback?.referral_percent
                  : 5,
              )}
              image={AppImages.gr_refer_img}
              buttonClick={() => this.handle_invite_now_click()}
            />
            <Text style={styles.title}>{translate('terms')}</Text>
            <HTMLView
              style={styles.terms_content}
              value={
                refer_n_earn_info['procash/custom-list']?.terms?.markup[
                  Config.LANG
                ]
              }
              stylesheet={StyleSheet.create({
                ...Theme.fontStyles.html_view_txtStyles,
              })}
            />
          </ScrollContent>
        )}
        <BottomModal
          ref={bottom_modal}
          bottomModalShow={this.state.show_bottom_modal}
          setBottomModalVisibleFalse={() =>
            this.setState({show_bottom_modal: false})
          }>
          <>
            <View style={styles.modal_top_notch} />

            {modal_type === 'terms' ? (
              <Text style={styles.modal_title}>
                {translate('terms_n_condition')}
              </Text>
            ) : (
              <Text style={styles.modal_title}>
                {translate('how_it_works')}
              </Text>
            )}
            <ScrollView
              style={styles.popup_scroll}
              showsVerticalScrollIndicator={false}>
              {modal_type === 'terms' ? (
                <>
                  <HTMLView
                    style={styles.terms_content}
                    value={
                      refer_n_earn_info['procash/custom-list']?.terms?.markup[
                        Config.LANG
                      ]
                    }
                    stylesheet={StyleSheet.create({
                      ...Theme.fontStyles.html_view_txtStyles,
                    })}
                  />
                </>
              ) : (
                <>
                  {refer_n_earn_list.map((e, index) => {
                    return (
                      <View style={styles.refer_tab} key={index.toString()}>
                        <FastImage
                          source={{
                            uri: e.image ? e.image : Config.EMPTY_IMAGE_URL,
                          }}
                          style={styles.refer_img}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                        <View style={styles.refer_row}>
                          <Text style={styles.refer_title}>
                            {e.title[Config.LANG]}
                          </Text>
                          <Text style={styles.refer_desc}>
                            {e.content[Config.LANG]}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </>
              )}
            </ScrollView>
            <View style={styles.btnBar}>
              <CloseButton
                // btnStyle={styles.closeBtn}
                onPress={() => bottom_modal.current.props.onRequestClose()}
              />
            </View>
          </>
        </BottomModal>
        <Loader show={this.props.loading} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReferNEarn);
