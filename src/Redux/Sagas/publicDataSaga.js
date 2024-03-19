import { takeEvery, call, put } from 'redux-saga/effects';
import * as types from '../Actions/actionTypes';
// import {API} from '../Services/Api';
import api from '../Services/api';
import * as public_actions from '../Actions/publicDataActions';
import { navigate } from '../../Navigation/appNavigator';
import Config from '../../react-native-config';
// import { get_route_name } from '@assets/RouterList';
import {
  get_default_country_code,
  get_exception_string,
} from '../USER_REDUX/Utils/index';
import { translate } from '@/translations';
import { Toast } from '@/Components/Core/Toast';
import { get_route_name } from '@/Assets/RouterList';
export function* watch_public_data_request() {
  yield takeEvery(types.REQUEST_HOME_SCREEN_DATA, request_home_screen_data);
  yield takeEvery(
    types.REQUEST_WELCOME_SCREEN_DATA,
    request_welcome_screen_data,
  );
  yield takeEvery(types.REQUEST_PRIVACY_TERMS, request_privacy_terms);
  yield takeEvery(types.REQUEST_REFER_N_EARN_INFO, request_refer_n_earn_info);
  yield takeEvery(types.REQUEST_SHARE_N_EARN_INFO, request_share_n_earn_info);
  yield takeEvery(types.REQUEST_FAQS, request_faqs);
  yield takeEvery(types.REQUEST_STORE_CAT_DETAILS, request_store_cat_details);
  yield takeEvery(types.REQUEST_COUPON_CAT_DETAILS, request_coupon_cat_details);
  yield takeEvery(types.REQUEST_FILTERED_COUPONS, request_filtered_coupons);
  yield takeEvery(types.REQUEST_FILTERED_DEALS, request_filtered_deals);
  yield takeEvery(types.REQUEST_DEALS_FILTER_INFO, request_deals_filter_info);
  yield takeEvery(types.REQUEST_DEAL_INFO, request_deal_info);
  yield takeEvery(types.REQUEST_STORE_DETAILS, request_store_details);
  yield takeEvery(types.REQUEST_APP_SETTINGS, request_app_settings);
  yield takeEvery(types.REQUEST_CONTACT_US, request_contact_us);
  yield takeEvery(types.REQUEST_GET_ID_BY_URL, request_get_id_by_url);
  yield takeEvery(types.REQUEST_BONUS_TYPES, request_bonus_types);
  yield takeEvery(
    types.REQUEST_APP_HOME_SCREEN_DATA,
    request_app_home_screen_data,
  );
}

function* request_home_screen_data() {
  try {
    const response = yield call(
      api.publicAPI,
      Config.API_URL + Config.PUBLIC_PREFIX + '/home',
    );
    // console.log(response);
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_home_screen_data(response.data.data));
    } else {
      yield put(public_actions.failed_home_screen_data());
    }
  } catch (error) {
    yield put(public_actions.failed_home_screen_data());
    console.log(error);
  }
}

function* request_welcome_screen_data() {
  try {
    const response = yield call(
      api.publicAPI,
      Config.API_URL + Config.PUBLIC_PREFIX + '/welcome',
    );
    console.log(response);
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_welcome_screen_data(response.data.data));
    } else {
      yield put(public_actions.failed_welcome_screen_data());
    }
  } catch (error) {
    yield put(public_actions.failed_welcome_screen_data());
    console.log(error);
  }
}

function* request_privacy_terms() {
  try {
    const response = yield call(
      api.publicAPI,
      Config.API_URL + Config.PUBLIC_PREFIX + '/privacyTerms',
    );
    // console.log(response);
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_privacy_terms(response.data.data));
    } else {
      yield put(public_actions.failed_privacy_terms());
    }
  } catch (error) {
    yield put(public_actions.failed_privacy_terms());
    console.log(error);
  }
}

function* request_refer_n_earn_info() {
  try {
    const response = yield call(
      api.publicAPI,
      Config.API_URL + Config.PUBLIC_PREFIX + '/referEarn',
    );
    console.log(response);
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_refer_n_earn_info(response.data.data));
    } else {
      yield put(public_actions.failed_refer_n_earn_info());
    }
  } catch (error) {
    yield put(public_actions.failed_refer_n_earn_info());
    console.log(error);
  }
}

function* request_share_n_earn_info() {
  try {
    const response = yield call(
      api.publicAPI,
      Config.API_URL + Config.PUBLIC_PREFIX + '/shareEarn',
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_share_n_earn_info(response.data.data));
    } else {
      yield put(public_actions.failed_share_n_earn_info());
    }
  } catch (error) {
    yield put(public_actions.failed_share_n_earn_info());
    console.log(error);
  }
}

