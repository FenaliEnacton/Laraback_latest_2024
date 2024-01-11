import { useRecoilState } from 'recoil';
import {
  arrayAtomFamily,
  booleanAtomFamily,
  objectAtomFamily,
} from '../../Recoil/atom';
import { atomKeys } from '../../Recoil/atom-keys';
import user_api from '../../Services/user_api';
import { handle_api_error } from '../../Utils';

const useUserFav = () => {
  const [loadingUserFav, setLoadingUserFav] = useRecoilState(
    booleanAtomFamily(atomKeys.userFav.loading_user_fav),
  );
  const [userFavData, setUserFavData] = useRecoilState(
    arrayAtomFamily(atomKeys.userFav.user_fav_data),
  );
  const [userInfo, setUserInfo] = useRecoilState(
    objectAtomFamily(atomKeys.userAuth.user_info),
  );

  const [loadingUserAddFav, setLoadingUserAddFav] = useRecoilState(
    booleanAtomFamily(atomKeys.userFav.loading_user_add_fav),
  );
  const [userFavAdded, setUserFavAdded] = useRecoilState(
    booleanAtomFamily(atomKeys.userFav.user_fav_added),
  );

  const [loadingUserRemoveFav, setLoadingUserRemoveFav] = useRecoilState(
    booleanAtomFamily(atomKeys.userFav.loading_user_remove_fav),
  );
  const [userFavRemoved, setUserFavRemoved] = useRecoilState(
    booleanAtomFamily(atomKeys.userFav.user_fav_removed),
  );

  async function request_user_fav(fav_type) {
    try {
      setLoadingUserFav(true);
      const response = await user_api.user_dashboard_api(
        'user.fav.list',
        fav_type,
      );
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data.error
      ) {
        const res = response.data.data;
        setUserFavData(res);
        setUserInfo(response.data.user);
        setLoadingUserFav(false);
        return res;
      } else {
        handle_api_error(
          response.problem + response.data?.error,
          'user.fav.list',
        );
        setUserFavData([]);
        setLoadingUserFav(false);
        return {};
      }
    } catch (error) {
      setUserFavData([]);
      setLoadingUserFav(false);
      console.error(error);
      handle_api_error(error);
      return {};
    }
  }
  async function request_user_add_fav(fav_type, fav_id) {
    try {
      setLoadingUserAddFav(true);
      const response = await user_api.user_dashboard_post_api(
        'user.fav.add',
        {},
        fav_type + '/' + fav_id,
      );
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data.error
      ) {
        request_user_fav(fav_type);
        setUserFavAdded(true);
        setUserInfo(response.data.user);
        setLoadingUserAddFav(false);
        return true;
      } else {
        handle_api_error(
          response.problem + response.data?.error,
          'user.fav.add',
        );
        setUserFavAdded(false);
        setLoadingUserAddFav(false);
        return false;
      }
    } catch (error) {
      setUserFavAdded(false);
      setLoadingUserAddFav(false);
      console.error(error);
      handle_api_error(error);
      return false;
    }
  }
  async function request_user_remove_fav(fav_type, fav_id) {
    try {
      setLoadingUserRemoveFav(true);
      const response = await user_api.user_dashboard_post_api(
        'user.fav.remove',
        {},
        fav_type + '/' + fav_id,
      );
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data.error
      ) {
        request_user_fav(fav_type);
        setUserFavRemoved(true);
        setUserInfo(response.data.user);
        setLoadingUserRemoveFav(false);
        return true;
      } else {
        handle_api_error(
          response.problem + response.data?.error,
          'user.fav.remove',
        );
        setUserFavRemoved(false);
        setLoadingUserRemoveFav(false);
        return false;
      }
    } catch (error) {
      setUserFavRemoved(false);
      setLoadingUserRemoveFav(false);
      console.error(error);
      handle_api_error(error);
      return false;
    }
  }

  return {
    userInfo,
    request_user_fav,
    userFavData,
    loadingUserFav,
    request_user_add_fav,
    userFavAdded,
    loadingUserAddFav,
    request_user_remove_fav,
    userFavRemoved,
    loadingUserRemoveFav,
  };
};

export default useUserFav;
