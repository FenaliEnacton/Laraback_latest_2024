import { takeEvery, call, put } from 'redux-saga/effects';
import * as types from '../Actions/actionTypes';
import api from '../Services/api';
import * as public_actions from '../Actions/publicDataActions';
import * as auth_actions from '../Actions/userAuthActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from '@/Components/Core/Toast';
import OneSignal from 'react-native-onesignal';
import { Config } from '@/react-native-config';
import { navigate, reset, go_back } from '../../Navigation/appNavigator';
import { getUniqueId } from 'react-native-device-info';
import { translate } from '@/translations';
import {
  get_api_error_string,
  get_exception_string,
} from '../USER_REDUX/Utils';
import { internalApi } from '../USER_REDUX/Services/api';
import { request_user_dashboard } from '../USER_REDUX/Actions/userDashboardActions';
import { request_user_favs } from '../USER_REDUX/Actions/userFavsActions';

export function* watch_user_auth_request() {
  yield takeEvery(types.REQUEST_USER_LOGIN, request_user_login);
  yield takeEvery(types.REQUEST_FORGOT_PASS_EMAIL, request_forgot_pass_email);
  yield takeEvery(types.REQUEST_USER_REGISTRATION, request_user_registration);
  yield takeEvery(types.REQUEST_SOCIAL_LOGIN, request_social_login);
  yield takeEvery(types.REQUEST_LOG_OUT, request_log_out);
  yield takeEvery(
    types.REQUEST_FORGOT_CHANGE_PASSWORD,
    request_forgot_change_password,
  );
  yield takeEvery(
    types.REQUEST_USER_REGISTER_VERIFICATION,
    request_user_register_verification,
  );
  yield takeEvery(types.REQUEST_USER_EMAIL_OTP, request_user_email_otp);
}

function* request_user_login(action) {
  try {
    const response = yield call(api.user_auth_api, 'auth/login', {
      email: action.payload.email,
      password: action.payload.password,
      device_name: getUniqueId,
    });
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data?.data?.error
    ) {
      internalApi.setHeader('Authorization', 'Bearer ' + response.data.data);
      yield put(auth_actions.success_user_login(response.data.data));
      // ////////////////////////
      OneSignal.setExternalUserId(action.payload.email, results => {
        // The results will contain push and email success statuses
        console.log('Results of setting external user id');
        console.log(results);
      });
      OneSignal.setEmail(action.payload.email);
      // //////////////////
      yield put(request_user_dashboard(true));
      yield put(request_user_favs('store'));
      if (action.payload.out_page_info) {
        go_back();
        navigate('OutPage', { out_page_info: action.payload.out_page_info });
      } else {
        reset({ index: 0, routes: [{ name: 'Home' }] });
      }
      yield AsyncStorage.setItem(
        'USER_AUTH',
        JSON.stringify({
          token: `Bearer ${response.data.data}`,
        }),
      );
      yield AsyncStorage.setItem(
        'IS_SOCIAL_LOGIN',
        JSON.stringify({
          is_social: false,
        }),
      );
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
      yield put(auth_actions.failed_user_login());
    }
  } catch (error) {
    yield put(auth_actions.failed_user_login());
    Toast.errorBottom(translate('login_request_failed'));
    console.log(error);
  }
}

