import {createSelector} from 'reselect';
import {translate} from '@translations';
import _ from 'lodash';

const get_cat_name = type => {
  switch (type) {
    case 'DealCategory':
      return translate('deals');

    case 'StoreCategory':
      return translate('stores');

    case 'CouponCategory':
      return translate('offers');

    default:
      return '';
  }
};

const category_data = home_screen_data => {
  let categories = home_screen_data['procash/categories'];
  if (categories) {
    let keys = Object.keys(categories);
    let data = keys.map(e => {
      return {
        ...categories[e],
        name: get_cat_name(e),
      };
    });
    return data;
  } else {
    return [];
  }
};

const store_category_data = store_cat_details => {
  let store_keys = store_cat_details.map(e => e.alpha);
  let data_obj = {};
  for (let store = 0; store < store_cat_details.length; store++) {
    data_obj[store.alpha] = store_cat_details[store];
  }
  return {store_keys, data_obj};
};
const all_stores_chunks = all_stores => {
  let new_all_stores = all_stores;
  Object.keys(all_stores).forEach(store => {
    new_all_stores[store] = _.chunk(all_stores[store], 10);
  });

  return new_all_stores;
};
const carousel_sort_selector = params => {
  var sorted_slider = [];
  if (params.slides) {
    Object.keys(params?.slides)
      .sort(function (a, b) {
        return params.slides[b]?.sequence - params.slides[a]?.sequence;
      })
      .forEach(function (key) {
        sorted_slider.push(params.slides[key]);
      });
  }
  return sorted_slider.reverse();
};
const all_stores_keys = data => {
  let store_keys = data ? Object.keys(data) : [];
  store_keys = store_keys.sort();
  return store_keys;
};

const all_stores = data => {
  let all_stores = [];
  data
    ? Object.values(data).forEach(a => a.forEach(b => all_stores.push(b)))
    : [];
  return all_stores;
};

export const get_home_top_categories = createSelector(
  category_data,
  data => data,
);

export const get_store_cat_detail_data = createSelector(
  store_category_data,
  data => data,
);

export const get_all_stores_keys = createSelector(
  all_stores_keys,
  data => data,
);

export const get_all_stores_with_chunk = createSelector(
  all_stores_chunks,
  data => data,
);

export const get_all_stores = createSelector(all_stores, data => data);
export const get_sorted_carousel_by_seq = createSelector(
  carousel_sort_selector,
  slider => {
    return slider;
  },
);
