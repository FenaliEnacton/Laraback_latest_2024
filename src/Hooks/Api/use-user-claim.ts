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
  show_success_message_with_reload,
} from '../../Utils';
import { navigate } from '../../Navigation/appNavigator';
import Toast from '@/Components/Core/Toast';

const useUserClaim = () => {
  const [loadingUserClaimList, setLoadingUserClaimList] = useRecoilState(
    booleanAtomFamily(atomKeys.userClaim.loading_user_claim_list),
  );
  const [userClaimList, setUserClaimList] = useRecoilState<any>(
    arrayAtomFamily(atomKeys.userClaim.user_claim_list),
  );
  const [userInfo, setUserInfo] = useRecoilState(
    objectAtomFamily(atomKeys.userAuth.user_info),
  );

  const [loadingUserClaimInfo, setLoadingUserClaimInfo] = useRecoilState(
    booleanAtomFamily(atomKeys.userClaim.loading_user_claim_info),
  );
  const [userClaimInfo, setUserClaimInfo] = useRecoilState(
    objectAtomFamily(atomKeys.userClaim.user_claim_info),
  );

  const [loadingUserClaimStores, setLoadingUserClaimStores] = useRecoilState(
    booleanAtomFamily(atomKeys.userClaim.loading_user_claim_stores),
  );
  const [userClaimStores, setUserClaimStores] = useRecoilState(
    objectAtomFamily(atomKeys.userClaim.user_claim_stores),
  );

  const [loadingUserClaimStoresClicks, setLoadingUserClaimStoresClicks] =
    useRecoilState(
      booleanAtomFamily(atomKeys.userClaim.loading_user_claim_stores_clicks),
    );
  const [userClaimStoresClicks, setUserClaimStoresClicks] = useRecoilState(
    objectAtomFamily(atomKeys.userClaim.user_claim_stores_clicks),
  );
  const [loadingUserClaimMake, setLoadingUserClaimMake] = useRecoilState(
    booleanAtomFamily(atomKeys.userClaim.loading_user_claim_make),
  );
  async function request_user_claim_list(page_no = 1, per_page = 10) {
    try {
      setLoadingUserClaimList(true);
      const response = await user_api.user_dashboard_api(
        'user.claim.list',
        '?page=' + page_no + '&perPage=' + per_page,
      );
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data.error
      ) {
        const res = response.data.data.data;
        if (response.data.data.current_page != 1) {
          setUserClaimList([...userClaimList, ...res]);
        }
        setUserClaimList(res);
        setUserInfo(response.data.user);
        setLoadingUserClaimList(false);
        return res;
      } else {
        setUserClaimList([]);
        setLoadingUserClaimList(false);
        return [];
      }
    } catch (error) {
      setUserClaimList([]);
      setLoadingUserClaimList(false);
      console.error(error);
      handle_api_error(error);
      return [];
    }
  }
  async function request_claim_info(user_claim_id) {
    try {
      setLoadingUserClaimInfo(true);
      const response = await user_api.user_dashboard_api(
        'user.claim.info',
        user_claim_id,
      );
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data.data.error
      ) {
        const res = response.data.data;
        navigate('ViewMissingClaim');
        setUserClaimInfo(res);
        setUserInfo(response.data.user);
        setLoadingUserClaimInfo(false);
        return res;
      } else {
        handle_api_error(response.problem + response.data?.error, '');
        setUserClaimInfo({});
        setLoadingUserClaimInfo(false);
        return {};
      }
    } catch (error) {
      setUserClaimInfo({});
      setLoadingUserClaimInfo(false);
      console.error(error);
      handle_api_error(error);
      return {};
    }
  }
  async function request_user_claim_stores() {
    try {
      setLoadingUserClaimStores(true);
      const response = await user_api.user_dashboard_api('user.claim.stores');
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data.data.error
      ) {
        const res = response.data.data;
        let default_store_id = response.data.data[0]?.store_id;
        request_user_claim_store_clicks(default_store_id);
        setUserClaimStores(res);
        setUserInfo(response.data.user);
        setLoadingUserClaimStores(false);
        return res;
      } else {
        handle_api_error(response.problem + response.data?.error, '');
        setUserClaimStores({});
        setLoadingUserClaimStores(false);
        return {};
      }
    } catch (error) {
      setUserClaimStores({});
      setLoadingUserClaimStores(false);
      console.error(error);
      handle_api_error(error);
      return {};
    }
  }

  async function request_user_claim_store_clicks(
    user_claims_store_clicks_store_id,
  ) {
    try {
      setLoadingUserClaimStoresClicks(true);
      const response = await user_api.user_dashboard_api(
        'user.claim.store.clicks',
        user_claims_store_clicks_store_id,
      );
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data.data.error
      ) {
        const res = response.data.data;
        setUserClaimStoresClicks(res);
        setUserInfo(response.data.user);
        setLoadingUserClaimStoresClicks(false);
        return res;
      } else {
        handle_api_error(response.problem + response.data?.error, '');
        setUserClaimStoresClicks({});
        setLoadingUserClaimStoresClicks(false);
        return {};
      }
    } catch (error) {
      setUserClaimStoresClicks({});
      setLoadingUserClaimStoresClicks(false);
      console.error(error);
      handle_api_error(error);
      return {};
    }
  }

  async function request_user_claim_make(
    store_id,
    click_id,
    order_id,
    platform,
    currency,
    order_amount,
    transaction_date,
    receipt,
  ) {
    try {
      setLoadingUserClaimMake(true);
      let form_body = new FormData();
      let body = {
        store_id: store_id,
        click_id: click_id,
        order_id: order_id,
        platform: platform,
        currency: currency,
        order_amount: order_amount,
        transaction_date: transaction_date,
      };

      for (let key in body) {
        form_body.append(key, body[key]);
      }
      form_body.append('receipt', {
        name: receipt.name,
        type: receipt.type,
        // type: 'image/jpeg',
        uri: receipt.uri,
      });
      const response = await user_api.user_dashboard_post_api(
        'user.claim.make',
        form_body,
        '',
        {
          'Content-Type': 'multipart/form-data',
        },
      );
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data.data.error
      ) {
        if (is_app()) {
          Toast.successBottom(
            get_translation('user_dashboard.claim.create_claim_success'),
          );
          navigate('MissingClaims');
        } else {
          await show_success_message_with_reload({
            text: get_translation('user_dashboard.claim.create_claim_success'),
          });
        }
        request_user_claim_list();
        setUserInfo(response.data.user);
        setLoadingUserClaimMake(false);
        return true;
      } else {
        handle_api_error(response.problem + response.data?.error, '');
        if (is_app()) {
          Toast.errorBottom(
            response.data.data?.error
              ? get_exception_string(response.data.data)
              : response.data.msg
              ? get_api_error_string(response.data.msg)
              : get_translation('user_dashboard.claim.claim_request_failed'),
          );
        } else {
          show_fail_message(
            response.data.data?.error
              ? { html: get_exception_string(response.data.data) }
              : {
                  text: response.data.msg
                    ? get_api_error_string(response.data.msg)
                    : get_translation(
                        'user_dashboard.claim.claim_request_failed',
                      ),
                },
          );
        }
        setLoadingUserClaimMake(false);
        return false;
      }
    } catch (error) {
      setLoadingUserClaimMake(false);
      if (is_app()) {
        Toast.errorBottom(
          get_translation('user_dashboard.claim.claim_request_failed'),
        );
      } else {
        show_fail_message({
          text: get_translation('user_dashboard.claim.claim_request_failed'),
        });
      }
      console.error(error);
      handle_api_error(error);
      return false;
    }
  }
  return {
    request_user_claim_list,
    loadingUserClaimList,
    userClaimList,
    userInfo,
    request_claim_info,
    loadingUserClaimInfo,
    userClaimInfo,
    request_user_claim_stores,
    loadingUserClaimStores,
    userClaimStores,
    request_user_claim_store_clicks,
    loadingUserClaimStoresClicks,
    userClaimStoresClicks,
    request_user_claim_make,
    loadingUserClaimMake,
  };
};

export default useUserClaim;
