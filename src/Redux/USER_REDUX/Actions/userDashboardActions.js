import { createAction } from "redux-actions";
import * as types from "./actionTypes";

export const request_user_dashboard = createAction(
  types.REQUEST_USER_DASHBOARD,
  (show_welcome_msg) => ({
    loading: true,
    show_welcome_msg,
  })
);

export const success_user_dashboard = createAction(
  types.SUCCESS_USER_DASHBOARD,
  (data, user_info) => ({
    loading: false,
    user_dashboard_data: data,
    user_info,
  })
);

export const failed_user_dashboard = createAction(
  types.FAILED_USER_DASHBOARD,
  () => ({
    loading: false,
    user_dashboard_data: null,
  })
);

export const request_user_module_info = createAction(
  types.REQUEST_USER_MODULE_INFO,
  () => ({
    loading: true,
  })
);

export const success_user_module_info = createAction(
  types.SUCCESS_USER_MODULE_INFO,
  (data) => ({
    loading: false,
    user_module: data,
  })
);

export const failed_user_module_info = createAction(
  types.FAILED_USER_MODULE_INFO,
  () => ({
    loading: false,
    user_module: {},
  })
);

export const request_user_modules = createAction(
  types.REQUEST_USER_MODULES,
  () => ({
    loading: true,
  })
);

export const success_user_modules = createAction(
  types.SUCCESS_USER_MODULES,
  (data) => ({
    loading: false,
    user_modules_list: data,
  })
);

export const failed_user_modules = createAction(
  types.FAILED_USER_MODULES,
  () => ({
    loading: false,
    user_modules_list: [],
  })
);

export const request_user_graph_clicks = createAction(
  types.REQUEST_USER_GRAPH_CLICKS,
  () => ({
    loading: true,
  })
);

export const success_user_graph_clicks = createAction(
  types.SUCCESS_USER_GRAPH_CLICKS,
  (data) => ({
    loading: false,
    user_graph_clicks: data,
  })
);

export const failed_user_graph_clicks = createAction(
  types.FAILED_USER_GRAPH_CLICKS,
  () => ({
    loading: false,
    user_graph_clicks: {},
  })
);

export const request_user_graph_earnings = createAction(
  types.REQUEST_USER_GRAPH_EARNINGS,
  () => ({
    loading: true,
  })
);

export const success_user_graph_earnings = createAction(
  types.SUCCESS_USER_GRAPH_EARNINGS,
  (data) => ({
    loading: false,
    user_graph_earnings: data,
  })
);

export const failed_user_graph_earnings = createAction(
  types.FAILED_USER_GRAPH_EARNINGS,
  () => ({
    loading: false,
    user_graph_earnings: {},
  })
);
