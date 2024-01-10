import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  I18nManager,
  ScrollView,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {
  LangSupportTxtInput,
  BottomModal,
  CloseButton,
  TextBox,
} from '@components/core';
import AuthContainer from '../AuthContainer';
import SocialSignIns from '../SocialSignIns';
import {AppImages} from '@assets/Images';
import {LBButton} from '@components/core';
import {Formik, ErrorMessage} from 'formik';
import HTMLView from 'react-native-htmlview';
import {Theme} from '@assets/Theme';
import {string, object} from 'yup';
import {translate} from '@translations';
import {
  request_user_register_verification,
  request_social_login,
} from '@app_redux/Actions';
import styles from '../style';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';

const password_input = React.createRef();
const privacy_policy_modal = React.createRef();

const mapDispatchToProps = {
  request_user_register_verification,
  request_social_login,
};

const mapStateToProps = ({params}) => {
  return {
    privacy_policy_data: params.app_info_data?.privacy || {},
    terms: params.app_info_data?.terms || {},
    loading: params.loading,
    app_settings: params.app_settings || {},
  };
};

class Signup extends Component {
  state = {
    secureTextEntry: true,
    show_refer_input: this.props.route.params?.referrer_code ? true : false,
    show_privacy_policy_modal: false,
    popup_type: 'privacy',
    referrer_code: this.props.route.params?.referrer_code
      ? this.props.route.params?.referrer_code
      : '',
    country_code: Config.DEFAULT_COUNTRY_CODE,
    showDialPicker: false,
  };

  handleLogin = values => {
    if (values.mobile && values.password && values.email) {
      //mobile check removed
      // this.props.navigation.navigate('ConfirmRegistration', {
      //   email: values.email,
      //   password: values.password,
      //   mobile: values.mobile,
      //   referrer_code: this.state.referrer_code,
      //   is_social: false,
      //   country_code: this.state.country_code,
      // });
      //mobile check removed
      let min = Math.ceil(1000);
      let max = Math.floor(9999);
      let otp = Math.floor(Math.random() * (max - min + 1)) + min;
      let mobile_otp = Math.floor(Math.random() * (max - min + 1)) + min;
      this.props.request_user_register_verification(
        values.email,
        otp,
        `+${this.state.country_code} ${values.mobile}`,
        mobile_otp,
        values.password,
        this.state.referrer_code,
        false,
        '',
        '',
      );
    }
  };

  social_login = data => {
    this.props.request_social_login(
      data.email,
      data.social_id,
      data.social_type,
      '',
      '',
      this.state.referrer_code,
    );
  };

