import { AppImages } from '@/Assets/Images';
import { Theme } from '@/Assets/Theme';
import LBButton from '@/Components/Core/LBButton';
import { Toast } from '@/Components/Core/Toast';
import {
  failed_user_register_verification,
  request_social_login,
  request_user_register_verification,
  request_user_registration,
} from '@/Redux/Actions/userAuthActions';
import { translate } from '@/translations';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import AuthContainer from '../AuthContainer';
import styles from '../style';

const mapDispatchToProps = {
  request_user_register_verification: request_user_register_verification,
  failed_user_register_verification: failed_user_register_verification,
  request_user_registration: request_user_registration,
  request_social_login: request_social_login,
};

const mapStateToProps = ({ params }) => {
  return {
    loading: params.loading,
    forgot_pass_email_sent: params.forgot_pass_email_res,
    otp_resend_show: params.otp_resend_show,
    register_email_otp: params.register_email_otp,
    register_mobile_otp: params.register_mobile_otp,
  };
};

const VerifyUser = props => {
  const [userEnteredOtp, setUserEnteredOtp] = useState('');
  const [showResend, setShowResend] = useState(false);
  const [userEnteredMOtp, setUserEnteredMOtp] = useState('');

  useEffect(() => {
    props.failed_user_register_verification();
  }, []);

  useEffect(() => {
    if (props.otp_resend_show) {
      show_resend_after_some_time();
    } else {
      hide_resend();
    }
  }, [props.otp_resend_show]);

  const hide_resend = () => {
    setShowResend(false);
  };

  const show_resend_after_some_time = () => {
    setTimeout(() => {
      setShowResend(true);
    }, 50000);
  };

  const send_mail_request = () => {
    let min = Math.ceil(1000);
    let max = Math.floor(9999);
    let otp = Math.floor(Math.random() * (max - min + 1)) + min;
    let mobile_otp = Math.floor(Math.random() * (max - min + 1)) + min;
    props.request_user_register_verification(
      props.route.params?.email,
      otp,
      props.route.params?.mobile,
      mobile_otp,
      props.route.params?.password,
      props.route.params?.referrer_code,
      props.route.params?.is_social,
    );
  };

  const handle_otp_check = () => {
    if (userEnteredMOtp != props.register_mobile_otp) {
      Toast.errorBottom(translate('phone_otp_is_not_correct'));
      return false;
    }
    if (userEnteredOtp != props.register_email_otp) {
      Toast.errorBottom(translate('email_otp_is_not_correct'));
      return false;
    }
    if (
      userEnteredOtp == props.register_email_otp &&
      userEnteredMOtp == props.register_mobile_otp
    ) {
      Toast.successBottom(translate('OTP_verified'));
      if (props.route.params?.is_social) {
        props.request_social_login(
          props.route.params?.email,
          props.route.params?.social_id,
          props.route.params?.social_type,
          props.route.params?.mobile,
          props.route.params?.password,
          props.route.params?.referrer_code,
        );
      } else {
        props.request_user_registration(
          props.route.params?.email,
          props.route.params?.password,
          props.route.params?.mobile,
          props.route.params?.referrer_code,
        );
      }
    }
  };

  return (
    <AuthContainer
      close_click={() => props.navigation.goBack()}
      loading_show={props.loading}
      bg_img={AppImages.otp_verification_bg}>
      <>
        <Text style={styles.app_name}>{translate('enter_email_otp')}</Text>
        <OTPInputView
          style={styles.otpInput}
          pinCount={4}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => {setState({code})}}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={user_entered_otp => {
            setUserEnteredOtp(user_entered_otp);
          }}
        />
        {showResend ? (
          <Text
            style={styles.reset_pass_text}
            onPress={() => send_mail_request()}>
            {translate('resend')}
          </Text>
        ) : null}
        <Text style={styles.app_name}>{translate('enter_mobile_otp')}</Text>
        <OTPInputView
          style={styles.otpInput}
          pinCount={4}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={user_entered_m_otp => {
            setUserEnteredMOtp(user_entered_m_otp);
          }}
        />
        {showResend ? (
          <Text
            style={styles.reset_pass_text}
            onPress={() => send_mail_request()}>
            {translate('resend')}
          </Text>
        ) : null}
        <View>
          <LBButton
            label={translate('register_now')}
            onPress={() => handle_otp_check()}
            btnStyle={styles.btnStyle}
            labelStyle={styles.btn_labelStyle}
          />
          <Text style={styles.footer_text}>
            {translate('already_have_an_account')}{' '}
            <Text
              style={{ color: Theme.COLORS.secondary }}
              onPress={() => props.navigation.navigate('Login')}>
              {translate('sign_in')}
            </Text>
          </Text>
        </View>
      </>
    </AuthContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyUser);
