import { createAction } from "redux-actions";
import * as types from "./actionTypes";

export const request_user_activity_cashback = createAction(
  types.REQUEST_USER_ACTIVITY_CASHBACK,
  (user_cashback_activity_month) => ({
    loading: true,
    user_cashback_activity_month,
  })
);

export const success_user_activity_cashback = createAction(
  types.SUCCESS_USER_ACTIVITY_CASHBACK,
  (data, user) => ({
    loading: false,
    user_activity_cashback: data,
    user_info: user,
  })
);

export const failed_user_activity_cashback = createAction(
  types.FAILED_USER_ACTIVITY_CASHBACK,
  () => ({
    loading: false,
    user_activity_cashback: [],
  })
);

export const request_user_activity_bonus = createAction(
  types.REQUEST_USER_ACTIVITY_BONUS,
  (user_activity_bonus_month) => ({
    loading: true,
    user_activity_bonus_month,
  })
);

export const success_user_activity_bonus = createAction(
  types.SUCCESS_USER_ACTIVITY_BONUS,
  (data, user) => ({
    loading: false,
    user_activity_bonus: data,
    user_info: user,
  })
);

export const failed_user_activity_bonus = createAction(
  types.FAILED_USER_ACTIVITY_BONUS,
  () => ({
    loading: false,
    user_activity_bonus: [],
  })
);

export const request_user_activity_referral = createAction(
  types.REQUEST_USER_ACTIVITY_REFERRAL,
  (user_activity_referral_month) => ({
    loading: true,
    user_activity_referral_month,
  })
);

export const success_user_activity_referral = createAction(
  types.SUCCESS_USER_ACTIVITY_REFERRAL,
  (data, user) => ({
    loading: false,
    user_activity_referral: data,
    user_info: user,
  })
);

export const failed_user_activity_referral = createAction(
  types.FAILED_USER_ACTIVITY_REFERRAL,
  () => ({
    loading: false,
    user_activity_referral: [],
  })
);

export const request_user_activity_clicks = createAction(
  types.REQUEST_USER_ACTIVITY_CLICKS,
  (user_activity_clicks_month) => ({
    loading: true,
    user_activity_clicks_month,
  })
);

export const success_user_activity_clicks = createAction(
  types.SUCCESS_USER_ACTIVITY_CLICKS,
  (data, user) => ({
    loading: false,
    user_activity_clicks: data,
    user_info: user,
  })
);

export const failed_user_activity_clicks = createAction(
  types.FAILED_USER_ACTIVITY_CLICKS,
  () => ({
    loading: false,
    user_activity_clicks: [],
  })
);

export const request_user_activity_clicks_recent = createAction(
  types.REQUEST_USER_ACTIVITY_CLICKS_RECENT,
  () => ({
    loading: true,
  })
);

export const success_user_activity_clicks_recent = createAction(
  types.SUCCESS_USER_ACTIVITY_CLICKS_RECENT,
  (data, user) => ({
    loading: false,
    user_activity_clicks_recent: data,
    user_info: user,
  })
);

export const failed_user_activity_clicks_recent = createAction(
  types.FAILED_USER_ACTIVITY_CLICKS_RECENT,
  () => ({
    loading: false,
    user_activity_clicks_recent: [],
  })
);
