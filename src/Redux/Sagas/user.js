import {takeEvery, call, put} from 'redux-saga/effects';
import * as types from '../Actions/actionTypes';
import api from '../Services/api';
import {
  success_user_summery,
  failed_user_summery,
} from '../Actions/userActions';

export function* watch_user_data_request() {}
