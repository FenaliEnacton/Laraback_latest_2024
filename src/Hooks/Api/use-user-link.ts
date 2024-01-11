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
import Toast from '@/Components/Core/Toast';

const useUserLink = () => {
  const [loadingUserLinkList, setLoadingUserLinkList] = useRecoilState(
    booleanAtomFamily(atomKeys.userLink.loading_user_link_list),
  );
  const [userLinkList, setUserLinkList] = useRecoilState<any>(
    arrayAtomFamily(atomKeys.userLink.user_link_list),
  );
  const [userInfo, setUserInfo] = useRecoilState(
    objectAtomFamily(atomKeys.userAuth.user_info),
  );

  const [loadingUserLinkCreate, setLoadingUserLinkCreate] = useRecoilState(
    booleanAtomFamily(atomKeys.userLink.loading_user_link_create),
  );
  const [userLinkCreatedData, setUserLinkCreatedData] = useRecoilState(
    objectAtomFamily(atomKeys.userLink.user_link_created_data),
  );

  async function request_user_link_list(page_no = 1) {
    try {
      setLoadingUserLinkList(true);
      const response = await user_api.user_dashboard_api(
        'user.links.list',
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
          setUserLinkList(prev => [...prev, ...res]);
        } else {
          setUserLinkList(res);
        }
        setUserInfo(response.data.user);
        setLoadingUserLinkList(false);
        return res;
      } else {
        handle_api_error(
          response.problem + response.data?.error,
          'user.links.list',
        );
        setUserLinkList([]);
        setLoadingUserLinkList(false);
        return [];
      }
    } catch (error) {
      setUserLinkList([]);
      setLoadingUserLinkList(false);
      console.error(error);
      handle_api_error(error);
      return [];
    }
  }
  async function request_user_link_create(offer_link, offer_title) {
    try {
      setLoadingUserLinkCreate(true);
      const response = await user_api.user_dashboard_post_api(
        'user.link.create',
        {
          link: offer_link,
          title: offer_title,
        },
      );
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data.error
      ) {
        const res = response.data.data;

        setUserLinkCreatedData(res);
        setUserInfo(response.data.user);
        setLoadingUserLinkCreate(false);
        if (is_app()) {
          Toast.successBottom(
            get_translation('user_dashboard.share_earn.link_success_msg'),
          );
        } else {
          show_success_message({
            text: get_translation('user_dashboard.share_earn.link_success_msg'),
          });
        }
        return res;
      } else {
        handle_api_error(
          response.problem + response.data?.error,
          'user.links.create',
        );
        setUserLinkCreatedData({});
        setLoadingUserLinkCreate(false);
        if (is_app()) {
          Toast.errorBottom(
            response.data.data?.error
              ? get_exception_string(response.data.data)
              : response.data.msg
              ? get_api_error_string(response.data.msg)
              : get_translation('user_dashboard.share_earn.link_error_msg'),
          );
        } else {
          show_fail_message(
            response.data.data?.error
              ? { html: get_exception_string(response.data.data) }
              : {
                  text: response.data.msg
                    ? get_api_error_string(response.data.msg)
                    : get_translation(
                        'user_dashboard.share_earn.link_error_msg',
                      ),
                },
          );
        }
        return {};
      }
    } catch (error) {
      setUserLinkCreatedData({});
      setLoadingUserLinkCreate(false);
      console.error(error);
      handle_api_error(error);
      if (is_app()) {
        Toast.errorBottom(
          get_translation('user_dashboard.share_earn.network_error'),
        );
      } else {
        show_fail_message({
          text: get_translation('user_dashboard.share_earn.network_error'),
        });
      }
      return {};
    }
  }

  return {
    userInfo,
    request_user_link_list,
    loadingUserLinkList,
    userLinkList,
    request_user_link_create,
    loadingUserLinkCreate,
    userLinkCreatedData,
  };
};

export default useUserLink;
