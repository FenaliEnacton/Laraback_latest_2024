import { useRecoilState } from 'recoil';
import { booleanAtomFamily, objectAtomFamily } from '../../Recoil/atom';
import { atomKeys } from '../../Recoil/atom-keys';
import user_api from '../../Services/user_api';
import {
  get_api_error_string,
  get_exception_string,
  get_translation,
  handle_api_error,
  is_app,
  show_fail_message,
  show_success_message,
} from '../../Utils';
import Toast from '@/Components/Core/Toast';

const useUserAccountSettings = () => {
  const [loadingUserProfileDetails, setLoadingUserProfileDetails] =
    useRecoilState(
      booleanAtomFamily(atomKeys.accountSettings.loading_user_profile_details),
    );
  const [userProfileDetails, setUserProfileDetails] = useRecoilState(
    objectAtomFamily(atomKeys.accountSettings.user_profile_details),
  );
  const [userInfo, setUserInfo] = useRecoilState(
    objectAtomFamily(atomKeys.userAuth.user_info),
  );

  const [loadingUserChangePassword, setLoadingUserChangePassword] =
    useRecoilState(
      booleanAtomFamily(atomKeys.accountSettings.loading_user_change_password),
    );
  const [loadingUpdateUserInfo, setLoadingUpdateUserInfo] = useRecoilState(
    booleanAtomFamily(atomKeys.accountSettings.loading_update_user_info),
  );

  async function request_user_profile_details() {
    try {
      setLoadingUserProfileDetails(true);
      const response = await user_api.user_dashboard_api('user.profile.meta');
      if (response.ok && response.data.success && !response.data.error) {
        const res = response.data.data;

        setUserProfileDetails(res);
        setLoadingUserProfileDetails(false);
        return res;
      } else {
        response.data?.msg
          ? get_api_error_string(response.data?.msg)
          : response.problem;
        setUserProfileDetails({});
        setLoadingUserProfileDetails(false);
        return {};
      }
    } catch (error) {
      setUserProfileDetails({});
      setLoadingUserProfileDetails(false);
      console.error(error);
      handle_api_error(error);
      return {};
    }
  }
  async function request_user_change_password(
    old_password,
    new_password,
    repeat_password,
    verify_token,
  ) {
    try {
      setLoadingUserChangePassword(true);
      const response = await user_api.user_auth_api(
        is_app() ? 'user.change.password' : 'user.change.web.password',
        {
          old_password: old_password,
          new_password: new_password,
          repeat_password: repeat_password,
          verify_token: verify_token,
        },
      );
      if (response.ok && response.data.success && !response.data.error) {
        if (is_app()) {
          Toast.successBottom(
            get_translation(
              'user_dashboard.account_setting.password_change_success',
            ),
          );
        } else {
          show_success_message({
            text: get_translation(
              'user_dashboard.account_setting.password_change_success',
            ),
          });
        }
        setLoadingUserChangePassword(false);
        return true;
      } else {
        if (is_app()) {
          Toast.errorBottom(
            response.data.data?.error
              ? get_exception_string(response.data.data)
              : response.data.msg
              ? get_api_error_string(response.data.msg)
              : get_translation(
                  'user_dashboard.account_setting.change_password_error',
                ),
          );
        } else {
          show_fail_message(
            response.data.data?.error
              ? { html: get_exception_string(response.data.data) }
              : {
                  text: response.data.msg
                    ? get_api_error_string(response.data.msg)
                    : get_translation(
                        'user_dashboard.account_setting.change_password_error',
                      ),
                },
          );
        }
        setLoadingUserChangePassword(false);
        return false;
      }
    } catch (error) {
      show_fail_message({
        text: get_translation(
          'user_dashboard.account_setting.change_password_error',
        ),
      });
      setLoadingUserChangePassword(false);
      console.error(error);
      return false;
    }
  }
  async function request_update_profile_info(
    user_id,
    bio,
    dob,
    anniversary,
    gender,
    married,
    occupation,
    address,
    city,
    pinCode,
    state,
    country,
    user_name,
    user_first_name,
    user_last_name,
  ) {
    try {
      setLoadingUpdateUserInfo(true);
      const response = await user_api.user_dashboard_post_api(
        'user.profile.meta',
        {
          user_id: user_id,
          bio: bio,
          dob: dob,
          anniversary: anniversary,
          gender: gender,
          married: married,
          occupation: occupation,
          address: address,
          city: city,
          pincode: pinCode,
          state: state,
          country: country,
        },
      );
      const name_response = await user_api.user_dashboard_post_api(
        'user.profile.update.name',
        {
          name: user_name,
          first_name: user_first_name,
          last_name: user_last_name,
        },
      );
      if (
        response.ok &&
        response.data.success &&
        !response.data.error &&
        name_response.ok &&
        name_response.data.success &&
        !name_response.data.error
      ) {
        setUserInfo(name_response.data.user);
        if (is_app()) {
          Toast.successBottom(
            get_translation(
              'user_dashboard.account_setting.profile_info_updated',
            ),
          );
        } else {
          show_success_message({
            text: get_translation(
              'user_dashboard.account_setting.profile_info_updated',
            ),
          });
        }
        setLoadingUpdateUserInfo(false);
        return true;
      } else {
        if (is_app()) {
          Toast.errorBottom(
            get_translation(
              'user_dashboard.account_setting.request_failed_try_again',
            ),
          );
        } else {
          show_fail_message({
            text: response.data.data?.error
              ? response.data.data.message
              : get_translation(
                  'user_dashboard.account_setting.request_failed_try_again',
                ),
          });
        }
        response.data?.msg
          ? get_api_error_string(response.data?.msg)
          : response.problem;
        setLoadingUpdateUserInfo(false);
        return false;
      }
    } catch (error) {
      if (is_app()) {
        Toast.successBottom(
          get_translation(
            'user_dashboard.account_setting.request_failed_try_again',
          ),
        );
      } else {
        show_fail_message({
          text: get_translation(
            'user_dashboard.account_setting.request_failed_try_again',
          ),
        });
      }
      handle_api_error(error);
      setLoadingUpdateUserInfo(false);
      console.error(error);
      return false;
    }
  }
  return {
    request_user_profile_details,
    loadingUserProfileDetails,
    userProfileDetails,
    userInfo,
    request_user_change_password,
    loadingUserChangePassword,
    request_update_profile_info,
    loadingUpdateUserInfo,
  };
};

export default useUserAccountSettings;
