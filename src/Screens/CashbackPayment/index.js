import React, {Component} from 'react';
import {
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  ScrollContent,
  HeaderBackButton,
  LBButton,
  BottomModal,
  CloseButton,
  FormBottomModal,
  LangSupportTxtInput,
  Toast,
  Loader,
} from '@components/core';
import Icon from '@assets/icons';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {BlurNavBar} from '@components/generic';
import {Formik, ErrorMessage} from 'formik';
import {string, object, ref, number} from 'yup';
import {Theme} from '@assets/Theme';
import {AppImages} from '@assets/Images';
import {TotalEarned, NavigationList} from '@components/user';
import {
  request_user_payment_methods,
  request_user_payment_request,
  request_user_payment_add_method,
} from '@user_redux/Actions';
import {request_user_email_otp} from '@app_redux/Actions';
import {
  payment_user_mode_selectors,
  payment_mode_selectors,
  final_payable_amount_selector,
} from '@user_redux/Selectors';
import {translate} from '@translations';
import {get_currency_string} from '@user_redux/Utils';
import {get_user_internal_nav_list} from '@assets/RouterList';
const NAV_LIST_1 = get_user_internal_nav_list([5555]);
import Config from 'react-native-config';
import styles from './style';
import FastImage from 'react-native-fast-image';
const mapDispatchToProps = {
  request_user_payment_methods,
  request_user_payment_request,
  request_user_payment_add_method,
  request_user_email_otp,
};

