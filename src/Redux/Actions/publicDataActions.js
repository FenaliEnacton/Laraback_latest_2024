import {createAction} from 'redux-actions';
import * as types from './actionTypes';

export const request_home_screen_data = createAction(
  types.REQUEST_HOME_SCREEN_DATA,
  () => ({
    home_loading: true,
  }),
);

export const success_home_screen_data = createAction(
  types.SUCCESS_HOME_SCREEN_DATA,
  data => ({
    home_loading: false,
    home_screen_data: data,
  }),
);

export const failed_home_screen_data = createAction(
  types.FAILED_HOME_SCREEN_DATA,
  () => ({
    home_loading: false,
    home_screen_data: {},
  }),
);

export const request_welcome_screen_data = createAction(
  types.REQUEST_WELCOME_SCREEN_DATA,
  () => ({
    loading: true,
  }),
);

export const success_welcome_screen_data = createAction(
  types.SUCCESS_WELCOME_SCREEN_DATA,
  data => ({
    loading: false,
    welcome_screen_data: data,
  }),
);

export const failed_welcome_screen_data = createAction(
  types.FAILED_WELCOME_SCREEN_DATA,
  () => ({
    loading: false,
    welcome_screen_data: {},
  }),
);

export const request_privacy_terms = createAction(
  types.REQUEST_PRIVACY_TERMS,
  () => ({
    loading: true,
  }),
);

export const success_privacy_terms = createAction(
  types.SUCCESS_PRIVACY_TERMS,
  data => ({
    loading: false,
    app_info_data: data,
  }),
);

export const failed_privacy_terms = createAction(
  types.FAILED_PRIVACY_TERMS,
  () => ({
    loading: false,
    app_info_data: {},
  }),
);

export const request_refer_n_earn_info = createAction(
  types.REQUEST_REFER_N_EARN_INFO,
  () => ({
    loading: true,
  }),
);

export const success_refer_n_earn_info = createAction(
  types.SUCCESS_REFER_N_EARN_INFO,
  data => ({
    loading: false,
    refer_n_earn_info: data,
  }),
);

export const failed_refer_n_earn_info = createAction(
  types.FAILED_REFER_N_EARN_INFO,
  () => ({
    loading: false,
    refer_n_earn_info: {},
  }),
);

export const request_share_n_earn_info = createAction(
  types.REQUEST_SHARE_N_EARN_INFO,
  () => ({
    loading: true,
  }),
);

export const success_share_n_earn_info = createAction(
  types.SUCCESS_SHARE_N_EARN_INFO,
  data => ({
    loading: false,
    share_n_earn_info: data,
  }),
);

export const failed_share_n_earn_info = createAction(
  types.FAILED_SHARE_N_EARN_INFO,
  () => ({
    loading: false,
    share_n_earn_info: {},
  }),
);

export const request_faqs = createAction(types.REQUEST_FAQS, () => ({
  loading: true,
}));

export const success_faqs = createAction(types.SUCCESS_FAQS, data => ({
  loading: false,
  faqs_info: data,
}));

export const failed_faqs = createAction(types.FAILED_FAQS, () => ({
  loading: false,
  faqs_info: [],
}));

export const request_store_cat_details = createAction(
  types.REQUEST_STORE_CAT_DETAILS,
  (store_cat_id, store_cat) => ({
    loading: true,
    store_cat_id,
    store_cat,
  }),
);

export const success_store_cat_details = createAction(
  types.SUCCESS_STORE_CAT_DETAILS,
  data => ({
    loading: false,
    store_cat_details: data,
  }),
);

export const failed_store_cat_details = createAction(
  types.FAILED_STORE_CAT_DETAILS,
  () => ({
    loading: false,
    store_cat_details: {},
  }),
);

export const request_coupon_cat_details = createAction(
  types.REQUEST_COUPON_CAT_DETAILS,
  coupon_cat_id => ({
    loading: true,
    coupon_cat_id,
  }),
);

export const success_coupon_cat_details = createAction(
  types.SUCCESS_COUPON_CAT_DETAILS,
  data => ({
    loading: false,
    coupon_cat_details: data,
  }),
);

export const failed_coupon_cat_details = createAction(
  types.FAILED_COUPON_CAT_DETAILS,
  () => ({
    loading: false,
    coupon_cat_details: {},
  }),
);

export const request_filtered_coupons = createAction(
  types.REQUEST_FILTERED_COUPONS,
  (
    coupon_filter_cats,
    coupon_filter_stores,
    coupon_filter_order_type,
    coupon_filter_page_no,
    coupon_filter_per_page,
    coupon_filter_show_type,
    filter_page,
  ) => ({
    loading: true,
    coupon_filter_cats,
    coupon_filter_stores,
    coupon_filter_per_page,
    coupon_filter_show_type,
    coupon_filter_order_type,
    coupon_filter_page_no,
    filter_page,
  }),
);

export const success_filtered_coupons = createAction(
  types.SUCCESS_FILTERED_COUPONS,
  data => ({
    loading: false,
    filtered_coupons_data: data,
  }),
);

export const failed_filtered_coupons = createAction(
  types.FAILED_FILTERED_COUPONS,
  () => ({
    loading: false,
    filtered_coupons_data: {},
  }),
);