function* request_social_login(action) {
  try {
    const user_exist_response = yield call(api.user_auth_api, 'auth/exists', {
      email: action.payload.email,
      provider_id: action.payload.social_id,
      provider_type: action.payload.social_type,
    });
    console.log(user_exist_response);
    if (
      (user_exist_response.ok &&
        user_exist_response.data.success &&
        user_exist_response.data.data &&
        !user_exist_response.data?.data?.error) ||
      (!user_exist_response.data.data && action.payload.mobile)
    ) {
      const response = yield call(api.user_auth_api, 'auth/social', {
        email: action.payload.email,
        provider_id: action.payload.social_id,
        provider_type: action.payload.social_type,
        password: action.payload.social_type + action.payload.social_id,
        referrer_code: action.payload.referrer_code,
        phone_number: action.payload.mobile,
        device_name: getUniqueId,
      });
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data?.data?.error
      ) {
        internalApi.setHeader('Authorization', 'Bearer ' + response.data.data);
        yield put(auth_actions.success_user_login(response.data.data));
        // ////////////////////////
        OneSignal.setExternalUserId(action.payload.email, results => {
          // The results will contain push and email success statuses
          console.log('Results of setting external user id');
          console.log(results);
        });
        OneSignal.setEmail(action.payload.email);

        // //////////////////
        yield put(request_user_dashboard(true));
        yield put(request_user_favs('store'));
        yield AsyncStorage.setItem(
          'USER_AUTH',
          JSON.stringify({
            token: `Bearer ${response.data.data}`,
          }),
        );
        yield AsyncStorage.setItem(
          'IS_SOCIAL_LOGIN',
          JSON.stringify({
            is_social: true,
          }),
        );
        if (action.payload.out_page_info) {
          go_back();
          navigate('OutPage', { out_page_info: action.payload.out_page_info });
        } else {
          reset({ index: 0, routes: [{ name: 'Home' }] });
        }
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
        yield put(auth_actions.failed_user_login());
      }
    } else {
      if (!action.payload.mobile) {
        yield put(public_actions.set_loading_false());
        navigate('ConfirmRegistration', {
          email: action.payload.email,
          password: action.payload.social_type + action.payload.social_id,
          mobile: '',
          referrer_code: action.payload.referrer_code,
          is_social: true,
          social_id: action.payload.social_id,
          social_type: action.payload.social_type,
        });
      }
    }
  } catch (error) {
    yield put(auth_actions.failed_user_login());
    Toast.errorBottom(translate('login_request_failed'));
    console.log(error);
  }
}

function* request_user_registration(action) {
  try {
    const response = yield call(api.user_auth_api, 'auth/register', {
      email: action.payload.email,
      password: action.payload.password,
      device_name: getUniqueId,
      phone_number: action.payload.mobile,
      referrer_code: action.payload.referrer_code,
    });
    // console.log(response);
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data?.data?.error
    ) {
      internalApi.setHeader('Authorization', 'Bearer ' + response.data.data);
      yield put(auth_actions.success_user_registration(response.data.data));
      // ////////////////////////
      OneSignal.setExternalUserId(action.payload.email, results => {
        // The results will contain push and email success statuses
        console.log('Results of setting external user id');
        console.log(results);
      });
      OneSignal.setEmail(action.payload.email);

      // //////////////////
      yield put(request_user_dashboard(true));
      yield put(request_user_favs('store'));
      yield AsyncStorage.setItem(
        'USER_AUTH',
        JSON.stringify({
          token: `Bearer ${response.data.data}`,
        }),
      );
      yield AsyncStorage.setItem(
        'IS_SOCIAL_LOGIN',
        JSON.stringify({
          is_social: false,
        }),
      );
      navigate('Home');
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
      yield put(auth_actions.failed_user_registration());
    }
  } catch (error) {
    yield put(auth_actions.failed_user_registration());
    Toast.errorBottom(translate('registration_request_failed'));
    console.log(error);
  }
}

function* request_forgot_pass_email(action) {
  try {
    const response = yield call(api.user_auth_api, 'auth/password/forgot', {
      email: action.payload.email,
      otp: action.payload.forgot_pass_otp,
    });
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(auth_actions.success_forgot_pass_email(response.data.data));
      Toast.showTop(translate('Otp_sent_to_your_mail'));
    } else {
      yield put(auth_actions.failed_forgot_pass_email());
      Toast.errorBottom(
        response.data.data?.error
          ? get_exception_string(response.data.data)
          : response.data.msg
          ? get_api_error_string(response.data.msg)
          : translate('email_request_failed'),
      );
    }
  } catch (error) {
    yield put(auth_actions.failed_forgot_pass_email());
    Toast.errorBottom(translate('email_request_failed'));
    console.log(error);
  }
}