const mapStateToProps = ({params}) => {
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

class CashbackPayment extends Component {
  state = {
    selected_min_amount: '',
    showMessageModal: false,
    needed_amount: '',
    showFormBottomModal: false,
    pay_out_mode: {},
    show_resend: false,
    user_entered_otp: '',
    selectedTab: this.props.user_methods ? 'added' : 'addNew',
  };

  componentDidMount() {
    this.props.request_user_payment_methods();
  }

  render_user_payout_mode = ({item, index}) => {
    return (
      <View style={styles.user_mode_card}>
        <FastImage
          source={{uri: item.image}}
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
          onPress={() => this.user_mode_clicked(item)}
          btnStyle={styles.userPayModeBtnStyle}
          labelStyle={styles.userPayModeBtnLabel}
        />
      </View>
    );
  };

  user_mode_clicked = item => {
    if (this.props.is_payment_pending === 0) {
      if (item.enabled) {
        if (item.min_payable > item.total_payable) {
          this.setState({
            showMessageModal: true,
            modal_type: 'insufficient',
            selected_min_amount: get_currency_string(item.min_payable),
            needed_amount: get_currency_string(
              item.min_payable - item.total_payable,
            ),
          });
        } else {
          this.setState({
            showFormBottomModal: true,
            modal_type: 'payout',
            pay_out_mode: item,
          });
        }
      } else {
        this.setState({showMessageModal: true, modal_type: 'enable'});
      }
    } else {
      Toast.showBottom(translate('previous_req_is_pending'));
      return false;
    }
  };

  add_mode_clicked = item => {
    this.setState({
      showFormBottomModal: true,
      modal_type: 'add_mode',
      pay_out_mode: item,
    });
  };

  render_payout_mode = ({item, index}) => {
    return (
      <View style={styles.user_mode_card}>
        <View style={styles.user_top_content}>
          <FastImage
            source={{uri: item.image}}
            style={styles.user_pay_mode_img}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={styles.details_texts_box}>
            <Text style={styles.user_mode_name} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.AllowedBalanceBox}>
              <Icon.AntDesign
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
                  item.reward_allowed ? {} : {color: Theme.COLORS.error},
                ]}>
                {translate('reward')}
              </Text>
              <Icon.AntDesign
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
                  item.cashback_allowed ? {} : {color: Theme.COLORS.error},
                ]}>
                {translate('cashback')}
              </Text>
            </View>
          </View>
        </View>
        <LBButton
          label={item.name}
          onPress={() => this.add_mode_clicked(item)}
          btnStyle={styles.userPayModeBtnStyle}
          labelStyle={styles.userPayModeBtnLabel}
        />
      </View>
    );
  };

  handle_pay_out = values => {
    this.props.request_user_payment_request(
      this.state.pay_out_mode.id,
      this.state.pay_out_mode.method_code,
      values.Amount,
    );
    this.setState({showFormBottomModal: false});
  };

  handle_add_mode = values => {
    let inputs_value = [];
    let inputs = this.state.pay_out_mode.inputs;
    for (let i = 0; i < inputs.length; i++) {
      let stateValue = i + 1;
      if (this.state['value' + stateValue]) {
        inputs_value[inputs[i].name] = this.state['value' + stateValue];
      } else {
        Toast.errorBottom(translate('enter_all_fields'));
        return;
      }
    }
    if (Config.is_lara_plus) {
      this.setState({
        payout_mode_inputs_value: inputs_value,
        payout_mode_name: values.Name,
        payout_mode_email: values.Account,
      });
      let min = Math.ceil(1000);
      let max = Math.floor(9999);
      let otp = Math.floor(Math.random() * (max - min + 1)) + min;
      this.props.request_user_email_otp(this.props.user_info.email, otp);
      this.setState({modal_type: 'pay_out_email_otp', email_sent_otp: otp});
      setTimeout(() => {
        this.setState({show_resend: true});
      }, 100000);
    } else {
      this.props.request_user_payment_add_method(
        {...inputs_value},
        this.state.pay_out_mode.code,
        values.Name,
        values.Account,
      );
      this.setState({showFormBottomModal: false});
    }
  };

  resend_otp = () => {
    let min = Math.ceil(1000);
    let max = Math.floor(9999);
    let otp = Math.floor(Math.random() * (max - min + 1)) + min;
    this.props.request_user_email_otp(this.props.user_info.email, otp);
    this.setState({email_sent_otp: otp, resend_otp: false});
    setTimeout(() => {
      this.setState({show_resend: true});
    }, 100000);
  };

  handle_otp_check = () => {
    if (this.state.email_sent_otp == this.state.user_entered_otp) {
      Toast.successBottom(translate('OTP_verified'));
      this.props.request_user_payment_add_method(
        {...this.state.payout_mode_inputs_value},
        this.state.pay_out_mode.code,
        this.state.payout_mode_name,
        this.state.payout_mode_email,
      );
      this.setState({showFormBottomModal: false});
      this.props.request_user_payment_methods();
    } else {
      Toast.errorBottom(translate('email_otp_is_not_correct'));
      return false;
    }
  };

  getValidationSchema = type => {
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

  addEmptyCard = () => {
    return <View style={{height: 75}} />;
  };
  render() {
    const {user_methods, payment_modes} = this.props;
    const {
      selected_min_amount,
      modal_type,
      needed_amount,
      pay_out_mode,
      selectedTab,
    } = this.state;
    const addModeSchema = object().shape({
      Name: string().trim().min(3).required(translate('required_field')),
      Account: this.getValidationSchema(pay_out_mode),
    });
    return (
      <Container>
        <Header>
          <HeaderLeft>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </HeaderLeft>
          <HeaderTitle>
            <Text style={styles.headerTitle}>
              {translate('cashback_payment')}
            </Text>
          </HeaderTitle>
          <HeaderRight />
        </Header>
        <View style={{marginTop: 55}}>
          <TotalEarned />
          <View style={styles.tabCard}>
            {user_methods.length ? (
              <TouchableOpacity
                style={[
                  selectedTab === 'added' ? styles.selectedTabText : null,
                ]}
                onPress={() => {
                  this.setState({selectedTab: 'added'});
                }}>
                <Text
                  style={[
                    styles.tabTitle,
                    selectedTab === 'added'
                      ? {color: Theme.COLORS.secondary}
                      : null,
                  ]}>
                  {translate('recently_added_accounts')}
                </Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              style={[selectedTab === 'addNew' ? styles.selectedTabText : null]}
              onPress={() => {
                this.setState({selectedTab: 'addNew'});
              }}>
              <Text
                style={[
                  styles.tabTitle,
                  selectedTab === 'addNew'
                    ? {color: Theme.COLORS.secondary}
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
                extraData={this.props}
                renderItem={this.render_user_payout_mode}
                style={styles.list}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={this.addEmptyCard}
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
                extraData={this.props}
                style={styles.list}
                renderItem={this.render_payout_mode}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={this.addEmptyCard}
              />
            </>
          ) : null}
          <BlurNavBar>
            <NavigationList
              list={NAV_LIST_1}
              navigation={this.props.navigation}
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
          bottomModalShow={this.state.showMessageModal}
          setBottomModalVisibleFalse={() =>
            this.setState({showMessageModal: false})
          }>
          <>
            <View style={styles.modal_top_notch} />
            <CloseButton
              btnStyle={styles.closeBtn}
              onPress={() => this.setState({showMessageModal: false})}
            />
            {modal_type === 'insufficient' ? (
              <>
                <FastImage
                  source={AppImages.insufficient_balance}
                  style={styles.modal_img}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={styles.sub_text}>
                  {translate('minimum_amount_for')} {selected_min_amount}.
                </Text>
                <Text style={[styles.sub_text, {marginBottom: 20}]}>
                  {translate('you_need')} {needed_amount}{' '}
                  {translate('more_or_choose')}.
                </Text>
              </>
            ) : null}
            {modal_type === 'enable' ? (
              <>
                <FastImage
                  source={AppImages.confirm_payment_img}
                  style={styles.modal_img}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={styles.modal_title}>
                  {translate('confirm_bank_details')}
                </Text>
                <Text style={[styles.sub_text, {marginBottom: 20}]}>
                  {translate('after_saving_mode_please_confirm_on_email')}
                </Text>
              </>
            ) : null}
          </>
        </BottomModal>
        <FormBottomModal
          bottomModalShow={this.state.showFormBottomModal}
          setBottomModalVisibleFalse={() =>
            this.setState({showFormBottomModal: false})
          }>
          <View style={styles.modal_top_notch} />
          {/* <CloseButton
            btnStyle={styles.closeBtn}
            onPress={() => this.setState({showFormBottomModal: false})}
          /> */}
          {modal_type === 'payout' ? (
            <>
              <Text style={styles.list_title}>{pay_out_mode.name}</Text>
              <View style={styles.tb_row}>
                <Text style={styles.tb_label}>{pay_out_mode.name}</Text>
                <Text style={styles.tb_value}>{pay_out_mode.account}</Text>
              </View>
              <View style={styles.tb_row}>
                <Text style={styles.tb_label}>{translate('min_pay_out')}</Text>
                <Text style={styles.tb_value}>
                  {get_currency_string(pay_out_mode.min_payable)}
                </Text>
              </View>
              {pay_out_mode.inputs &&
                pay_out_mode.inputs.map(e => {
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
                  {get_currency_string(pay_out_mode.payment_speed)}
                </Text>
              </View>

              <View style={styles.tb_row}>
                <Text>{translate('available_pay_out')}</Text>
                <View style={styles.AllowedBalanceBox}>
                  <Icon.AntDesign
                    name={pay_out_mode.reward_allowed ? 'check' : 'close'}
                    color={
                      pay_out_mode.reward_allowed
                        ? Theme.COLORS.green_approved
                        : Theme.COLORS.error
                    }
                    size={12}
                  />
                  <Text
                    style={[
                      styles.cb_text,
                      pay_out_mode.reward_allowed
                        ? {}
                        : {color: Theme.COLORS.error},
                    ]}>
                    {translate('reward')}
                  </Text>
                  <Icon.AntDesign
                    name={pay_out_mode.cashback_allowed ? 'check' : 'close'}
                    color={
                      pay_out_mode.cashback_allowed
                        ? Theme.COLORS.green_approved
                        : Theme.COLORS.error
                    }
                    size={12}
                  />
                  <Text
                    style={[
                      styles.cb_text,
                      pay_out_mode.cashback_allowed
                        ? {}
                        : {color: Theme.COLORS.error},
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
                  {get_currency_string(pay_out_mode.total_payable)}
                </Text>
              </View>
              <Formik
                initialValues={{
                  Amount: '',
                }}
                validationSchema={object().shape({
                  Amount: number()
                    .min(pay_out_mode.min_payable)
                    .max(pay_out_mode.total_payable)
                    .required(translate('required_field')),
                })}
                onSubmit={values => this.handle_pay_out(values)}>
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
                        <Text style={{color: Theme.COLORS.secondary}}>*</Text>
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
                          {backgroundColor: Theme.COLORS.secondary},
                        ]}
                        labelStyle={styles.btn_labelStyle}
                        onPress={handleSubmit}
                      />
                    </>
                  );
                }}
              </Formik>
            </>
          ) : null}
          {modal_type === 'add_mode' ? (
            <>
              <Text style={[styles.modal_title, {marginVertical: 15}]}>
                {pay_out_mode.name}
              </Text>
              <Formik
                initialValues={{
                  Name: '',
                  Account: '',
                }}
                validationSchema={addModeSchema}
                onSubmit={values => this.handle_add_mode(values)}>
                {({
                  handleBlur,
                  handleChange,
                  values,
                  handleSubmit,
                  setFieldValue,
                }) => {
                  return (
                    <View style={styles.formModalContainer}>
                      <Text style={styles.input_title}>
                        {translate('name')}
                      </Text>
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
                        {pay_out_mode.account_name}
                      </Text>
                      <LangSupportTxtInput
                        style={styles.textInput}
                        placeholder={pay_out_mode.account_name}
                        value={values.Account}
                        onBlur={handleBlur('Account')}
                        onChangeText={handleChange('Account')}
                        name="Account"
                      />
                      <ErrorMessage name="Account">
                        {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                      </ErrorMessage>
                      {pay_out_mode.inputs.map((item, index) => {
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
                                    ([key, value]) => {
                                      return (
                                        <View style={styles.radioTab}>
                                          <TouchableOpacity
                                            onPress={() =>
                                              this.setState({
                                                ['value' + formIndex]: key,
                                                radio: true,
                                              })
                                            }>
                                            <Icon.Ionicons
                                              name={
                                                this.state[
                                                  'value' + formIndex
                                                ] === key
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
                                              this.state[
                                                'value' + formIndex
                                              ] === key
                                                ? {color: Theme.COLORS.primary}
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
                                    this.setState({
                                      ['value' + formIndex]: value,
                                      radio: false,
                                    })
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
                          {backgroundColor: Theme.COLORS.secondary},
                        ]}
                        labelStyle={styles.btn_labelStyle}
                        onPress={handleSubmit}
                      />
                    </View>
                  );
                }}
              </Formik>
            </>
          ) : null}
          {modal_type === 'pay_out_email_otp' ? (
            <>
              <Text style={[styles.app_name, {textTransform: null}]}>
                {translate('enter_email_otp')}
              </Text>
              <Text
                style={[
                  styles.reset_pass_text,
                  {textAlign: 'center', textTransform: 'none'},
                ]}>
                {translate('enter_otp_received_in_your_mail')}
              </Text>
              <OTPInputView
                style={styles.otpInput}
                pinCount={4}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={user_entered_otp => {
                  this.setState({user_entered_otp});
                }}
              />

              <Text
                style={[
                  styles.reset_pass_text,
                  this.state.show_resend
                    ? {color: Theme.COLORS.black}
                    : {color: Theme.COLORS.border_light},
                ]}
                onPress={() => {
                  if (this.state.show_resend) {
                    this.resend_otp();
                  }
                }}>
                {translate('resend')}
              </Text>

              <LBButton
                label={translate('request_payout')}
                onPress={() => this.handle_otp_check()}
                btnStyle={styles.btnStyle}
                labelStyle={styles.btn_labelStyle}
              />
            </>
          ) : null}
          <View style={styles.btnBar}>
            <CloseButton
              btnStyle={styles.closeBtn}
              onPress={() => this.setState({showFormBottomModal: false})}
            />
          </View>
        </FormBottomModal>
        <Loader show={this.props.loading} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CashbackPayment);
