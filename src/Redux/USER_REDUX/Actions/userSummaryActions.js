import {createAction} from 'redux-actions';
import * as types from './actionTypes';

export const request_user_cashback_summary = createAction(
  types.REQUEST_USER_CASHBACK_SUMMARY,
  () => ({
    loading: true,
  }),
);

export const success_user_cashback_summary = createAction(
  types.SUCCESS_USER_CASHBACK_SUMMARY,
  (data, user) => ({
    loading: false,
    user_cashback_summary: data,
    user_info: user,
  }),
);

export const failed_user_cashback_summary = createAction(
  types.FAILED_USER_CASHBACK_SUMMARY,
  () => ({
    loading: false,
    user_cashback_summary: {},
  }),
);

export const request_user_bonus_summary = createAction(
  types.REQUEST_USER_BONUS_SUMMARY,
  () => ({
    loading: true,
  }),
);

export const success_user_bonus_summary = createAction(
  types.SUCCESS_USER_BONUS_SUMMARY,
  (data, user) => ({
    user_bonus_summary: data,
    user_info: user,
    loading: false,
  }),
);

export const failed_user_bonus_summary = createAction(
  types.FAILED_USER_BONUS_SUMMARY,
  () => ({
    user_bonus_summary: {},
    loading: false,
  }),
);

export const request_user_referral_summary = createAction(
  types.REQUEST_USER_REFERRAL_SUMMARY,
  () => ({
    loading: true,
  }),
);

export const success_user_referral_summary = createAction(
  types.SUCCESS_USER_REFERRAL_SUMMARY,
  (data, user) => ({
    user_referral_summary: data,
    user_info: user,
    loading: false,
  }),
);

export const failed_user_referral_summary = createAction(
  types.FAILED_USER_REFERRAL_SUMMARY,
  () => ({
    user_referral_summary: {},
    loading: false,
  }),
);

export const request_user_clicks_summary = createAction(
  types.REQUEST_USER_CLICKS_SUMMARY,
  () => ({
    loading: true,
  }),
);

export const success_user_clicks_summary = createAction(
  types.SUCCESS_USER_CLICKS_SUMMARY,
  (data, user) => ({
    user_clicks_summary: data,
    user_info: user,
    loading: false,
  }),
);

export const failed_user_clicks_summary = createAction(
  types.FAILED_USER_CLICKS_SUMMARY,
  () => ({
    user_clicks_summary: {},
    loading: false,
  }),
);

export const request_user_payment_summary = createAction(
  types.REQUEST_USER_PAYMENT_SUMMARY,
  () => ({
    loading: true,
  }),
);

export const success_user_payment_summary = createAction(
  types.SUCCESS_USER_PAYMENT_SUMMARY,
  (data, user) => ({
    loading: false,
    user_payment_summary: data,
    user_info: user,
  }),
);

export const failed_user_payment_summary = createAction(
  types.FAILED_USER_PAYMENT_SUMMARY,
  () => ({
    loading: false,
    user_payment_summary: {},
  }),
);
