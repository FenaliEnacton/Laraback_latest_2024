import Icons from '@/Assets/icons';
import { AppImages } from '@/Assets/Images';
import { get_user_internal_nav_list } from '@/Assets/RouterList';
import { Theme } from '@/Assets/Theme';
import BottomModal from '@/Components/Core/BottomModal';
import CloseButton from '@/Components/Core/CloseButton';
import Container from '@/Components/Core/Container';
import FormBottomModal from '@/Components/Core/FormBottomModal';
import Header from '@/Components/Core/Header/Header';
import HeaderRight from '@/Components/Core/Header/HeaderRight';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import LangSupportTxtInput from '@/Components/Core/LangSupportTxtInput';
import LBButton from '@/Components/Core/LBButton';
import Loader from '@/Components/Core/Loader';
import { Toast } from '@/Components/Core/Toast';
import BlurNavBar from '@/Components/Generic/BlurNavBar';
import NavigationList from '@/Components/User/NavigationList';
import TotalEarned from '@/Components/User/TotalEarned';
import { Config } from '@/react-native-config';
import { request_user_email_otp } from '@/Redux/Actions/userAuthActions';
import {
  request_user_payment_add_method,
  request_user_payment_methods,
  request_user_payment_request,
} from '@/Redux/USER_REDUX/Actions/userPaymentActions';
import {
  final_payable_amount_selector,
  payment_mode_selectors,
  payment_user_mode_selectors,
} from '@/Redux/USER_REDUX/Selectors';
import { translate } from '@/translations';
import { get_currency_string } from '@/Utils';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { ErrorMessage, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { number, object, string } from 'yup';
import styles from './style';

const NAV_LIST_1 = get_user_internal_nav_list([5555]);
const mapDispatchToProps = {
  request_user_payment_methods,
  request_user_payment_request,
  request_user_payment_add_method,
  request_user_email_otp,
};

const mapStateToProps = ({ params }) => {
  return {
    loading: params.loading,
    user_info: params.user_info || {},
    final_payable_amount:
      final_payable_amount_selector(params.user_payment_methods?.earning) || 0,
    user_methods:
      payment_user_mode_selectors(params.user_payment_methods) || [],
    payment_modes: payment_mode_selectors(params.user_payment_methods) || [],
    is_payment_pending: params.user_payment_methods?.pending_payment,
  };
};

const CashbackPayment = props => {
  const [selectedMinAmount, setSelectedMinAmount] = useState<any>('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [neededAmount, setNeededAmount] = useState<any>('');
  const [showFormBottomModal, setShowFormBottomModal] = useState(false);
  const [payOutMode, setPayOutMode] = useState<any>({
    id: '',
    method_code: '',
    inputs: [],
    code: '',
  });
  const [showResend, setShowResend] = useState(false);
  const [userEnteredOtp, setUserEnteredOtp] = useState<any>('');
  const [selectedTab, setSelectedTab] = useState(
    props.user_methods ? 'added' : 'addNew',
  );
  const [modalType, setModalType] = useState<any>('');
  const [formState, setFormState] = useState({});
  const [payoutModeInputValue, setPayoutModeInputValue] = useState<any>('');
  const [payoutModeName, setPayoutModeName] = useState<any>('');
  const [payoutModeEmail, setPayoutModeEmail] = useState<any>('');
  const [emailSentOtp, setEmailSentOtp] = useState<any>('');

  useEffect(() => {
    props.request_user_payment_methods();
  }, []);

  const user_mode_clicked = item => {
    if (props.is_payment_pending === 0) {
      if (item.enabled) {
        if (item.min_payable > item.total_payable) {
          setShowMessageModal(true);
          setModalType('insufficient');
          setSelectedMinAmount(get_currency_string(item.min_payable));
          setNeededAmount(
            get_currency_string(item.min_payable - item.total_payable),
          );
        } else {
          setShowFormBottomModal(true);
          setModalType('payout');
          setPayOutMode(item);
        }
      } else {
        setShowMessageModal(true);
        setModalType('enable');
      }
    } else {
      Toast.showBottom(translate('previous_req_is_pending'));
      return false;
    }
  };

  const render_user_payout_mode = ({ item, index }) => {
    return (
      <View style={styles.user_mode_card}>
        <FastImage
          source={{ uri: item.image }}
          style={styles.user_pay_mode_img}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.details_texts_box}>
          <Text style={styles.user_mode_name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.user_account_name} numberOfLines={1}>
            {item.account}
          </Text>
        </View>
        <LBButton
          label={item.method_code}
          onPress={() => user_mode_clicked(item)}
          btnStyle={styles.userPayModeBtnStyle}
          labelStyle={styles.userPayModeBtnLabel}
        />
      </View>
    );
  };

  const add_mode_clicked = item => {
    setShowFormBottomModal(true);
    setModalType('add_mode');
    setPayOutMode(item);
  };

  const render_payout_mode = ({ item, index }) => {
    return (
      <View style={styles.user_mode_card}>
        <View style={styles.user_top_content}>
          <FastImage
            source={{ uri: item.image }}
            style={styles.user_pay_mode_img}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={styles.details_texts_box}>
            <Text style={styles.user_mode_name} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.AllowedBalanceBox}>
              <Icons.AntDesign
                name={item.reward_allowed ? 'check' : 'close'}
                color={
                  item.reward_allowed
                    ? Theme.COLORS.green_approved
                    : Theme.COLORS.error
                }
                size={12}
              />
              <Text
                style={[
                  styles.cb_text,
                  item.reward_allowed ? {} : { color: Theme.COLORS.error },
                ]}>
                {translate('reward')}
              </Text>
              <Icons.AntDesign
                name={item.cashback_allowed ? 'check' : 'close'}
                color={
                  item.cashback_allowed
                    ? Theme.COLORS.green_approved
                    : Theme.COLORS.error
                }
                size={12}
              />
              <Text
                style={[
                  styles.cb_text,
                  item.cashback_allowed ? {} : { color: Theme.COLORS.error },
                ]}>
                {translate('cashback')}
              </Text>
            </View>
          </View>
        </View>
        <LBButton
          label={item.name}
          onPress={() => add_mode_clicked(item)}
          btnStyle={styles.userPayModeBtnStyle}
          labelStyle={styles.userPayModeBtnLabel}
        />
      </View>
    );
  };

  const handle_pay_out = values => {
    props.request_user_payment_request(
      payOutMode.id,
      payOutMode.method_code,
      values.Amount,
    );
    setShowFormBottomModal(false);
  };

  const handle_add_mode = values => {
    let inputs_value: any = [];
    let inputs: any = payOutMode.inputs;
    for (let i = 0; i < inputs.length; i++) {
      let stateValue = i + 1;
      if (formState['value' + stateValue]) {
        inputs_value[inputs[i].name] = formState['value' + stateValue];
      } else {
        Toast.errorBottom(translate('enter_all_fields'));
        return;
      }
    }
    if (Config.is_lara_plus) {
      setPayoutModeInputValue(inputs_value);
      setPayoutModeName(values.Name);
      setPayoutModeEmail(values.Account);

      let min = Math.ceil(1000);
      let max = Math.floor(9999);
      let otp = Math.floor(Math.random() * (max - min + 1)) + min;
      props.request_user_email_otp(props.user_info.email, otp);
      setModalType('pay_out_email_otp');
      setEmailSentOtp(otp);
      setTimeout(() => {
        setShowResend(true);
      }, 100000);
    } else {
      props.request_user_payment_add_method(
        { ...inputs_value },
        payOutMode.code, //CHECK FUNCTIONALITY
        values.Name,
        values.Account,
      );
      setShowFormBottomModal(false);
    }
  };
  const resend_otp = () => {
    let min = Math.ceil(1000);
    let max = Math.floor(9999);
    let otp = Math.floor(Math.random() * (max - min + 1)) + min;
    props.request_user_email_otp(props.user_info.email, otp);
    emailSentOtp(otp);
    setShowResend(false);
    setTimeout(() => {
      setShowResend(true);
    }, 100000);
  };

  const handle_otp_check = () => {
    if (emailSentOtp == userEnteredOtp) {
      Toast.successBottom(translate('OTP_verified'));
      props.request_user_payment_add_method(
        { ...payoutModeInputValue },
        payOutMode.code,
        payoutModeName,
        payoutModeEmail,
      );
      setShowFormBottomModal(false);
      props.request_user_payment_methods();
    } else {
      Toast.errorBottom(translate('email_otp_is_not_correct'));
      return false;
    }
  };

  const getValidationSchema = type => {
    switch (type.account_type) {
      case 'email':
        return string()
          .email(translate('email_is_not_valid'))
          .required(translate('required_field'));
      case 'number':
        return number().required(translate('required_field'));
      case 'text':
        return string().required(translate('required_field'));
      default:
        return string().required(translate('required_field'));
    }
  };
  const addEmptyCard = () => {
    return <View style={{ height: 75 }} />;
  };

  const handleChangeInputValues = (index, value) => {
    setFormState(prevState => ({
      ...prevState,
      ['value' + (index + 1)]: value,
    }));
  };

  const { user_methods, payment_modes } = props;
  const addModeSchema = object().shape({
    Name: string().trim().min(3).required(translate('required_field')),
    Account: getValidationSchema(payOutMode),
  });

  return (
    <Container>
      <Header>
        <Header.Left>
          <HeaderBackButton onPress={() => props.navigation.goBack()} />
        </Header.Left>
        <Header.Title>
          <Text style={styles.headerTitle}>
            {translate('cashback_payment')}
          </Text>
        </Header.Title>
        <HeaderRight />
      </Header>
      <View style={{ marginTop: 55 }}>
        <TotalEarned />
        <View style={styles.tabCard}>
          {user_methods.length ? (
            <TouchableOpacity
              style={[selectedTab === 'added' ? styles.selectedTabText : null]}
              onPress={() => {
                setSelectedTab('added');
              }}>
              <Text
                style={[
                  styles.tabTitle,
                  selectedTab === 'added'
                    ? { color: Theme.COLORS.secondary }
                    : null,
                ]}>
                {translate('recently_added_accounts')}
              </Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={[selectedTab === 'addNew' ? styles.selectedTabText : null]}
            onPress={() => {
              setSelectedTab('addNew');
            }}>
            <Text
              style={[
                styles.tabTitle,
                selectedTab === 'addNew'
                  ? { color: Theme.COLORS.secondary }
                  : null,
              ]}>
              {translate('add_new_account')}
            </Text>
          </TouchableOpacity>
        </View>
        {user_methods.length && selectedTab === 'added' ? (
          <>
            <Text style={styles.list_title}>
              {translate('recently_added_account_for_payment')}
            </Text>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={user_methods}
              extraData={props}
              renderItem={render_user_payout_mode}
              style={styles.list}
              showsHorizontalScrollIndicator={false}
              ListFooterComponent={addEmptyCard}
              // numColumns={2}
              // horizontal={true}
            />
          </>
        ) : null}
        {selectedTab === 'addNew' ? (
          <>
            <Text style={styles.list_title}>
              {translate('choose_how_you_want_to_withdraw')}
            </Text>
            <FlatList
              data={payment_modes}
              keyExtractor={(item, index) => index.toString()}
              extraData={props}
              style={styles.list}
              renderItem={render_payout_mode}
              showsHorizontalScrollIndicator={false}
              ListFooterComponent={addEmptyCard}
            />
          </>
        ) : null}
        <BlurNavBar>
          <NavigationList
            list={NAV_LIST_1}
            navigation={props.navigation}
            style={styles.navListStyle}
            containerStyle={{
              alignItems: 'center',
              marginTop: 0,
            }}
            numberOfLines={1}
            textStyle={styles.routeText}
          />
        </BlurNavBar>
      </View>
      <BottomModal
        bottomModalShow={showMessageModal}
        setBottomModalVisibleFalse={() => setShowMessageModal(false)}>
        <>
          <View style={styles.modal_top_notch} />
          <CloseButton
            btnStyle={styles.closeBtn}
            onPress={() => setShowMessageModal(false)}
          />
          {modalType === 'insufficient' ? (
            <>
              <FastImage
                source={AppImages.insufficient_balance}
                style={styles.modal_img}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={styles.sub_text}>
                {translate('minimum_amount_for')} {selectedMinAmount}.
              </Text>
              <Text style={[styles.sub_text, { marginBottom: 20 }]}>
                {translate('you_need')} {neededAmount}{' '}
                {translate('more_or_choose')}.
              </Text>
            </>
          ) : null}
          {modalType === 'enable' ? (
            <>
              <FastImage
                source={AppImages.confirm_payment_img}
                style={styles.modal_img}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={styles.modal_title}>
                {translate('confirm_bank_details')}
              </Text>
              <Text style={[styles.sub_text, { marginBottom: 20 }]}>
                {translate('after_saving_mode_please_confirm_on_email')}
              </Text>
            </>
          ) : null}
        </>
      </BottomModal>
      <FormBottomModal
        bottomModalShow={showFormBottomModal}
        setBottomModalVisibleFalse={() => setShowFormBottomModal(false)}>
        <View style={styles.modal_top_notch} />
        {/* <CloseButton
            btnStyle={styles.closeBtn}
            onPress={() => setShowFormBottomModal(false)}
          /> */}
        {modalType === 'payout' ? (
          <>
            <Text style={styles.list_title}>{payOutMode.name}</Text>
            <View style={styles.tb_row}>
              <Text style={styles.tb_label}>{payOutMode.name}</Text>
              <Text style={styles.tb_value}>{payOutMode.account}</Text>
            </View>
            <View style={styles.tb_row}>
              <Text style={styles.tb_label}>{translate('min_pay_out')}</Text>
              <Text style={styles.tb_value}>
                {get_currency_string(payOutMode.min_payable)}
              </Text>
            </View>
            {payOutMode.inputs &&
              payOutMode.inputs.map(e => {
                return (
                  <View style={styles.tb_row}>
                    <Text style={styles.tb_label}>{e.label}</Text>
                    <Text style={styles.tb_value}>{e.value}</Text>
                  </View>
                );
              })}
            <View style={styles.tb_row}>
              <Text style={styles.tb_label}>{translate('with_terms')}</Text>
              <Text style={styles.tb_value}>
                {get_currency_string(payOutMode.payment_speed)}
              </Text>
            </View>

            <View style={styles.tb_row}>
              <Text>{translate('available_pay_out')}</Text>
              <View style={styles.AllowedBalanceBox}>
                <Icons.AntDesign
                  name={payOutMode.reward_allowed ? 'check' : 'close'}
                  color={
                    payOutMode.reward_allowed
                      ? Theme.COLORS.green_approved
                      : Theme.COLORS.error
                  }
                  size={12}
                />
                <Text
                  style={[
                    styles.cb_text,
                    payOutMode.reward_allowed
                      ? {}
                      : { color: Theme.COLORS.error },
                  ]}>
                  {translate('reward')}
                </Text>
                <Icons.AntDesign
                  name={payOutMode.cashback_allowed ? 'check' : 'close'}
                  color={
                    payOutMode.cashback_allowed
                      ? Theme.COLORS.green_approved
                      : Theme.COLORS.error
                  }
                  size={12}
                />
                <Text
                  style={[
                    styles.cb_text,
                    payOutMode.cashback_allowed
                      ? {}
                      : { color: Theme.COLORS.error },
                  ]}>
                  {translate('cashback')}
                </Text>
              </View>
            </View>
            <View style={styles.tb_row}>
              <Text style={styles.tb_label}>
                {translate('available_balance')}
              </Text>
              <Text style={styles.tb_value}>
                {get_currency_string(payOutMode.total_payable)}
              </Text>
            </View>
            <Formik
              initialValues={{
                Amount: '',
              }}
              validationSchema={object().shape({
                Amount: number()
                  .min(payOutMode.min_payable)
                  .max(payOutMode.total_payable)
                  .required(translate('required_field')),
              })}
              onSubmit={values => handle_pay_out(values)}>
              {({
                handleBlur,
                handleChange,
                values,
                handleSubmit,
                setFieldValue,
              }) => {
                return (
                  <>
                    <Text style={styles.input_title}>
                      {translate('amount')}
                      <Text style={{ color: Theme.COLORS.secondary }}>*</Text>
                    </Text>
                    <LangSupportTxtInput
                      style={styles.textInput}
                      placeholder={translate('amount')}
                      value={values.Amount}
                      onBlur={handleBlur('Amount')}
                      onChangeText={handleChange('Amount')}
                      name="Amount"
                    />
                    <ErrorMessage name="Amount">
                      {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                    </ErrorMessage>
                    <LBButton
                      label={translate('request_payout')}
                      btnStyle={[
                        styles.btnStyle,
                        { backgroundColor: Theme.COLORS.secondary },
                      ]}
                      // labelStyle={styles.btn_labelStyle}
                      onPress={handleSubmit}
                    />
                  </>
                );
              }}
            </Formik>
          </>
        ) : null}
        {modalType === 'add_mode' ? (
          <>
            <Text style={[styles.modal_title, { marginVertical: 15 }]}>
              {payOutMode.name}
            </Text>
            <Formik
              initialValues={{
                Name: '',
                Account: '',
              }}
              validationSchema={addModeSchema}
              onSubmit={values => handle_add_mode(values)}>
              {({
                handleBlur,
                handleChange,
                values,
                handleSubmit,
                setFieldValue,
              }) => {
                return (
                  <View
                  // style={styles.formModalContainer}
                  >
                    <Text style={styles.input_title}>{translate('name')}</Text>
                    <LangSupportTxtInput
                      style={styles.textInput}
                      placeholder={translate('name')}
                      value={values.Name}
                      onBlur={handleBlur('Name')}
                      onChangeText={handleChange('Name')}
                      name="Name"
                    />
                    <ErrorMessage name="Name">
                      {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                    </ErrorMessage>
                    <Text style={styles.input_title}>
                      {payOutMode.account_name}
                    </Text>
                    <LangSupportTxtInput
                      style={styles.textInput}
                      placeholder={payOutMode.account_name}
                      value={values.Account}
                      onBlur={handleBlur('Account')}
                      onChangeText={handleChange('Account')}
                      name="Account"
                    />
                    <ErrorMessage name="Account">
                      {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                    </ErrorMessage>
                    {payOutMode.inputs.map((item, index) => {
                      let formIndex = index + 1;
                      return (
                        <View key={index.toString()}>
                          {item.type == 'select' ? (
                            <>
                              <Text style={styles.label}>
                                {item.placeholder}
                              </Text>
                              <View style={styles.radio_list}>
                                {Object.entries(item.options).map(
                                  ([key, value]: any) => {
                                    return (
                                      <View style={styles.radioTab}>
                                        <TouchableOpacity
                                          onPress={
                                            () =>
                                              handleChangeInputValues(
                                                index,
                                                key,
                                              )

                                            // this.setState({
                                            //   ['value' + formIndex]: key,
                                            //   radio: true,
                                            // })
                                          }>
                                          <Icons.Ionicons
                                            name={
                                              formState['value' + formIndex] ===
                                              key
                                                ? 'md-radio-button-on'
                                                : 'md-radio-button-off'
                                            }
                                            color={Theme.COLORS.primary}
                                            size={20}
                                          />
                                        </TouchableOpacity>
                                        <Text
                                          style={[
                                            styles.radio,
                                            formState['value' + formIndex] ===
                                            key
                                              ? { color: Theme.COLORS.primary }
                                              : {},
                                          ]}>
                                          {value[Config.LANG]}
                                        </Text>
                                      </View>
                                    );
                                  },
                                )}
                              </View>
                            </>
                          ) : (
                            <View>
                              <Text style={styles.input_title}>
                                {item.label}
                              </Text>
                              <LangSupportTxtInput
                                style={styles.textInput}
                                placeholder={item.placeholder}
                                onChangeText={value =>
                                  handleChangeInputValues(index, value)
                                }
                              />
                            </View>
                          )}
                        </View>
                      );
                    })}
                    <LBButton
                      label={translate('save')}
                      btnStyle={[
                        styles.btnStyle,
                        { backgroundColor: Theme.COLORS.secondary },
                      ]}
                      // labelStyle={styles.btn_labelStyle}
                      onPress={handleSubmit}
                    />
                  </View>
                );
              }}
            </Formik>
          </>
        ) : null}
        {modalType === 'pay_out_email_otp' ? (
          <>
            <Text style={[styles.app_name, { textTransform: null }]}>
              {translate('enter_email_otp')}
            </Text>
            <Text
              style={[
                styles.reset_pass_text,
                { textAlign: 'center', textTransform: 'none' },
              ]}>
              {translate('enter_otp_received_in_your_mail')}
            </Text>
            <OTPInputView
              style={styles.otpInput}
              pinCount={4}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged = {code => { this.setState({code})}}
              autoFocusOnLoad
              // codeInputFieldStyle={styles.underlineStyleBase}
              // codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={user_entered_otp => {
                setUserEnteredOtp(user_entered_otp);
              }}
            />

            <Text
              style={[
                styles.reset_pass_text,
                showResend
                  ? { color: Theme.COLORS.black }
                  : { color: Theme.COLORS.border_light },
              ]}
              onPress={() => {
                if (showResend) {
                  resend_otp();
                }
              }}>
              {translate('resend')}
            </Text>

            <LBButton
              label={translate('request_payout')}
              onPress={() => handle_otp_check()}
              btnStyle={styles.btnStyle}
              // labelStyle={styles.btn_labelStyle}
            />
          </>
        ) : null}
        <View style={styles.btnBar}>
          <CloseButton
            btnStyle={styles.closeBtn}
            onPress={() => setShowFormBottomModal(false)}
          />
        </View>
      </FormBottomModal>
      <Loader show={props.loading} />
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CashbackPayment);
