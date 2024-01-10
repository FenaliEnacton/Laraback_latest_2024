import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from '@assets/icons';
import {Theme} from '@assets/Theme';
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  KeyboardAwareContent,
  LangSupportTxtInput,
  HeaderBackButton,
  BottomModal,
  CloseButton,
  Loader,
  LBButton,
  TextBox,
} from '@components/core';
import {translate} from '@translations';
import {ActivityNavigationList, NavigationList} from '@components/user';
import DateTimePicker from '@react-native-community/datetimepicker';
import {EmptyListView, BlurNavBar} from '@components/generic';
import {Formik, ErrorMessage} from 'formik';
import {string, object, number, date} from 'yup';
import {get_user_internal_nav_list} from '@assets/RouterList';
import {platform_list} from '@assets/AppDataConfig';
import {
  request_user_claim_stores,
  request_user_claim_store_clicks,
  request_user_claim_make,
} from '@user_redux/Actions';
import styles from './style';
import dayjs from 'dayjs';
import {AppImages} from '@assets/Images';
import Config from 'react-native-config';
import DocumentPicker from 'react-native-document-picker';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import LottieView from 'lottie-react-native';

const currencies = Config.CURRENCIES;
const VersionIOS = parseInt(Platform.Version, 10);
const merchantModal = React.createRef();

const mapDispatchToProps = {
  request_user_claim_stores,
  request_user_claim_store_clicks,
  request_user_claim_make,
};

const mapStateToProps = ({params}) => {
  return {
    user_clickable_stores: params.user_claim_stores || [],
    user_store_clicks: params.user_claim_store_clicks || [],
    user_info: params.user_info || {},
    loading: params.loading,
    app_settings: params.app_settings,
    currencies: params.app_settings?.currencies?.keys,
  };
};

class CreateClaim extends Component {
  state = {
    selectModalShow: false,
    showDatePicker: false,
    select_value: '',
    merchant: '',
    platform: '',
    click: '',
    currency: '',
    date: new Date(),
    receipt: '',
  };

  componentDidMount() {
    this.props.request_user_claim_stores();
  }

  handle_merchant_selection = (merchant, setFieldValue) => {
    merchantModal.current.props.onRequestClose();
    setFieldValue('Merchant', merchant.store_id);
    this.setState({merchant: merchant.store.name});
    this.props.request_user_claim_store_clicks(merchant.store_id);
  };

  handle_click_selection = (click, setFieldValue) => {
    merchantModal.current.props.onRequestClose();
    setFieldValue('Click', click.id);
    this.setState({click: click.click_time});
  };

  handle_platform_selection = (platform, setFieldValue) => {
    merchantModal.current.props.onRequestClose();
    setFieldValue('Platform', platform);
    this.setState({platform});
  };

  handle_currency_selection = (currency, setFieldValue) => {
    merchantModal.current.props.onRequestClose();
    setFieldValue('Currency', currency);
    this.setState({currency});
  };

  setDate = (selected_date, setFieldValue) => {
    setFieldValue('Date', selected_date);
    this.setState({date: selected_date, showDatePicker: false});
  };

  handle_submit = values => {
    this.props.request_user_claim_make(
      values.Merchant,
      values.Click,
      values.order_id,
      values.Platform,
      values.Currency,
      values.order_amount,
      dayjs(values.Date).format('YYYY-MM-DD'),
      values.receipt,
      // values.Comment,
    );
  };

