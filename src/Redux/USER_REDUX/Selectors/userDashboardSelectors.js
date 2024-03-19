import { createSelector } from 'reselect';
import { get_formatted_currency } from '../Utils';
// import Config from "react-native-config";
import dayjs from 'dayjs';
import { Config } from '@/react-native-config';

const cashback_data_selector = params => {
  return {
    total: get_formatted_currency(params.earning?.cashback.total),
    confirmed: get_formatted_currency(params.earning?.cashback.payable),
    pending: get_formatted_currency(params.earning?.cashback.pending),
    paid: get_formatted_currency(params.earning?.paid.cashback),
  };
};

const reward_data_selector = params => {
  return {
    total: get_formatted_currency(params.earning?.reward.total),
    confirmed: get_formatted_currency(params.earning?.reward.payable),
    pending: get_formatted_currency(params.earning?.reward.pending),
    paid: get_formatted_currency(params.earning?.paid.reward),
  };
};

// const total_amount_data_selector = (params) => {
//   return {
//     total: get_formatted_currency(params.earning?.total.payable),
//     cashback: get_formatted_currency(params.earning?.total.cashback),
//     reward: get_formatted_currency(
//       params.earning?.total.reward - params.earning?.paid.reward,
//     ),
//     paid: get_formatted_currency(params.earning?.total.paid),
//   };
// };

const lifetime_earning_selector = params => {
  let total_amount =
    params.earning?.total.cashback + params.earning?.total.reward;
  return get_formatted_currency(total_amount);
};

const full_name_selector = params => {
  return (
    (params.user_info?.first_name ? params.user_info?.first_name : '') +
    ' ' +
    (params.user_info?.last_name ? params.user_info?.last_name : '')
  );
};

const member_since_selector = params => {
  return params.user_info?.created_at
    ? dayjs(params.user_info?.created_at).format(Config.DATE_FORMAT)
    : '';
};

const get_referral_code = params => {
  return params.user_info?.referral_code;
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

// export const user_total_amount = createSelector(
//   total_amount_data_selector,
//   (total) => {
//     return total;
//   },
// );

export const user_lifetime_earning = createSelector(
  lifetime_earning_selector,
  lifetime_earning => {
    return lifetime_earning;
  },
);

export const user_info_selector = createSelector(
  full_name_selector,
  member_since_selector,
  (name, member_since) => {
    return { name, member_since };
  },
);

export const get_referral_link = createSelector(get_referral_code, ref_code => {
  return (
    Config.REGISTER_PAGE.replace(':locale', Config.LANG) +
    (ref_code ? ref_code : '')
  );
});

export const get_referral_social_links = createSelector(
  get_referral_code,
  ref_code => {
    let ref_url =
      Config.REGISTER_PAGE.replace(':locale', Config.LANG) +
      (ref_code ? ref_code : '');
    return {
      facebook: `https://www.facebook.com/sharer.php?u=${ref_url}`,
      twitter: `https://twitter.com/intent/tweet?url=${ref_url}`,
      whats_app: `https://api.whatsapp.com/send?text= Refer and Earn ${ref_url}`,
    };
  },
);
