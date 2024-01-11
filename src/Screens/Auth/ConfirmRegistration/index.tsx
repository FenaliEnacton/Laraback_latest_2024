import { ErrorMessage, Formik } from 'formik';
import React, { Component } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux';
import { object, string } from 'yup';
import AuthContainer from '../AuthContainer';
import styles from '../style';
import { request_user_register_verification } from '@/Redux/Actions/userAuthActions';
import { Theme } from '@/Assets/Theme';
import { translate } from '@/translations';
import { AppImages } from '@/Assets/Images';
import InputText from '@/Components/Core/TextBox';
import LBButton from '@/Components/Core/LBButton';
import BottomModal from '@/Components/Core/BottomModal';
import CloseButton from '@/Components/Core/CloseButton';

const privacy_policy_modal: any = React.createRef();

const mapDispatchToProps = {
  request_user_register_verification,
};

const mapStateToProps = ({ params }) => {
  return {
    privacy_policy_data: params.app_info_data?.privacy || {},
    terms: params.app_info_data?.terms || {},
    loading: params.loading,
    app_settings: params.app_settings || {},
  };
};

class ConfirmRegistration extends Component<any> {
  state = {
    show_privacy_policy_modal: false,
    popup_type: 'privacy',
    showDialPicker: false,
    mobile: this.props.route.params?.mobile,
    email: this.props.route.params?.email,
    password: this.props.route.params?.password,
    referrer_code: this.props.route.params?.referrer_code,
    is_social: this.props.route.params?.is_social,
    social_id: this.props.route.params?.social_id,
    social_type: this.props.route.params?.social_type,
    country_code: this.props.route.params?.country_code,
  };

  handleLogin = values => {
    if (values.mobile && values.email) {
      let min = Math.ceil(1000);
      let max = Math.floor(9999);
      let otp = Math.floor(Math.random() * (max - min + 1)) + min;
      let mobile_otp = Math.floor(Math.random() * (max - min + 1)) + min;
      this.props.request_user_register_verification(
        values.email,
        otp,
        `+${this.state.country_code} ${values.mobile}`,
        mobile_otp,
        this.state.password,
        this.state.referrer_code,
        this.state.is_social,
        this.props.route.params?.social_id,
        this.props.route.params?.social_type,
      );
    }
  };

  renderDialCode = ({ item, index }) => {
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
  dialCard = ({ value }) => {
    return (
      <View
        style={[
          {
            justifyContent: 'center',
            marginTop: 2,
            // backgroundColor: 'red',
          },
          value.mobile
            ? { height: '50%', alignSelf: 'flex-end' }
            : { height: '100%' },
        ]}>
        <Text
          style={styles.mobile_text}
          onPress={() => this.setState({ showDialPicker: true })}>
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
        .max(255, translate('max_255_war'))
        .required(translate('required_field')),
    });
    const { popup_type } = this.state;
    const { privacy_policy_data, terms, app_settings } = this.props;
    return (
      <AuthContainer
        close_click={() => this.props.navigation.goBack()}
        loading_show={this.props.loading}
        bg_img={AppImages.sign_up_bg}>
        <Text style={styles.welcome_to_title}>{translate('welcome_to')}</Text>
        <Text style={styles.app_name}>{translate('app_name')}</Text>
        <Formik
          initialValues={{
            mobile: this.props.route.params?.mobile
              ? this.props.route.params?.mobile
              : '',
            email: this.props.route.params?.email
              ? this.props.route.params?.email
              : '',
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
                <InputText
                  placeholder={translate('mobile_no')}
                  keyboardType={'number-pad'}
                  value={values.mobile}
                  onChangeText={handleChange('mobile')}
                  onBlur={handleBlur('mobile')}
                  containerStyle={{ marginBottom: 10 }}
                  preFixContent={<this.dialCard value={values} />}
                  style={values.mobile ? { height: '55%' } : { height: '100%' }}
                  content={
                    values.mobile ? (
                      <>
                        <Text style={styles.inputHeaderText}>
                          {' '}
                          {translate('mobile_no')}
                        </Text>
                      </>
                    ) : null
                  }></InputText>
                <ErrorMessage name="mobile">
                  {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                </ErrorMessage>

                <InputText
                  placeholder={translate('confirm_email')}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType={'email-address'}
                  style={values.email ? { height: '40%' } : { height: '100%' }}
                  content={
                    values.email ? (
                      <Text style={styles.inputHeaderText}>
                        {' '}
                        {translate('email')}
                      </Text>
                    ) : null
                  }></InputText>
                <ErrorMessage name="email">
                  {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                </ErrorMessage>
                <LBButton
                  label={translate('verify_now')}
                  onPress={() => handleSubmit()}
                  btnStyle={styles.btnStyle}
                  labelStyle={styles.btn_labelStyle}
                />
              </>
            );
          }}
        </Formik>
        <Text style={[styles.footer_text, { fontSize: 12 }]}>
          {translate('agree_text')}{' '}
          <Text
            style={{ color: Theme.COLORS.secondary }}
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
            style={{ color: Theme.COLORS.secondary }}
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
            style={{ color: Theme.COLORS.secondary }}
            onPress={() => this.props.navigation.navigate('Login')}>
            {translate('sign_in')}
          </Text>
        </Text>
        <BottomModal
          ref={privacy_policy_modal}
          bottomModalShow={this.state.show_privacy_policy_modal}
          setBottomModalVisibleFalse={() =>
            this.setState({ show_privacy_policy_modal: false })
          }>
          <>
            <View style={styles.modal_top_notch} />

            {/* <Text style={styles.title}>{translate('privacy_policy')}</Text> */}
            <ScrollView
              style={styles.popup_scroll}
              showsVerticalScrollIndicator={false}>
              <HTMLView
                // style={styles.terms_content}
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
            this.setState({ showDialPicker: false })
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
                onPress={() => this.setState({ showDialPicker: false })}
              />
            </View>
          </>
        </BottomModal>
      </AuthContainer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmRegistration);