  render() {
    const {select_value, merchant, click, showDatePicker} = this.state;
    const {user_clickable_stores, user_store_clicks, app_settings} = this.props;
    const min_date = dayjs().subtract(
      app_settings?.cashback?.claim_min_days
        ? app_settings.cashback.claim_min_days
        : 4,
      'days',
    );

    const max_date = dayjs().subtract(
      app_settings?.cashback?.claim_max_days
        ? app_settings.cashback.claim_max_days
        : 15,
      'days',
    );

    const createClaim = object().shape({
      order_id: string().trim().required(translate('required_field')),
      Merchant: string().required(translate('required_field')),
      Click: string().required(translate('required_field')),
      order_amount: number().required(translate('required_field')),
      Platform: string().required(translate('required_field')),
      Comment: string().trim().required(translate('required_field')),
      Currency: string().required(translate('required_field')),
      Date: date()
        .min(!isNaN(max_date) ? max_date : new Date())
        .max(!isNaN(min_date) ? min_date : new Date())
        .required(translate('required_field')),
      receipt: object().required(translate('required_field')),
      receiptSize: string().required(
        'Document Size can not be greater than 5 mb.',
      ),
    });
    const {receipt} = this.state;
    const nav_list = get_user_internal_nav_list([10002]);
    return (
      <Container>
        <Header>
          <HeaderLeft>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </HeaderLeft>
          <HeaderTitle>
            <Text numberOfLines={1} style={styles.headerTitle}>
              {translate('create_claim')}
            </Text>
          </HeaderTitle>
          <HeaderRight />
        </Header>
        <KeyboardAwareScrollView style={{marginTop: 60}}>
          {/* <FastImage
            source={AppImages.missing_cb_header_img}
            style={styles.header_image}
            resizeMode={FastImage.resizeMode.contain}
          /> */}
          <LottieView
            source={AppImages.create_claim}
            style={styles.header_image}
            loop
            autoPlay
          />
          <View style={styles.form_container}>
            <Formik
              initialValues={{
                order_id: '',
                Click: '',
                Merchant: '',
                Platform: '',
                order_amount: '',
                Date: new Date(),
                Comment: '',
                Currency: '',
                receipt: {},
              }}
              validationSchema={createClaim}
              onSubmit={values => this.handle_submit(values)}>
              {({
                handleBlur,
                handleChange,
                values,
                handleSubmit,
                setFieldValue,
              }) => {
                return (
                  <>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={[styles.touchableInput]}
                      onPress={() =>
                        this.setState({
                          selectModalShow: true,
                          select_value: 'merchant',
                        })
                      }>
                      <View
                        style={{
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={
                            this.state.merchant
                              ? styles.placeholderText
                              : styles.h3Text
                          }>
                          {translate('select_merchant')}
                        </Text>
                        {values.Merchant ? (
                          <Text style={[styles.text]}>
                            {this.state.merchant}
                          </Text>
                        ) : null}
                      </View>
                      <Icon.AntDesign
                        name="down"
                        size={15}
                        color={Theme.COLORS.black}
                      />
                    </TouchableOpacity>
                    <ErrorMessage name="Merchant">
                      {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                    </ErrorMessage>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={[styles.touchableInput]}
                      onPress={() =>
                        this.setState({
                          selectModalShow: true,
                          select_value: 'click',
                        })
                      }>
                      <View
                        style={{
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={
                            this.state.click
                              ? styles.placeholderText
                              : styles.h3Text
                          }>
                          {translate('click_time')}
                        </Text>
                        {values.Click ? (
                          <Text style={[styles.text]}>{this.state.click}</Text>
                        ) : null}
                      </View>
                      <Icon.AntDesign
                        name="down"
                        size={15}
                        color={Theme.COLORS.black}
                      />
                    </TouchableOpacity>
                    <ErrorMessage name="Click">
                      {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                    </ErrorMessage>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={[styles.touchableInput]}
                      onPress={() =>
                        this.setState({
                          selectModalShow: true,
                          select_value: 'platform',
                        })
                      }>
                      <View
                        style={{
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={
                            this.state.platform
                              ? styles.placeholderText
                              : styles.h3Text
                          }>
                          {translate('platform')}
                        </Text>
                        {values.Platform ? (
                          <Text style={[styles.text]}>
                            {this.state.platform}
                          </Text>
                        ) : null}
                      </View>
                      <Icon.AntDesign
                        name="down"
                        size={15}
                        color={Theme.COLORS.black}
                      />
                    </TouchableOpacity>
                    <ErrorMessage name="Platform">
                      {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                    </ErrorMessage>

                    <TextBox
                      placeholder={'Order Id'}
                      keyboardType="numeric"
                      value={values.order_id}
                      onChangeText={handleChange('order_id')}
                      placeholderTextColor={{color: Theme.COLORS.grey}}
                      style={
                        values.order_id
                          ? [styles.h3Text, {height: '40%', marginTop: 5}]
                          : [styles.h3Text, {height: '100%'}]
                      }
                      content={
                        values.order_id ? (
                          <Text style={styles.inputHeaderText}>
                            {translate('order_id')}
                          </Text>
                        ) : null
                      }></TextBox>
                    <ErrorMessage name="order_id">
                      {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                    </ErrorMessage>

                    <View style={styles.amountTab}>
                      <TextBox
                        containerStyle={styles.containerStyle}
                        placeholder={translate('order_amount')}
                        keyboardType="numeric"
                        value={values.order_amount}
                        onChangeText={handleChange('order_amount')}
                        // placeholderTextColor={styles.h3Text}
                        style={
                          values.order_amount
                            ? [styles.h3Text, {height: '40%', marginTop: 5}]
                            : [styles.h3Text, {height: '100%'}]
                        }
                        content={
                          values.order_amount ? (
                            <Text style={styles.inputHeaderText}>
                              {translate('order_amount')}
                            </Text>
                          ) : null
                        }></TextBox>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={[styles.touchableInput, {width: '49%'}]}
                        onPress={() =>
                          this.setState({
                            selectModalShow: true,
                            select_value: 'currency',
                          })
                        }>
                        <View
                          style={{
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={
                              this.state.platform
                                ? styles.placeholderText
                                : styles.h3Text
                            }>
                            {translate('select_currency')}
                          </Text>
                          {values.Currency ? (
                            <Text style={[styles.text]}>
                              {values.Currency
                                ? values.Currency
                                : translate('select_currency')}
                            </Text>
                          ) : null}
                        </View>
                        <Icon.AntDesign
                          name="down"
                          size={15}
                          color={Theme.COLORS.black}
                        />
                      </TouchableOpacity>
                    </View>
                    <ErrorMessage name="order_amount">
                      {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                    </ErrorMessage>
                    <ErrorMessage name="Currency">
                      {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                    </ErrorMessage>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={[styles.touchableInput]}
                      onPress={() =>
                        this.setState({
                          showDatePicker: !this.state.showDatePicker,
                        })
                      }>
                      <View
                        style={{
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={
                            this.state.date
                              ? styles.placeholderText
                              : styles.h3Text
                          }>
                          {translate('purchase_date')}
                        </Text>
                        {values.Date ? (
                          <Text style={[styles.text]}>
                            {dayjs(values.Date).format('DD/MM/YYYY')}
                          </Text>
                        ) : null}
                      </View>
                      <Icon.AntDesign
                        name="down"
                        size={15}
                        color={Theme.COLORS.black}
                      />
                    </TouchableOpacity>
                    <ErrorMessage name="Date">
                      {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                    </ErrorMessage>
                    {showDatePicker ? (
                      <View>
                        {Platform.OS === 'ios' ? (
                          <DateTimePicker
                            value={this.state.date}
                            mode={'date'}
                            // maximumDate={max_date}
                            // minimumDate={min_date}
                            is24Hour={false}
                            display="spinner"
                            onChange={(event, d) => {
                              if (d) {
                                this.setDate(d, setFieldValue);
                              }
                            }}
                          />
                        ) : (
                          <DateTimePicker
                            value={this.state.date}
                            mode={'date'}
                            // maximumDate={max_date}
                            // minimumDate={min_date}
                            is24Hour={false}
                            display="default"
                            onChange={(event, d) => {
                              if (d) {
                                this.setState({showDatePicker: false});
                                this.setDate(d, setFieldValue);
                              }
                            }}
                          />
                        )}
                      </View>
                    ) : null}

                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={[styles.touchableInput]}
                      onPress={async () => {
                        try {
                          const res = await DocumentPicker.pick({
                            type: [
                              DocumentPicker.types.images,
                              DocumentPicker.types.pdf,
                            ],
                          });
                          this.setState({receipt: res[0].name});
                          console.log('receipt name:', res);
                          values.receipt = res[0];
                          // console.log(res.size)
                          if (res[0].size / 1024 <= 5 * 1024)
                            values.receiptSize = res[0].name;
                          else values.receiptSize = '';
                        } catch (err) {
                          if (DocumentPicker.isCancel(err)) {
                            // User cancelled the picker, exit any dialogs or menus and move on
                          } else {
                            throw err;
                          }
                        }
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={
                            this.state.receipt
                              ? styles.placeholderText
                              : styles.h3Text
                          }>
                          {translate('select_receipt')}
                        </Text>
                        {receipt ? (
                          <Text style={[styles.text]}>{receipt}</Text>
                        ) : null}
                      </View>
                      <Icon.AntDesign
                        name="down"
                        size={15}
                        color={Theme.COLORS.black}
                      />
                    </TouchableOpacity>
                    <View style={styles.receiptInfoView}>
                      <Text style={styles.receiptInfo}>
                        {translate('file_size_allowed')}
                      </Text>
                      <Text style={styles.receiptInfo}>
                        {translate('accepted_format')}
                      </Text>
                    </View>
                    <ErrorMessage name="receipt">
                      {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                    </ErrorMessage>
                    <ErrorMessage name="receiptSize">
                      {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                    </ErrorMessage>

                    <LangSupportTxtInput
                      style={styles.textInputComment}
                      placeholder={translate('comment')}
                      value={values.Comment}
                      onBlur={handleBlur('Comment')}
                      placeholderTextColor={Theme.COLORS.grey}
                      onChangeText={handleChange('Comment')}
                      name="Comment"
                      multiline={true}
                    />
                    <ErrorMessage name="Comment">
                      {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                    </ErrorMessage>
                    {/* <TouchableOpacity
                      style={styles.submitBtn}
                      onPress={handleSubmit}>
                      <Text style={styles.submitBtnText}>
                        {translate('submit')}
                      </Text>
                    </TouchableOpacity> */}
                    <LBButton
                      label={translate('submit')}
                      btnStyle={[
                        styles.btnStyle,
                        {backgroundColor: Theme.COLORS.secondary},
                      ]}
                      labelStyle={styles.btn_labelStyle}
                      onPress={handleSubmit}
                    />
                    <BottomModal
                      ref={merchantModal}
                      bottomModalShow={this.state.selectModalShow}
                      setBottomModalVisibleFalse={() =>
                        this.setState({selectModalShow: false})
                      }>
                      {select_value === 'merchant' ? (
                        <>
                          <Text style={styles.title}>
                            {translate('select_merchant')}
                          </Text>

                          <FlatList
                            style={styles.modalList}
                            data={user_clickable_stores}
                            ListEmptyComponent={EmptyListView}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={this.props}
                            renderItem={({item, index}) => {
                              return (
                                <TouchableOpacity
                                  style={[
                                    styles.selectTab,
                                    {
                                      backgroundColor:
                                        values.Merchant == item.store_id
                                          ? Theme.COLORS.primary
                                          : Theme.COLORS.white,
                                    },
                                  ]}
                                  onPress={() =>
                                    this.handle_merchant_selection(
                                      item,
                                      setFieldValue,
                                    )
                                  }>
                                  <Text
                                    style={[
                                      styles.select_text,
                                      {
                                        color:
                                          values.Merchant === item.store_id
                                            ? Theme.COLORS.white
                                            : Theme.COLORS.blackText,
                                      },
                                    ]}>
                                    {item.store?.name}
                                  </Text>
                                </TouchableOpacity>
                              );
                            }}
                          />
                        </>
                      ) : null}
                      {select_value === 'click' ? (
                        <>
                          <Text style={styles.title}>
                            {translate('click_time')}
                          </Text>

                          <FlatList
                            style={styles.modalList}
                            data={user_store_clicks}
                            ListEmptyComponent={EmptyListView}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={this.props}
                            renderItem={({item, index}) => {
                              return (
                                <TouchableOpacity
                                  style={[
                                    styles.selectTab,
                                    {
                                      backgroundColor:
                                        this.state.merchant === item.id
                                          ? Theme.COLORS.primary
                                          : Theme.COLORS.white,
                                    },
                                  ]}
                                  onPress={() =>
                                    this.handle_click_selection(
                                      item,
                                      setFieldValue,
                                    )
                                  }>
                                  <Text
                                    style={[
                                      styles.select_text,
                                      {
                                        color:
                                          this.state.merchant === item.id
                                            ? Theme.COLORS.white
                                            : Theme.COLORS.blackText,
                                      },
                                    ]}>
                                    {item.click_time}
                                  </Text>
                                </TouchableOpacity>
                              );
                            }}
                          />
                        </>
                      ) : null}
                      {select_value === 'platform' ? (
                        <>
                          <Text style={styles.title}>
                            {translate('platform')}
                          </Text>

                          <FlatList
                            style={styles.modalList}
                            data={platform_list}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={this.props}
                            renderItem={({item, index}) => {
                              return (
                                <TouchableOpacity
                                  style={[
                                    styles.selectTab,
                                    {
                                      backgroundColor:
                                        this.state.platform === item
                                          ? Theme.COLORS.primary
                                          : Theme.COLORS.white,
                                    },
                                  ]}
                                  onPress={() =>
                                    this.handle_platform_selection(
                                      item,
                                      setFieldValue,
                                    )
                                  }>
                                  <Text
                                    style={[
                                      styles.select_text,
                                      {
                                        color:
                                          this.state.platform === item
                                            ? Theme.COLORS.white
                                            : Theme.COLORS.blackText,
                                      },
                                    ]}>
                                    {item}
                                  </Text>
                                </TouchableOpacity>
                              );
                            }}
                          />
                        </>
                      ) : null}
                      {select_value === 'currency' ? (
                        <>
                          <Text style={styles.title}>
                            {translate('select_currency')}
                          </Text>
                          <FlatList
                            style={styles.modalList}
                            data={this.props.currencies}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={this.props}
                            renderItem={({item, index}) => {
                              return (
                                <TouchableOpacity
                                  style={[
                                    styles.selectTab,
                                    {
                                      backgroundColor:
                                        this.state.currency === item
                                          ? Theme.COLORS.primary
                                          : Theme.COLORS.white,
                                    },
                                  ]}
                                  onPress={() =>
                                    this.handle_currency_selection(
                                      item,
                                      setFieldValue,
                                    )
                                  }>
                                  <Text
                                    style={[
                                      styles.select_text,
                                      {
                                        textTransform: 'uppercase',
                                        color:
                                          this.state.currency === item
                                            ? Theme.COLORS.white
                                            : Theme.COLORS.blackText,
                                      },
                                    ]}>
                                    {item}
                                  </Text>
                                </TouchableOpacity>
                              );
                            }}
                          />
                        </>
                      ) : null}
                      <View style={styles.btnBar}>
                        <CloseButton
                          btnStyle={styles.closeBtn}
                          onPress={() =>
                            merchantModal.current.props.onRequestClose()
                          }
                        />
                      </View>
                    </BottomModal>
                  </>
                );
              }}
            </Formik>
          </View>
        </KeyboardAwareScrollView>
        <BlurNavBar>
          <NavigationList
            list={nav_list}
            navigation={this.props.navigation}
            style={styles.navListStyle}
            numberColumn={1}
            containerStyle={{
              marginTop: 0,
            }}
            textStyle={styles.routeText}
          />
        </BlurNavBar>
        <Loader show={this.props.loading} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateClaim);
