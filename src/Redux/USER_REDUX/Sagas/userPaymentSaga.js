import {takeEvery, call, put} from 'redux-saga/effects';
import * as types from '../Actions/actionTypes';
import api from '../Services/api';
import * as payment_actions from '../Actions/userPaymentActions';
import {
  handle_api_error,
  show_success_message,
  get_exception_string,
  show_fail_message,
  show_success_message_with_reload,
  get_api_error_string,
  get_translation,
  is_app,
} from '../Utils';
import {navigate} from '../../../Navigation/appNavigator';
import {Toast} from '@components/core';
// import {In_app_review} from '../Utils';

export function* watch_user_payment_request() {
  yield takeEvery(types.REQUEST_USER_PAYMENT_LIST, request_user_payment_list);
  yield takeEvery(
    types.REQUEST_USER_PAYMENT_METHODS,
    request_user_payment_methods,
  );
  yield takeEvery(
    types.REQUEST_USER_PAYMENT_ADD_METHOD,
    request_user_payment_add_method,
  );
  yield takeEvery(
    types.REQUEST_USER_PAYMENT_REQUEST,
    request_user_payment_request,
  );
  yield takeEvery(
    types.REQUEST_USER_PAYMENT_EMAIL_VERIFY,
    request_user_payment_email_verify,
  );
}

function* request_user_payment_list(action) {
  try {
    const response = yield call(
      api.user_dashboard_api,
      'user.payment.list',
      action.payload.user_payment_month,
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        payment_actions.success_user_payment_list(
          response.data.data,
          response.data.user,
        ),
      );
    } else {
      yield put(payment_actions.failed_user_payment_list());
      handle_api_error(
        response.problem + response.data?.error,
        'user.payment.list',
      );
    }
  } catch (error) {
    yield put(payment_actions.failed_user_payment_list());
    handle_api_error(error);
  }
}

function* request_user_payment_methods() {
  try {
    const response = yield call(api.user_dashboard_api, 'user.payment.methods');
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        payment_actions.success_user_payment_methods(
          response.data.data,
          response.data.user,
        ),
      );
    } else {
      yield put(
        payment_actions.failed_user_payment_methods(
          response.data.data?.error
            ? response.data.data.message
            : response.data?.error
            ? response.data?.error
            : response.data?.msg,
        ),
      );
      handle_api_error(
        response.problem + response.data?.error,
        'user.payment.methods',
      );
    }
  } catch (error) {
    yield put(payment_actions.failed_user_payment_methods(''));
    handle_api_error(error);
  }
}

function* request_user_payment_add_method(action) {
  try {
    let data = {
      inputs: action.payload.add_pay_mode_inputs,
      mode: action.payload.add_pay_mode,
      method_name: action.payload.add_pay_mode_method_name,
      account: action.payload.add_pay_mode_account,
    };
    if (is_app()) {
      //TODO: add lara++ condition
      data.reqvia = is_app() ? 'mobile_app' : 'web';
    }
    const response = yield call(
      api.user_dashboard_post_api,
      'user.payment.method.add',
      data,
    );
    console.log('response', response);
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      if (is_app()) {
        Toast.successBottom(
          get_translation('user_dashboard.payment_mode.payment_mode_success'),
        );
      } else {
        yield show_success_message_with_reload({
          text: get_translation(
            'user_dashboard.payment_mode.payment_mode_success',
          ),
        });
      }
      yield put(
        payment_actions.success_user_payment_add_method(response.data.data),
      );
      yield put(payment_actions.request_user_payment_methods());
    } else {
      yield put(
        payment_actions.failed_user_payment_add_method(
          response.data.data?.error
            ? response.data.data.message
            : response.data?.error
            ? response.data?.error
            : response.data?.msg,
        ),
      );
      if (is_app()) {
        Toast.errorBottom(
          response.data.data?.error
            ? get_exception_string(response.data.data)
            : response.data.msg
            ? get_api_error_string(response.data.msg)
            : get_translation('user_dashboard.payment_mode.payment_mode_error'),
        );
      } else {
        show_fail_message(
          response.data.data?.error
            ? {html: get_exception_string(response.data.data)}
            : {
                text: response.data.msg
                  ? get_api_error_string(response.data.msg)
                  : get_translation(
                      'user_dashboard.payment_mode.payment_mode_error',
                    ),
              },
        );
      }
    }
  } catch (error) {
    yield put(payment_actions.failed_user_payment_add_method(''));
    handle_api_error(error);
    if (is_app()) {
      Toast.errorBottom(
        get_translation('user_dashboard.payment_mode.payment_mode_error'),
      );
    } else {
      show_fail_message({
        text: get_translation('user_dashboard.payment_mode.payment_mode_error'),
      });
    }
  }
}

