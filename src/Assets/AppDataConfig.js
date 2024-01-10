import {AppImages} from './Images';
import {get_currency_string} from '@user_redux/Utils';
export const Social_Share_List = [
  {
    id: '3464564',
    icon: AppImages.google_share_icon,
    share_type: 'google',
  },
  {
    id: '8367896',
    icon: AppImages.facebook_share_icon,
    share_type: 'facebook',
  },
  {
    id: '8367796',
    icon: AppImages.twitter_share_icon,
    share_type: 'twitter',
  },
  {
    id: '8367746',
    icon: AppImages.instagram_share_icon,
    share_type: 'instagram',
  },
];

export const filter_sort_arr = [
  {
    title: 'latest',
    value: 'latest',
  },
  {
    title: 'popular',
    value: 'popular',
  },
  {
    title: 'expiry',
    value: 'expiry',
  },
];

export const get_constructed_cashback = (amount_type, current_cb) => {
  // let returnText = "";
  let amount = '';
  if (!current_cb) {
    return '';
  }
  if (amount_type === 'percent') {
    amount = current_cb + '%';
  } else {
    amount = get_currency_string(current_cb);
  }
  // if (rate_type === "upto") {
  //   returnText = amount;
  // } else {
  //   returnText = amount;
  // }
  return amount;
};

export const platform_list = ['website', 'mobile', 'ios', 'android'];
