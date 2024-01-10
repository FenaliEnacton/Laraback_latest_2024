import {takeEvery, call, put} from 'redux-saga/effects';
import * as types from '../Actions/actionTypes';
// import {API} from '../Services/Api';
import api from '../Services/api';
import {successAllStores, failedAllStores} from '../Actions/metaDataActions';
// import {successContactUs} from '@actions';

export function* watchUserDataRequest() {
  yield takeEvery(types.REQUEST_USER_LOGIN, requestUserLogin);
}

function* requestUserLogin() {
  try {
    const response = yield call(api.publicAPI, 'stores/22');
    if (response.ok) {
      const res = response.data.reduce((arr, current) => {
        if (current.id) {
          arr[current.id] = current;
        }
        return arr;
      }, {});
      // console.log(res);
      response.data.map((e) => {
        return {
          id: e.id,
          transaction_time: e.transaction_time,
          status: e.status,
          title: e.store?.post_title,
          currency: e.currency,
        };
      });
      yield put(successAllStores(res));
    } else {
      yield put(failedAllStores());
    }
  } catch (error) {
    yield put(failedAllStores());
    console.log(error);
  }
}
