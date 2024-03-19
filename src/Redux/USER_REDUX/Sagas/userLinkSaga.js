import { takeEvery, call, put } from 'redux-saga/effects';
import * as types from '../Actions/actionTypes';
import {
  get_translation,
  handle_api_error,
  show_success_message,
  show_fail_message,
  get_exception_string,
  get_api_error_string,
  is_app,
} from '../Utils';
import { Toast } from '@/Components/Core/Toast';
import api from '../Services/api';
import * as link_actions from '../Actions/userLinkActions';

export function* watch_user_link_request() {
  yield takeEvery(types.REQUEST_USER_LINK_LIST, request_user_link_list);
  yield takeEvery(types.REQUEST_USER_LINK_CREATE, request_user_link_create);
}

function* request_user_link_list() {
  try {
    const response = yield call(api.user_dashboard_api, 'user.links.list');
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        link_actions.success_user_link_list(
          response.data.data,
          response.data.user,
        ),
      );
    } else {
      yield put(link_actions.failed_user_link_list());
      handle_api_error(
        response.problem + response.data?.error,
        'user.links.list',
      );
    }
  } catch (error) {
    yield put(link_actions.failed_user_link_list());
    handle_api_error(error);
  }
}

function* request_user_link_create(action) {
  try {
    const response = yield call(
      api.user_dashboard_post_api,
      'user.link.create',
      {
        link: action.payload.share_offer_link,
        title: action.payload.share_offer_title,
      },
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        link_actions.success_user_link_create(
          response.data.data,
          response.data.user,
        ),
      );
      yield put(link_actions.request_user_link_list());
      if (is_app()) {
        Toast.successBottom(
          get_translation('user_dashboard.share_earn.link_success_msg'),
        );
      } else {
        show_success_message({
          text: get_translation('user_dashboard.share_earn.link_success_msg'),
        });
      }
    } else {
      yield put(link_actions.failed_user_link_create());
      handle_api_error(
        response.problem + response.data?.error,
        'user.link.create',
      );
      if (is_app()) {
        Toast.errorBottom(
          response.data.data?.error
            ? get_exception_string(response.data.data)
            : response.data.msg
            ? get_api_error_string(response.data.msg)
            : get_translation('user_dashboard.share_earn.link_error_msg'),
        );
      } else {
        show_fail_message(
          response.data.data?.error
            ? { html: get_exception_string(response.data.data) }
            : {
                text: response.data.msg
                  ? get_api_error_string(response.data.msg)
                  : get_translation('user_dashboard.share_earn.link_error_msg'),
              },
        );
      }
    }
  } catch (error) {
    yield put(link_actions.failed_user_link_create());
    handle_api_error(error);
    if (is_app()) {
      Toast.errorBottom(
        get_translation('user_dashboard.share_earn.network_error'),
      );
    } else {
      show_fail_message({
        text: get_translation('user_dashboard.share_earn.network_error'),
      });
    }
  }
}
