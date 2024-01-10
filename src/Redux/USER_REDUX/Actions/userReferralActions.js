import { createAction } from "redux-actions";
import * as types from "./actionTypes";

export const request_user_referral_list = createAction(
  types.REQUEST_USER_REFERRAL_LIST,
  () => ({
    loading: true,
  })
);

export const success_user_referral_list = createAction(
  types.SUCCESS_USER_REFERRAL_LIST,
  (data, user) => ({
    loading: false,
    user_referral_list: data,
    user_info: user,
  })
);

export const failed_user_referral_list = createAction(
  types.FAILED_USER_REFERRAL_LIST,
  () => ({
    loading: false,
    user_referral_list: [],
  })
);

export const request_user_referral_invites = createAction(
  types.REQUEST_USER_REFERRAL_INVITES,
  () => ({
    loading: true,
  })
);

export const success_user_referral_invites = createAction(
  types.SUCCESS_USER_REFERRAL_INVITES,
  (data, user) => ({
    user_referral_invites: data,
    loading: false,
    user_info: user,
  })
);

export const failed_user_referral_invites = createAction(
  types.FAILED_USER_REFERRAL_INVITES,
  () => ({
    user_referral_invites: [],
    loading: false,
  })
);

export const request_user_referral_invite = createAction(
  types.REQUEST_USER_REFERRAL_INVITE,
  (user_referral_invite_email) => ({
    loading: true,
    user_referral_invite_email,
  })
);

export const success_user_referral_invite = createAction(
  types.SUCCESS_USER_REFERRAL_INVITE,
  (data, user) => ({
    loading: false,
    user_referral_invite_sent: { success: data, time_stamp: new Date() },
    user_info: user,
  })
);

export const failed_user_referral_invite = createAction(
  types.FAILED_USER_REFERRAL_INVITE,
  () => ({
    loading: false,
    user_referral_invite_sent: { success: false, time_stamp: new Date() },
  })
);
