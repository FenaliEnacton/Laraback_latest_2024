import { platform_list } from '@/Assets/AppDataConfig';
import { get_user_internal_nav_list } from '@/Assets/RouterList';
import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import BottomModal from '@/Components/Core/BottomModal';
import CloseButton from '@/Components/Core/CloseButton';
import Container from '@/Components/Core/Container';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import LBButton from '@/Components/Core/LBButton';
import LangSupportTxtInput from '@/Components/Core/LangSupportTxtInput';
import Loader from '@/Components/Core/Loader';
import InputText from '@/Components/Core/TextBox';
import EmptyListView from '@/Components/Generic/EmptyListView';
import NavigationList from '@/Components/User/NavigationList';
import usePublicData from '@/Hooks/Api/use-public-data';
import useUserClaim from '@/Hooks/Api/use-user-claim';
import { translate } from '@/translations';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { ErrorMessage, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { date, number, object, string } from 'yup';
import styles from './style';
const windowWidth = Dimensions.get('window').width;

const merchantModal: any = React.createRef();

const CreateClaim = props => {
  const [selectModalShow, setSelectModalShow] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [merchant, setMerchant] = useState('');
  const [platform, setPlatform] = useState('');
  const [click, setClick] = useState('');
  const [currency, setCurrency] = useState('');
  const [ddate, setDDate] = useState(new Date());
  const [receipt, setReceipt] = useState('');
  const nav_list = get_user_internal_nav_list([10002]);
  const { appSettings }: any = usePublicData();
  // const yupdate = date()

  const min_date: any = dayjs().subtract(
    appSettings?.cashback?.claim_min_days
      ? appSettings.cashback.claim_min_days
      : 4,
    'days',
  );

  const max_date: any = dayjs().subtract(
    appSettings?.cashback?.claim_max_days
      ? appSettings.cashback.claim_max_days
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

  const {
    request_user_claim_store_clicks,
    request_user_claim_make,
    request_user_claim_stores,
    loadingUserClaimStores,
    userClaimStores,
    userClaimStoresClicks,
    loadingUserClaimMake,
  }: any = useUserClaim();

  useEffect(() => {
    request_user_claim_stores();
  }, []);

  const handle_merchant_selection = (merchant, setFieldValue) => {
    merchantModal.current.props.onRequestClose();
    setFieldValue('Merchant', merchant.store_id);
    // this.setState({ merchant: merchant.store.name });
    setMerchant(merchant.store.name);
    request_user_claim_store_clicks(merchant.store_id);
  };
  const handle_click_selection = (click, setFieldValue) => {
    merchantModal.current.props.onRequestClose();
    setFieldValue('Click', click.id);
    setClick(click.click_time);
  };
  const handle_platform_selection = (platform, setFieldValue) => {
    merchantModal.current.props.onRequestClose();
    setFieldValue('Platform', platform);
    setPlatform(platform);
  };
  const handle_currency_selection = (currency, setFieldValue) => {
    merchantModal.current.props.onRequestClose();
    setFieldValue('Currency', currency);
    setCurrency(currency);
  };
  const setDate = (selected_date, setFieldValue) => {
    setFieldValue('Date', selected_date);
    setDDate(selected_date);
    setShowDatePicker(false);
  };
  const handle_submit = values => {
    console.log('🚀 ~ CreateClaim ~ values:', values);
    request_user_claim_make(
      values.Merchant,
      values.Click,
      values.order_id,
      values.Platform,
      values.Currency,
      values.order_amount,
      dayjs(values.Date).format('YYYY-MM-DD'),
      values.receipt,
    );
  };

  return (
    <Container>
      <Header>
        <Header.Left>
          <HeaderBackButton
            btnStyle={{ backgroundColor: Theme.COLORS.primary }}
            onPress={() => props.navigation.goBack()}
          />
        </Header.Left>
        <Header.Title>
          <Text
            numberOfLines={1}
            style={[styles.headerTitle, { width: 130, textAlign: 'left' }]}>
            {translate('create_claim')}
          </Text>
        </Header.Title>
        <Header.Right />
      </Header>
      <KeyboardAwareScrollView style={{ marginTop: 60 }}>
        {/* <LottieView
          source={AppImages.create_claim}
          style={styles.header_image}
          loop
          autoPlay
        /> */}
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
            onSubmit={values => handle_submit(values)}>
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
                    onPress={() => {
                      setSelectModalShow(true);
                      setSelectValue('merchant');
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={
                          merchant ? styles.placeholderText : styles.h3Text
                        }>
                        {translate('select_merchant')}
                      </Text>
                      {values.Merchant ? (
                        <Text style={[styles.text]}>{merchant}</Text>
                      ) : null}
                    </View>
                    <Icons.AntDesign
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
                    onPress={() => {
                      setSelectModalShow(true);
                      setSelectValue('click');
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={click ? styles.placeholderText : styles.h3Text}>
                        {translate('click_time')}
                      </Text>
                      {values.Click ? (
                        <Text style={[styles.text]}>{click}</Text>
                      ) : null}
                    </View>
                    <Icons.AntDesign
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
                    onPress={() => {
                      setSelectModalShow(true);
                      setSelectValue('platform');
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={
                          platform ? styles.placeholderText : styles.h3Text
                        }>
                        {translate('platform')}
                      </Text>
                      {values.Platform ? (
                        <Text style={[styles.text]}>{platform}</Text>
                      ) : null}
                    </View>
                    <Icons.AntDesign
                      name="down"
                      size={15}
                      color={Theme.COLORS.black}
                    />
                  </TouchableOpacity>
                  <ErrorMessage name="Platform">
                    {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                  </ErrorMessage>

                  <InputText
                    placeholder={'Order Id'}
                    keyboardType="numeric"
                    value={values.order_id}
                    onChangeText={handleChange('order_id')}
                    placeholderTextColor={{ color: Theme.COLORS.grey }}
                    style={
                      values.order_id
                        ? [styles.h3Text, { height: '40%', marginTop: 5 }]
                        : [styles.h3Text, { height: '100%' }]
                    }
                    content={
                      values.order_id ? (
                        <Text style={styles.inputHeaderText}>
                          {translate('order_id')}
                        </Text>
                      ) : null
                    }></InputText>
                  <ErrorMessage name="order_id">
                    {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                  </ErrorMessage>

                  <View style={styles.amountTab}>
                    <InputText
                      containerStyle={styles.containerStyle}
                      placeholder={translate('order_amount')}
                      keyboardType="numeric"
                      value={values.order_amount}
                      onChangeText={handleChange('order_amount')}
                      // placeholderTextColor={styles.h3Text}
                      style={
                        values.order_amount
                          ? [styles.h3Text, { height: '40%', marginTop: 5 }]
                          : [styles.h3Text, { height: '100%' }]
                      }
                      content={
                        values.order_amount ? (
                          <Text style={styles.inputHeaderText}>
                            {translate('order_amount')}
                          </Text>
                        ) : null
                      }></InputText>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={[styles.touchableInput, { width: '49%' }]}
                      onPress={() => {
                        setSelectModalShow(true);
                        setSelectValue('currency');
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={
                            platform ? styles.placeholderText : styles.h3Text
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
                      <Icons.AntDesign
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
                    onPress={() => setShowDatePicker(!showDatePicker)}>
                    <View
                      style={{
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={ddate ? styles.placeholderText : styles.h3Text}>
                        {translate('purchase_date')}
                      </Text>
                      {values.Date ? (
                        <Text style={[styles.text]}>
                          {dayjs(values.Date).format('DD/MM/YYYY')}
                        </Text>
                      ) : null}
                    </View>
                    <Icons.AntDesign
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
                          value={ddate}
                          mode={'date'}
                          // maximumDate={max_date}
                          // minimumDate={min_date}
                          is24Hour={false}
                          display="spinner"
                          onChange={(event, d) => {
                            if (d) {
                              setDate(d, setFieldValue);
                            }
                          }}
                        />
                      ) : (
                        <DateTimePicker
                          value={ddate}
                          mode={'date'}
                          // maximumDate={max_date}
                          // minimumDate={min_date}
                          is24Hour={false}
                          display="default"
                          onChange={(event, d) => {
                            if (d) {
                              // this.setState({ showDatePicker: false });
                              setShowDatePicker(false);
                              setDate(d, setFieldValue);
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
                        const res: any = await DocumentPicker.pick({
                          type: [
                            DocumentPicker.types.images,
                            DocumentPicker.types.pdf,
                          ],
                        });

                        setReceipt(res[0].name);
                        console.log('receipt name:', res);
                        values.receipt = res[0];
                        // console.log(res.size)
                        if (res[0].size / 1024 <= 5 * 1024)
                          // @ts-ignore
                          values.receiptSize = res[0].name;
                        // @ts-ignore
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
                          receipt ? styles.placeholderText : styles.h3Text
                        }>
                        {translate('select_receipt')}
                      </Text>
                      {receipt ? (
                        <Text style={[styles.text]}>{receipt}</Text>
                      ) : null}
                    </View>
                    <Icons.AntDesign
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

                  <LBButton
                    label={translate('submit')}
                    btnStyle={[
                      styles.btnStyle,
                      { backgroundColor: Theme.COLORS.secondary },
                    ]}
                    labelStyle={styles.btn_labelStyle}
                    onPress={handleSubmit}
                  />
                  <BottomModal
                    ref={merchantModal}
                    bottomModalShow={selectModalShow}
                    setBottomModalVisibleFalse={() =>
                      // this.setState({ selectModalShow: false })
                      setSelectModalShow(false)
                    }>
                    {selectValue === 'merchant' ? (
                      <>
                        <Text style={styles.title}>
                          {translate('select_merchant')}
                        </Text>

                        <FlatList
                          style={styles.modalList}
                          data={userClaimStores || []}
                          ListEmptyComponent={EmptyListView}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({ item, index }) => {
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
                                  handle_merchant_selection(item, setFieldValue)
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
                    {selectValue === 'click' ? (
                      <>
                        <Text style={styles.title}>
                          {translate('click_time')}
                        </Text>

                        <FlatList
                          style={styles.modalList}
                          data={userClaimStoresClicks}
                          ListEmptyComponent={EmptyListView}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({ item, index }) => {
                            return (
                              <TouchableOpacity
                                style={[
                                  styles.selectTab,
                                  {
                                    backgroundColor:
                                      merchant === item.id
                                        ? Theme.COLORS.primary
                                        : Theme.COLORS.white,
                                  },
                                ]}
                                onPress={() => {
                                  console.log('=>>> cliked');
                                  handle_click_selection(item, setFieldValue);
                                }}>
                                <Text
                                  style={[
                                    styles.select_text,
                                    {
                                      color:
                                        merchant === item.id
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
                    {selectValue === 'platform' ? (
                      <>
                        <Text style={styles.title}>
                          {translate('platform')}
                        </Text>

                        <FlatList
                          style={styles.modalList}
                          data={platform_list}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({ item, index }) => {
                            return (
                              <TouchableOpacity
                                style={[
                                  styles.selectTab,
                                  {
                                    backgroundColor:
                                      platform === item
                                        ? Theme.COLORS.primary
                                        : Theme.COLORS.white,
                                  },
                                ]}
                                onPress={() =>
                                  handle_platform_selection(item, setFieldValue)
                                }>
                                <Text
                                  style={[
                                    styles.select_text,
                                    {
                                      color:
                                        platform === item
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
                    {selectValue === 'currency' ? (
                      <>
                        <Text style={styles.title}>
                          {translate('select_currency')}
                        </Text>
                        <FlatList
                          style={styles.modalList}
                          data={appSettings.currencies?.keys}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({ item, index }) => {
                            return (
                              <TouchableOpacity
                                style={[
                                  styles.selectTab,
                                  {
                                    backgroundColor:
                                      currency === item
                                        ? Theme.COLORS.primary
                                        : Theme.COLORS.white,
                                  },
                                ]}
                                onPress={() =>
                                  handle_currency_selection(item, setFieldValue)
                                }>
                                <Text
                                  style={[
                                    styles.select_text,
                                    {
                                      textTransform: 'uppercase',
                                      color:
                                        currency === item
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
          <NavigationList
            list={nav_list}
            navigation={props.navigation}
            style={styles.navListStyle}
            numberColumn={1}
            containerStyle={{
              marginTop: 0,
              // marginHorizontal: 10,
              width: windowWidth - 30,
              marginLeft: 10,
              marginRight: 10,
              // backgroundColor: 'red',
            }}
            textStyle={styles.routeText}
          />
        </View>
      </KeyboardAwareScrollView>

      <Loader show={loadingUserClaimStores || loadingUserClaimMake} />
    </Container>
  );
};

export default CreateClaim;
