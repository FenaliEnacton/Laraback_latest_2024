import {useRecoilState} from 'recoil';
import {booleanAtomFamily, objectAtomFamily} from '../../Recoil/atom';
import {atomKeys} from '../../Recoil/atom-keys';
import user_api from '../../Services/user_api';
import {handle_api_error} from '../../Utils';

const useUserActivity = () => {
  const [loadingUserCashbackActivity, setLoadingUserCashbackActivity] = useRecoilState(
    booleanAtomFamily(atomKeys.userActivity.loading_user_cashback_activity),
  );
  const [userActivityCashback, setUserActivityCashback] = useRecoilState(
    objectAtomFamily(atomKeys.userActivity.user_cashback_activity),
  );
  const [userInfo, setUserInfo] = useRecoilState(objectAtomFamily(atomKeys.userAuth.user_info));

  const [loadingUserBonusActivity, setLoadingUserBonusActivity] = useRecoilState(
    booleanAtomFamily(atomKeys.userActivity.loading_user_bonus_activity),
  );
  const [userActivityBonus, setUserActivityBonus] = useRecoilState(
    objectAtomFamily(atomKeys.userActivity.user_bonus_activity),
  );

  const [loadingUserReferralActivity, setLoadingUserReferralActivity] = useRecoilState(
    booleanAtomFamily(atomKeys.userActivity.loading_user_referral_activity),
  );
  const [userActivityReferral, setUserActivityReferral] = useRecoilState(
    objectAtomFamily(atomKeys.userActivity.user_referral_activity),
  );

  const [loadingUserClickActivity, setLoadingUserClickActivity] = useRecoilState(
    booleanAtomFamily(atomKeys.userActivity.loading_user_click_activity),
  );
  const [userActivityClick, setUserActivityClick] = useRecoilState(
    objectAtomFamily(atomKeys.userActivity.user_click_activity),
  );

  async function request_user_activity_cashback(user_cashback_activity_month) {
    try {
      setLoadingUserCashbackActivity(true);
      const response = await user_api.user_dashboard_api('user.activity.cashback', user_cashback_activity_month);
      if (response.ok && response.data.success && response.data.data && !response.data.error) {
        const res = response.data.data;

        setUserActivityCashback(res);
        setUserInfo(response.data.user);
        setLoadingUserCashbackActivity(false);
        return res;
      } else {
        handle_api_error(response.problem + response.data?.error, 'user.activity.cashback');
        setUserActivityCashback({});
        setLoadingUserCashbackActivity(false);
        return {};
      }
    } catch (error) {
      setUserActivityCashback({});
      setLoadingUserCashbackActivity(false);
      console.error(error);
      handle_api_error(error);
      return {};
    }
  }

  async function request_user_activity_bonus(user_bonus_activity_month) {
    try {
      setLoadingUserBonusActivity(true);
      const response = await user_api.user_dashboard_api('user.activity.bonus', user_bonus_activity_month);
      if (response.ok && response.data.success && response.data.data && !response.data.error) {
        const res = response.data.data;

        setUserActivityBonus(res);
        setUserInfo(response.data.user);
        setLoadingUserBonusActivity(false);
        return res;
      } else {
        handle_api_error(response.problem + response.data?.error, 'user.activity.bonus');
        setUserActivityBonus({});
        setLoadingUserBonusActivity(false);
        return {};
      }
    } catch (error) {
      setUserActivityBonus({});
      setLoadingUserBonusActivity(false);
      console.error(error);
      handle_api_error(error);
      return {};
    }
  }

  async function request_user_activity_referral(user_referral_activity_month) {
    try {
      setLoadingUserReferralActivity(true);
      const response = await user_api.user_dashboard_api('user.activity.referral', user_referral_activity_month);
      if (response.ok && response.data.success && response.data.data && !response.data.error) {
        const res = response.data.data;

        setUserActivityReferral(res);
        setUserInfo(response.data.user);
        setLoadingUserReferralActivity(false);
        return res;
      } else {
        handle_api_error(response.problem + response.data?.error, 'user.activity.referral');
        setUserActivityReferral({});
        setLoadingUserReferralActivity(false);
        return {};
      }
    } catch (error) {
      setUserActivityReferral({});
      setLoadingUserReferralActivity(false);
      console.error(error);
      handle_api_error(error);
      return {};
    }
  }

  async function request_user_activity_click(user_click_activity_month) {
    try {
      setLoadingUserClickActivity(true);
      const response = await user_api.user_dashboard_api('user.activity.click', user_click_activity_month);
      if (response.ok && response.data.success && response.data.data && !response.data.error) {
        const res = response.data.data;

        setUserActivityClick(res);
        setUserInfo(response.data.user);
        setLoadingUserClickActivity(false);
        return res;
      } else {
        handle_api_error(response.problem + response.data?.error, 'user.activity.click');
        setUserActivityClick({});
        setLoadingUserClickActivity(false);
        return {};
      }
    } catch (error) {
      setUserActivityClick({});
      setLoadingUserClickActivity(false);
      console.error(error);
      handle_api_error(error);
      return {};
    }
  }
  return {
    request_user_activity_cashback,
    loadingUserCashbackActivity,
    userActivityCashback,
    userInfo,
    request_user_activity_bonus,
    loadingUserBonusActivity,
    userActivityBonus,
    request_user_activity_referral,
    loadingUserReferralActivity,
    userActivityReferral,
    request_user_activity_click,
    loadingUserClickActivity,
    userActivityClick,
  };
};

export default useUserActivity;
