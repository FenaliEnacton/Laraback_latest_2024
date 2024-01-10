import { createSelector } from "reselect";

const store_data_selectors = (fav_data) => {
  let store_data = fav_data?.find((e) => e.fav_type === "store") || {};
  return store_data;
};

export const get_fav_stores = createSelector(
  store_data_selectors,
  (store_data) => {
    return store_data?.fav_data;
  }
);

export const get_fav_stores_ids = createSelector(
  store_data_selectors,
  (store_data) => {
    return store_data?.fav_ids;
  }
);
