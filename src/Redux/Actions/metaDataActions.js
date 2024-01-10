import {createAction} from 'redux-actions';
import * as types from './actionTypes';

export const request_all_stores = createAction(
  types.REQUEST_ALL_STORE_DATA,
  () => ({
    loading: true,
  }),
);

export const successAllStores = createAction(
  types.SUCCESS_ALL_STORE_DATA,
  (data) => ({
    loading: false,
    stores: data,
  }),
);

export const failedAllStores = createAction(
  types.FAILED_ALL_STORE_DATA,
  () => ({
    loading: false,
    stores: [],
  }),
);

export const request_all_categories = createAction(
  types.REQUEST_ALL_CATEGORIES,
  (cat_type) => ({
    loading: true,
    cat_type,
  }),
);

export const success_all_categories = createAction(
  types.SUCCESS_ALL_CATEGORIES,
  (data) => ({
    loading: false,
    categories: data,
  }),
);

export const failed_all_categories = createAction(
  types.FAILED_ALL_CATEGORIES,
  () => ({
    loading: false,
    categories: [],
  }),
);

export const request_stores_alpha_char_list = createAction(
  types.REQUEST_STORES_ALPHA_CHAR_LIST,
  () => ({
    loading: true,
  }),
);

export const success_stores_alpha_char_list = createAction(
  types.SUCCESS_STORES_ALPHA_CHAR_LIST,
  (data) => ({
    loading: false,
    stores_alpha_list: data,
  }),
);

export const failed_stores_alpha_char_list = createAction(
  types.FAILED_STORES_ALPHA_CHAR_LIST,
  () => ({
    loading: false,
    stores_alpha_list: [],
  }),
);

export const request_stores_by_alpha = createAction(
  types.REQUEST_STORES_BY_ALPHA,
  (stores_alpha_char) => ({
    loading: true,
    alpha_stores_loading: true,
    stores_alpha_char,
  }),
);

export const success_stores_by_alpha = createAction(
  types.SUCCESS_STORES_BY_ALPHA,
  (data) => ({
    loading: false,
    alpha_stores_loading: false,
    alpha_stores: data,
  }),
);

export const failed_stores_by_alpha = createAction(
  types.FAILED_STORES_BY_ALPHA,
  () => ({
    loading: false,
    alpha_stores_loading: false,
    alpha_stores: [],
  }),
);
