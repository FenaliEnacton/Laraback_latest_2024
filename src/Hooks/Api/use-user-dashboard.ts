import Toast from '@/Components/Core/Toast';
import { translate } from '@/translations';
import { useRecoilState } from 'recoil';
import { booleanAtomFamily, objectAtomFamily } from '../../Recoil/atom';
import { atomKeys } from '../../Recoil/atom-keys';
import user_api from '../../Services/user_api';
import { handle_api_error, is_app } from '../../Utils';

const useUserDashboard = () => {
  const [loadingUserDashboard, setLoadingUserDashboard] = useRecoilState(
    booleanAtomFamily(atomKeys.userDashboard.loading_user_dashboard),
  );
  const [userDashboardData, setUserDashboardData] = useRecoilState(
    objectAtomFamily(atomKeys.userDashboard.user_dashboard_data),
  );
  const [userInfo, setUserInfo] = useRecoilState(
    objectAtomFamily(atomKeys.userAuth.user_info),
  );

  const [loadingUserModules, setLoadingUserModules] = useRecoilState(
    booleanAtomFamily(atomKeys.userDashboard.loading_user_modules),
  );
  const [userModules, setUserModules] = useRecoilState(
    objectAtomFamily(atomKeys.userDashboard.user_modules),
  );

  async function request_user_dashboard(show_welcome_msg) {
    try {
      setLoadingUserDashboard(true);
      const response = await user_api.user_dashboard_api('user.dashboard');
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data.error
      ) {
        const res = response.data.data;
        setUserDashboardData(res);
        setUserInfo(response.data.user);
        setLoadingUserDashboard(false);
        if (is_app() && show_welcome_msg) {
          Toast.showBottom(
            translate('welcome') + ' ' + response.data.user?.first_name,
          );
        }
        return res;
      } else {
        handle_api_error(
          response.problem + response.data?.error,
          'user.dashboard',
        );
        setUserDashboardData({});
        setLoadingUserDashboard(false);
        return {};
      }
    } catch (error) {
      setUserDashboardData({});
      setLoadingUserDashboard(false);
      console.error(error);
      handle_api_error(error);
      return {};
    }
  }
  async function request_user_modules() {
    try {
      setLoadingUserModules(true);
      const response = await user_api.user_dashboard_api('user.modules');
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data.error
      ) {
        const res = response.data.data;
        setUserModules(res);
        setLoadingUserModules(false);
        return res;
      } else {
        handle_api_error(
          response.problem + response.data?.error,
          'user.modules',
        );
        setUserModules({});
        setLoadingUserModules(false);
        return {};
      }
    } catch (error) {
      setUserModules({});
      setLoadingUserModules(false);
      console.error(error);
      handle_api_error(error);
      return {};
    }
  }

  return {
    userInfo,
    request_user_dashboard,
    loadingUserDashboard,
    userDashboardData,
    request_user_modules,
    loadingUserModules,
    userModules,
  };
};

export default useUserDashboard;
