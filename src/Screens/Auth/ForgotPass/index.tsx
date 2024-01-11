import { ErrorMessage, Formik } from 'formik';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { object, string } from 'yup';
import AuthContainer from '../AuthContainer';
import styles from '../style';
import {
  failed_forgot_pass_email,
  request_forgot_pass_email,
} from '@/Redux/Actions/userAuthActions';
import { translate } from '@/translations';
import Toast from '@/Components/Core/Toast';
import { AppImages } from '@/Assets/Images';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import LBButton from '@/Components/Core/LBButton';
import InputText from '@/Components/Core/TextBox';
import { Theme } from '@/Assets/Theme';

const mapDispatchToProps = {
  request_forgot_pass_email,
  failed_forgot_pass_email,
};

const mapStateToProps = ({ params }) => {
  return {
    loading: params.loading,
    forgot_pass_email_sent: params.forgot_pass_email_res,
    otp_resend_show: params.otp_resend_show,
    forgot_pass_otp: params.forgot_pass_otp,
  };
};

class ForgotPass extends Component<any> {
  state = {
    user_entered_otp: '',
    show_resend: false,
    email: '',
  };

  componentDidMount() {
    this.props.failed_forgot_pass_email();
  }

  componentWillUnmount() {
    this.props.failed_forgot_pass_email();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.otp_resend_show !== this.props.otp_resend_show) {
      if (this.props.otp_resend_show) {
        this.show_resend_after_some_time();
      } else {
        this.hide_resend();
      }
    }
  }

  hide_resend = () => {
    this.setState({ show_resend: false });
  };
  show_resend_after_some_time = () => {
    setTimeout(() => {
      this.setState({ show_resend: true });
    }, 50000);
  };

  handleLogin = values => {
    if (values.email && !this.props.loading) {
      this.setState({ email: values.email });
      this.send_mail_request(values.email);
    }
  };

  send_mail_request = email => {
    let min = Math.ceil(1000);
    let max = Math.floor(9999);
    let otp = Math.floor(Math.random() * (max - min + 1)) + min;
    this.props.request_forgot_pass_email(email, otp);
  };

  handle_otp_check = () => {
    if (this.state.user_entered_otp == this.props.forgot_pass_otp) {
      Toast.successBottom(translate('OTP_verified'));
      this.props.navigation.navigate('ChangePassword', {
        otp: this.state.user_entered_otp,
        email: this.state.email,
      });
    } else {
      Toast.errorBottom(translate('wrong_otp'));
    }
  };

  render() {
    const loginSchema = object().shape({
      email: string()
        .trim()
        .email(translate('email_is_not_valid'))
        .max(255, translate('max_255_war'))
        .required(translate('required_field')),
    });
    const { forgot_pass_email_sent } = this.props;
    return (
      <AuthContainer
        close_click={() => this.props.navigation.goBack()}
        loading_show={this.props.loading}
        bg_img={AppImages.forgot_pwd_bg}>
        {forgot_pass_email_sent ? (
          <>
            <Text style={styles.app_name}>{translate('enter_email_otp')}</Text>
            <Text
              style={[
                styles.reset_pass_text,
                { textAlign: 'center', textTransform: 'none' },
              ]}>
              {translate('enter_otp_received_in_your_mail')}
            </Text>
            <OTPInputView
              style={styles.otpInput}
              pinCount={4}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged = {code => { this.setState({code})}}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={user_entered_otp => {
                this.setState({ user_entered_otp });
              }}
            />
            {this.state.show_resend ? (
              <Text
                style={styles.reset_pass_text}
                onPress={() => this.send_mail_request(this.state.email)}>
                {translate('resend')}
              </Text>
            ) : null}
            <View>
              <LBButton
                label={translate('verify_now')}
                onPress={() => this.handle_otp_check()}
                btnStyle={styles.btnStyle}
                labelStyle={styles.btn_labelStyle}
              />
              <Text style={styles.footer_text}>
                {translate('remember_password')}{' '}
                <Text
                  style={{ color: Theme.COLORS.secondary }}
                  onPress={() => this.props.navigation.navigate('Login')}>
                  {translate('sign_in')}
                </Text>
              </Text>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.welcome_title}>{translate('forgot_pass')}</Text>
            <Formik
              initialValues={{
                email: '',
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
                      placeholder={translate('email')}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      containerStyle={{ marginBottom: 10 }}
                      style={
                        values.email ? { height: '40%' } : { height: '100%' }
                      }
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

                    <Text
                      style={[styles.reset_pass_text, { textAlign: 'left' }]}>
                      {translate('enter_your_email_to_get_new_pass')}
                    </Text>
                    <LBButton
                      label={translate('get_email_otp')}
                      onPress={() => handleSubmit()}
                      btnStyle={styles.btnStyle}
                      labelStyle={[
                        styles.btn_labelStyle,
                        { textTransform: null },
                      ]}
                    />
                    <Text style={styles.footer_text}>
                      {translate('remember_password')}{' '}
                      <Text
                        style={{ color: Theme.COLORS.secondary }}
                        onPress={() => this.props.navigation.navigate('Login')}>
                        {translate('sign_in')}
                      </Text>
                    </Text>
                  </>
                );
              }}
            </Formik>
          </>
        )}
      </AuthContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPass);
