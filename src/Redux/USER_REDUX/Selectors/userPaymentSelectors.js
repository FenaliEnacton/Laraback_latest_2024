import { createSelector } from "reselect";
import { get_formatted_currency } from "../Utils";

const get_payment_modes = (methods_data) => {
  return methods_data?.modes ? Object.values(methods_data.modes) : [];
};

const get_user_payment_modes = (methods_data) => {
  let user_methods = methods_data?.user_methods || [];
  let all_modes = methods_data?.modes || {};
  user_methods = user_methods.map((e) => {
    let inputs = all_modes[e.method_code].inputs || [];
    inputs = inputs.map((i) => {
      return {
        ...i,
        value: e.inputs[i.name],
      };
    });
    return {
      ...e,
      image: all_modes[e.method_code].image,
      inputs,
      cashback_allowed: all_modes[e.method_code].cashback_allowed,
      reward_allowed: all_modes[e.method_code].reward_allowed,
      payment_speed: all_modes[e.method_code].payment_speed,
    };
  });
  return user_methods;
};

const get_payout_available_total = (earning) => {
  return get_formatted_currency(earning?.total?.payable);
};

const get_final_payout_available_total = (earning) => {
  return earning?.total?.payable;
};

const get_payout_available_cashback = (earning) => {
  return get_formatted_currency(earning?.cashback?.payable);
};

const get_payout_available_reward = (earning) => {
  return get_formatted_currency(earning?.reward?.payable);
};

export const payment_mode_selectors = createSelector(
  get_payment_modes,
  (pay_data) => {
    return pay_data;
  }
);

export const payment_user_mode_selectors = createSelector(
  get_user_payment_modes,
  (pay_data) => {
    return pay_data;
  }
);

export const payout_amount_selectors = createSelector(
  get_payout_available_total,
  get_payout_available_cashback,
  get_payout_available_reward,
  (available_for_payment, available_cashback, available_reward) => {
    return {
      available_for_payment,
      available_cashback,
      available_reward,
    };
  }
);

export const final_payable_amount_selector = createSelector(
  get_final_payout_available_total,
  (available_for_payout) => available_for_payout
);