function* request_user_payment_request(action) {
  try {
    let data = {
      id: action.payload.user_payout_mode_id,
      pay_mode: action.payload.user_pay_mode,
      payment_amount: action.payload.user_payment_amount,
    };
    // if (is_app()) {
    //   //TODO: add lara++ condition
    //   data.reqvia(is_app() ? "mobile_app" : "web");
    // }
    const response = yield call(
      api.user_dashboard_post_api,
      'user.payment.request',
      data,
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        payment_actions.success_user_payment_request(
          response.data.data,
          response.data.user,
        ),
      );
      yield put(payment_actions.request_user_payment_methods());
      if (is_app()) {
        Toast.successBottom(
          get_translation('user_dashboard.payment.payout_request_success'),
        );
        navigate('CashbackPaymentHistory');
        // In_app_review();
      } else {
        yield show_success_message_with_reload({
          text: get_translation(
            'user_dashboard.payment.payout_request_success',
          ),
        });
      }
    } else {
      yield put(
        payment_actions.failed_user_payment_request(
          response.data.data?.error
            ? response.data.data.message
            : response.problem + response.data?.error,
          '',
        ),
      );
      handle_api_error(
        response.problem + response.data?.error,
        'user.payment.request',
      );
      if (is_app()) {
        Toast.errorBottom(
          response.data.data?.error
            ? get_exception_string(response.data.data)
            : response.data.msg
            ? get_api_error_string(response.data.msg)
            : get_translation('user_dashboard.payment.payout_request_error'),
        );
      } else {
        show_fail_message(
          response.data.data?.error
            ? {html: get_exception_string(response.data.data)}
            : {
                text: response.data.msg
                  ? get_api_error_string(response.data.msg)
                  : get_translation(
                      'user_dashboard.payment.payout_request_error',
                    ),
              },
        );
      }
    }
  } catch (error) {
    yield put(payment_actions.failed_user_payment_request(''));
    handle_api_error(error);
    if (is_app()) {
      Toast.errorBottom(
        get_translation('user_dashboard.payment.payout_request_error'),
      );
    } else {
      show_fail_message({
        text: get_translation('user_dashboard.payment.payout_request_error'),
      });
    }
  }
}

function* request_user_payment_email_verify(action) {
  try {
    const response = yield call(
      api.user_dashboard_post_api,
      'user.payment.email_request',
      {},
      action.payload.payment_id,
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        payment_actions.success_user_payment_email_verify(
          response.data.data,
          response.data.user,
        ),
      );
      if (is_app()) {
        Toast.successBottom(
          get_translation('user_dashboard.payment.email_sent'),
        );
      } else {
        yield show_success_message({
          text: get_translation('user_dashboard.payment.email_sent'),
        });
      }
    } else {
      yield put(
        payment_actions.failed_user_payment_email_verify(
          response.data.data?.error
            ? response.data.data.message
            : response.problem + response.data?.error,
          '',
        ),
      );
      handle_api_error(
        response.problem + response.data?.error,
        'user.payment.request',
      );
      if (is_app()) {
        Toast.errorBottom(
          response.data.data?.error
            ? get_exception_string(response.data.data)
            : response.data.msg
            ? get_api_error_string(response.data.msg)
            : get_translation('user_dashboard.payment.email_sent_failed'),
        );
      } else {
        show_fail_message(
          response.data.data?.error
            ? {html: get_exception_string(response.data.data)}
            : {
                text: response.data.msg
                  ? get_api_error_string(response.data.msg)
                  : get_translation('user_dashboard.payment.email_sent_failed'),
              },
        );
      }
    }
  } catch (error) {
    yield put(payment_actions.failed_user_payment_email_verify(''));
    handle_api_error(error);
    if (is_app()) {
      Toast.errorBottom(
        get_translation('user_dashboard.payment.email_request_failed'),
      );
    } else {
      show_fail_message({
        text: get_translation('user_dashboard.payment.email_request_failed'),
      });
    }
  }
}
