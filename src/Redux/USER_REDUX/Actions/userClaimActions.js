import {createAction} from 'redux-actions';
import * as types from './actionTypes';

export const request_user_claim_list = createAction(
  types.REQUEST_USER_CLAIM_LIST,
  (page_no = 1, per_page = 10) => ({
    loading: true,
    page_no,
    per_page,
  }),
);

export const success_user_claim_list = createAction(
  types.SUCCESS_USER_CLAIM_LIST,
  ({data = [], current_page = 0, last_page = 0}, user) => ({
    loading: false,
    user_claim_list: data,
    current_claim_list_page: current_page,
    total_claim_list_page: last_page,
    user_info: user,
  }),
);

export const failed_user_claim_list = createAction(
  types.FAILED_USER_CLAIM_LIST,
  () => ({
    loading: false,
    user_claim_list: {},
  }),
);

export const request_claim_info = createAction(
  types.REQUEST_CLAIM_INFO,
  user_claim_id => ({
    loading: true,
    user_claim_id,
  }),
);

export const success_claim_info = createAction(
  types.SUCCESS_CLAIM_INFO,
  (data, user) => ({
    loading: false,
    user_claim_info: data,
    user_info: user,
  }),
);

export const failed_claim_info = createAction(types.FAILED_CLAIM_INFO, () => ({
  loading: false,
  user_claim_info: {},
}));

export const request_user_claim_close = createAction(
  types.REQUEST_USER_CLAIM_CLOSE,
  user_claim_close_id => ({
    loading: true,
    user_claim_close_id,
  }),
);

export const success_user_claim_close = createAction(
  types.SUCCESS_USER_CLAIM_CLOSE,
  (data, user) => ({
    loading: false,
    user_claim_closed: true,
    user_info: user,
  }),
);

export const failed_user_claim_close = createAction(
  types.FAILED_USER_CLAIM_CLOSE,
  () => ({
    loading: false,
    user_claim_closed: false,
  }),
);

export const request_user_claim_post_comment = createAction(
  types.REQUEST_USER_CLAIM_POST_COMMENT,
  (user_claim_post_comment_id, user_claim_comment) => ({
    loading: true,
    user_claim_post_comment_id,
    user_claim_comment: user_claim_comment,
  }),
);

export const success_user_claim_post_comment = createAction(
  types.SUCCESS_USER_CLAIM_POST_COMMENT,
  (data, user) => ({
    loading: false,
    user_claim_post_comment: true,
    user_info: user,
  }),
);

export const failed_user_claim_post_comment = createAction(
  types.FAILED_USER_CLAIM_POST_COMMENT,
  () => ({
    loading: false,
    user_claim_post_comment: false,
  }),
);

export const request_user_claim_stores = createAction(
  types.REQUEST_USER_CLAIM_STORES,
  () => ({
    loading: true,
  }),
);

export const success_user_claim_stores = createAction(
  types.SUCCESS_USER_CLAIM_STORES,
  (data, user) => ({
    loading: false,
    user_claim_stores: data,
    user_info: user,
  }),
);

export const failed_user_claim_stores = createAction(
  types.FAILED_USER_CLAIM_STORES,
  () => ({
    loading: false,
    user_claim_stores: {},
  }),
);

export const request_user_claim_store_clicks = createAction(
  types.REQUEST_USER_CLAIM_STORE_CLICKS,
  user_claims_store_clicks_store_id => ({
    loading: true,
    user_claims_store_clicks_store_id,
  }),
);

export const success_user_claim_store_clicks = createAction(
  types.SUCCESS_USER_CLAIM_STORE_CLICKS,
  (data, user) => ({
    loading: false,
    user_claim_store_clicks: data,
    user_info: user,
  }),
);

export const failed_user_claim_store_clicks = createAction(
  types.FAILED_USER_CLAIM_STORE_CLICKS,
  () => ({
    loading: false,
    user_claim_store_clicks: [],
  }),
);

export const request_user_claim_make = createAction(
  types.REQUEST_CLAIM_MAKE,
  (
    claim_store_id,
    claim_click_id,
    claim_order_id,
    claim_platform,
    claim_currency,
    claim_order_amount,
    claim_transaction_date,
    claim_receipt,
  ) => ({
    loading: true,
    claim_store_id,
    claim_click_id,
    claim_order_id,
    claim_platform,
    claim_currency,
    claim_order_amount,
    claim_transaction_date,
    claim_receipt,
  }),
);

export const success_user_claim_make = createAction(
  types.SUCCESS_CLAIM_MAKE,
  (data, user) => ({
    loading: false,
    user_claim_created: {
      success: true,
      time_stamp: new Date(),
    },
    claim_error: '',
    user_info: user,
  }),
);

export const failed_user_claim_make = createAction(
  types.FAILED_CLAIM_MAKE,
  error => ({
    loading: false,
    user_claim_created: {
      success: false,
      time_stamp: new Date(),
    },
    claim_error: error,
  }),
);
