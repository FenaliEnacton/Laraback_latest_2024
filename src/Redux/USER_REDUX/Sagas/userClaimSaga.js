import { takeEvery, call, put } from 'redux-saga/effects';
import * as types from '../Actions/actionTypes';
import {
  handle_api_error,
  show_success_message_with_reload,
  show_fail_message,
  get_exception_string,
  get_api_error_string,
  get_translation,
  is_app,
} from '../Utils';
import api from '../Services/api';
import { Toast } from '@/Components/Core/Toast';
import { navigate } from '../../../Navigation/appNavigator';
import * as claim_actions from '../Actions/userClaimActions';

export function* watch_user_claim_request() {
  yield takeEvery(types.REQUEST_USER_CLAIM_LIST, request_user_claim_list);
  yield takeEvery(types.REQUEST_CLAIM_INFO, request_claim_info);
  yield takeEvery(types.REQUEST_USER_CLAIM_CLOSE, request_user_claim_close);
  yield takeEvery(
    types.REQUEST_USER_CLAIM_POST_COMMENT,
    request_user_claim_post_comment,
  );
  yield takeEvery(types.REQUEST_USER_CLAIM_STORES, request_user_claim_stores);
  yield takeEvery(
    types.REQUEST_USER_CLAIM_STORE_CLICKS,
    request_user_claim_store_clicks,
  );
  yield takeEvery(types.REQUEST_CLAIM_MAKE, request_user_claim_make);
}

function* request_user_claim_list(action) {
  try {
    const response = yield call(
      api.user_dashboard_api,
      'user.claim.list',
      '?page=' + action.payload.page_no + '&perPage=' + action.payload.per_page,
    );
    console.log('response', response.data.data.current_page);
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        claim_actions.success_user_claim_list(
          response.data.data,
          response.data.user,
        ),
      );
    } else {
      yield put(claim_actions.failed_user_claim_list());
      // handle_api_error(
      //   response.problem + response.data?.error,
      //   "user.claim.list"
      // );
    }
  } catch (error) {
    yield put(claim_actions.failed_user_claim_list());
    handle_api_error(error);
  }
}

function* request_claim_info(action) {
  try {
    const response = yield call(
      api.user_dashboard_api,
      'user.claim.info',
      action.payload.user_claim_id,
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(
        claim_actions.success_claim_info(
          response.data.data,
          response.data.user,
        ),
      );
      navigate('ViewMissingClaim');
    } else {
      yield put(claim_actions.failed_claim_info());
      handle_api_error(response.problem + response.data?.error, '');
    }
  } catch (error) {
    yield put(claim_actions.failed_claim_info());
    handle_api_error(error);
  }
}

function* request_user_claim_close(action) {
  try {
    const response = yield call(
      api.user_dashboard_api,
      'user.claim.close',
      action.payload.user_claim_close_id,
    );
    if (response.ok && response.data.success && response.data.data) {
      yield put(
        claim_actions.success_user_claim_close(
          response.data.data,
          response.data.user,
        ),
      );
      yield put(claim_actions.request_user_claim_list());
    } else {
      yield put(claim_actions.failed_user_claim_close());
      handle_api_error(response.problem + response.data?.error, '');
    }
  } catch (error) {
    yield put(claim_actions.failed_user_claim_close());
    handle_api_error(error);
  }
}

function* request_user_claim_post_comment(action) {
  try {
    const response = yield call(
      api.user_dashboard_post_api,
      'user.claim.comment',
      {
        id: action.payload.user_claim_post_comment_id,
        comment: action.payload.user_claim_comment,
      },
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        claim_actions.success_user_claim_post_comment(
          response.data.data,
          response.data.user,
        ),
      );
      yield put(claim_actions.request_user_claim_list());
    } else {
      yield put(claim_actions.failed_user_claim_post_comment());
      handle_api_error(response.problem + response.data?.error, '');
    }
  } catch (error) {
    yield put(claim_actions.failed_user_claim_post_comment());
    handle_api_error(error);
  }
}

