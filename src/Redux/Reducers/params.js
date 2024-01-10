import * as types from '@app_redux/Actions/actionTypes';
import _ from 'lodash';
const initial_state = {
  home_sliders: [],
};
const params = (state = initial_state, action) => {
  switch (action.type) {
    case types.SUCCESS_FILTERED_DEALS:
      if (action.payload.filtered_deals_data?.current_page != 1) {
        let deals = _.concat(
          state.filtered_deals_data?.deals || [],
          (action.payload.filtered_deals_data?.deals &&
            action.payload.filtered_deals_data?.deals) ||
            [],
        );
        action.payload.filtered_deals_data.deals = deals;
      }
      return {...state, ...(action.payload || {})};
    case types.SUCCESS_FILTERED_COUPONS:
      if (action.payload.filtered_coupons_data?.current_page != 1) {
        let coupons = _.concat(
          state.filtered_coupons_data?.coupons || [],
          (action.payload.filtered_coupons_data?.coupons &&
            action.payload.filtered_coupons_data?.coupons) ||
            [],
        );
        action.payload.filtered_coupons_data.coupons = coupons;
      }
      return {...state, ...(action.payload || {})};

    default:
      return {...state, ...(action.payload || {})};
  }
};

export default params;
