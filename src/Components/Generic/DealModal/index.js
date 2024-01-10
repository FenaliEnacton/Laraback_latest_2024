import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  Platform,
  View,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from '@assets/icons';
import {AppImages} from '@assets/Images';
import {translate} from '@translations';
import Clipboard from '@react-native-community/clipboard';
import {Toast, CashbackString, CloseButton} from '@components/core';
import {get_currency_string} from '@user_redux/Utils';
import Config from 'react-native-config';
import {request_store_details} from '@app_redux/Actions';
import dayjs from 'dayjs';
import {is_user_logged_in} from '@app_redux/Selectors';
import {connect} from 'react-redux';
import {Theme} from '@assets/Theme';
import DealModalLoader from './DealModalLoader';
import FastImage from 'react-native-fast-image';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DealModal(props) {
  const {
    dealModalShow,
    deal,
    deal: {store},
    navigation: {navigate} = {},
    setDealModalVisibleFalse,
    setDealModalVisibleTrue,
    is_member,
    app_settings,
  } = props;

  function copy_code() {
    Clipboard.setString(deal.code);
    Toast.successBottom(translate('copied'));
  }

  function shop_now_click() {
    if (deal.coupon_code) {
      copy_code();
    }
    setDealModalVisibleFalse();
    let navigation_options = {
      web_url: Config.APP_OUT_URL.replace(':type', 'deal').replace(
        ':type_id',
        deal.id,
      ),

      cb_text: store.cashback_enabled ? store.cashback_string : '',
      header_title: store?.name ? store?.name : '',
      store_logo: store?.logo ? store?.logo : '',
      coupon_code: deal.code,
    };
    if (is_member) {
      navigate('OutPage', {out_page_info: navigation_options});
    } else {
      navigate('Login', {out_page_info: navigation_options});
    }
  }

  return (
    <Modal
      transparent={true}
      animationType="fade"
      onRequestClose={setDealModalVisibleFalse}
      visible={dealModalShow}>
      <View
        activeOpacity={1}
        onPress={setDealModalVisibleFalse}
        style={styles.modalBackground}>
        <TouchableOpacity
          style={styles.closeBtn}
          activeOpacity={1}
          onPress={setDealModalVisibleFalse}
        />
        <View style={styles.modalContent}>
          <View style={Theme.appStyle.modal_top_notch} />
          {/* <CloseButton
            btnStyle={styles.closeBtnStyle}
            onPress={() => setDealModalVisibleFalse()}
          /> */}
          {props.loading ? (
            <DealModalLoader />
          ) : (
            <>
              <View style={styles.top_box}>
                <View style={styles.discount_box}>
                  <Text style={styles.dis_text}>{deal.discount}</Text>
                </View>
                <TouchableOpacity
                  style={styles.img_box}
                  onPress={() => {
                    setDealModalVisibleFalse();
                    props.request_store_details(store.id);
                  }}>
                  <FastImage
                    source={{
                      uri: store?.logo ? store?.logo : Config.EMPTY_IMAGE_URL,
                    }}
                    style={styles.store_logo}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.main_img_box}>
                <FastImage
                  source={{
                    uri: deal.image ? deal.image : Config.EMPTY_IMAGE_URL,
                  }}
                  style={styles.main_img}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
              <Text style={styles.deal_title} numberOfLines={3}>
                {deal?.title ? deal?.title : deal?.post?.post_title}
              </Text>
              <View style={styles.cpn_code_wrapper}>
                {store?.cashback_enabled && store.cashback_string ? (
                  <Text style={styles.cashback_string}>
                    {store.cashback_string}
                  </Text>
                ) : (
                  <View style={styles.cpn_code_empty} />
                )}
                <Text style={styles.retail_price}>
                  {get_currency_string(deal.retail_price)}
                </Text>
              </View>
              <View style={styles.cpn_code_wrapper}>
                {deal.code ? (
                  <TouchableOpacity
                    style={styles.cpn_code}
                    onPress={() => copy_code()}>
                    <FastImage
                      source={AppImages.cb_icon}
                      style={styles.cb_icon}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={styles.code}>{deal.code}</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.cpn_code_empty} />
                )}
                <View style={styles.date_box}>
                  <Text style={styles.exp_date}>
                    <Text style={styles.offer_price}>
                      {get_currency_string(deal.offer_price)}
                    </Text>
                  </Text>
                </View>
              </View>
              <Text style={styles.deal_description} numberOfLines={4}>
                {deal?.description
                  ? deal?.description
                  : deal?.post?.post_content}
              </Text>
              {deal.expiry_date ? (
                <Text style={styles.expiry_date}>
                  {translate('valid_until')}{' '}
                  {dayjs(deal.expiry_date).format(
                    app_settings?.web?.date_format_js
                      ? app_settings?.web?.date_format_js
                      : 'DD-MM-YYYY',
                  )}
                </Text>
              ) : null}
              <View style={styles.btnBar}>
                <CloseButton
                  btnStyle={styles.closeBtnStyle}
                  onPress={() => setDealModalVisibleFalse()}
                />
                <TouchableOpacity
                  style={styles.shop_btn}
                  onPress={() => shop_now_click()}>
                  <Text style={styles.btn_text} numberOfLines={1}>
                    {translate('get_deal')}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

function mapStateToProps({params}) {
  return {
    // is_user_logged_in_prop: is_user_logged_in(params),
    deal: params.deal_info || {},
    is_member: is_user_logged_in(params) || false,
    app_settings: params.app_settings || {},
    loading: params.loading,
  };
}

const styles = StyleSheet.create({
  ...Theme.appStyle,
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    flex: 1,
    justifyContent: 'center',
  },
  closeBtnStyle: {
    alignSelf: 'center',
  },
  modalContent: {
    borderRadius: 20,
    backgroundColor: Theme.COLORS.white,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    maxHeight: windowHeight - 150,
    paddingTop: 5,
    paddingBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.7)',
        shadowOffset: {
          height: 0.5,
          width: 1,
        },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 5,
      },
    }),
    // paddingBottom: 20,
  },
  top_box: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth - 50,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  discount_box: {
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    height: 20,
    paddingHorizontal: 10,
    borderColor: Theme.COLORS.secondary,
  },
  offer_price: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.green_approved,
  },
  retail_price: {
    ...Theme.fontStyles.h5Bold,
    textDecorationLine: 'line-through',
    marginRight: 5,
    color: Theme.COLORS.black,
  },
  dis_text: {
    ...Theme.fontStyles.h3Regular,
    color: Theme.COLORS.secondary,
  },
  img_box: {
    height: 40,
    width: 100,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: Theme.COLORS.white,
    borderColor: Theme.COLORS.background,
  },
  main_img_box: {
    height: 130,
    width: windowWidth - 50,
    marginTop: 10,
  },
  main_img: {
    height: 130,
    width: windowWidth - 50,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  store_logo: {
    height: 35,
    width: 90,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  cashback_string: {
    ...Theme.fontStyles.h4Bold,
    color: Theme.COLORS.secondary,
  },
  code_box: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    height: 40,
  },
  code_btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.background,
    maxWidth: 130,
    paddingHorizontal: 10,
    marginLeft: 5,
    height: 30,
    paddingVertical: 5,
    justifyContent: 'center',
    borderRadius: 5,
  },
  deal_text: {
    ...Theme.fontStyles.h2Bold,
    marginRight: 5,
    maxWidth: 100,
    minWidth: 80,
    alignSelf: 'center',
    textAlign: 'center',
  },
  code_text: {
    ...Theme.fontStyles.h3Bold,
    textTransform: 'capitalize',
    color: Theme.COLORS.blackText,
    width: 55,
  },
  cb_style: {
    alignItems: 'center',
  },
  separator: {
    backgroundColor: Theme.COLORS.background,
    height: 1,
    width: '100%',
    marginVertical: 5,
  },
  store_name: {
    ...Theme.fontStyles.h1Bold,
    color: Theme.COLORS.blackText,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
    marginTop: 5,
  },
  deal_title: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.blackText,
    marginVertical: 10,
    width: '90%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  deal_description: {
    ...Theme.fontStyles.h4Regular,
    color: Theme.COLORS.blackText,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  shop_btn: {
    backgroundColor: Theme.COLORS.secondary,
    width: windowWidth * 0.4,
    borderRadius: 20,
    alignSelf: 'center',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.7)',
        shadowOffset: {
          height: 0.5,
          width: 1,
        },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  btn_text: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.white,
    textAlign: 'center',
    width: '100%',
    textTransform: 'capitalize',
  },
  cpn_code_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    alignItems: 'center',
    width: '95%',
    marginBottom: 5,
  },
  cb_icon: {
    height: 10,
    width: 14,
  },
  cpn_code: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Theme.COLORS.secondary,
    borderStyle: 'dashed',
    borderRadius: 30,
    padding: 3,
    paddingVertical: 5,
    maxWidth: '50%',
    minWidth: '20%',
    justifyContent: 'space-evenly',
    backgroundColor: Theme.COLORS.coupon_code_bg_color,
  },
  cpn_code_empty: {
    maxWidth: '80%',
  },
  code: {
    ...Theme.fontStyles.h5Bold,
    color: Theme.COLORS.secondary,
    marginLeft: 5,
  },
  expiry_date: {
    ...Theme.fontStyles.h4Regular,
    color: Theme.COLORS.grey,
  },
  date_box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnBar: {
    position: 'absolute',
    bottom: -30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    maxWidth: '90%',
    minWidth: '70%',
    alignItems: 'center',
  },
});

export default connect(mapStateToProps, {request_store_details})(DealModal);
