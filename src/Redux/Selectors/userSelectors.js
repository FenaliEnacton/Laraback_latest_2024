import { createSelector } from 'reselect';
import { Config } from '@/react-native-config';
import dayjs from 'dayjs';
const cashback_data_selector = params => {
  return {
    total: Config.CURRENCY_PREFIX + params.user_info.earning.cashback.total,
    confirmed:
      Config.CURRENCY_PREFIX + params.user_info.earning.cashback.payable,
    pending: Config.CURRENCY_PREFIX + params.user_info.earning.cashback.pending,
    paid: Config.CURRENCY_PREFIX + params.user_info.earning.paid.cashback,
  };
};
const reward_data_selector = params => {
  return {
    total: Config.CURRENCY_PREFIX + params.user_info.earning.reward.total,
    confirmed: Config.CURRENCY_PREFIX + params.user_info.earning.reward.payable,
    pending: Config.CURRENCY_PREFIX + params.user_info.earning.reward.pending,
    paid: Config.CURRENCY_PREFIX + params.user_info.earning.paid.reward,
  };
};

const user_id_selector = params => {
  return params.user_info && params.user_info.user_id;
};

const referral_code_selector = params =>
  params.user_info?.user.meta.referral_code;

const full_name_selector = params => {
  return (
    params.user_info?.user.meta.first_name +
    ' ' +
    params.user_info?.user.meta.last_name
  );
};

const member_since_selector = params => {
  return dayjs(params.user_info?.user.meta.user_registered).format(
    'DD/MM/YYYY',
  );
};

export const user_cashback_amount = createSelector(
  cashback_data_selector,
  cashback => {
    return cashback;
  },
);

export const user_reward_amount = createSelector(
  reward_data_selector,
  reward => {
    return reward;
  },
);

export const user_info_selector = createSelector(
  full_name_selector,
  member_since_selector,
  (name, member_since) => {
    return { name, member_since };
  },
);

export const is_user_logged_in = createSelector(
  user_id_selector,
  is_logged_in => is_logged_in,
);

export const get_refer_link = createSelector(
  referral_code_selector,
  code => Config.APP_URL + '/register?refcode=' + code,
);

const store_data_selectors = data => {
  let fav_data = data.user_fav_data;
  let store_data = Array.isArray(fav_data)
    ? fav_data?.find(e => e.fav_type === 'store')
    : {};
  return store_data;
};

export const get_fav_stores_ids = createSelector(
  store_data_selectors,
  store_data => {
    return store_data?.fav_ids;
  },
);