  renderDialCode = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.monthTab,
          {
            backgroundColor:
              this.state.country_code ===
              this.props.app_settings.countries.all[item].dial_code
                ? Theme.COLORS.primary
                : Theme.COLORS.white,
          },
        ]}
        onPress={() =>
          this.setState({
            country_code: this.props.app_settings.countries.all[item].dial_code,
            showDialPicker: false,
          })
        }>
        <Text
          style={[
            styles.monthText,
            {
              color:
                this.state.country_code ===
                this.props.app_settings.countries.all[item].dial_code
                  ? Theme.COLORS.white
                  : Theme.COLORS.blackText,
            },
          ]}>
          + {this.props.app_settings.countries.all[item].dial_code}
        </Text>
      </TouchableOpacity>
    );
  };

  dialCard = ({value}) => {
    return (
      <View
        style={[
          {
            justifyContent: 'center',
            marginTop: 2,
            // backgroundColor: 'red',
          },
          value.mobile
            ? {height: '50%', alignSelf: 'flex-end'}
            : {height: '100%'},
        ]}>
        <Text
          style={styles.mobile_text}
          onPress={() => this.setState({showDialPicker: true})}>
          +{' '}
          {this.state.country_code
            ? this.state.country_code
            : translate('select')}
        </Text>
      </View>
    );
  };
  render() {
    const loginSchema = object().shape({
      mobile: string()
        .trim()
        .max(10, translate('max_10_war'))
        .required(translate('required_field')),
      email: string()
        .trim()
        .email(translate('email_is_not_valid'))
        .required(translate('required_field')),
      password: string().trim().required(translate('required_field')),
    });
    const {secureTextEntry, show_refer_input, popup_type} = this.state;
    const {privacy_policy_data, terms, app_settings} = this.props;
    return (
      <AuthContainer
        close_click={() => this.props.navigation.goBack()}
        loading_show={this.props.loading || this.state.loading}
        bg_img={AppImages.sign_up_bg}>
        <Text style={styles.welcome_to_title}>{translate('welcome_to')}</Text>
        <Text style={styles.app_name}>{translate('app_name')}</Text>

        <Formik
          initialValues={{
            mobile: '',
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={values => this.handleLogin(values)}>
          {({
            handleBlur,
            handleChange,
            values,
            handleSubmit,
            setFieldValue,
          }) => {
            return (
              <>
                <TextBox
                  placeholder={translate('mobile_no')}
                  keyboardType={'number-pad'}
                  value={values.mobile}
                  onChangeText={handleChange('mobile')}
                  onBlur={handleBlur('mobile')}
                  containerStyle={{marginBottom: 10}}
                  preFixContent={<this.dialCard value={values} />}
                  style={values.mobile ? {height: '55%'} : {height: '100%'}}
                  content={
                    values.mobile ? (
                      <>
                        <Text style={styles.inputHeaderText}>
                          {' '}
                          {translate('mobile_no')}
                        </Text>
                      </>
                    ) : null
                  }></TextBox>
                <ErrorMessage name="mobile">
                  {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                </ErrorMessage>
                <TextBox
                  placeholder={translate('email')}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  containerStyle={{marginBottom: 10}}
                  style={values.email ? {height: '40%'} : {height: '100%'}}
                  content={
                    values.email ? (
                      <Text style={styles.inputHeaderText}>
                        {' '}
                        {translate('email')}
                      </Text>
                    ) : null
                  }></TextBox>
                <ErrorMessage name="email">
                  {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                </ErrorMessage>
                <TextBox
                  placeholder={translate('password')}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={secureTextEntry}
                  style={values.password ? {height: '40%'} : {height: '100%'}}
                  content={
                    values.password ? (
                      <Text style={styles.inputHeaderText}>
                        {' '}
                        {translate('password')}
                      </Text>
                    ) : null
                  }>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({secureTextEntry: !secureTextEntry})
                    }>
                    <FastImage
                      source={AppImages.show_pass_icon}
                      style={styles.show_pass_img}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </TouchableOpacity>
                </TextBox>
                <ErrorMessage name="password">
                  {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                </ErrorMessage>
                {!show_refer_input ? (
                  <Text
                    style={[
                      styles.reset_pass_text,
                      {color: Theme.COLORS.secondary},
                    ]}
                    onPress={() => this.setState({show_refer_input: true})}>
                    {translate('did_someone_refer')}
                  </Text>
                ) : (
                  <>
                    <TextBox
                      placeholder={translate('refer_placeholder')}
                      value={this.state.referrer_code}
                      onChangeText={value =>
                        this.setState({referrer_code: value})
                      }
                      containerStyle={{marginBottom: 10}}
                      style={
                        this.state.referrer_code
                          ? {height: '40%'}
                          : {height: '100%'}
                      }
                      content={
                        this.state.referrer_code ? (
                          <Text style={styles.inputHeaderText}>
                            {' '}
                            {translate('refer_placeholder')}
                          </Text>
                        ) : null
                      }></TextBox>
                  </>
                )}
                <LBButton
                  label={translate('join_now')}
                  onPress={() => handleSubmit()}
                  btnStyle={styles.btnStyle}
                  labelStyle={styles.btn_labelStyle}
                />
              </>
            );
          }}
        </Formik>
        <SocialSignIns
          title={translate('join_with')}
          set_loading={value => this.setState({loading: value})}
          social_login={data => this.social_login(data)}
        />
        <Text style={[styles.footer_text, {fontSize: 12}]}>
          {translate('agree_text')}{' '}
          <Text
            style={{color: Theme.COLORS.secondary}}
            onPress={() =>
              this.setState({
                show_privacy_policy_modal: true,
                popup_type: 'privacy',
              })
            }>
            {translate('privacy_policy')}
          </Text>
          {translate('and')}
          <Text
            style={{color: Theme.COLORS.secondary}}
            onPress={() =>
              this.setState({
                show_privacy_policy_modal: true,
                popup_type: 'terms',
              })
            }>
            {translate('terms_of_use')}.
          </Text>
        </Text>
        <Text style={styles.footer_text}>
          {translate('already_have_an_account')}{' '}
          <Text
            style={{color: Theme.COLORS.secondary}}
            onPress={() => this.props.navigation.navigate('Login')}>
            {translate('sign_in')}
          </Text>
        </Text>
        <BottomModal
          ref={privacy_policy_modal}
          bottomModalShow={this.state.show_privacy_policy_modal}
          setBottomModalVisibleFalse={() =>
            this.setState({show_privacy_policy_modal: false})
          }>
          <>
            <View style={styles.modal_top_notch} />

            {/* <Text style={styles.title}>{translate('privacy_policy')}</Text> */}
            <ScrollView
              style={styles.popup_scroll}
              showsVerticalScrollIndicator={false}>
              <HTMLView
                style={styles.terms_content}
                value={
                  popup_type === 'privacy'
                    ? privacy_policy_data.footer_content
                    : terms.footer_content
                }
                stylesheet={StyleSheet.create({
                  ...Theme.fontStyles.html_view_txtStyles,
                })}
              />
            </ScrollView>
            <View style={styles.btnBar}>
              <CloseButton
                btnStyle={styles.closeBtn}
                onPress={() =>
                  privacy_policy_modal.current.props.onRequestClose()
                }
              />
            </View>
          </>
        </BottomModal>
        <BottomModal
          bottomModalShow={this.state.showDialPicker}
          setBottomModalVisibleFalse={() =>
            this.setState({showDialPicker: false})
          }>
          <>
            <View style={styles.modal_top_notch} />

            <Text style={styles.title}>{translate('select_dial_code')}</Text>
            <FlatList
              style={styles.modalList}
              data={app_settings?.countries?.keys}
              keyExtractor={(item, index) => index.toString()}
              extraData={this.props}
              renderItem={this.renderDialCode}
            />
            <View style={styles.btnBar}>
              <CloseButton
                btnStyle={styles.closeBtn}
                onPress={() => this.setState({showDialPicker: false})}
              />
            </View>
          </>
        </BottomModal>
      </AuthContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