function* request_faqs() {
  try {
    const response = yield call(
      api.publicAPI,
      Config.API_URL + Config.PUBLIC_PREFIX + '/faqs',
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_faqs(response.data.data));
    } else {
      yield put(public_actions.failed_faqs());
    }
  } catch (error) {
    yield put(public_actions.failed_faqs());
    console.log(error);
  }
}

function* request_app_settings() {
  try {
    const response = yield call(
      api.publicAPI,
      Config.API_URL + Config.PUBLIC_PREFIX + '/app/settings',
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      let app_settings = response.data.data;
      if (app_settings?.web?.date_format_js) {
        // Config.DATE_FORMAT = app_settings?.web?.date_format_js;
      }
      Config.CB_ICON = app_settings?.cashback?.icon;
      Config.CURRENCIES = app_settings?.currencies?.keys;
      (Config.DEFAULT_COUNTRY_CODE = get_default_country_code(app_settings)),
        yield put(public_actions.success_app_settings(response.data.data));
    } else {
      yield put(public_actions.failed_app_settings());
    }
  } catch (error) {
    yield put(public_actions.failed_app_settings());
    console.log(error);
  }
}

function* request_store_cat_details(action) {
  try {
    const response = yield call(
      api.publicAPI,
      Config.API_URL +
        Config.PUBLIC_PREFIX +
        '/app/stores/' +
        action.payload.store_cat_id,
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_store_cat_details(response.data.data));
      navigate('StoreCatDetail');
    } else {
      yield put(public_actions.failed_store_cat_details());
    }
  } catch (error) {
    yield put(public_actions.failed_store_cat_details());
    console.log(error);
  }
}

function* request_coupon_cat_details(action) {
  try {
    const response = yield call(
      api.publicAPI,
      Config.API_URL +
        Config.PUBLIC_PREFIX +
        '/app/catInfo/' +
        action.payload.coupon_cat_id,
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_coupon_cat_details(response.data.data));
      navigate('CouponCatDetails');
    } else {
      yield put(public_actions.failed_coupon_cat_details());
    }
  } catch (error) {
    yield put(public_actions.failed_coupon_cat_details());
    console.log(error);
  }
}

function* request_deal_info(action) {
  try {
    const response = yield call(
      api.publicAPI,
      Config.API_URL +
        Config.PUBLIC_PREFIX +
        '/app/dealInfo/' +
        action.payload.deal_id,
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_deal_info(response.data.data));
    } else {
      yield put(public_actions.failed_deal_info());
    }
  } catch (error) {
    yield put(public_actions.failed_deal_info());
    console.log(error);
  }
}

function* request_store_details(action) {
  try {
    const response = yield call(
      api.publicAPI,
      Config.API_URL +
        Config.PUBLIC_PREFIX +
        '/app/storeInfo/' +
        action.payload.store_id,
    );
    console.log(response);
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_store_details(response.data.data));
      navigate('StoreDetails');
    } else {
      yield put(public_actions.failed_store_details());
    }
  } catch (error) {
    yield put(public_actions.failed_store_details());
    console.log(error);
  }
}

function* request_filtered_coupons(action) {
  try {
    let body = {
      cat: action.payload.coupon_filter_cats || null,
      store: action.payload.coupon_filter_stores || null,
      show: action.payload.coupon_filter_show_type || 'all',
      order: action.payload.coupon_filter_order_type || 'popular',
      page: action.payload.coupon_filter_page_no || 1,
      perPage: action.payload.coupon_filter_per_page || 30,
    };
    const response = yield call(
      api.publicPostAPI,
      Config.API_URL + Config.PUBLIC_PREFIX + '/coupons',
      body,
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_filtered_coupons(response.data.data));
    } else {
      yield put(public_actions.failed_filtered_coupons());
    }
  } catch (error) {
    yield put(public_actions.failed_filtered_coupons());
    console.log(error);
  }
}

