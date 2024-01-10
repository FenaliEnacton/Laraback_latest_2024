import {takeEvery, call, put} from 'redux-saga/effects';
import * as types from '@app_redux/Actions/actionTypes';
// import {API} from '../Services/Api';
import api from '../Services/api';
import * as meta_actions from '@app_redux/Actions/metaDataActions';
import Config from 'react-native-config';
// import {successContactUs} from '@actions';

export function* watch_meta_data_request() {
  yield takeEvery(types.REQUEST_ALL_STORE_DATA, request_all_stores);
  yield takeEvery(types.REQUEST_ALL_CATEGORIES, request_all_categories);
  yield takeEvery(
    types.REQUEST_STORES_ALPHA_CHAR_LIST,
    request_stores_alpha_char_list,
  );
  yield takeEvery(types.REQUEST_STORES_BY_ALPHA, request_stores_by_alpha);
}

function* request_all_stores() {
  try {
    const response = yield call(
      api.publicAPI,
      Config.API_URL + Config.PUBLIC_PREFIX + '/app/stores',
    );
    if (response.ok) {
      const res = response.data;
      yield put(meta_actions.successAllStores(res.data));
    } else {
      yield put(meta_actions.failedAllStores());
    }
  } catch (error) {
    yield put(meta_actions.failedAllStores());
    console.log(error);
  }
}

function* request_all_categories(action) {
  try {
    const response = yield call(
      api.publicAPI,
      Config.API_URL +
        Config.PUBLIC_PREFIX +
        '/categories/' +
        action.payload.cat_type,
    );
    if (response.ok && response.data?.data) {
      const res = {};
      res[action.payload.cat_type] = response.data?.data;
      yield put(meta_actions.success_all_categories(res));
    } else {
      yield put(meta_actions.failed_all_categories());
    }
  } catch (error) {
    yield put(meta_actions.failed_all_categories());
    console.log(error);
  }
}

function* request_stores_alpha_char_list() {
  try {
    const response = yield call(
      api.publicAPI,
      Config.API_URL + Config.PUBLIC_PREFIX + '/app/storeAlphaList',
    );
    if (response.ok && response.data.data) {
      const res = response.data;
      yield put(
        meta_actions.request_stores_by_alpha(
          response?.data ? response.data.data[0] : '',
        ),
      );
      yield put(meta_actions.success_stores_alpha_char_list(res.data));
    } else {
      yield put(meta_actions.failed_stores_alpha_char_list());
    }
  } catch (error) {
    yield put(meta_actions.failed_stores_alpha_char_list());
    console.log(error);
  }
}

function* request_stores_by_alpha(action) {
  let api_url =
    Config.API_URL +
    Config.PUBLIC_PREFIX +
    '/app/storesbyAlpha/' +
    encodeURIComponent(action.payload.stores_alpha_char);
  try {
    const response = yield call(api.publicAPI, api_url);
    if (response.ok) {
      const res = response.data;
      yield put(meta_actions.success_stores_by_alpha(res.data));
    } else {
      yield put(meta_actions.failed_stores_by_alpha());
    }
  } catch (error) {
    yield put(meta_actions.failed_stores_by_alpha());
    console.log(error);
  }
}
