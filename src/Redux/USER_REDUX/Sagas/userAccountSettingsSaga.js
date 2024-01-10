import { takeEvery, call, put } from "redux-saga/effects";
import * as types from "../Actions/actionTypes";
import {
  handle_api_error,
  show_success_message,
  show_fail_message,
  get_api_error_string,
  get_translation,
  show_success_message_with_reload,
  get_exception_string,
} from "../Utils";
import api from "../Services/api";
import { Toast } from "@components/core";
import * as account_settings_actions from "../Actions/userAccountSettings";
import { is_app } from "../Utils";

export function* watch_user_account_settings_request() {
  yield takeEvery(types.REQUEST_USER_CHANGE_NAME, request_user_change_name);
  yield takeEvery(types.REQUEST_USER_CHANGE_LANG, request_user_change_lang);
  yield takeEvery(types.REQUEST_COUNTRY_LIST, request_country_list);
  yield takeEvery(
    types.REQUEST_USER_CHANGE_PASSWORD,
    request_user_change_password
  );
  yield takeEvery(
    types.REQUEST_USER_ACCOUNT_ACTIVATION,
    request_user_account_activation
  );
  yield takeEvery(
    types.REQUEST_USER_PROFILE_DETAILS,
    request_user_profile_details
  );
  yield takeEvery(
    types.REQUEST_UPDATE_PROFILE_INFO,
    request_update_profile_info
  );
}

function* request_user_change_name(action) {
  try {
    const response = yield call(
      api.user_dashboard_post_api,
      "user.profile.update.name",
      {
        name: action.payload.user_name,
        first_name: action.payload.user_first_name,
        last_name: action.payload.user_last_name,
      }
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        account_settings_actions.success_user_change_name(
          response.data.data,
          response.data.user
        )
      );
      show_success_message({
        text: get_translation("user_dashboard.account_setting.name_updated"),
      });
    } else {
      yield put(
        account_settings_actions.failed_user_change_name(
          response.data?.msg
            ? get_api_error_string(response.data?.msg)
            : response.problem
        )
      );
      show_fail_message({
        text: response.problem
          ? response.problem
          : get_translation(
              "user_dashboard.account_setting.request_failed_try_again"
            ),
      });
      // handle_api_error(
      //   response.problem + response.data?.error,
      //   "user.profile.update.name"
      // );
    }
  } catch (error) {
    yield put(account_settings_actions.failed_user_change_name(""));
    // handle_api_error(error);
    show_fail_message({
      text: response.problem
        ? response.problem
        : get_translation(
            "user_dashboard.account_setting.request_failed_try_again"
          ),
    });
  }
}

function* request_user_profile_details() {
  try {
    const response = yield call(api.user_dashboard_api, "user.profile.meta");
    if (response.ok && response.data.success && !response.data.error) {
      yield put(
        account_settings_actions.success_user_profile_details(
          response.data.data
        )
      );
    } else {
      yield put(
        account_settings_actions.failed_user_profile_details(
          response.data?.msg
            ? get_api_error_string(response.data?.msg)
            : response.problem
        )
      );
    }
  } catch (error) {
    yield put(account_settings_actions.failed_user_profile_details(""));
    handle_api_error(error);
  }
}

function* request_country_list() {
  try {
    const response = yield call(api.user_dashboard_api, "public.countries");
    if (response.ok && response.data.success && !response.data.error) {
      yield put(
        account_settings_actions.success_country_list(response.data.data)
      );
    } else {
      yield put(
        account_settings_actions.failed_country_list(
          response.data?.msg
            ? get_api_error_string(response.data?.msg)
            : response.problem
        )
      );
    }
  } catch (error) {
    yield put(account_settings_actions.failed_country_list(""));
    handle_api_error(error);
  }
}

function* request_update_profile_info(action) {
  try {
    const response = yield call(
      api.user_dashboard_post_api,
      "user.profile.meta",
      {
        user_id: action.payload.user_id,
        bio: action.payload.bio,
        dob: action.payload.dob,
        anniversary: action.payload.anniversary,
        gender: action.payload.gender,
        married: action.payload.married,
        occupation: action.payload.occupation,
        address: action.payload.address,
        city: action.payload.city,
        pincode: action.payload.pincode,
        state: action.payload.state,
        country: action.payload.country,
      }
    );
    const name_response = yield call(
      api.user_dashboard_post_api,
      "user.profile.update.name",
      {
        name: action.payload.user_name,
        first_name: action.payload.user_first_name,
        last_name: action.payload.user_last_name,
      }
    );
    if (
      response.ok &&
      response.data.success &&
      !response.data.error &&
      name_response.ok &&
      name_response.data.success &&
      !name_response.data.error
    ) {
      yield put(
        account_settings_actions.success_update_profile_info(response.data.data)
      );
      yield put(
        account_settings_actions.success_user_change_name(
          name_response.data.data,
          name_response.data.user
        )
      );
      if (is_app()) {
        Toast.successBottom(
          get_translation("user_dashboard.account_setting.profile_info_updated")
        );
      } else {
        show_success_message({
          text: get_translation(
            "user_dashboard.account_setting.profile_info_updated"
          ),
        });
      }
    } else {
      if (is_app()) {
        Toast.errorBottom(
          get_translation(
            "user_dashboard.account_setting.request_failed_try_again"
          )
        );
      } else {
        show_fail_message({
          text: response.data.data?.error
            ? response.data.data.message
            : get_translation(
                "user_dashboard.account_setting.request_failed_try_again"
              ),
        });
      }

      yield put(
        account_settings_actions.failed_update_profile_info(
          response.data?.msg
            ? get_api_error_string(response.data?.msg)
            : response.problem
        )
      );
    }
  } catch (error) {
    yield put(account_settings_actions.failed_update_profile_info(""));
    if (is_app()) {
      Toast.successBottom(
        get_translation(
          "user_dashboard.account_setting.request_failed_try_again"
        )
      );
    } else {
      show_fail_message({
        text: get_translation(
          "user_dashboard.account_setting.request_failed_try_again"
        ),
      });
    }
    handle_api_error(error);
  }
}

