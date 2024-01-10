import { createAction } from "redux-actions";
import * as types from "./actionTypes";

export const request_user_link_list = createAction(
  types.REQUEST_USER_LINK_LIST,
  () => ({
    loading: true,
  })
);

export const success_user_link_list = createAction(
  types.SUCCESS_USER_LINK_LIST,
  (data, user) => ({
    loading: false,
    user_link_list: data,
    user_info: user,
  })
);

export const failed_user_link_list = createAction(
  types.FAILED_USER_LINK_LIST,
  () => ({
    loading: false,
    user_link_list: [],
  })
);

export const request_user_link_create = createAction(
  types.REQUEST_USER_LINK_CREATE,
  (share_offer_link, share_offer_title) => ({
    loading: true,
    share_offer_link,
    share_offer_title,
  })
);

export const success_user_link_create = createAction(
  types.SUCCESS_USER_LINK_CREATE,
  (data, user) => ({
    loading: false,
    user_link_created_data: data,
    user_link_created: { success: true, time_stamp: new Date() },
    user_info: user,
  })
);

export const failed_user_link_create = createAction(
  types.FAILED_USER_LINK_CREATE,
  () => ({
    loading: false,
    user_link_created_data: {},
    user_link_created: { success: false, time_stamp: new Date() },
  })
);
