import {useRecoilState, useSetRecoilState} from 'recoil';
import {booleanAtomFamily, objectAtomFamily} from '../../Recoil/atom';
import {atomKeys} from '../../Recoil/atom-keys';
import Config from 'react-native-config';
import api from '../../Services/api';

const useMetaData = () => {
  const [allStores, setAllStores] = useRecoilState(objectAtomFamily(atomKeys.metaData.all_store));
  const [allStoresLoading, setAllStoresLoading] = useRecoilState(
    booleanAtomFamily(atomKeys.metaData.loading_all_store),
  );

  const [allCategories, setAllCategories] = useRecoilState(objectAtomFamily(atomKeys.metaData.all_categories));
  const [allCategoriesLoading, setAllCategoriesLoading] = useRecoilState(
    booleanAtomFamily(atomKeys.metaData.loading_all_categories),
  );

  const [storesAlphaCharList, setStoresAlphaCharList] = useRecoilState(
    objectAtomFamily(atomKeys.metaData.stores_alpha_char_list),
  );
  const [storesAlphaCharListLoading, setStoresAlphaCharListLoading] = useRecoilState(
    booleanAtomFamily(atomKeys.metaData.loading_stores_alpha_char_list),
  );

  const [storesByAlpha, setStoresByAlpha] = useRecoilState(objectAtomFamily(atomKeys.metaData.stores_by_alpha));
  const [storesByAlphaLoading, setStoresByAlphaLoading] = useRecoilState(
    booleanAtomFamily(atomKeys.metaData.loading_stores_by_alpha),
  );

  async function request_all_stores() {
    try {
      setAllStoresLoading(true);
      const response = await api.publicAPI(Config.API_URL + Config.PUBLIC_PREFIX + '/app/stores');
      if (response.ok) {
        const res = response.data;
        setAllStores(res.data);
        setAllStoresLoading(false);
        return res.data;
      } else {
        setAllStores({});
        setAllStoresLoading(false);
        return {};
      }
    } catch (error) {
      setAllStores({});
      setAllStoresLoading(false);
      console.error(error);
      return {};
    }
  }
  async function request_all_categories(cat_type) {
    try {
      setAllCategoriesLoading(true);
      const response = await api.publicAPI(Config.API_URL + Config.PUBLIC_PREFIX + '/categories/' + cat_type);
      if (response.ok && response.data?.data) {
        const res = {};
        res[cat_type] = response.data?.data;
        setAllCategories(res);
        setAllCategoriesLoading(false);
        return res;
      } else {
        setAllCategories({});
        setAllCategoriesLoading(false);
        return {};
      }
    } catch (error) {
      setAllCategories({});
      setAllCategoriesLoading(false);
      console.error(error);
      return {};
    }
  }
  async function requestStoresAlphaCharList() {
    try {
      setStoresAlphaCharListLoading(true);
      const response = await api.publicAPI(Config.API_URL + Config.PUBLIC_PREFIX + '/app/storeAlphaList');

      if (response.ok && response.data.data) {
        const res = response.data;
        setStoresAlphaCharList(res.data);
        const firstStore = response?.data ? response.data.data[0] : '';
        requestStoresByAlpha(firstStore);
        setStoresAlphaCharListLoading(false);

        return res.data;
      } else {
        setStoresAlphaCharList({});
        setStoresAlphaCharListLoading(false);
        return {};
      }
    } catch (error) {
      setStoresAlphaCharList({});
      setStoresAlphaCharListLoading(false);
      console.error(error);
      return {};
    }
  }
  async function requestStoresByAlpha(stores_alpha_char) {
    let api_url = Config.API_URL + Config.PUBLIC_PREFIX + '/app/storesbyAlpha/' + encodeURIComponent(stores_alpha_char);
    try {
      setStoresByAlphaLoading(true);
      const response = await api.publicAPI(api_url);

      if (response.ok) {
        const res = response.data;
        setStoresByAlpha(res.data);
        setStoresByAlphaLoading(false);
        return res.data;
      } else {
        setStoresByAlpha({});
        setStoresByAlphaLoading(false);
        return {};
      }
    } catch (error) {
      setStoresByAlpha({});
      console.error(error);
      setStoresByAlphaLoading(false);
      return {};
    }
  }

  return {
    request_all_stores,
    allStores,
    allStoresLoading,
    request_all_categories,
    allCategories,
    allCategoriesLoading,
    requestStoresAlphaCharList,
    storesAlphaCharList,
    storesAlphaCharListLoading,
    requestStoresByAlpha,
    storesByAlpha,
    storesByAlphaLoading,
  };
};

export default useMetaData;
