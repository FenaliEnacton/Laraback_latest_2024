import { createAction } from "redux-actions";
import * as types from "./actionTypes";

export const request_user_payment_list = createAction(
  types.REQUEST_USER_PAYMENT_LIST,
  (user_payment_month) => ({
    user_payment_month,
    loading: true,
  })
);

export const success_user_payment_list = createAction(
  types.SUCCESS_USER_PAYMENT_LIST,
  (data) => ({
    loading: false,
    user_payment_list: data,
  })
);

export const failed_user_payment_list = createAction(
  types.FAILED_USER_PAYMENT_LIST,
  () => ({
    loading: false,
    user_payment_list: [],
  })
);

export const request_user_payment_methods = createAction(
  types.REQUEST_USER_PAYMENT_METHODS,
  () => ({
    loading: true,
  })
);

export const success_user_payment_methods = createAction(
  types.SUCCESS_USER_PAYMENT_METHODS,
  (data, user) => ({
    loading: false,
    user_payment_methods: data,
    user_info: user,
  })
);

export const failed_user_payment_methods = createAction(
  types.FAILED_USER_PAYMENT_METHODS,
  () => ({
    loading: false,
    user_payment_methods: {},
  })
);

export const request_user_payment_add_method = createAction(
  types.REQUEST_USER_PAYMENT_ADD_METHOD,
  (
    add_pay_mode_inputs,
    add_pay_mode,
    add_pay_mode_method_name,
    add_pay_mode_account
  ) => ({
    loading: true,
    add_pay_mode_inputs,
    add_pay_mode,
    add_pay_mode_method_name,
    add_pay_mode_account,
  })
);

export const success_user_payment_add_method = createAction(
  types.SUCCESS_USER_PAYMENT_ADD_METHOD,
  (data) => ({
    loading: false,
    user_payment_method_added: {
      success: true,
      time_stamp: new Date(),
    },
  })
);

export const failed_user_payment_add_method = createAction(
  types.FAILED_USER_PAYMENT_ADD_METHOD,
  (error) => ({
    loading: false,
    user_payment_method_added: {
      success: false,
      time_stamp: new Date(),
    },
    payment_error: error,
  })
);

export const request_user_payment_request = createAction(
  types.REQUEST_USER_PAYMENT_REQUEST,
  (user_payout_mode_id, user_pay_mode, user_payment_amount) => ({
    loading: true,
    user_payout_mode_id,
    user_pay_mode,
    user_payment_amount,
  })
);

export const success_user_payment_request = createAction(
  types.SUCCESS_USER_PAYMENT_REQUEST,
  (data, user_info) => ({
    loading: false,
    payout_requested_success: {
      success: true,
      time_stamp: new Date(),
    },
    user_info,
  })
);

export const failed_user_payment_request = createAction(
  types.FAILED_USER_PAYMENT_REQUEST,
  (error) => ({
    loading: false,
    payout_requested_success: {
      success: true,
      time_stamp: new Date(),
    },
    payment_error: error,
  })
);

export const request_user_payment_email_verify = createAction(
  types.REQUEST_USER_PAYMENT_EMAIL_VERIFY,
  (payment_id) => ({
    loading: true,
    payment_id,
  })
);

export const success_user_payment_email_verify = createAction(
  types.SUCCESS_USER_PAYMENT_EMAIL_VERIFY,
  (data) => ({
    loading: false,
    payment_verify_email_sent: true,
  })
);

export const failed_user_payment_email_verify = createAction(
  types.FAILED_USER_PAYMENT_EMAIL_VERIFY,
  () => ({
    loading: false,
    payment_verify_email_sent: false,
  })
);
