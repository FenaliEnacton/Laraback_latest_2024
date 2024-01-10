import { takeEvery, call, put } from "redux-saga/effects";
import * as types from "../Actions/actionTypes";
import { handle_api_error } from "../Utils";
import api from "../Services/api";
import * as activity_actions from "../Actions/userActivityActions";

export function* watch_user_activities_request() {
  yield takeEvery(
    types.REQUEST_USER_ACTIVITY_CASHBACK,
    request_user_activity_cashback
  );
  yield takeEvery(
    types.REQUEST_USER_ACTIVITY_BONUS,
    request_user_activity_bonus
  );
  yield takeEvery(
    types.REQUEST_USER_ACTIVITY_REFERRAL,
    request_user_activity_referral
  );
  yield takeEvery(
    types.REQUEST_USER_ACTIVITY_CLICKS,
    request_user_activity_clicks
  );
  yield takeEvery(
    types.REQUEST_USER_ACTIVITY_CLICKS_RECENT,
    request_user_activity_clicks_recent
  );
}

function* request_user_activity_cashback(action) {
  try {
    const response = yield call(
      api.user_dashboard_api,
      "user.activity.cashback",
      action.payload.user_cashback_activity_month
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        activity_actions.success_user_activity_cashback(
          response.data.data,
          response.data.user
        )
      );
    } else {
      yield put(activity_actions.failed_user_activity_cashback());
      handle_api_error(
        response.problem + response.data?.error,
        "user.activity.cashback"
      );
    }
  } catch (error) {
    yield put(activity_actions.failed_user_activity_cashback());
    handle_api_error(error);
  }
}

function* request_user_activity_bonus(action) {
  try {
    const response = yield call(
      api.user_dashboard_api,
      "user.activity.bonus",
      action.payload.user_activity_bonus_month
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        activity_actions.success_user_activity_bonus(
          response.data.data,
          response.data.user
        )
      );
    } else {
      yield put(activity_actions.failed_user_activity_bonus());
      handle_api_error(
        response.problem + response.data?.error,
        "user.activity.bonus"
      );
    }
  } catch (error) {
    yield put(activity_actions.failed_user_activity_bonus());
    handle_api_error(error);
  }
}

function* request_user_activity_referral(action) {
  try {
    const response = yield call(
      api.user_dashboard_api,
      "user.activity.referral",
      action.payload.user_activity_referral_month
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        activity_actions.success_user_activity_referral(
          response.data.data,
          response.data.user
        )
      );
    } else {
      yield put(activity_actions.failed_user_activity_referral());
      handle_api_error(
        response.problem + response.data?.error,
        "user.activity.referral"
      );
    }
  } catch (error) {
    yield put(activity_actions.failed_user_activity_referral());
    handle_api_error(error);
  }
}

function* request_user_activity_clicks(action) {
  try {
    const response = yield call(
      api.user_dashboard_api,
      "user.activity.click",
      action.payload.user_activity_clicks_month
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        activity_actions.success_user_activity_clicks(
          response.data.data,
          response.data.user
        )
      );
    } else {
      yield put(activity_actions.failed_user_activity_clicks());
      handle_api_error(
        response.problem + response.data?.error,
        "user.activity.click"
      );
    }
  } catch (error) {
    yield put(activity_actions.failed_user_activity_clicks());
    handle_api_error(error);
  }
}

function* request_user_activity_clicks_recent() {
  try {
    const response = yield call(
      api.user_dashboard_api,
      "user.activity.click.recent"
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        activity_actions.success_user_activity_clicks_recent(
          response.data.data,
          response.data.user
        )
      );
    } else {
      yield put(activity_actions.failed_user_activity_clicks_recent());
      handle_api_error(
        response.problem + response.data?.error,
        "user.activity.click.recent"
      );
    }
  } catch (error) {
    yield put(activity_actions.failed_user_activity_clicks_recent());
    handle_api_error(error);
  }
}