function* request_log_out() {
  try {
    const response = yield call(api.user_auth_api, 'user/logout', {
      device_name: getUniqueId,
    });
    if (response.ok && response.data.success && response.data.data) {
      yield put(auth_actions.success_log_out());
      Toast.showBottom(translate('log_out_successfully'));
      ///////////
      OneSignal.removeExternalUserId(results => {
        // The results will contain push and email success statuses
        console.log('Results of removing external user id');
        console.log(results);
      });
      OneSignal.logoutEmail(error => {
        //handle error if it occurred
        console.log(error);
      });
      ///////////
      reset({ index: 0, routes: [{ name: 'Home' }] });
      internalApi.setHeader('Authorization', '');
      yield AsyncStorage.removeItem('USER_AUTH');
    } else {
      yield put(auth_actions.failed_log_out());
      Toast.errorBottom(translate('request_failed'));
    }
  } catch (error) {
    yield put(auth_actions.failed_log_out());
    Toast.errorBottom(translate('request_failed'));
    console.log(error);
  }
}

function* request_user_register_verification(action) {
  try {
    const e_response = yield call(api.user_auth_api, 'auth/otp/email', {
      email: action.payload.email,
      otp: action.payload.register_email_otp,
    });
    const m_response = yield call(api.user_auth_api, 'auth/otp/mobile', {
      phone_number: action.payload.mobile,
      otp: action.payload.register_mobile_otp,
    });
    console.log(m_response, e_response);
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
      let data = {};
      yield put(auth_actions.success_user_register_verification(data));
      navigate('VerifyUser', {
        email: action.payload.email,
        referrer_code: action.payload.referrer_code,
        password: action.payload.password,
        mobile: action.payload.mobile,
        is_social: action.payload.is_social,
        social_id: action.payload.social_id,
        social_type: action.payload.social_type,
      });

      Toast.showTop(translate('Otp_sent_to_your_mail_and_contact_no'));
    } else {
      let message =
        (e_response.data.data?.error
          ? get_exception_string(e_response.data.data)
          : e_response.data.msg
          ? e_response.data.msg
          : '') +
        (m_response.data.data?.error
          ? get_exception_string(m_response.data.data)
          : m_response.data.msg
          ? m_response.data.msg
          : '');
      yield put(auth_actions.failed_user_register_verification());
      Toast.errorBottom(message ? message : translate('otp_request_failed'));
    }
  } catch (error) {
    yield put(auth_actions.failed_user_register_verification());
    Toast.errorBottom(translate('otp_request_failed'));
    console.log(error);
  }
}

function* request_forgot_change_password(action) {
  try {
    const response = yield call(api.user_auth_api, 'auth/password/update', {
      email: action.payload.email,
      password: action.payload.password,
      otp: Number(action.payload.change_pass_otp),
    });
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(
        auth_actions.success_forgot_change_password(response.data.data),
      );
      Toast.successBottom(translate('password_changed_successfully'));
      navigate('Login');
    } else {
      yield put(auth_actions.failed_forgot_change_password());
      Toast.errorBottom(
        response.data.data?.error
          ? get_exception_string(response.data.data)
          : response.data.msg
          ? get_api_error_string(response.data.msg)
          : translate('password_change_failed'),
      );
    }
  } catch (error) {
    yield put(auth_actions.failed_forgot_change_password());
    Toast.errorBottom(translate('password_change_failed'));
    console.log(error);
  }
}

function* request_user_email_otp(action) {
  try {
    const response = yield call(api.user_auth_api, 'auth/otp/verify', {
      email: action.payload.email,
      otp: action.payload.payment_email_otp,
    });
    if (response.ok && response.data.success && response.data.data) {
      yield put(auth_actions.success_user_email_otp(response.data.data));
      Toast.successBottom(translate('Otp_sent_to_your_mail'));
    } else {
      yield put(auth_actions.failed_user_email_otp());
      Toast.errorBottom(translate('email_request_failed'));
    }
  } catch (error) {
    yield put(auth_actions.failed_user_email_otp());
    Toast.errorBottom(translate('email_request_failed'));
    console.log(error);
  }
}
