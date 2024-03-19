import { useRecoilState } from 'recoil';
import {
  arrayAtomFamily,
  booleanAtomFamily,
  objectAtomFamily,
} from '../../Recoil/atom';
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
import { navigate } from '@/Navigation/appNavigator';
import { Toast } from '@/Components/Core/Toast';

const useUserReferral = () => {
  const [loadingUserReferralList, setLoadingUserReferralList] = useRecoilState(
    booleanAtomFamily(atomKeys.userReferral.loading_user_referral_list),
  );
  const [userReferralList, setUserReferralList] = useRecoilState<any>(
    arrayAtomFamily(atomKeys.userReferral.user_referral_list),
  );
  const [userInfo, setUserInfo] = useRecoilState(
    objectAtomFamily(atomKeys.userAuth.user_info),
  );

  const [loadingUserReferralInvites, setLoadingUserReferralInvites] =
    useRecoilState(
      booleanAtomFamily(atomKeys.userReferral.loading_user_referral_invites),
    );
  const [userReferralInvites, setUserReferralInvites] = useRecoilState<any>(
    arrayAtomFamily(atomKeys.userReferral.user_referral_invites),
  );

  const [loadingUserReferralInviteSend, setLoadingUserReferralInviteSend] =
    useRecoilState(
      booleanAtomFamily(
        atomKeys.userReferral.loading_user_referral_invite_send,
      ),
    );
  const [userReferralInviteSend, setUserReferralInviteSend] = useRecoilState(
    booleanAtomFamily(atomKeys.userReferral.user_referral_invite_send),
  );
  async function request_user_referral_list(page_no = 1) {
    try {
      setLoadingUserReferralList(true);
      const response = await user_api.user_dashboard_api(
        'user.referral.list',
        '?page=' + page_no,
      );
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data.error
      ) {
        const res = response.data.data.data;
        if (response.data.data.current_page != 1) {
          setUserReferralList(prev => [...prev, ...res]);
        } else {
          setUserReferralList(res);
        }
        setUserInfo(response.data.user);
        setLoadingUserReferralList(false);
        return res;
      } else {
        handle_api_error(
          response.problem + response.data?.error,
          'user.referral.list',
        );
        setUserReferralList([]);
        setLoadingUserReferralList(false);
        return [];
      }
    } catch (error) {
      setUserReferralList([]);
      setLoadingUserReferralList(false);
      console.error(error);
      handle_api_error(error);
      return [];
    }
  }
  async function request_user_referral_invites(page_no = 1) {
    try {
      setLoadingUserReferralInvites(true);
      const response = await user_api.user_dashboard_api(
        'user.referral.invites',
        '?page=' + page_no,
      );
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data.error
      ) {
        const res = response.data.data.data;
        if (response.data.data.current_page != 1) {
          setUserReferralInvites(prev => [...prev, ...res]);
        } else {
          setUserReferralInvites(res);
        }
        setUserInfo(response.data.user);
        setLoadingUserReferralInvites(false);
        return res;
      } else {
        handle_api_error(
          response.problem + response.data?.error,
          'user.referral.invites',
        );
        setUserReferralInvites([]);
        setLoadingUserReferralInvites(false);
        return [];
      }
    } catch (error) {
      setUserReferralInvites([]);
      setLoadingUserReferralInvites(false);
      console.error(error);
      handle_api_error(error);
      return [];
    }
  }
  async function request_user_referral_invite(user_referral_invite_email) {
    try {
      setLoadingUserReferralInviteSend(true);
      const response = await user_api.user_dashboard_post_api(
        'user.referral.invite.send',
        {
          emails: user_referral_invite_email,
        },
      );
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data.error
      ) {
        setUserInfo(response.data.user);
        setUserReferralInviteSend(true);
        setLoadingUserReferralInviteSend(false);
        if (is_app()) {
          navigate('ReferralInvites');
          Toast.successBottom(
            get_translation('user_dashboard.refer_earn.invite_sent'),
          );
        } else {
          show_success_message({
            text: get_translation('user_dashboard.refer_earn.invite_sent'),
          });
        }
        return true;
      } else {
        handle_api_error(
          response.problem + response.data?.error,
          'user.referral.invite.send',
        );
        setUserReferralInviteSend(false);
        setLoadingUserReferralInviteSend(false);
        if (is_app()) {
          Toast.errorBottom(
            response.data.data?.error
              ? get_exception_string(response.data.data)
              : response.data.msg
              ? get_api_error_string(response.data.msg)
              : get_translation(
                  'user_dashboard.refer_earn.invite_request_error',
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
                        'user_dashboard.refer_earn.invite_request_error',
                      ),
                },
          );
        }
        return {};
      }
    } catch (error) {
      setUserReferralInviteSend(false);
      setLoadingUserReferralInviteSend(false);
      console.error(error);
      handle_api_error(error);
      if (is_app()) {
        Toast.errorBottom(
          get_translation('user_dashboard.refer_earn.invite_request_error'),
        );
      } else {
        show_fail_message({
          text: get_translation(
            'user_dashboard.refer_earn.invite_request_error',
          ),
        });
      }
      return false;
    }
  }
  return {
    userInfo,
    request_user_referral_list,
    userReferralList,
    loadingUserReferralList,
    request_user_referral_invites,
    userReferralInvites,
    loadingUserReferralInvites,
    request_user_referral_invite,
    userReferralInviteSend,
    loadingUserReferralInviteSend,
  };
};

export default useUserReferral;
