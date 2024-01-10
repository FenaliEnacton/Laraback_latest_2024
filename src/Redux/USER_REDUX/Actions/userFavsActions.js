import { createAction } from "redux-actions";
import * as types from "./actionTypes";

export const request_user_favs = createAction(
  types.REQUEST_USER_FAVS,
  (fav_type) => ({
    loading: true,
    fav_type,
  })
);

export const success_user_favs = createAction(
  types.SUCCESS_USER_FAVS,
  (data, user) => ({
    loading: false,
    user_fav_data: data,
    user_info: user,
  })
);

export const failed_user_favs = createAction(types.FAILED_USER_FAVS, () => ({
  loading: false,
  user_fav_data: {},
}));

export const request_user_add_fav = createAction(
  types.REQUEST_USER_ADD_FAV,
  (fav_type, fav_id) => ({
    loading: true,
    fav_type,
    fav_id,
  })
);

export const success_user_add_fav = createAction(
  types.SUCCESS_USER_ADD_FAV,
  (data, user) => ({
    loading: false,
    user_fav_added: data,
    user_info: user,
  })
);

export const failed_user_add_fav = createAction(
  types.FAILED_USER_ADD_FAV,
  () => ({
    loading: false,
    user_fav_added: false,
  })
);

export const request_user_remove_fav = createAction(
  types.REQUEST_USER_REMOVE_FAV,
  (fav_type, fav_id) => ({
    loading: true,
    fav_type,
    fav_id,
  })
);

export const success_user_remove_fav = createAction(
  types.SUCCESS_USER_REMOVE_FAV,
  (data, user) => ({
    loading: false,
    user_fav_removed: data,
    user_info: user,
  })
);

export const failed_user_remove_fav = createAction(
  types.FAILED_USER_REMOVE_FAV,
  () => ({
    loading: false,
    user_fav_removed: {},
  })
);