function* request_user_change_lang(action) {
  try {
    const response = yield call(
      api.user_dashboard_post_api,
      "user.profile.update.lang",
      { new_lang: action.payload.user_new_lang }
    );

    if (
      response.ok &&
      response.data?.success &&
      response.data.data &&
      !response.data.error
    ) {
      yield put(
        account_settings_actions.success_user_change_lang(
          response.data.data,
          response.data.user
        )
      );
      if (is_app()) {
        // Toast.successBottom(
        //   get_translation("user_dashboard.account_setting.lang_updated")
        // );
      } else {
        show_success_message_with_reload({
          text: get_translation("user_dashboard.account_setting.lang_updated"),
        });
      }
    } else {
      yield put(
        account_settings_actions.failed_user_change_lang(
          response.data?.msg ? response.data?.msg : response.problem
        )
      );
      handle_api_error(
        response.problem + response.data?.error,
        "user.profile.update.lang"
      );
      if (is_app()) {
        Toast.errorBottom(
          get_translation(
            "user_dashboard.account_setting.lang_update_request_failed"
          )
        );
      } else {
        show_fail_message({
          text: get_translation(
            "user_dashboard.account_setting.lang_update_request_failed"
          ),
        });
      }
    }
  } catch (error) {
    yield put(account_settings_actions.failed_user_change_lang(""));
    handle_api_error(error);
    if (is_app()) {
      Toast.errorBottom(
        get_translation(
          "user_dashboard.account_setting.lang_update_request_failed"
        )
      );
    } else {
      show_fail_message({
        text: get_translation(
          "user_dashboard.account_setting.lang_update_request_failed"
        ),
      });
    }
  }
}

function* request_user_change_password(action) {
  try {
    const response = yield call(
      api.user_auth_api,
      is_app() ? "user.change.password" : "user.change.web.password",
      {
        old_password: action.payload.user_old_password,
        new_password: action.payload.new_password,
        repeat_password: action.payload.repeat_password,
        verify_token: action.payload.verify_token,
      }
    );
    if (response.ok && response.data.success && !response.data.error) {
      yield put(account_settings_actions.success_user_change_password());
      if (is_app()) {
        Toast.successBottom(
          get_translation(
            "user_dashboard.account_setting.password_change_success"
          )
        );
      } else {
        show_success_message({
          text: get_translation(
            "user_dashboard.account_setting.password_change_success"
          ),
        });
      }
    } else {
      yield put(
        account_settings_actions.failed_user_change_password(
          response.data?.msg ? response.data?.msg : response.problem
        )
      );
      // handle_api_error(
      //   response.problem + response.data?.error,
      //   "user.change.password"
      // );
      if (is_app()) {
        Toast.errorBottom(
          response.data.data?.error
            ? get_exception_string(response.data.data)
            : response.data.msg
            ? get_api_error_string(response.data.msg)
            : get_translation(
                "user_dashboard.account_setting.change_password_error"
              )
        );
      } else {
        show_fail_message(
          response.data.data?.error
            ? { html: get_exception_string(response.data.data) }
            : {
                text: response.data.msg
                  ? get_api_error_string(response.data.msg)
                  : get_translation(
                      "user_dashboard.account_setting.change_password_error"
                    ),
              }
        );
      }
    }
  } catch (error) {
    yield put(account_settings_actions.failed_user_change_password(""));
    // handle_api_error(error);
    show_fail_message({
      text: get_translation(
        "user_dashboard.account_setting.change_password_error"
      ),
    });
  }
}

function* request_user_account_activation() {
  try {
    const response = yield call(
      api.user_dashboard_post_api,
      "user.account.activation",
      {}
    );
    if (
      response.ok &&
      response.data.success &&
      !response.data?.data &&
      name_response
    ) {
      yield put(
        account_settings_actions.success_user_account_activation(
          response.data.data,
          response.data.user
        )
      );
      if (is_app()) {
        Toast.successBottom(
          get_translation("user_dashboard.account_setting.activation_link_sent")
        );
      } else {
        show_success_message({
          text: get_translation(
            "user_dashboard.account_setting.activation_link_sent"
          ),
        });
      }
    } else {
      yield put(
        account_settings_actions.failed_user_account_activation(
          response.data?.msg
            ? get_api_error_string(response.data?.msg)
            : response.problem
        )
      );
      handle_api_error(
        response.problem + response.data?.error,
        "user.account.activation"
      );
      if (is_app()) {
        Toast.errorBottom(
          get_translation("user_dashboard.account_setting.activation_failed")
        );
      } else {
        show_fail_message({
          text: get_translation(
            "user_dashboard.account_setting.activation_failed"
          ),
        });
      }
    }
  } catch (error) {
    yield put(account_settings_actions.failed_user_account_activation(""));
    handle_api_error(error);
    if (is_app()) {
      Toast.errorBottom(
        get_translation("user_dashboard.account_setting.activation_failed")
      );
    } else {
      show_fail_message({
        text: get_translation(
          "user_dashboard.account_setting.activation_failed"
        ),
      });
    }
  }
}
