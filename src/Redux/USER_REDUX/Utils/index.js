import { translate } from '@/translations';
import React from 'react';
import { Config } from '@/react-native-config';
// import InAppReview from 'react-native-in-app-review';
const error_data = {
  'user.password.wrong': 'User password is wrong!',
};

export const get_exception_string = data => {
  console.log(data);
  let error_obj = data.error;
  let error_values = Object.values(error_obj);
  console.log(error_values);
  let return_string = error_values.map(e => e.join('<br/>'));
  return_string = return_string.join('<br/>');
  if (is_app) {
    return_string = return_string.replace('<br/>', ' ');
    return return_string ? return_string : data.message;
  } else {
    return return_string
      ? `<div>${return_string}</div>`
      : `<div>${data.message}</div>`;
  }
};

export const is_app = () => {
  return window.navigator.product === 'ReactNative';
};

export const handle_api_error = (message, location = '') => {
  // is_app() ? {} : alert(message);
  console.log('error :', message);
};

export const handle_success_response = (message, location = '') => {
  // is_app() ? {} : alert(message);
  console.log('error :', message);
};

export const get_formatted_currency = value => {
  let return_value = Number(value).toFixed(2);
  if (isNaN(return_value)) {
    return get_currency_string('0.00');
  } else {
    return get_currency_string(return_value);
  }
};

export const get_translation = text => {
  if (is_app()) {
    return translate(text);
  } else {
    console.log(text);
    return translation.trans(text);
  }
};

export const get_currency_string = (amount, currency_type = '') => {
  let string = '';
  let currency =
    Config.CURRENCY_INFO && Config.CURRENCY_INFO[currency_type]
      ? Config.CURRENCY_INFO[currency_type]
      : Config.CURRENCY;
  if (currency.display_as === 'prefix') {
    string = currency.symbol + numberWithCommas(amount);
  } else {
    string = numberWithCommas(amount) + currency.symbol;
  }
  return string;
};

const api_res = {
  'user.payment.method_added':
    'payout mode added successfully , verify from your email',
};

export const show_success_message = alert_props => {
  let timerInterval;
  Swal.fire({
    position: 'center',
    timer: 2000,
    icon: 'success',
    buttons: false,
    showConfirmButton: false,
    ...alert_props,
    onClose: () => {
      clearInterval(timerInterval);
    },
  }).then(result => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      // console.log("I was closed by the timer");
    }
  });
};

export const show_success_message_with_reload = alert_props => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: true,
      ...alert_props,
    }).then(result => {
      console.log(result);
      if (result.isConfirmed) {
        resolve();
        window.location.reload();
      }
    });
  });
};

export const show_fail_message = alert_props => {
  let timerInterval;
  if (is_app()) {
  } else {
    Swal.fire({
      position: 'center',
      timer: 4000,
      icon: 'error',
      showConfirmButton: false,
      ...alert_props,
      onClose: () => {
        clearInterval(timerInterval);
      },
    }).then(result => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        // console.log("I was closed by the timer");
      }
    });
  }
};

export const get_api_error_string = string_key => {
  return error_data[string_key] ? error_data[string_key] : string_key;
};

// export const In_app_review = () => {
//   InAppReview.isAvailable();
//   InAppReview.RequestInAppReview()
//     .then(hasFlowFinishedSuccessfully => {
//       console.log('InAppReview in android', hasFlowFinishedSuccessfully);

//       console.log(
//         'InAppReview in ios has launched successfully',
//         hasFlowFinishedSuccessfully,
//       );

//       if (hasFlowFinishedSuccessfully) {
//         // do something for ios
//         // do something for android
//       }
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };
export function numberWithCommas(x) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export const get_default_country_code = data => {
  let all_country = Object.values(data?.countries?.all);
  let res;
  for (const key in all_country) {
    if (data.web?.default_country === all_country[key].code) {
      res = all_country[key].dial_code;
    }
  }
  return res;
};
