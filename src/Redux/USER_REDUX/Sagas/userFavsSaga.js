import { takeEvery, call, put } from "redux-saga/effects";
import * as types from "../Actions/actionTypes";
import { handle_api_error } from "../Utils";
import api from "../Services/api";
import * as favs_actions from "../Actions/userFavsActions";

export function* watch_user_fav_request() {
  yield takeEvery(types.REQUEST_USER_FAVS, request_user_favs);
  yield takeEvery(types.REQUEST_USER_ADD_FAV, request_user_add_fav);
  yield takeEvery(types.REQUEST_USER_REMOVE_FAV, request_user_remove_fav);
}

function* request_user_favs(action) {
  try {
    const response = yield call(
      api.user_dashboard_api,
      "user.fav.list",
      action.payload.fav_type
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        favs_actions.success_user_favs(response.data.data, response.data.user)
      );
    } else {
      yield put(favs_actions.failed_user_favs());
      handle_api_error(
        response.problem + response.data?.error,
        "user.fav.list"
      );
    }
  } catch (error) {
    yield put(favs_actions.failed_user_favs());
    handle_api_error(error);
  }
}

function* request_user_add_fav(action) {
  try {
    const response = yield call(
      api.user_dashboard_post_api,
      "user.fav.add",
      {},
      action.payload.fav_type + "/" + action.payload.fav_id
    );
    console.log(response);
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        favs_actions.success_user_add_fav(
          response.data.data,
          response.data.user
        )
      );
      yield put(favs_actions.request_user_favs(action.payload.fav_type));
    } else {
      yield put(favs_actions.failed_user_add_fav());
      handle_api_error(response.problem + response.data?.error, "user.fav.add");
    }
  } catch (error) {
    yield put(favs_actions.failed_user_add_fav());
    handle_api_error(error);
  }
}

function* request_user_remove_fav(action) {
  try {
    const response = yield call(
      api.user_dashboard_post_api,
      "user.fav.remove",
      {},
      action.payload.fav_type + "/" + action.payload.fav_id
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        favs_actions.success_user_remove_fav(
          response.data.data,
          response.data.user
        )
      );
      yield put(favs_actions.request_user_favs(action.payload.fav_type));
    } else {
      yield put(favs_actions.failed_user_remove_fav());
      handle_api_error(
        response.problem + response.data?.error,
        "user.fav.remove"
      );
    }
  } catch (error) {
    yield put(favs_actions.failed_user_remove_fav());
    handle_api_error(error);
  }
}