function* request_user_claim_stores(action) {
  try {
    const response = yield call(api.user_dashboard_api, 'user.claim.stores');
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        claim_actions.success_user_claim_stores(
          response.data.data,
          response.data.user,
        ),
      );
      let default_store_id = response.data.data[0]?.store_id;
      if (default_store_id) {
        yield put(
          claim_actions.request_user_claim_store_clicks(default_store_id),
        );
      }
    } else {
      yield put(claim_actions.failed_user_claim_stores());
      handle_api_error(response.problem + response.data?.error, '');
    }
  } catch (error) {
    yield put(claim_actions.failed_user_claim_stores());
    handle_api_error(error);
  }
}

function* request_user_claim_store_clicks(action) {
  try {
    const response = yield call(
      api.user_dashboard_api,
      'user.claim.store.clicks',
      action.payload.user_claims_store_clicks_store_id,
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        claim_actions.success_user_claim_store_clicks(
          response.data.data,
          response.data.user,
        ),
      );
    } else {
      yield put(claim_actions.failed_user_claim_store_clicks());
      handle_api_error(response.problem + response.data?.error, '');
    }
  } catch (error) {
    yield put(claim_actions.failed_user_claim_store_clicks());
    handle_api_error(error);
  }
}

function* request_user_claim_make(action) {
  try {
    let form_body = new FormData();
    let body = {
      store_id: action.payload.claim_store_id,
      click_id: action.payload.claim_click_id,
      order_id: action.payload.claim_order_id,
      platform: action.payload.claim_platform,
      currency: action.payload.claim_currency,
      order_amount: action.payload.claim_order_amount,
      transaction_date: action.payload.claim_transaction_date,
    };

    for (let key in body) {
      form_body.append(key, body[key]);
    }
    // form_body.append("receipt", action.payload.receipt);
    form_body.append('receipt', {
      name: action.payload.claim_receipt.name,
      type: action.payload.claim_receipt.type,
      // type: 'image/jpeg',
      uri: action.payload.claim_receipt.uri,
    });

    const response = yield call(
      api.user_dashboard_post_api,
      'user.claim.make',
      form_body,
      '',
      {
        'Content-Type': 'multipart/form-data',
      },
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        claim_actions.success_user_claim_make(
          response.data.data,
          response.data.user,
        ),
      );
      if (is_app()) {
        Toast.successBottom(
          get_translation('user_dashboard.claim.create_claim_success'),
        );
        navigate('MissingClaims');
      } else {
        yield show_success_message_with_reload({
          text: get_translation('user_dashboard.claim.create_claim_success'),
        });
      }

      yield put(claim_actions.request_user_claim_list());
    } else {
      yield put(
        claim_actions.failed_user_claim_make(
          response.data.data?.error
            ? response.data.data.message
            : response.problem + response.data?.error,
          '',
        ),
      );
      if (is_app()) {
        Toast.errorBottom(
          response.data.data?.error
            ? get_exception_string(response.data.data)
            : response.data.msg
            ? get_api_error_string(response.data.msg)
            : get_translation('user_dashboard.claim.claim_request_failed'),
        );
      } else {
        show_fail_message(
          response.data.data?.error
            ? { html: get_exception_string(response.data.data) }
            : {
                text: response.data.msg
                  ? get_api_error_string(response.data.msg)
                  : get_translation(
                      'user_dashboard.claim.claim_request_failed',
                    ),
              },
        );
      }
    }
  } catch (error) {
    yield put(claim_actions.failed_user_claim_make(''));
    if (is_app()) {
      Toast.errorBottom(
        get_translation('user_dashboard.claim.claim_request_failed'),
      );
    } else {
      show_fail_message({
        text: get_translation('user_dashboard.claim.claim_request_failed'),
      });
    }
  }
}
