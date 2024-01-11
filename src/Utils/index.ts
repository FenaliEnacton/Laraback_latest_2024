import { translate } from '@/translations';
import { navigate } from '../Navigation/appNavigator';
import Config from '@/react-native-config';
const error_data = {
  'user.password.wrong': 'User password is wrong!',
};

export const get_exception_string = data => {
  console.log(data);
  let error_obj = data.error;
  let error_values = Object.values(error_obj);
  console.log(error_values);
  let return_string: any = error_values.map((e: any) => e.join('<br/>'));
  return_string = return_string.join('<br/>');
  if (is_app()) {
    return_string = return_string.replace('<br/>', ' ');
    return return_string ? return_string : data.message;
  } else {
    return return_string
      ? `<div>${return_string}</div>`
      : `<div>${data.message}</div>`;
  }
};

export const is_app = () => {
  return true;
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
  let return_value = Number(Number(value).toFixed(2));
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
    // return translation.trans(text);
  }
};

export const get_currency_string = (amount, currency_type = '') => {
  let string = '';
  let currency =
    Config.CURRENCY_INFO && Config.CURRENCY_INFO[currency_type]
      ? Config.CURRENCY_INFO[currency_type]
      : Config.CURRENCY;
  if (currency.display_as === 'prefix') {
    string = currency.symbol + amount;
  } else {
    string = amount + currency.symbol;
  }
  return string;
};

// const api_res = {
//   'user.payment.method_added':
//     'payout mode added successfully , verify from your email',
// };

export const show_success_message = alert_props => {
  // let timerInterval;
  // Swal.fire({
  //   position: 'center',
  //   timer: 2000,
  //   icon: 'success',
  //   buttons: false,
  //   showConfirmButton: false,
  //   ...alert_props,
  //   onClose: () => {
  //     clearInterval(timerInterval);
  //   },
  // }).then(result => {
  //   /* Read more about handling dismissals below */
  //   if (result.dismiss === Swal.DismissReason.timer) {
  //     // console.log("I was closed by the timer");
  //   }
  // });
};

export const show_success_message_with_reload = alert_props => {
  // return new Promise((resolve, reject) => {
  //   Swal.fire({
  //     position: 'center',
  //     icon: 'success',
  //     showConfirmButton: true,
  //     ...alert_props,
  //   }).then(result => {
  //     console.log(result);
  //     if (result.isConfirmed) {
  //       resolve();
  //       window.location.reload();
  //     }
  //   });
  // });
};

export const show_fail_message = alert_props => {
  // let timerInterval;
  if (is_app()) {
  } else {
    // Swal.fire({
    //   position: 'center',
    //   timer: 4000,
    //   icon: 'error',
    //   showConfirmButton: false,
    //   ...alert_props,
    //   onClose: () => {
    //     clearInterval(timerInterval);
    //   },
    // }).then(result => {
    //   /* Read more about handling dismissals below */
    //   if (result.dismiss === Swal.DismissReason.timer) {
    //     // console.log("I was closed by the timer");
    //   }
    // });
  }
};

export const get_api_error_string = string_key => {
  return error_data[string_key] ? error_data[string_key] : string_key;
};
export const get_default_country_code = data => {
  let all_country: any = Object.values(data?.countries?.all);
  let res;
  for (const key in all_country) {
    if (data.web?.default_country === all_country[key].code) {
      res = all_country[key].dial_code;
    }
  }
  return res;
};

export const verificationSuccess = (msg, action) => {
  navigate('VerifyUser', {
    email: action.payload.email,
    referrer_code: action.payload.referrer_code,
    password: action.payload.password,
    mobile: action.payload.mobile,
    is_social: action.payload.is_social,
    social_id: action.payload.social_id,
    social_type: action.payload.social_type,
  });
  // Toast.showTop(translate(msg));
};

export const getErrorMsg = response => {
  return response.data.data?.error
    ? get_exception_string(response.data.data)
    : response.data.msg
    ? response.data.msg
    : '';
};
