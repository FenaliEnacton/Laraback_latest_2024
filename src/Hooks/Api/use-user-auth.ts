import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUniqueId } from 'react-native-device-info';
import OneSignal from 'react-native-onesignal';
import { useRecoilState } from 'recoil';
import { go_back, navigate, reset } from '../../Navigation/appNavigator';
import {
  arrayAtomFamily,
  booleanAtomFamily,
  objectAtomFamily,
} from '../../Recoil/atom';
import { atomKeys } from '../../Recoil/atom-keys';
import api from '../../Services/api';
import { internalApi } from '../../Services/user_api';
import {
  getErrorMsg,
  get_api_error_string,
  get_exception_string,
  verificationSuccess,
} from '../../Utils';
import useUserDashboard from './use-user-dashboard';
import useUserFav from './use-user-fav';
import Toast from '@/Components/Core/Toast';
import { translate } from '@/translations';
import Config from '@/react-native-config';

const useUserAuth = () => {
  const [loadingLogin, setLoadingLogin] = useRecoilState(
    booleanAtomFamily(atomKeys.userAuth.loadingLogin),
  );

  const [loadingForgotPassword, setLoadingForgotPassword] = useRecoilState(
    booleanAtomFamily(atomKeys.userAuth.loading_forgot_password),
  );
  const [forgotPassRes, setForgotPassRes] = useRecoilState(
    booleanAtomFamily(atomKeys.userAuth.forgot_pass_res),
  );

  const [loadingRegistration, setLoadingRegistration] = useRecoilState(
    booleanAtomFamily(atomKeys.userAuth.loading_registration),
  );
  const [userToken, setUserToken] = useRecoilState(
    arrayAtomFamily(atomKeys.userAuth.user_token),
  );
  const [loadingSocialLogin, setLoadingSocialLogin] = useRecoilState(
    booleanAtomFamily(atomKeys.userAuth.loading_social_login),
  );

  const [loadingLogout, setLoadingLogout] = useRecoilState(
    booleanAtomFamily(atomKeys.userAuth.loading_logout),
  );
  const [userInfo, setUserInfo] = useRecoilState<any>(
    objectAtomFamily(atomKeys.userAuth.user_info),
  );
  const [userDashboardData, setUserDashboardData] = useRecoilState(
    objectAtomFamily(atomKeys.userAuth.user_dashboard_data),
  );

  const [loadingForgotChangePass, setLoadingForgotChangePass] = useRecoilState(
    booleanAtomFamily(atomKeys.userAuth.loading_forgot_change_pass),
  );

  const [userVerificationOtp, setUserVerificationOtp] = useRecoilState(
    booleanAtomFamily(atomKeys.userAuth.user_verification_otp),
  );
  const [loadingUserVerificationOtp, setLoadingUserVerificationOtp] =
    useRecoilState(
      booleanAtomFamily(atomKeys.userAuth.loading_user_verification_otp),
    );
  const [loadingUserEmailOtp, setLoadingUserEmailOtp] = useRecoilState(
    booleanAtomFamily(atomKeys.userAuth.loading_user_email_otp),
  );

  const { request_user_dashboard, request_user_modules } = useUserDashboard();
  const { request_user_fav } = useUserFav();

  async function request_user_login(email, password, out_page_info) {
    try {
      setLoadingLogin(true);
      const response = await api.user_auth_api('auth/login', {
        email: email,
        password: password,
        device_name: getUniqueId,
      });
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data?.data?.error
      ) {
        const res = response.data.data;
        internalApi.setHeader('Authorization', 'Bearer ' + res);
        // ////////////////////////
        OneSignal.OneSignal.login(email);
        OneSignal.OneSignal.User.addEmail(email);
        // //////////////////
        request_user_dashboard(true);
        request_user_fav('store');

        if (out_page_info) {
          go_back();
          navigate('OutPage', { out_page_info: out_page_info });
        } else {
          reset({ index: 0, routes: [{ name: 'Home' }] });
        }
        await AsyncStorage.setItem(
          'USER_AUTH',
          JSON.stringify({
            token: `Bearer ${res}`,
          }),
        );
        await AsyncStorage.setItem(
          'IS_SOCIAL_LOGIN',
          JSON.stringify({
            is_social: false,
          }),
        );
        setUserToken(res);
        setLoadingLogin(false);
        return res;
      } else {
        if (response.data?.data?.error?.email) {
          Toast.errorBottom(response.data?.data?.error?.email[0]);
        } else {
          Toast.errorBottom(
            response.data?.data?.message
              ? response.data?.data?.message
              : translate('login_request_failed'),
          );
        }
        setUserToken([]);
        setLoadingLogin(false);
        return {};
      }
    } catch (error) {
      setLoadingLogin(false);
      setUserToken([]);
      console.error(error);
      return {};
    }
  }
  async function request_forgot_pass_email(email, otp) {
    try {
      setLoadingForgotPassword(true);
      const response = await api.user_auth_api('auth/password/forgot', {
        email: email,
        otp: otp,
      });
      console.log({ first: response });
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data?.data?.error
      ) {
        const res = response.data.data;
        setForgotPassRes(true);
        Toast.showTop(translate('Otp_sent_to_your_mail'));
        setLoadingForgotPassword(false);
        return res;
      } else {
        if (response.data?.data?.error?.email) {
          Toast.errorBottom(response.data?.data?.error?.email[0]);
        } else {
          Toast.errorBottom(
            response.data?.data?.message
              ? response.data?.data?.message
              : translate('login_request_failed'),
          );
        }
        setForgotPassRes(false);
        setLoadingForgotPassword(false);
        return {};
      }
    } catch (error) {
      setForgotPassRes(false);
      setLoadingForgotPassword(false);
      console.error(error);
      return {};
    }
  }

  async function request_user_registration(
    email,
    password,
    mobile,
    referrer_code,
  ) {
    try {
      setLoadingRegistration(true);
      const response = await api.user_auth_api('auth/register', {
        email: email,
        password: password,
        phone_number: mobile,
        referrer_code: referrer_code,
        device_name: getUniqueId,
      });
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data?.data?.error
      ) {
        const res = response.data.data;
        internalApi.setHeader('Authorization', 'Bearer ' + res);
        // ////////////////////////
        OneSignal.OneSignal.login(email);
        OneSignal.OneSignal.User.addEmail(email);
        // //////////////////

        request_user_dashboard(true);
        request_user_fav('store');

        await AsyncStorage.setItem(
          'USER_AUTH',
          JSON.stringify({
            token: `Bearer ${res}`,
          }),
        );
        await AsyncStorage.setItem(
          'IS_SOCIAL_LOGIN',
          JSON.stringify({
            is_social: false,
          }),
        );
        navigate('Home');
        setUserToken(res);
        setLoadingRegistration(false);
        return res;
      } else {
        if (response.data?.data?.error?.email) {
          Toast.errorBottom(response.data?.data?.error?.email[0]);
        } else if (response.data?.data?.error?.referrer_code) {
          Toast.errorBottom(response.data?.data?.error?.referrer_code[0]);
        } else {
          Toast.errorBottom(
            response.data?.data?.message
              ? response.data?.data?.message
              : translate('registration_request_failed'),
          );
        }
        setUserToken([]);
        setLoadingRegistration(false);
        return {};
      }
    } catch (error) {
      setLoadingRegistration(false);
      Toast.errorBottom(translate('registration_request_failed'));
      setUserToken([]);
      console.error(error);
      return {};
    }
  }

  async function request_social_login(
    email,
    social_id,
    social_type,
    mobile,
    password,
    referrer_code,
    out_page_info,
    is_verified,
  ) {
    try {
      setLoadingSocialLogin(true);
      const user_exist_response = await api.user_auth_api('auth/exists', {
        email: email,
        provider_id: social_id,
        provider_type: social_type,
      });
      if (
        (user_exist_response.ok &&
          user_exist_response.data.success &&
          user_exist_response.data.data &&
          !user_exist_response.data?.data?.error) ||
        (!user_exist_response.data.data && is_verified) ||
        social_type === 'apple'
      ) {
        const response: any = await api.user_auth_api('auth/social', {
          email: email,
          provider_id: social_id,
          provider_type: social_type,
          password: social_type + social_id,
          referrer_code: referrer_code,
          phone_number: mobile,
          device_name: getUniqueId,
        });
        const res = response.data.data;
        if (
          response.ok &&
          response.data.success &&
          response.data.data &&
          !response.data?.data?.error
        ) {
          internalApi.setHeader(
            'Authorization',
            'Bearer ' + response.data.data,
          );
          setUserToken(response.data.data);
          // ////////////////////////
          OneSignal.OneSignal.login(email);
          OneSignal.OneSignal.User.addEmail(email);

          // //////////////////

          request_user_dashboard(true);
          request_user_fav('store');
          request_user_modules();

          await AsyncStorage.setItem(
            'USER_AUTH',
            JSON.stringify({
              token: `Bearer ${response.data.data}`,
            }),
          );
          await AsyncStorage.setItem(
            'IS_SOCIAL_LOGIN',
            JSON.stringify({
              is_social: true,
            }),
          );
          if (out_page_info) {
            go_back();
            navigate('OutPage', { out_page_info: out_page_info });
          } else {
            reset({ index: 0, routes: [{ name: 'Home' }] });
          }
        } else {
          if (response.data?.data?.error?.email) {
            Toast.errorBottom(response.data?.data?.error?.email[0]);
          } else if (response.data?.data?.error?.phone_number) {
            Toast.errorBottom(response.data?.data?.error?.phone_number[0]);
          } else {
            Toast.errorBottom(
              response.data?.data?.message
                ? response.data?.data?.message
                : translate('login_request_failed'),
            );
          }
          setUserToken([]);
        }
        setLoadingSocialLogin(false);
        return res;
      } else {
        if (user_exist_response.data?.data?.error?.email) {
          Toast.errorBottom(user_exist_response.data?.data?.error?.email[0]);
        } else {
          Toast.errorBottom(
            user_exist_response.data?.data?.message
              ? user_exist_response.data?.data?.message
              : translate('login_request_failed'),
          );
        }
        setUserToken([]);
        setLoadingSocialLogin(false);
        return {};
      }
    } catch (error) {
      setUserToken([]);
      setLoadingSocialLogin(false);
      console.error(error);
      return {};
    }
  }

  async function request_log_out() {
    try {
      setLoadingLogout(true);
      const response = await api.user_auth_api('user/logout', {
        device_name: getUniqueId,
      });
      if (response.ok && response.data.success && response.data.data) {
        Toast.showBottom(translate('log_out_successfully'));
        OneSignal.OneSignal.logout();
        OneSignal.OneSignal.User.removeEmail(userInfo.email);

        ///////////
        reset({ index: 0, routes: [{ name: 'Home' }] });
        internalApi.setHeader('Authorization', '');
        await AsyncStorage.removeItem('USER_AUTH');
        setUserToken([]);
        setUserDashboardData({});
        setUserInfo({});
        setLoadingLogout(false);
        return {};
      } else {
        Toast.errorBottom(translate('request_failed'));
        setUserToken([]);
        setUserDashboardData({});
        setUserInfo({});
        setLoadingLogout(false);
        return {};
      }
    } catch (error) {
      setLoadingLogout(false);
      setUserToken([]);
      setUserDashboardData({});
      setUserInfo({});
      console.error(error);
      Toast.errorBottom(translate('request_failed'));
      return {};
    }
  }

  async function request_forgot_change_password(
    email,
    password,
    change_pass_otp,
  ) {
    try {
      setLoadingForgotChangePass(true);
      const response = await api.user_auth_api('auth/password/update', {
        email: email,
        password: password,
        otp: Number(change_pass_otp),
      });
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data.data.error
      ) {
        Toast.successBottom(translate('password_changed_successfully'));
        navigate('Login');
        setLoadingForgotChangePass(false);
        return true;
      } else {
        Toast.errorBottom(
          response.data.data?.error
            ? get_exception_string(response.data.data)
            : response.data.msg
            ? get_api_error_string(response.data.msg)
            : translate('password_change_failed'),
        );
        setLoadingForgotChangePass(false);
        return {};
      }
    } catch (error) {
      Toast.errorBottom(translate('password_change_failed'));
      setLoadingForgotChangePass(false);
      console.error(error);
      return {};
    }
  }
  async function request_user_register_verification(
    email,
    register_email_otp,
    mobile,
    register_mobile_otp,
    password,
    referrer_code,
    is_social,
    social_id,
    social_type,
    is_module_verify,
  ) {
    try {
      const action = {
        email,
        register_email_otp,
        mobile,
        register_mobile_otp,
        password,
        referrer_code,
        is_social,
        social_id,
        social_type,
      };
      setLoadingUserVerificationOtp(true);
      let e_response: any = {};
      let m_response: any = {};
      e_response = Config.SHOULD_VERIFY_EMAIL
        ? await api.user_auth_api('auth/otp/email', {
            email: email,
            otp: register_email_otp,
          })
        : null;
      m_response = Config.SHOULD_VERIFY_PHONE
        ? await api.user_auth_api('auth/otp/mobile', {
            phone_number: mobile,
            otp: register_mobile_otp,
          })
        : null;
      if (Config.SHOULD_VERIFY_EMAIL && Config.SHOULD_VERIFY_PHONE) {
        if (
          e_response.ok &&
          e_response.data.success &&
          e_response.data.data &&
          m_response.ok &&
          m_response.data.success &&
          m_response.data.data &&
          !m_response.data.data.error &&
          !e_response.data.data.error
        ) {
          is_module_verify
            ? setUserVerificationOtp(true)
            : verificationSuccess(
                'Otp_sent_to_your_mail_and_contact_no',
                action,
              );
        } else {
          let message =
            getErrorMsg(e_response) + '\n' + getErrorMsg(m_response);
          setUserVerificationOtp(false);
          Toast.errorBottom(
            message ? message : translate('otp_request_failed'),
          );
        }
      } else if (Config.SHOULD_VERIFY_EMAIL) {
        if (
          e_response.ok &&
          e_response.data.success &&
          e_response.data.data &&
          !e_response.data.data.error
        ) {
          is_module_verify
            ? setUserVerificationOtp(true)
            : verificationSuccess('Otp_sent_to_your_mail', action);
        } else {
          let message = getErrorMsg(e_response);
          setUserVerificationOtp(false);
          Toast.errorBottom(
            message ? message : translate('otp_request_failed'),
          );
        }
      } else if (Config.SHOULD_VERIFY_PHONE) {
        if (
          m_response.ok &&
          m_response.data.success &&
          m_response.data.data &&
          !m_response.data.data.error
        ) {
          is_module_verify
            ? setUserVerificationOtp(true)
            : verificationSuccess('Otp_sent_to_your_phone', action);
        } else {
          let message = getErrorMsg(m_response);
          setUserVerificationOtp(false);
          Toast.errorBottom(
            message ? message : translate('otp_request_failed'),
          );
        }
      }
      setLoadingUserVerificationOtp(false);
      return {};
    } catch (error) {
      Toast.errorBottom(translate('password_change_failed'));
      setLoadingUserVerificationOtp(false);
      setUserVerificationOtp(false);
      console.error(error);
      return {};
    }
  }

  async function request_user_email_otp(email, otp) {
    try {
      setLoadingUserEmailOtp(true);
      const response = await api.user_auth_api('auth/otp/verify', {
        email: email,
        otp: otp,
      });
      console.log({ first: response });
      if (response.ok && response.data.success && response.data.data) {
        const res = response.data.data;
        Toast.successBottom(translate('Otp_sent_to_your_mail'));
        setLoadingUserEmailOtp(false);
        return res;
      } else {
        Toast.errorBottom(translate('email_request_failed'));
        setLoadingUserEmailOtp(false);
        return {};
      }
    } catch (error) {
      setLoadingUserEmailOtp(false);
      Toast.errorBottom(translate('email_request_failed'));
      console.error(error);
      return {};
    }
  }
  return {
    request_user_login,
    loadingLogin,
    request_forgot_pass_email,
    forgotPassRes,
    loadingForgotPassword,
    request_user_registration,
    loadingRegistration,
    userToken,
    request_social_login,
    loadingSocialLogin,
    request_log_out,
    loadingLogout,
    userDashboardData,
    userInfo,
    request_forgot_change_password,
    loadingForgotChangePass,
    request_user_register_verification,
    loadingUserVerificationOtp,
    userVerificationOtp,
    request_user_email_otp,
    loadingUserEmailOtp,
  };
};

export default useUserAuth;
