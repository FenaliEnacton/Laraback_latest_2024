import React, {Component} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Toast} from '@components/core';
import AuthContainer from '../AuthContainer';
import {LBButton} from '@components/core';
import {Theme} from '@assets/Theme';
import {translate} from '@translations';
import {
  request_user_register_verification,
  failed_user_register_verification,
  request_user_registration,
  request_social_login,
} from '@app_redux/Actions';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {AppImages} from '@assets/Images';
import styles from '../style';

const mapDispatchToProps = {
  request_user_register_verification,
  failed_user_register_verification,
  request_user_registration,
  request_social_login,
};

const mapStateToProps = ({params}) => {
  return {
    loading: params.loading,
    forgot_pass_email_sent: params.forgot_pass_email_res,
    otp_resend_show: params.otp_resend_show,
    register_email_otp: params.register_email_otp,
    register_mobile_otp: params.register_mobile_otp,
  };
};

class VerifyUser extends Component {
  state = {
    user_entered_otp: '',
    show_resend: false,
    mobile: this.props.route.params?.mobile,
    email: this.props.route.params?.email,
    password: this.props.route.params?.password,
    is_social: this.props.route.params?.is_social,
    social_id: this.props.route.params?.social_id,
    referrer_code: this.props.route.params?.referrer_code,
    social_type: this.props.route.params?.social_type,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.otp_resend_show !== this.props.otp_resend_show) {
      if (this.props.otp_resend_show) {
        this.show_resend_after_some_time();
      } else {
        this.hide_resend();
      }
    }
  }

  componentWillUnmount() {
    this.props.failed_user_register_verification();
  }

  hide_resend = () => {
    this.setState({show_resend: false});
  };

  show_resend_after_some_time = () => {
    setTimeout(() => {
      this.setState({show_resend: true});
    }, 50000);
  };

  send_mail_request = () => {
    let min = Math.ceil(1000);
    let max = Math.floor(9999);
    let otp = Math.floor(Math.random() * (max - min + 1)) + min;
    let mobile_otp = Math.floor(Math.random() * (max - min + 1)) + min;
    this.props.request_user_register_verification(
      this.state.email,
      otp,
      this.state.mobile,
      mobile_otp,
      this.state.password,
      this.state.referrer_code,
      this.state.is_social,
    );
  };

  handle_otp_check = () => {
    if (this.state.user_entered_m_otp != this.props.register_mobile_otp) {
      Toast.errorBottom(translate('phone_otp_is_not_correct'));
      return false;
    }
    if (this.state.user_entered_otp != this.props.register_email_otp) {
      Toast.errorBottom(translate('email_otp_is_not_correct'));
      return false;
    }
    if (
      this.state.user_entered_otp == this.props.register_email_otp &&
      this.state.user_entered_m_otp == this.props.register_mobile_otp
    ) {
      Toast.successBottom(translate('OTP_verified'));
      if (this.state.is_social) {
        this.props.request_social_login(
          this.state.email,
          this.state.social_id,
          this.state.social_type,
          this.state.mobile,
          this.state.password,
          this.state.referrer_code,
        );
      } else {
        this.props.request_user_registration(
          this.state.email,
          this.state.password,
          this.state.mobile,
          this.state.referrer_code,
        );
      }
    }
  };

  render() {
    // console.log(this.state.referrer_code);
    const {forgot_pass_email_sent} = this.props;
    return (
      <AuthContainer
        close_click={() => this.props.navigation.goBack()}
        loading_show={this.props.loading || this.state.loading}
        bg_img={AppImages.otp_verification_bg}>
        <>
          <Text style={styles.app_name}>{translate('enter_email_otp')}</Text>
          <OTPInputView
            style={styles.otpInput}
            pinCount={4}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={user_entered_otp => {
              this.setState({user_entered_otp});
            }}
          />
          {this.state.show_resend ? (
            <Text
              style={styles.reset_pass_text}
              onPress={() => this.send_mail_request()}>
              {translate('resend')}
            </Text>
          ) : null}
          <Text style={styles.app_name}>{translate('enter_mobile_otp')}</Text>
          <OTPInputView
            style={styles.otpInput}
            pinCount={4}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={user_entered_m_otp => {
              this.setState({user_entered_m_otp});
            }}
          />
          {this.state.show_resend ? (
            <Text
              style={styles.reset_pass_text}
              onPress={() => this.send_mail_request()}>
              {translate('resend')}
            </Text>
          ) : null}
          <View>
            <LBButton
              label={translate('register_now')}
              onPress={() => this.handle_otp_check()}
              btnStyle={styles.btnStyle}
              labelStyle={styles.btn_labelStyle}
            />
            <Text style={styles.footer_text}>
              {translate('already_have_an_account')}{' '}
              <Text
                style={{color: Theme.COLORS.secondary}}
                onPress={() => this.props.navigation.navigate('Login')}>
                {translate('sign_in')}
              </Text>
            </Text>
          </View>
        </>
      </AuthContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyUser);
