import { AppImages } from '@/Assets/Images';
import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import CashbackString from '@/Components/Core/CashbackString';
import CloseButton from '@/Components/Core/CloseButton';
import Toast from '@/Components/Core/Toast';
import { navigate } from '@/Navigation/appNavigator';
import { request_store_details } from '@/Redux/Actions/publicDataActions';
import { is_user_logged_in } from '@/Redux/Selectors';
import Config from '@/react-native-config';
import { translate } from '@/translations';
import Clipboard from '@react-native-community/clipboard';
import dayjs from 'dayjs';
import React from 'react';
import {
  Dimensions,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function CouponModal(props) {
  const {
    offerModalShow,
    coupon,
    coupon: { store },
    is_member,
    setCouponModalVisibleFalse,
    app_settings,
  } = props;

  function copy_code() {
    Clipboard.setString(coupon.code);
    Toast.successBottom(translate('copied'));
  }

  function shop_now_click() {
    if (coupon.coupon_code) {
      copy_code();
    }
    setCouponModalVisibleFalse();
    let navigation_options = {
      web_url: Config.APP_OUT_URL.replace(':type', 'coupon').replace(
        ':type_id',
        coupon.id,
      ),
      cb_text: store.cashback_enabled ? store.cashback_string : '',
      header_title: store?.name ? store?.name : '',
      store_logo: store?.logo ? store?.logo : '',
      coupon_code: coupon.code,
    };
    if (is_member) {
      navigate('OutPage', { out_page_info: navigation_options });
    } else {
      navigate('Login', { out_page_info: navigation_options });
    }
  }

  return (
    <Modal
      transparent={true}
      animationType="fade"
      onRequestClose={setCouponModalVisibleFalse}
      visible={offerModalShow}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={setCouponModalVisibleFalse}
        style={styles.modalBackground}>
        <TouchableOpacity
          style={styles.closeBtn}
          activeOpacity={1}
          onPress={setCouponModalVisibleFalse}
        />
        <View style={styles.modalContent}>
          <View style={Theme.appStyle.modal_top_notch} />
          {/* <CloseButton
            btnStyle={styles.closeBtnStyle}
            onPress={() => setCouponModalVisibleFalse()}
          /> */}
          <TouchableOpacity
            style={styles.img_box}
            onPress={() => {
              setCouponModalVisibleFalse();
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
          <Text style={styles.coupon_title}>
            {coupon?.title ? coupon?.title : coupon?.post?.post_title}
          </Text>
          {store?.cashback_enabled && store.cashback_string ? (
            <CashbackString
              icon={{ marginTop: 2, alignSelf: 'center' }}
              cb_style={styles.cb_style}
              cashback_string={store.cashback_string}
            />
          ) : null}
          <Text style={styles.coupon_description}>
            {coupon?.description
              ? coupon?.description
              : coupon?.post?.post_content}
          </Text>
          <View style={styles.cpn_code_wrapper}>
            {coupon.code ? (
              <TouchableOpacity
                style={styles.cpn_code}
                onPress={() => copy_code()}>
                <FastImage
                  source={AppImages.cb_icon}
                  style={styles.cb_icon}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={styles.coupon_code}>{coupon.code}</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.cpn_code_empty} />
            )}
            <View style={styles.date_box}>
              <Icons.AntDesign
                name={'calendar'}
                color={Theme.COLORS.black}
                size={14}
              />
              {coupon.expiry_date ? (
                <Text style={styles.exp_date}>
                  {' '}
                  {dayjs(coupon.expiry_date).format(
                    app_settings?.web?.date_format_js
                      ? app_settings?.web?.date_format_js
                      : 'DD-MM-YYYY',
                  )}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={styles.btnBar}>
            <CloseButton
              btnStyle={styles.closeBtnStyle}
              onPress={() => setCouponModalVisibleFalse()}
            />
            <TouchableOpacity
              style={styles.shop_btn}
              onPress={() => shop_now_click()}>
              <Text style={styles.btn_text} numberOfLines={1}>
                {translate('shop_now')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

function mapStateToProps({ params }) {
  return {
    is_member: is_user_logged_in(params) || false,
    app_settings: params.app_settings || {},
  };
}

const styles = StyleSheet.create({
  ...Theme.appStyle,
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    flex: 1,
    justifyContent: 'center',
  },
  closeBtnStyle: {
    alignSelf: 'center',
  },
  modalContent: {
    borderRadius: 20,
    backgroundColor: Theme.COLORS.white,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    maxHeight: windowHeight - 150,
    paddingTop: 5,
    paddingBottom: 30,
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
  img_box: {
    height: 50,
    width: 120,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: Theme.COLORS.white,
    borderColor: Theme.COLORS.background,
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
  store_logo: {
    height: 40,
    width: 120,
    resizeMode: 'contain',
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
  coupon_text: {
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
  coupon_title: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.blackText,
    marginVertical: 10,
    width: '90%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  coupon_description: {
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
    marginVertical: 10,
    // position: 'absolute',
    // bottom: -30,
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
    maxWidth: '80%',
    minWidth: '40%',
    justifyContent: 'space-evenly',
    backgroundColor: Theme.COLORS.coupon_code_bg_color,
  },
  cpn_code_empty: {
    maxWidth: '80%',
  },
  coupon_code: {
    ...Theme.fontStyles.h5Bold,
    color: Theme.COLORS.secondary,
    marginLeft: 5,
  },
  exp_date: {
    ...Theme.fontStyles.h4Regular,
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

export default connect(mapStateToProps, { request_store_details })(CouponModal);
