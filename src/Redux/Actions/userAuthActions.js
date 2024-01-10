import {createAction} from 'redux-actions';
import * as types from './actionTypes';

export const request_user_login = createAction(
  types.REQUEST_USER_LOGIN,
  (email, password, out_page_info) => ({
    loading: true,
    email,
    password,
    out_page_info,
  }),
);

export const success_user_login = createAction(
  types.SUCCESS_USER_LOGIN,
  (data) => ({
    loading: false,
    user_token: data,
  }),
);

export const failed_user_login = createAction(types.FAILED_USER_LOGIN, () => ({
  loading: false,
  user_token: {},
}));

export const request_forgot_pass_email = createAction(
  types.REQUEST_FORGOT_PASS_EMAIL,
  (email, forgot_pass_otp) => ({
    loading: true,
    email,
    forgot_pass_otp,
    otp_resend_show: false,
  }),
);

export const success_forgot_pass_email = createAction(
  types.SUCCESS_FORGOT_PASS_EMAIL,
  (data) => ({
    loading: false,
    forgot_pass_email_res: data,
    otp_resend_show: true,
  }),
);

export const failed_forgot_pass_email = createAction(
  types.FAILED_FORGOT_PASS_EMAIL,
  () => ({
    loading: false,
    forgot_pass_email_res: false,
    otp_resend_show: false,
  }),
);

export const request_forgot_change_password = createAction(
  types.REQUEST_FORGOT_CHANGE_PASSWORD,
  (email, password, change_pass_otp) => ({
    loading: true,
    email,
    password,
    change_pass_otp,
  }),
);

export const success_forgot_change_password = createAction(
  types.SUCCESS_FORGOT_CHANGE_PASSWORD,
  (data) => ({
    loading: false,
    password_changed: data,
  }),
);

export const failed_forgot_change_password = createAction(
  types.FAILED_FORGOT_CHANGE_PASSWORD,
  () => ({
    loading: false,
    password_changed: false,
  }),
);

export const request_user_register_verification = createAction(
  types.REQUEST_USER_REGISTER_VERIFICATION,
  (
    email,
    register_email_otp,
    mobile,
    register_mobile_otp,
    password,
    referrer_code,
    is_social,
    social_id,
    social_type,
  ) => ({
    loading: true,
    email,
    register_email_otp,
    mobile,
    register_mobile_otp,
    password,
    referrer_code,
    is_social,
    social_id,
    social_type,
    otp_resend_show: false,
  }),
);

export const success_user_register_verification = createAction(
  types.SUCCESS_USER_REGISTER_VERIFICATION,
  (data) => ({
    loading: false,
    user_verification_otp_data: data,
    otp_resend_show: true,
  }),
);

export const failed_user_register_verification = createAction(
  types.FAILED_USER_REGISTER_VERIFICATION,
  () => ({
    loading: false,
    verification_otp_data: {},
    otp_resend_show: false,
  }),
);

export const request_user_registration = createAction(
  types.REQUEST_USER_REGISTRATION,
  (email, password, mobile, referrer_code) => ({
    loading: true,
    email,
    password,
    mobile,
    referrer_code,
  }),
);

export const success_user_registration = createAction(
  types.SUCCESS_USER_REGISTRATION,
  (data) => ({
    loading: false,
    user_token: data,
  }),
);

export const failed_user_registration = createAction(
  types.FAILED_USER_REGISTRATION,
  () => ({
    loading: false,
    user_token: '',
  }),
);

export const request_social_login = createAction(
  types.REQUEST_SOCIAL_LOGIN,
  (
    email,
    social_id,
    social_type,
    mobile,
    password,
    referrer_code,
    out_page_info,
  ) => ({
    loading: true,
    email,
    social_id,
    social_type,
    mobile,
    password,
    referrer_code,
    out_page_info,
  }),
);

export const success_social_login = createAction(
  types.SUCCESS_SOCIAL_LOGIN,
  (data) => ({
    loading: false,
    user_token: data,
  }),
);

export const failed_social_login = createAction(
  types.FAILED_SOCIAL_LOGIN,
  () => ({
    loading: false,
    user_token: '',
  }),
);

export const request_log_out = createAction(types.REQUEST_LOG_OUT, () => ({
  loading: true,
}));

export const success_log_out = createAction(types.SUCCESS_LOG_OUT, () => ({
  loading: false,
  user_info: null,
  user_dashboard_data: null,
}));

export const failed_log_out = createAction(types.FAILED_LOG_OUT, () => ({
  loading: false,
}));

export const request_user_email_otp = createAction(
  types.REQUEST_USER_EMAIL_OTP,
  (email, payment_email_otp) => ({
    loading: true,
    payment_email_otp,
    email,
  }),
);

export const success_user_email_otp = createAction(
  types.SUCCESS_USER_EMAIL_OTP,
  (data) => ({
    loading: false,
    user_email_otp: data,
  }),
);

export const failed_user_email_otp = createAction(
  types.FAILED_USER_EMAIL_OTP,
  () => ({
    loading: false,
    user_email_otp: 0,
  }),
);
