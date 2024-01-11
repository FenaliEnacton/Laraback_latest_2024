import { useRecoilState } from 'recoil';
import { booleanAtomFamily, objectAtomFamily } from '../../Recoil/atom';
import { atomKeys } from '../../Recoil/atom-keys';
import user_api from '../../Services/user_api';
import { handle_api_error } from '../../Utils';

const useUserSummary = () => {
  const [loadingUserCashbackSummary, setLoadingUserCashbackSummary] =
    useRecoilState(
      booleanAtomFamily(atomKeys.userSummary.loading_user_cashback_summary),
    );
  const [userCashbackSummary, setUserCashbackSummary] = useRecoilState(
    objectAtomFamily(atomKeys.userSummary.user_cashback_summary),
  );
  const [userInfo, setUserInfo] = useRecoilState(
    objectAtomFamily(atomKeys.userAuth.user_info),
  );

  const [loadingUserBonusSummary, setLoadingUserBonusSummary] = useRecoilState(
    booleanAtomFamily(atomKeys.userSummary.loading_user_bonus_summary),
  );
  const [userBonusSummary, setUserBonusSummary] = useRecoilState(
    objectAtomFamily(atomKeys.userSummary.user_bonus_summary),
  );

  const [loadingUserReferralSummary, setLoadingUserReferralSummary] =
    useRecoilState(
      booleanAtomFamily(atomKeys.userSummary.loading_user_referral_summary),
    );
  const [userReferralSummary, setUserReferralSummary] = useRecoilState(
    objectAtomFamily(atomKeys.userSummary.user_referral_summary),
  );

  const [loadingUserClicksSummary, setLoadingUserClicksSummary] =
    useRecoilState(
      booleanAtomFamily(atomKeys.userSummary.loading_user_clicks_summary),
    );
  const [userClicksSummary, setUserClicksSummary] = useRecoilState(
    objectAtomFamily(atomKeys.userSummary.user_clicks_summary),
  );

  const [loadingUserPaymentSummary, setLoadingUserPaymentSummary] =
    useRecoilState(
      booleanAtomFamily(atomKeys.userSummary.loading_user_payment_summary),
    );
  const [userPaymentSummary, setUserPaymentSummary] = useRecoilState(
    objectAtomFamily(atomKeys.userSummary.user_payment_summary),
  );

  async function request_user_cashback_summary() {
    try {
      setLoadingUserCashbackSummary(true);
      const response = await user_api.user_dashboard_api(
        'user.summary.cashback',
      );
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data.error
      ) {
        const res = response.data.data;
        setUserCashbackSummary(res);
        setUserInfo(response.data.user);
        setLoadingUserCashbackSummary(false);
        return res;
      } else {
        handle_api_error(
          response.problem + response.data?.error,
          'user.summary.cashback',
        );
        setUserCashbackSummary({});
        setLoadingUserCashbackSummary(false);
        return {};
      }
    } catch (error) {
      setUserCashbackSummary({});
      setLoadingUserCashbackSummary(false);
      console.error(error);
      handle_api_error(error);
      return {};
    }
  }
  async function request_user_bonus_summary() {
    try {
      setLoadingUserBonusSummary(true);
      const response = await user_api.user_dashboard_api('user.summary.bonus');
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data.error
      ) {
        const res = response.data.data;
        setUserBonusSummary(res);
        setUserInfo(response.data.user);
        setLoadingUserBonusSummary(false);
        return res;
      } else {
        handle_api_error(
          response.problem + response.data?.error,
          'user.summary.bonus',
        );
        setUserBonusSummary({});
        setLoadingUserBonusSummary(false);
        return {};
      }
    } catch (error) {
      setUserBonusSummary({});
      setLoadingUserBonusSummary(false);
      console.error(error);
      handle_api_error(error);
      return {};
    }
  }

  async function request_user_referral_summary() {
    try {
      setLoadingUserReferralSummary(true);
      const response = await user_api.user_dashboard_api(
        'user.summary.referral',
      );
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data.error
      ) {
        const res = response.data.data;
        setUserReferralSummary(res);
        setUserInfo(response.data.user);
        setLoadingUserReferralSummary(false);
        return res;
      } else {
        handle_api_error(
          response.problem + response.data?.error,
          'user.summary.referral',
        );
        setUserReferralSummary({});
        setLoadingUserReferralSummary(false);
        return {};
      }
    } catch (error) {
      setUserReferralSummary({});
      setLoadingUserReferralSummary(false);
      console.error(error);
      handle_api_error(error);
      return {};
    }
  }
  async function request_user_clicks_summary() {
    try {
      setLoadingUserClicksSummary(true);
      const response = await user_api.user_dashboard_api('user.summary.clicks');
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data.error
      ) {
        const res = response.data.data;
        setUserClicksSummary(res);
        setUserInfo(response.data.user);
        setLoadingUserClicksSummary(false);
        return res;
      } else {
        handle_api_error(
          response.problem + response.data?.error,
          'user.summary.clicks',
        );
        setUserClicksSummary({});
        setLoadingUserClicksSummary(false);
        return {};
      }
    } catch (error) {
      setUserClicksSummary({});
      setLoadingUserClicksSummary(false);
      console.error(error);
      handle_api_error(error);
      return {};
    }
  }
  async function request_user_payment_summary() {
    try {
      setLoadingUserPaymentSummary(true);
      const response = await user_api.user_dashboard_api(
        'user.summary.payment',
      );
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data.error
      ) {
        const res = response.data.data;
        setUserPaymentSummary(res);
        setUserInfo(response.data.user);
        setLoadingUserPaymentSummary(false);
        return res;
      } else {
        handle_api_error(
          response.problem + response.data?.error,
          'user.summary.payment',
        );
        setUserPaymentSummary({});
        setLoadingUserPaymentSummary(false);
        return {};
      }
    } catch (error) {
      setUserPaymentSummary({});
      setLoadingUserPaymentSummary(false);
      console.error(error);
      handle_api_error(error);
      return {};
    }
  }

  return {
    userInfo,
    request_user_cashback_summary,
    loadingUserCashbackSummary,
    userCashbackSummary,
    request_user_bonus_summary,
    loadingUserBonusSummary,
    userBonusSummary,
    request_user_referral_summary,
    loadingUserReferralSummary,
    userReferralSummary,
    request_user_clicks_summary,
    loadingUserClicksSummary,
    userClicksSummary,
    request_user_payment_summary,
    loadingUserPaymentSummary,
    userPaymentSummary,
  };
};

export default useUserSummary;
