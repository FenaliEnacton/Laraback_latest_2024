import {Toast} from '@components/core';
import {translate} from '@translations';
import Config from 'react-native-config';
import {useRecoilState} from 'recoil';
import {get_route_name} from '../../Assets/RouterList';
import {navigate} from '../../Navigation/appNavigator';
import {arrayAtomFamily, booleanAtomFamily, objectAtomFamily} from '../../Recoil/atom';
import {atomKeys} from '../../Recoil/atom-keys';
import {get_default_country_code, get_exception_string} from '../../Redux/USER_REDUX/Utils';
import api from '../../Services/api';

const usePublicData = () => {
  const [welcomeScreenData, setWelcomeScreenData] = useRecoilState(
    objectAtomFamily(atomKeys.publicData.welcome_screen_data),
  );
  const [loadingWelcomeScreenData, setLoadingWelcomeScreenData] = useRecoilState(
    booleanAtomFamily(atomKeys.publicData.loading_welcome_screen_data),
  );

  const [privacyTerms, setPrivacyTerms] = useRecoilState(objectAtomFamily(atomKeys.publicData.privacy_terms));
  const [loadingPrivacyTerms, setLoadingPrivacyTerms] = useRecoilState(
    booleanAtomFamily(atomKeys.publicData.loading_privacy_terms),
  );

  const [referNEarnInfo, setReferNEarnInfo] = useRecoilState(objectAtomFamily(atomKeys.publicData.refer_n_earn_info));
  const [loadingReferNEarnInfo, setLoadingReferNEarnInfo] = useRecoilState(
    booleanAtomFamily(atomKeys.publicData.loading_refer_n_earn_info),
  );

  const [loadingShareNEarnInfo, setLoadingShareNEarnInfo] = useRecoilState(
    booleanAtomFamily(atomKeys.publicData.loading_share_n_earn_info),
  );
  const [shareNEarnInfo, setShareNEarnInfo] = useRecoilState(objectAtomFamily(atomKeys.publicData.share_n_earn_info));

  const [faqs, setFaqs] = useRecoilState(arrayAtomFamily(atomKeys.publicData.faqs));
  const [loadingFaqs, setLoadingFaqs] = useRecoilState(booleanAtomFamily(atomKeys.publicData.loading_faqs));

  const [appSettings, setAppSettings] = useRecoilState(objectAtomFamily(atomKeys.publicData.app_settings));
  const [loadingAppSettings, setLoadingAppSettings] = useRecoilState(
    booleanAtomFamily(atomKeys.publicData.loading_app_settings),
  );

  const [storeCatDetails, setStoreCatDetails] = useRecoilState(objectAtomFamily(atomKeys.publicData.store_cat_details));
  const [storeCat, setStoreCat] = useRecoilState(objectAtomFamily(atomKeys.publicData.store_cat));
  const [loadingStoreCatDetails, setLoadingStoreCatDetails] = useRecoilState(
    booleanAtomFamily(atomKeys.publicData.loading_store_cat_details),
  );

  const [couponCatDetails, setCouponCatDetails] = useRecoilState(
    objectAtomFamily(atomKeys.publicData.coupon_cat_details),
  );
  const [loadingCouponCatDetails, setLoadingCouponCatDetails] = useRecoilState(
    booleanAtomFamily(atomKeys.publicData.loading_coupon_cat_details),
  );

  const [dealInfo, setDealInfo] = useRecoilState(objectAtomFamily(atomKeys.publicData.deal_info));
  const [loadingDealInfo, setLoadingDealInfo] = useRecoilState(
    booleanAtomFamily(atomKeys.publicData.loading_deal_info),
  );

  const [storeDetails, setStoreDetails] = useRecoilState(objectAtomFamily(atomKeys.publicData.store_details));
  const [loadingStoreDetails, setLoadingStoreDetails] = useRecoilState(
    booleanAtomFamily(atomKeys.publicData.loading_store_details),
  );

  const [filteredCouponData, setFilteredCouponData] = useRecoilState(
    objectAtomFamily(atomKeys.publicData.filtered_coupon_data),
  );
  const [loadingFilteredCouponData, setLoadingFilteredCouponData] = useRecoilState(
    booleanAtomFamily(atomKeys.publicData.loading_filtered_coupon_data),
  );
  const [filteredDealData, setFilteredDealData] = useRecoilState(
    objectAtomFamily(atomKeys.publicData.filtered_Deal_data),
  );
  const [loadingFilteredDealData, setLoadingFilteredDealData] = useRecoilState(
    booleanAtomFamily(atomKeys.publicData.loading_filtered_Deal_data),
  );

  const [dealFilterInfo, setDealFilterInfo] = useRecoilState(objectAtomFamily(atomKeys.publicData.deal_filter_info));
  const [loadingDealFilterInfo, setLoadingDealFilterInfo] = useRecoilState(
    booleanAtomFamily(atomKeys.publicData.loading_deal_filter_info),
  );

  const [loadingContactUs, setLoadingContactUs] = useRecoilState(
    booleanAtomFamily(atomKeys.metaData.loading_contact_us),
  );

  const [deepLinkUrlData, setDeepLinkUrlData] = useRecoilState(objectAtomFamily(atomKeys.publicData.deep_link_url));
  const [loadingDeepLinkUrl, setLoadingDeepLinkUrl] = useRecoilState(
    booleanAtomFamily(atomKeys.publicData.loading_deep_link_url),
  );

  const [bonusTypes, setBonusTypes] = useRecoilState(objectAtomFamily(atomKeys.publicData.bonus_types));
  const [loadingBonusTypes, setLoadingBonusTypes] = useRecoilState(
    booleanAtomFamily(atomKeys.publicData.loading_bonus_types),
  );

  const [homeScreenData, setHomeScreenData] = useRecoilState(objectAtomFamily(atomKeys.publicData.home_screen_data));
  const [loadingHomeScreenData, setLoadingHomeScreenData] = useRecoilState(
    booleanAtomFamily(atomKeys.publicData.loading_home_screen_data),
  );
  async function request_welcome_screen_data() {
    try {
      setLoadingWelcomeScreenData(true);
      const response = await api.publicAPI(Config.API_URL + Config.PUBLIC_PREFIX + '/welcome');
      if (response.ok && response.data.success && response.data.data && !response.data.data.error) {
        const res = response.data.data;
        setWelcomeScreenData(res);
        setLoadingWelcomeScreenData(false);
        return res;
      } else {
        setWelcomeScreenData({});
        setLoadingWelcomeScreenData(false);
        return {};
      }
    } catch (error) {
      setWelcomeScreenData({});
      setLoadingWelcomeScreenData(false);
      console.error(error);
      return {};
    }
  }
  async function request_privacy_terms() {
    try {
      setLoadingPrivacyTerms(true);
      const response = await api.publicAPI(Config.API_URL + Config.PUBLIC_PREFIX + '/privacyTerms');
      if (response.ok && response.data.success && response.data.data && !response.data.data.error) {
        const res = response.data.data;
        setPrivacyTerms(res);
        setLoadingPrivacyTerms(false);
        return res;
      } else {
        setPrivacyTerms({});
        setLoadingPrivacyTerms(false);
        return {};
      }
    } catch (error) {
      setPrivacyTerms({});
      setLoadingPrivacyTerms(false);
      console.error(error);
      return {};
    }
  }
  async function request_refer_n_earn_info() {
    try {
      setLoadingReferNEarnInfo(true);
      const response = await api.publicAPI(Config.API_URL + Config.PUBLIC_PREFIX + '/referEarn');
      if (response.ok && response.data.success && response.data.data && !response.data.data.error) {
        const res = response.data.data;
        setReferNEarnInfo(res);
        setLoadingReferNEarnInfo(false);
        return res;
      } else {
        setReferNEarnInfo({});
        setLoadingReferNEarnInfo(false);
        return {};
      }
    } catch (error) {
      setReferNEarnInfo({});
      setLoadingReferNEarnInfo(false);
      console.error(error);
      return {};
    }
  }
  async function request_share_n_earn_info() {
    try {
      setLoadingShareNEarnInfo(true);
      const response = await api.publicAPI(Config.API_URL + Config.PUBLIC_PREFIX + '/shareEarn');
      if (response.ok && response.data.success && response.data.data && !response.data.data.error) {
        const res = response.data.data;
        setShareNEarnInfo(res);
        setLoadingShareNEarnInfo(false);
        return res;
      } else {
        setLoadingShareNEarnInfo(false);
        setShareNEarnInfo({});
        return {};
      }
    } catch (error) {
      setShareNEarnInfo({});
      setLoadingShareNEarnInfo(false);
      console.error(error);
      return {};
    }
  }
  async function request_faqs() {
    try {
      setLoadingFaqs(true);
      const response = await api.publicAPI(Config.API_URL + Config.PUBLIC_PREFIX + '/faqs');
      if (response.ok && response.data.success && response.data.data && !response.data.data.error) {
        const res = response.data.data;
        setFaqs(res);
        setLoadingFaqs(false);
        return res;
      } else {
        setFaqs([]);
        setLoadingFaqs(false);
        return [];
      }
    } catch (error) {
      setFaqs([]);
      setLoadingFaqs(false);
      console.error(error);
      return [];
    }
  }
  async function request_app_settings() {
    try {
      setLoadingAppSettings(true);
      const response = await api.publicAPI(Config.API_URL + Config.PUBLIC_PREFIX + '/app/settings');
      if (response.ok && response.data.success && response.data.data && !response.data.data.error) {
        const res = response.data.data;
        setAppSettings(res);
        Config.SHOULD_VERIFY_PHONE = res?.cashback?.should_verify_phone;
        Config.CB_ICON = res?.cashback?.icon;
        Config.CURRENCIES = res?.currencies?.keys;
        Config.DEFAULT_COUNTRY_CODE = get_default_country_code(res);
        setLoadingAppSettings(false);
        return res;
      } else {
        setAppSettings({});
        setLoadingAppSettings(false);
        return {};
      }
    } catch (error) {
      setAppSettings({});
      setLoadingAppSettings(false);
      console.error(error);
      return {};
    }
  }
  async function request_store_cat_details(store_cat_id, store_cat) {
    try {
      setLoadingStoreCatDetails(true);
      setStoreCat(store_cat);
      const response = await api.publicAPI(Config.API_URL + Config.PUBLIC_PREFIX + '/app/stores/' + store_cat_id);
      if (response.ok && response.data.success && response.data.data && !response.data.data.error) {
        const res = response.data.data;
        setStoreCatDetails(res);
        navigate('StoreCatDetail');
        setLoadingStoreCatDetails(false);
        return res;
      } else {
        setStoreCatDetails({});
        setLoadingStoreCatDetails(false);
        return {};
      }
    } catch (error) {
      setStoreCatDetails({});
      setLoadingStoreCatDetails(false);
      console.error(error);
      return {};
    }
  }
  async function request_coupon_cat_details(coupon_cat_id) {
    try {
      setLoadingStoreCatDetails(true);
      const response = await api.publicAPI(Config.API_URL + Config.PUBLIC_PREFIX + '/app/catInfo/' + coupon_cat_id);
      if (response.ok && response.data.success && response.data.data && !response.data.data.error) {
        const res = response.data.data;
        setCouponCatDetails(res);
        setLoadingCouponCatDetails(false);
        navigate('CouponCatDetails');
        return res;
      } else {
        setCouponCatDetails({});
        setLoadingCouponCatDetails(false);
        return {};
      }
    } catch (error) {
      setCouponCatDetails({});
      setLoadingCouponCatDetails(false);
      console.error(error);
      return {};
    }
  }
  async function request_deal_info(deal_id) {
    try {
      setLoadingDealInfo(true);
      const response = await api.publicAPI(Config.API_URL + Config.PUBLIC_PREFIX + '/app/dealInfo/' + deal_id);
      if (response.ok && response.data.success && response.data.data && !response.data.data.error) {
        const res = response.data.data;
        setDealInfo(res);
        setLoadingDealInfo(false);
        return res;
      } else {
        setDealInfo({});
        setLoadingDealInfo(false);
        return {};
      }
    } catch (error) {
      setDealInfo({});
      setLoadingDealInfo(false);
      console.error(error);
      return {};
    }
  }
  async function request_store_details(store_id) {
    try {
      setLoadingStoreDetails(true);
      const response = await api.publicAPI(Config.API_URL + Config.PUBLIC_PREFIX + '/app/storeInfo/' + store_id);
      if (response.ok && response.data.success && response.data.data && !response.data.data.error) {
        const res = response.data.data;
        setStoreDetails(res);
        setLoadingStoreDetails(false);
        navigate('StoreDetails');
        return res;
      } else {
        setStoreDetails({});
        setLoadingStoreDetails(false);
        return {};
      }
    } catch (error) {
      setStoreDetails({});
      setLoadingStoreDetails(false);
      console.error(error);
      return {};
    }
  }
  async function request_filtered_coupons(
    coupon_filter_cats,
    coupon_filter_stores,
    coupon_filter_show_type,
    coupon_filter_order_type,
    coupon_filter_page_no,
    coupon_filter_per_page,
  ) {
    try {
      setLoadingFilteredCouponData(true);
      let body = {
        cat: coupon_filter_cats || null,
        store: coupon_filter_stores || null,
        show: coupon_filter_show_type || 'all',
        order: coupon_filter_order_type || 'popular',
        page: coupon_filter_page_no || 1,
        perPage: coupon_filter_per_page || 30,
      };
      const response = await api.publicPostAPI(Config.API_URL + Config.PUBLIC_PREFIX + '/coupons', body);
      if (response.ok && response.data.success && response.data.data && !response.data.data.error) {
        const res = response.data.data;
        setFilteredCouponData(res);
        setLoadingFilteredCouponData(false);
        return res;
      } else {
        setFilteredCouponData({});
        setLoadingFilteredCouponData(false);
        return {};
      }
    } catch (error) {
      setFilteredCouponData({});
      setLoadingFilteredCouponData(false);
      console.error(error);
      return {};
    }
  }
  async function request_filtered_deals(
    deal_filter_cats,
    deal_filter_stores,
    deal_filter_order_type,
    deal_filter_page_no,
    deal_filter_per_page,
    deal_filter_min_price,
    deal_filter_max_price,
    deal_filter_sequence,
    deal_filter_show_type,
  ) {
    try {
      setLoadingFilteredDealData(true);
      let body = {
        cat: deal_filter_cats || null,
        store: deal_filter_stores || null,
        show: deal_filter_show_type || 'all',
        order: deal_filter_order_type || 'popular',
        page: deal_filter_page_no || 1,
        perPage: deal_filter_per_page || 30,
        min_price: deal_filter_min_price || null,
        max_price: deal_filter_max_price || null,
        seq: deal_filter_sequence || 'ascending',
      };
      const response = await api.publicPostAPI(Config.API_URL + Config.PUBLIC_PREFIX + '/deals', body);
      if (response.ok && response.data.success && response.data.data && !response.data.data.error) {
        const res = response.data.data;
        setFilteredDealData(res);
        setLoadingFilteredDealData(false);
        return res;
      } else {
        setFilteredDealData({});
        setLoadingFilteredDealData(false);
        return {};
      }
    } catch (error) {
      setFilteredDealData({});
      setLoadingFilteredDealData(false);
      console.error(error);
      return {};
    }
  }
  async function request_deals_filter_info(deal_filter_cats, deal_filter_stores) {
    try {
      setLoadingDealFilterInfo(true);
      let body = {
        cat: deal_filter_cats || null,
        store: deal_filter_stores || null,
        is_data: true,
      };
      const response = await api.publicPostAPI(Config.API_URL + Config.PUBLIC_PREFIX + '/dealsFilter', body);
      if (response.ok && response.data.success && response.data.data && !response.data.data.error) {
        const res = response.data.data;
        setDealFilterInfo(res);
        setLoadingDealFilterInfo(false);
        return res;
      } else {
        setDealFilterInfo({});
        setLoadingDealFilterInfo(false);
        return {};
      }
    } catch (error) {
      setDealFilterInfo({});
      setLoadingDealFilterInfo(false);
      console.error(error);
      return {};
    }
  }
  async function request_contact_us(name, email, subject, message) {
    try {
      setLoadingContactUs(true);
      let body = {
        name: name,
        email: email,
        message: message,
        reason: subject,
      };
      const response = await api.publicPostAPI(Config.API_URL + Config.PUBLIC_PREFIX + '/contactUs', body);
      if (response.ok && response.data.success && response.data.data && !response.data.data.error) {
        const res = response.data.data;
        setLoadingContactUs(false);
        Toast.successBottom(translate('request_sent_successfully'));
        navigate('Home');
        return res;
      } else {
        let message = response.data.data?.error
          ? get_exception_string(response.data.data)
          : response.data.msg
          ? response.data.msg
          : '';
        Toast.errorBottom(message ? message : translate('request_failed'));
        setLoadingContactUs(false);
        return {};
      }
    } catch (error) {
      setLoadingContactUs(false);
      Toast.errorBottom(translate('request_failed'));
      console.error(error);
      return {};
    }
  }
  async function request_get_id_by_url(obj_type, slug) {
    try {
      setLoadingDeepLinkUrl(true);
      const response = await api.publicAPI(Config.API_URL + Config.PUBLIC_PREFIX + `/app/deeplink/${obj_type}/${slug}`);
      if (response.ok) {
        let route_name = get_route_name(obj_type);
        const res = response.data.data;
        switch (route_name) {
          case 'AllStores':
          case 'AllDeals':
          case 'AllStoreCategories':
          case 'AllCouponCategories':
            navigate(route_name);
            break;
          case 'CouponCatDetails':
            if (response.ok && response.data.success && response.data.data && !response.data.data.error) {
              request_coupon_cat_details(response.data.data.id);
            }
            break;
          case 'StoreCatDetail':
            if (response.ok && response.data.success && response.data.data && !response.data.data.error) {
              request_store_cat_details(response.data.data.id, response.data.data);
            }
            break;
          case 'StoreDetails':
            if (response.ok && response.data.success && response.data.data && !response.data.data.error) {
              request_store_details(response.data.data.id);
            }
            break;
          default:
            break;
        }
        setDeepLinkUrlData(res);
        setLoadingDeepLinkUrl(false);
        return res;
      } else {
        setDeepLinkUrlData({});
        setLoadingDeepLinkUrl(false);
        return {};
      }
    } catch (error) {
      setDeepLinkUrlData({});
      setLoadingDeepLinkUrl(false);
      console.error(error);
      return {};
    }
  }
  async function request_bonus_types() {
    try {
      setLoadingBonusTypes(true);
      const response = await api.publicAPI(Config.API_URL + Config.PUBLIC_PREFIX + '/bonusTypes');
      if (response.ok && response.data.success && response.data.data && !response.data.data.error) {
        const res = response.data.data;
        setBonusTypes(res);
        setLoadingBonusTypes(false);
        return res;
      } else {
        setBonusTypes({});
        setLoadingBonusTypes(false);
        return {};
      }
    } catch (error) {
      setBonusTypes({});
      setLoadingBonusTypes(false);
      console.error(error);
      return {};
    }
  }
  async function request_app_home_screen_data() {
    try {
      setLoadingHomeScreenData(true);
      const response = await api.publicAPI(Config.API_URL + Config.PUBLIC_PREFIX + '/apphome');
      if (response.ok && response.data.success && response.data.data && !response.data.data.error) {
        const res = response.data.data;
        setHomeScreenData(res);
        setLoadingHomeScreenData(false);
        return res;
      } else {
        setHomeScreenData({});
        setLoadingHomeScreenData(false);
        return {};
      }
    } catch (error) {
      setHomeScreenData({});
      setLoadingHomeScreenData(false);
      console.error(error);
      return {};
    }
  }

  return {
    request_welcome_screen_data,
    welcomeScreenData,
    loadingWelcomeScreenData,
    request_privacy_terms,
    privacyTerms,
    loadingPrivacyTerms,
    request_refer_n_earn_info,
    referNEarnInfo,
    loadingReferNEarnInfo,
    request_share_n_earn_info,
    shareNEarnInfo,
    loadingShareNEarnInfo,
    request_faqs,
    faqs,
    loadingFaqs,
    request_app_settings,
    appSettings,
    loadingAppSettings,
    request_store_cat_details,
    storeCat,
    storeCatDetails,
    loadingStoreCatDetails,
    request_coupon_cat_details,
    couponCatDetails,
    loadingCouponCatDetails,
    request_deal_info,
    dealInfo,
    loadingDealInfo,
    request_store_details,
    storeDetails,
    loadingStoreDetails,
    request_filtered_coupons,
    filteredCouponData,
    loadingFilteredCouponData,
    request_filtered_deals,
    filteredDealData,
    loadingFilteredDealData,
    request_deals_filter_info,
    dealFilterInfo,
    loadingDealFilterInfo,
    request_contact_us,
    loadingContactUs,
    request_get_id_by_url,
    deepLinkUrlData,
    loadingDeepLinkUrl,
    request_bonus_types,
    loadingBonusTypes,
    bonusTypes,
    request_app_home_screen_data,
    loadingHomeScreenData,
    homeScreenData,
  };
};

export default usePublicData;
