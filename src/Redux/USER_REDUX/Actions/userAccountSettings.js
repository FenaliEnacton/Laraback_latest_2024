import { createAction } from "redux-actions";
import * as types from "./actionTypes";

export const request_user_change_name = createAction(
  types.REQUEST_USER_CHANGE_NAME,
  (user_name, user_first_name = "", user_last_name = "") => ({
    loading: true,
    user_name,
    user_first_name,
    user_last_name,
  })
);

export const success_user_change_name = createAction(
  types.SUCCESS_USER_CHANGE_NAME,
  (data, user_info) => ({
    loading: false,
    user_profile_updated: { success: data, time_stamp: new Date() },
    user_info,
    profile_error_message: "",
  })
);

export const failed_user_change_name = createAction(
  types.FAILED_USER_CHANGE_NAME,
  (error) => ({
    loading: false,
    user_profile_updated: { success: false, time_stamp: new Date() },
    profile_error_message: error,
  })
);

export const request_user_change_lang = createAction(
  types.REQUEST_USER_CHANGE_LANG,
  (user_new_lang) => ({
    loading: true,
    user_new_lang,
  })
);

export const success_user_change_lang = createAction(
  types.SUCCESS_USER_CHANGE_LANG,
  (data, user) => ({
    loading: false,
    user_profile_updated: true,
    user_info: user,
    profile_error_message: "",
  })
);

export const failed_user_change_lang = createAction(
  types.FAILED_USER_CHANGE_LANG,
  (error) => ({
    loading: false,
    user_profile_updated: false,
    profile_error_message: error,
  })
);

export const request_user_change_password = createAction(
  types.REQUEST_USER_CHANGE_PASSWORD,
  (user_old_password, new_password, repeat_password, verify_token) => ({
    loading: true,
    user_old_password,
    new_password,
    repeat_password,
    verify_token,
  })
);

export const success_user_change_password = createAction(
  types.SUCCESS_USER_CHANGE_PASSWORD,
  () => ({
    loading: false,
    user_password_updated: { success: true, time_stamp: new Date() },
    profile_error_message: "",
  })
);

export const failed_user_change_password = createAction(
  types.FAILED_USER_CHANGE_PASSWORD,
  (error) => ({
    loading: false,
    user_password_updated: { success: false, time_stamp: new Date() },
    profile_error_message: error,
  })
);

export const request_user_account_activation = createAction(
  types.REQUEST_USER_ACCOUNT_ACTIVATION,
  () => ({
    loading: true,
  })
);

export const success_user_account_activation = createAction(
  types.SUCCESS_USER_ACCOUNT_ACTIVATION,
  (data, user) => ({
    loading: false,
    user_activation_send: { success: data, time_stamp: new Date() },
    profile_error_message: "",
    user_info: user,
  })
);

export const failed_user_account_activation = createAction(
  types.FAILED_USER_ACCOUNT_ACTIVATION,
  (error) => ({
    loading: false,
    user_activation_send: { success: false, time_stamp: new Date() },
    profile_error_message: error,
  })
);

export const request_user_profile_details = createAction(
  types.REQUEST_USER_PROFILE_DETAILS,
  () => ({
    loading: true,
  })
);

export const success_user_profile_details = createAction(
  types.SUCCESS_USER_PROFILE_DETAILS,
  (data) => ({
    loading: false,
    user_profile_info: data,
  })
);

export const failed_user_profile_details = createAction(
  types.FAILED_USER_PROFILE_DETAILS,
  () => ({
    loading: false,
    user_profile_info: {},
  })
);

export const request_update_profile_info = createAction(
  types.REQUEST_UPDATE_PROFILE_INFO,
  (
    user_id,
    bio,
    dob,
    anniversary,
    gender,
    married,
    occupation,
    address,
    city,
    pincode,
    state,
    country,
    user_name,
    user_first_name,
    user_last_name
  ) => ({
    loading: true,
    user_id,
    bio,
    anniversary,
    dob,
    gender,
    married,
    occupation,
    address,
    city,
    pincode,
    state,
    country,
    user_name,
    user_first_name,
    user_last_name,
  })
);

export const success_update_profile_info = createAction(
  types.SUCCESS_UPDATE_PROFILE_INFO,
  (data) => ({
    loading: false,
    user_profile_info: data,
  })
);

export const failed_update_profile_info = createAction(
  types.FAILED_UPDATE_PROFILE_INFO,
  () => ({
    loading: false,
    user_profile_info: {},
  })
);

export const request_country_list = createAction(
  types.REQUEST_COUNTRY_LIST,
  () => ({
    loading: true,
  })
);

export const success_country_list = createAction(
  types.SUCCESS_COUNTRY_LIST,
  (data) => ({
    loading: false,
    country_list: data,
  })
);

export const failed_country_list = createAction(
  types.FAILED_COUNTRY_LIST,
  () => ({
    loading: false,
    country_list: [],
  })
);
