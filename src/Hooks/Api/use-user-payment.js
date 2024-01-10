import {Toast} from '@components/core';
import {useRecoilState} from 'recoil';
import {navigate} from '../../Navigation/appNavigator';
import {arrayAtomFamily, booleanAtomFamily, objectAtomFamily} from '../../Recoil/atom';
import {atomKeys} from '../../Recoil/atom-keys';
import user_api from '../../Services/user_api';
import {
  get_api_error_string,
  get_exception_string,
  get_translation,
  handle_api_error,
  is_app,
  show_fail_message,
  show_success_message,
} from '../../Utils';
import useUserSummary from './use-user-summary';

const useUserPayment = () => {
  const [loadingUserPaymentList, setLoadingUserPaymentList] = useRecoilState(
    booleanAtomFamily(atomKeys.userPayment.loading_user_payment_list),
  );
  const [userPaymentList, setUserPaymentList] = useRecoilState(arrayAtomFamily(atomKeys.userPayment.user_payment_list));
  const [userInfo, setUserInfo] = useRecoilState(objectAtomFamily(atomKeys.userAuth.user_info));

  const [loadingUserPaymentMethods, setLoadingUserPaymentMethods] = useRecoilState(
    booleanAtomFamily(atomKeys.userPayment.loading_user_payment_methods),
  );
  const [userPaymentMethods, setUserPaymentMethods] = useRecoilState(
    objectAtomFamily(atomKeys.userPayment.user_payment_methods),
  );

  const [loadingUserPaymentAddMethods, setLoadingUserPaymentAddMethods] = useRecoilState(
    booleanAtomFamily(atomKeys.userPayment.loading_user_payment_add_methods),
  );
  const [userPaymentAddMethods, setUserPaymentAddMethods] = useRecoilState(
    objectAtomFamily(atomKeys.userPayment.user_payment_add_methods),
  );

  const [loadingUserPaymentRequest, setLoadingUserPaymentRequest] = useRecoilState(
    booleanAtomFamily(atomKeys.userPayment.loading_user_payment_request),
  );
  const [userPaymentRequest, setUserPaymentRequest] = useRecoilState(
    objectAtomFamily(atomKeys.userPayment.user_payment_request),
  );

  const [loadingUserPaymentEmailVerify, setLoadingUserPaymentEmailVerify] = useRecoilState(
    booleanAtomFamily(atomKeys.userPayment.loading_user_payment_email_verify),
  );
  const [userPaymentEmailVerify, setUserPaymentEmailVerify] = useRecoilState(
    objectAtomFamily(atomKeys.userPayment.user_payment_email_verify),
  );
  const {request_user_payment_summary} = useUserSummary();
  async function request_user_payment_list(user_payment_month) {
    try {
      setLoadingUserPaymentList(true);
      const response = await user_api.user_dashboard_api('user.payment.list', user_payment_month);
      if (response.ok && response.data.success && response.data.data && !response.data.error) {
        const res = response.data.data;
        setUserPaymentList(res);
        setUserInfo(response.data.user);
        setLoadingUserPaymentList(false);
        return res;
      } else {
        handle_api_error(response.problem + response.data?.error, 'user.payment.list');
        setUserPaymentList([]);
        setLoadingUserPaymentList(false);
        return [];
      }
    } catch (error) {
      setUserPaymentList([]);
      setLoadingUserPaymentList(false);
      console.error(error);
      handle_api_error(error);
      return [];
    }
  }
  async function request_user_payment_methods() {
    try {
      setLoadingUserPaymentMethods(true);
      const response = await user_api.user_dashboard_api('user.payment.methods', user_payment_month);
      if (response.ok && response.data.success && response.data.data && !response.data.error) {
        const res = response.data.data;
        setUserPaymentMethods(res);
        setUserInfo(response.data.user);
        setLoadingUserPaymentMethods(false);
        return res;
      } else {
        handle_api_error(response.problem + response.data?.error, 'user.payment.methods');
        setUserPaymentMethods([]);
        setLoadingUserPaymentMethods(false);
        return [];
      }
    } catch (error) {
      setUserPaymentMethods([]);
      setLoadingUserPaymentMethods(false);
      console.error(error);
      handle_api_error(error);
      return [];
    }
  }
  async function request_user_payment_add_method(
    add_pay_mode_inputs,
    add_pay_mode,
    add_pay_mode_method_name,
    add_pay_mode_account,
  ) {
    try {
      setLoadingUserPaymentAddMethods(true);
      let data = {
        inputs: add_pay_mode_inputs,
        mode: add_pay_mode,
        method_name: add_pay_mode_method_name,
        account: add_pay_mode_account,
      };
      if (is_app()) {
        data.reqvia = is_app() ? 'mobile_app' : 'web';
      }
      const response = await user_api.user_dashboard_post_api('user.payment.method.add', data);
      if (response.ok && response.data.success && response.data.data && !response.data.error) {
        const res = response.data.data;

        setUserPaymentAddMethods(res);
        setLoadingUserPaymentAddMethods(false);
        if (is_app()) {
          Toast.successBottom(get_translation('user_dashboard.payment_mode.payment_mode_success'));
        } else {
          show_success_message({
            text: get_translation('user_dashboard.payment_mode.payment_mode_success'),
          });
        }
        return res;
      } else {
        handle_api_error(response.problem + response.data?.error, 'user.payment.method.add');
        setUserPaymentAddMethods({});
        setLoadingUserPaymentAddMethods(false);
        if (is_app()) {
          Toast.errorBottom(
            response.data.data?.error
              ? get_exception_string(response.data.data)
              : response.data.msg
              ? get_api_error_string(response.data.msg)
              : get_translation('user_dashboard.payment_mode.payment_mode_error'),
          );
        } else {
          show_fail_message(
            response.data.data?.error
              ? {html: get_exception_string(response.data.data)}
              : {
                  text: response.data.msg
                    ? get_api_error_string(response.data.msg)
                    : get_translation('user_dashboard.payment_mode.payment_mode_error'),
                },
          );
        }
        return {};
      }
    } catch (error) {
      setUserPaymentAddMethods({});
      setLoadingUserPaymentAddMethods(false);
      console.error(error);
      handle_api_error(error);
      if (is_app()) {
        Toast.errorBottom(get_translation('user_dashboard.payment_mode.payment_mode_error'));
      } else {
        show_fail_message({
          text: get_translation('user_dashboard.payment_mode.payment_mode_error'),
        });
      }
      return {};
    }
  }
  async function request_user_payment_request(user_payout_mode_id, user_pay_mode, user_payment_amount) {
    try {
      setLoadingUserPaymentRequest(true);
      let data = {
        id: user_payout_mode_id,
        pay_mode: user_pay_mode,
        payment_amount: user_payment_amount,
      };

      const response = await user_api.user_dashboard_post_api('user.payment.request', data);
      if (response.ok && response.data.success && response.data.data && !response.data.error) {
        const res = response.data.data;

        setUserPaymentRequest(res);
        setUserInfo(response.data.user);
        setLoadingUserPaymentRequest(false);
        if (is_app()) {
          Toast.successBottom(get_translation('user_dashboard.payment.payout_request_success'));
          request_user_payment_summary();
          navigate('CashbackPaymentHistory');
        } else {
          show_success_message({
            text: get_translation('user_dashboard.payment.payout_request_success'),
          });
        }
        return res;
      } else {
        handle_api_error(response.problem + response.data?.error, 'user.payment.request');
        setUserPaymentRequest({});
        setLoadingUserPaymentRequest(false);
        if (is_app()) {
          Toast.errorBottom(
            response.data.data?.error
              ? get_exception_string(response.data.data)
              : response.data.msg
              ? get_api_error_string(response.data.msg)
              : get_translation('user_dashboard.payment.payout_request_error'),
          );
        } else {
          show_fail_message(
            response.data.data?.error
              ? {html: get_exception_string(response.data.data)}
              : {
                  text: response.data.msg
                    ? get_api_error_string(response.data.msg)
                    : get_translation('user_dashboard.payment.payout_request_error'),
                },
          );
        }
        return {};
      }
    } catch (error) {
      setUserPaymentRequest({});
      setLoadingUserPaymentRequest(false);
      console.error(error);
      handle_api_error(error);
      if (is_app()) {
        Toast.errorBottom(get_translation('user_dashboard.payment.payout_request_error'));
      } else {
        show_fail_message({
          text: get_translation('user_dashboard.payment.payout_request_error'),
        });
      }
      return {};
    }
  }
  async function request_user_payment_email_verify(payment_id) {
    try {
      setLoadingUserPaymentEmailVerify(true);
      const response = await user_api.user_dashboard_post_api('user.payment.email_request', {}, payment_id);
      if (response.ok && response.data.success && response.data.data && !response.data.error) {
        const res = response.data.data;

        setUserPaymentEmailVerify(res);
        setUserInfo(response.data.user);
        setLoadingUserPaymentEmailVerify(false);
        if (is_app()) {
          Toast.successBottom(get_translation('user_dashboard.payment.email_sent'));
        } else {
          show_success_message({
            text: get_translation('user_dashboard.payment.email_sent'),
          });
        }
        return res;
      } else {
        handle_api_error(response.problem + response.data?.error, 'user.payment.email_request');
        setUserPaymentEmailVerify({});
        setLoadingUserPaymentEmailVerify(false);
        if (is_app()) {
          Toast.errorBottom(
            response.data.data?.error
              ? get_exception_string(response.data.data)
              : response.data.msg
              ? get_api_error_string(response.data.msg)
              : get_translation('user_dashboard.payment.email_sent_failed'),
          );
        } else {
          show_fail_message(
            response.data.data?.error
              ? {html: get_exception_string(response.data.data)}
              : {
                  text: response.data.msg
                    ? get_api_error_string(response.data.msg)
                    : get_translation('user_dashboard.payment.email_sent_failed'),
                },
          );
        }
        return {};
      }
    } catch (error) {
      setUserPaymentEmailVerify({});
      setLoadingUserPaymentEmailVerify(false);
      console.error(error);
      handle_api_error(error);
      if (is_app()) {
        Toast.errorBottom(get_translation('user_dashboard.payment.email_sent_failed'));
      } else {
        show_fail_message({
          text: get_translation('user_dashboard.payment.email_sent_failed'),
        });
      }
      return {};
    }
  }

  return {
    userInfo,
    request_user_payment_list,
    loadingUserPaymentList,
    userPaymentList,
    request_user_payment_methods,
    loadingUserPaymentMethods,
    userPaymentMethods,
    request_user_payment_add_method,
    loadingUserPaymentAddMethods,
    userPaymentAddMethods,
    request_user_payment_request,
    loadingUserPaymentRequest,
    userPaymentRequest,
    request_user_payment_email_verify,
    loadingUserPaymentEmailVerify,
    userPaymentEmailVerify,
  };
};

export default useUserPayment;
