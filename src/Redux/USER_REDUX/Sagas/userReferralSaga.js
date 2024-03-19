import { takeEvery, call, put } from 'redux-saga/effects';
import * as types from '../Actions/actionTypes';
import {
  handle_api_error,
  show_success_message,
  show_fail_message,
  get_translation,
  is_app,
} from '../Utils';
import api from '../Services/api';
import { Toast } from '@/Components/Core/Toast';
import { navigate } from '../../../Navigation/appNavigator';
import * as referral_actions from '../Actions/userReferralActions';

export function* watch_user_referral_request() {
  yield takeEvery(types.REQUEST_USER_REFERRAL_LIST, request_user_referral_list);
  yield takeEvery(
    types.REQUEST_USER_REFERRAL_INVITES,
    request_user_referral_invites,
  );
  yield takeEvery(
    types.REQUEST_USER_REFERRAL_INVITE,
    request_user_referral_invite,
  );
}

function* request_user_referral_list() {
  try {
    const response = yield call(api.user_dashboard_api, 'user.referral.list');
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        referral_actions.success_user_referral_list(
          response.data.data,
          response.data.user,
        ),
      );
    } else {
      yield put(referral_actions.failed_user_referral_list());
      handle_api_error(
        response.problem + response.data?.error,
        'user.referral.list',
      );
    }
  } catch (error) {
    yield put(referral_actions.failed_user_referral_list());
    handle_api_error(error);
  }
}

function* request_user_referral_invites() {
  try {
    const response = yield call(
      api.user_dashboard_api,
      'user.referral.invites',
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        referral_actions.success_user_referral_invites(
          response.data.data,
          response.data.user,
        ),
      );
    } else {
      yield put(referral_actions.failed_user_referral_invites());
      handle_api_error(
        response.problem + response.data?.error,
        'user.referral.invites',
      );
    }
  } catch (error) {
    yield put(referral_actions.failed_user_referral_invites());
    handle_api_error(error);
  }
}

function* request_user_referral_invite(action) {
  try {
    const response = yield call(
      api.user_dashboard_post_api,
      'user.referral.invite.send',
      {
        emails: action.payload.user_referral_invite_email,
      },
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        referral_actions.success_user_referral_invite(
          response.data.data,
          response.data.user &&
            response.data.data &&
            !response.data.error &&
            !response.data.data.error,
        ),
      );
      yield put(referral_actions.request_user_referral_invites());
      if (is_app()) {
        navigate('ReferralInvites');
        Toast.successBottom(
          get_translation('user_dashboard.refer_earn.invite_sent'),
        );
      } else {
        show_success_message({
          text: get_translation('user_dashboard.refer_earn.invite_sent'),
        });
      }
    } else {
      yield put(referral_actions.failed_user_referral_invite());
      handle_api_error(
        response.problem + response.data?.error,
        'user.referral.invite.send',
      );
      if (is_app()) {
        Toast.errorBottom(
          get_translation('user_dashboard.refer_earn.invite_request_error'),
        );
      } else {
        show_fail_message({
          text: get_translation(
            'user_dashboard.refer_earn.invite_request_error',
          ),
        });
      }
    }
  } catch (error) {
    yield put(referral_actions.failed_user_referral_invite());
    handle_api_error(error);
    if (is_app()) {
      Toast.errorBottom(
        get_translation('user_dashboard.refer_earn.invite_request_error'),
      );
    } else {
      show_fail_message({
        text: get_translation('user_dashboard.refer_earn.invite_request_error'),
      });
    }
  }
}
