import { takeEvery, call, put } from "redux-saga/effects";
import * as types from "../Actions/actionTypes";
import { Toast } from "@components/core";
import { translate } from "@translations";
import { handle_api_error, is_app } from "../Utils";
import api from "../Services/api";
import * as dashboard_actions from "../Actions/userDashboardActions";

export function* watch_user_dashboard_request() {
  yield takeEvery(types.REQUEST_USER_DASHBOARD, request_user_dashboard);
  yield takeEvery(types.REQUEST_USER_MODULE_INFO, request_user_module_info);
  yield takeEvery(types.REQUEST_USER_MODULES, request_user_modules);
  yield takeEvery(types.REQUEST_USER_GRAPH_CLICKS, request_user_graph_clicks);
  yield takeEvery(
    types.REQUEST_USER_GRAPH_EARNINGS,
    request_user_graph_earnings
  );
}

function* request_user_dashboard(action) {
  try {
    const response = yield call(api.user_dashboard_api, "user.dashboard");
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        dashboard_actions.success_user_dashboard(
          response.data.data,
          response.data.user
        )
      );
      if (is_app() && action.payload.show_welcome_msg) {
        Toast.showBottom(
          translate("welcome") + " " + response.data.user?.first_name
        );
      }
    } else {
      yield put(dashboard_actions.failed_user_dashboard());
      handle_api_error(
        response.problem + response.data?.error,
        "user.dashboard"
      );
    }
  } catch (error) {
    yield put(dashboard_actions.failed_user_dashboard());
    handle_api_error(error);
  }
}

function* request_user_module_info() {
  try {
    const response = yield call(api.user_dashboard_api, "user.module.info");
    if (response.ok && response.data.success) {
      yield put(dashboard_actions.success_user_module_info(response.data.data));
    } else {
      yield put(dashboard_actions.failed_user_module_info());
      handle_api_error(
        response.problem + response.data?.error,
        "user.module.info"
      );
    }
  } catch (error) {
    yield put(dashboard_actions.failed_user_module_info());
    handle_api_error(error);
  }
}

function* request_user_modules() {
  try {
    const response = yield call(api.user_dashboard_api, "user.modules");
    if (response.ok && response.data.success) {
      yield put(dashboard_actions.success_user_modules(response.data.data));
      // localStorage.all_modules = JSON.stringify(response.data.data);
    } else {
      yield put(dashboard_actions.failed_user_modules());
      handle_api_error(response.problem + response.data?.error, "user.modules");
    }
  } catch (error) {
    yield put(dashboard_actions.failed_user_modules());
    handle_api_error(error);
  }
}

function* request_user_graph_clicks() {
  try {
    const response = yield call(api.user_dashboard_api, "user.graph.clicks");
    if (response.ok && response.data.success && response.data.data) {
      yield put(
        dashboard_actions.success_user_graph_clicks(response.data.data)
      );
      // localStorage.all_modules = JSON.stringify(response.data.data);
    } else {
      yield put(dashboard_actions.failed_user_graph_clicks());
      handle_api_error(
        response.problem + response.data?.error,
        "user.graph.clicks"
      );
    }
  } catch (error) {
    yield put(dashboard_actions.failed_user_graph_clicks());
    handle_api_error(error);
  }
}

function* request_user_graph_earnings() {
  try {
    const response = yield call(api.user_dashboard_api, "user.graph.earning");
    if (response.ok && response.data.success && response.data.data) {
      yield put(
        dashboard_actions.success_user_graph_earnings(response.data.data)
      );
      // localStorage.all_modules = JSON.stringify(response.data.data);
    } else {
      yield put(dashboard_actions.failed_user_graph_earnings());
      handle_api_error(
        response.problem + response.data?.error,
        "user.graph.clicks"
      );
    }
  } catch (error) {
    yield put(dashboard_actions.failed_user_graph_earnings());
    handle_api_error(error);
  }
}