function* request_filtered_deals(action) {
  try {
    let body = {
      cat: action.payload.deal_filter_cats || null,
      store: action.payload.deal_filter_stores || null,
      show: action.payload.deal_filter_show_type || 'all',
      order: action.payload.deal_filter_order_type || 'popular',
      page: action.payload.deal_filter_page_no || 1,
      perPage: action.payload.deal_filter_per_page || 30,
      min_price: action.payload.deal_filter_min_price || null,
      max_price: action.payload.deal_filter_max_price || null,
      seq: action.payload.deal_filter_sequence || 'ascending',
    };
    const response = yield call(
      api.publicPostAPI,
      Config.API_URL + Config.PUBLIC_PREFIX + '/deals',
      body,
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_filtered_deals(response.data.data));
    } else {
      yield put(public_actions.failed_filtered_deals());
    }
  } catch (error) {
    yield put(public_actions.failed_filtered_deals());
    console.log(error);
  }
}

function* request_deals_filter_info(action) {
  try {
    let body = {
      cat: action.payload.deal_filter_cats || null,
      store: action.payload.deal_filter_stores || null,
      is_data: true,
    };
    const response = yield call(
      api.publicPostAPI,
      Config.API_URL + Config.PUBLIC_PREFIX + '/dealsFilter',
      body,
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_deals_filter_info(response.data.data));
    } else {
      yield put(public_actions.failed_deals_filter_info());
    }
  } catch (error) {
    yield put(public_actions.failed_deals_filter_info());
    console.log(error);
  }
}

function* request_contact_us(action) {
  try {
    let body = {
      name: action.payload.name,
      email: action.payload.email,
      message: action.payload.message,
      reason: action.payload.subject,
    };
    const response = yield call(
      api.publicPostAPI,
      Config.API_URL + Config.PUBLIC_PREFIX + '/contactUs',
      body,
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_contact_us(response.data.data));
      Toast.successBottom(translate('request_sent_successfully'));
      navigate('Home');
    } else {
      let message = response.data.data?.error
        ? get_exception_string(response.data.data)
        : response.data.msg
        ? response.data.msg
        : '';
      yield put(public_actions.failed_contact_us());
      Toast.errorBottom(message ? message : translate('request_failed'));
    }
  } catch (error) {
    yield put(public_actions.failed_contact_us());
    Toast.errorBottom(translate('request_failed'));
    console.log(error);
  }
}

function* request_get_id_by_url(action) {
  try {
    const response = yield call(
      api.publicAPI,
      Config.API_URL +
        Config.PUBLIC_PREFIX +
        `/app/deeplink/${action.payload.obj_type}/${action.payload.slug}`,
    );
    // console.log(response);
    if (response.ok) {
      let route_name = get_route_name(action.payload.obj_type);
      switch (route_name) {
        case 'AllStores':
        case 'AllDeals':
        case 'AllStoreCategories':
        case 'AllCouponCategories':
          navigate(route_name);
          break;
        case 'CouponCatDetails':
          if (
            response.ok &&
            response.data.success &&
            response.data.data &&
            !response.data.data.error
          ) {
            yield put(
              public_actions.request_coupon_cat_details(response.data.data.id),
            );
          }
          break;
        case 'StoreCatDetail':
          if (
            response.ok &&
            response.data.success &&
            response.data.data &&
            !response.data.data.error
          ) {
            yield put(
              public_actions.request_store_cat_details(
                response.data.data.id,
                response.data.data,
              ),
            );
          }
          break;
        case 'StoreDetails':
          if (
            response.ok &&
            response.data.success &&
            response.data.data &&
            !response.data.data.error
          ) {
            yield put(
              public_actions.request_store_details(response.data.data.id),
            );
          }
          break;
        default:
          break;
      }
      yield put(public_actions.success_get_id_by_url(response.data.data));
    } else {
      yield put(public_actions.failed_get_id_by_url());
    }
  } catch (error) {
    yield put(public_actions.failed_get_id_by_url());
    console.log(error);
  }
}
function* request_bonus_types(action) {
  try {
    const response = yield call(
      api.publicAPI,
      Config.API_URL + `/public/bonusTypes`,
    );
    console.log(response);
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      const res = response.data;

      yield put(public_actions.success_bonus_types(res.data));
    } else {
      yield put(public_actions.failed_bonus_types());
    }
  } catch (error) {
    yield put(public_actions.failed_bonus_types());
    console.log(error);
  }
}
function* request_app_home_screen_data() {
  try {
    const response = yield call(
      api.publicAPI,
      Config.API_URL + Config.PUBLIC_PREFIX + '/apphome',
    );
    console.log(response);
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(
        public_actions.success_app_home_screen_data(response.data.data),
      );
    } else {
      yield put(public_actions.failed_app_home_screen_data());
    }
  } catch (error) {
    yield put(public_actions.failed_app_home_screen_data());
    console.log(error);
  }
}