export const request_filtered_deals = createAction(
  types.REQUEST_FILTERED_DEALS,
  (
    deal_filter_cats,
    deal_filter_stores,
    deal_filter_order_type,
    deal_filter_page_no,
    deal_filter_per_page,
    deal_filter_min_price,
    deal_filter_max_price,
    deal_filter_sequence,
    deal_filter_show_type,
  ) => ({
    loading: true,
    deal_filter_cats,
    deal_filter_stores,
    deal_filter_page_no,
    deal_filter_show_type,
    deal_filter_order_type,
    deal_filter_per_page,
    deal_filter_min_price,
    deal_filter_max_price,
    deal_filter_sequence,
  }),
);

export const success_filtered_deals = createAction(
  types.SUCCESS_FILTERED_DEALS,
  data => ({
    loading: false,
    filtered_deals_data: data,
  }),
);

export const failed_filtered_deals = createAction(
  types.FAILED_FILTERED_DEALS,
  () => ({
    loading: false,
    filtered_deals_data: {},
  }),
);

export const request_deals_filter_info = createAction(
  types.REQUEST_DEALS_FILTER_INFO,
  (deal_filter_cats, deal_filter_stores) => ({
    loading: true,
    deal_filter_cats,
    deal_filter_stores,
  }),
);

export const success_deals_filter_info = createAction(
  types.SUCCESS_DEALS_FILTER_INFO,
  data => ({
    loading: false,
    deals_filter_info: data,
  }),
);

export const failed_deals_filter_info = createAction(
  types.FAILED_DEALS_FILTER_INFO,
  () => ({
    loading: false,
    deals_filter_info: {},
  }),
);

export const request_deal_info = createAction(
  types.REQUEST_DEAL_INFO,
  deal_id => ({
    loading: true,
    deal_id,
    deal_info: {},
  }),
);

export const success_deal_info = createAction(
  types.SUCCESS_DEAL_INFO,
  data => ({
    loading: false,
    deal_info: data,
  }),
);

export const failed_deal_info = createAction(types.FAILED_DEAL_INFO, () => ({
  loading: false,
  deal_info: {},
}));

export const request_store_details = createAction(
  types.REQUEST_STORE_DETAILS,
  store_id => ({
    loading: true,
    store_id,
    store_details_loading: true,
  }),
);

export const success_store_details = createAction(
  types.SUCCESS_STORE_DETAILS,
  data => ({
    loading: false,
    store_details: data,
    store_details_loading: false,
  }),
);

export const failed_store_details = createAction(
  types.FAILED_STORE_DETAILS,
  () => ({
    loading: false,
    store_details: {},
    store_details_loading: false,
  }),
);

export const request_app_settings = createAction(
  types.REQUEST_APP_SETTINGS,
  () => ({
    loading: true,
  }),
);

export const success_app_settings = createAction(
  types.SUCCESS_APP_SETTINGS,
  data => ({
    loading: false,
    app_settings: data,
  }),
);

export const failed_app_settings = createAction(
  types.FAILED_APP_SETTINGS,
  () => ({
    loading: false,
    app_settings: {},
  }),
);

export const request_contact_us = createAction(
  types.REQUEST_CONTACT_US,
  (name, email, subject, message) => ({
    loading: true,
    name,
    email,
    subject,
    message,
  }),
);

export const success_contact_us = createAction(
  types.SUCCESS_CONTACT_US,
  data => ({
    loading: false,
    contact_us_sent: data,
  }),
);

export const failed_contact_us = createAction(types.FAILED_CONTACT_US, () => ({
  loading: false,
  contact_us_sent: null,
}));

export const request_get_id_by_url = createAction(
  types.REQUEST_GET_ID_BY_URL,
  (obj_type, slug) => ({
    loading: true,
    obj_type,
    slug,
    deep_link_loading: true,
  }),
);

export const success_get_id_by_url = createAction(
  types.SUCCESS_GET_ID_BY_URL,
  data => ({
    loading: false,
    url_data: data,
    deep_link_loading: false,
  }),
);

export const failed_get_id_by_url = createAction(
  types.FAILED_GET_ID_BY_URL,
  () => ({
    loading: false,
    url_data: {},
    deep_link_loading: false,
  }),
);
export const request_bonus_types = createAction(
  types.REQUEST_BONUS_TYPES,
  () => ({
    loading: true,
  }),
);

export const success_bonus_types = createAction(
  types.SUCCESS_BONUS_TYPES,
  data => ({
    bonus_types: data,
    loading: false,
  }),
);

export const failed_bonus_types = createAction(
  types.FAILED_BONUS_TYPES,
  () => ({
    loading: false,
    bonus_types: {},
  }),
);
export const set_loading_false = createAction(types.SET_LOADING_FALSE, () => ({
  loading: false,
}));
export const request_app_home_screen_data = createAction(
  types.REQUEST_APP_HOME_SCREEN_DATA,
  () => ({
    loading: true,
  }),
);

export const success_app_home_screen_data = createAction(
  types.SUCCESS_APP_HOME_SCREEN_DATA,
  data => ({
    loading: false,
    app_home_screen_data: data,
  }),
);

export const failed_app_home_screen_data = createAction(
  types.FAILED_APP_HOME_SCREEN_DATA,
  () => ({
    loading: false,
    app_home_screen_data: {},
  }),
);
