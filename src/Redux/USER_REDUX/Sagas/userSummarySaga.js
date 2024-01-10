import { takeEvery, call, put } from "redux-saga/effects";
import * as types from "../Actions/actionTypes";
import { handle_api_error } from "../Utils";
import api from "../Services/api";
import {
  success_user_cashback_summary,
  failed_user_cashback_summary,
  failed_user_bonus_summary,
  success_user_bonus_summary,
  success_user_referral_summary,
  failed_user_referral_summary,
  success_user_clicks_summary,
  failed_user_clicks_summary,
  failed_user_payment_summary,
  success_user_payment_summary,
} from "../Actions/userSummaryActions";

export function* watch_user_summary_request() {
  yield takeEvery(
    types.REQUEST_USER_CASHBACK_SUMMARY,
    request_user_cashback_summary
  );
  yield takeEvery(types.REQUEST_USER_BONUS_SUMMARY, request_user_bonus_summary);
  yield takeEvery(
    types.REQUEST_USER_REFERRAL_SUMMARY,
    request_user_referral_summary
  );
  yield takeEvery(
    types.REQUEST_USER_CLICKS_SUMMARY,
    request_user_clicks_summary
  );
  yield takeEvery(
    types.REQUEST_USER_PAYMENT_SUMMARY,
    request_user_payment_summary
  );
}

function* request_user_cashback_summary() {
  try {
    const response = yield call(
      api.user_dashboard_api,
      "user.summary.cashback"
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        success_user_cashback_summary(response.data.data, response.data.user)
      );
    } else {
      yield put(failed_user_cashback_summary());
      handle_api_error(
        response.problem + response.data?.error,
        "user.summary.cashback"
      );
    }
  } catch (error) {
    yield put(failed_user_cashback_summary());
    handle_api_error(error);
  }
}

function* request_user_bonus_summary() {
  try {
    const response = yield call(api.user_dashboard_api, "user.summary.bonus");
    if (
      response.ok &&
      response.data.success &&
      !response.data.data.error &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        success_user_bonus_summary(response.data.data, response.data.user)
      );
    } else {
      yield put(failed_user_bonus_summary());
      handle_api_error(
        response.problem + response.data?.error,
        "user.summary.bonus"
      );
    }
  } catch (error) {
    yield put(failed_user_bonus_summary());
    handle_api_error(error);
  }
}

function* request_user_referral_summary() {
  try {
    const response = yield call(
      api.user_dashboard_api,
      "user.summary.referral"
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        success_user_referral_summary(response.data.data, response.data.user)
      );
    } else {
      yield put(failed_user_referral_summary());
    }
  } catch (error) {
    yield put(failed_user_referral_summary());
    handle_api_error(error);
  }
}

function* request_user_clicks_summary() {
  try {
    const response = yield call(api.user_dashboard_api, "user.summary.click");
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        success_user_clicks_summary(response.data.data, response.data.user)
      );
    } else {
      yield put(failed_user_clicks_summary());
      handle_api_error(
        response.problem + response.data?.error,
        "user.summary.click"
      );
    }
  } catch (error) {
    yield put(failed_user_clicks_summary());
    handle_api_error(error);
  }
}

function* request_user_payment_summary() {
  try {
    const response = yield call(api.user_dashboard_api, "user.summary.payment");

    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        success_user_payment_summary(response.data.data, response.data.user)
      );
    } else {
      yield put(failed_user_payment_summary());
      handle_api_error(
        response.problem + response.data?.error,
        "user.summary.payment"
      );
    }
  } catch (error) {
    yield put(failed_user_payment_summary());
    handle_api_error(error);
  }
}
