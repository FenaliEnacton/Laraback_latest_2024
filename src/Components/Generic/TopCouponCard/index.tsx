import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import {
  request_coupon_cat_details,
  request_store_details,
} from '@/Redux/Actions/publicDataActions';
import Config from '@/react-native-config';
import { translate } from '@/translations';
import dayjs from 'dayjs';
import React from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
const width = Dimensions.get('window').width;
function TopCouponCard(props) {
  const { offer } = props;

  // function copy_code() {
  //   Clipboard.setString(offer.code);
  //   Toast.successBottom(translate('copied'));
  // }
  const get_cashback_string = (amount, amount_type) => {
    let string = '';
    let amt = Number(amount).toFixed(2);
    if (amount_type === 'percent') {
      string = amt + '%';
    } else if (amount_type === 'fixed') {
      string = Config.CURRENCY_PREFIX + amt;
    }
    return string;
  };

  const get_cashback_type = cb => {
    var n = cb.split(' ');
    return n[n.length - 1];
  };
  const get_cb_prefix = cb => {
    var n = cb.split(' ');
    return n[0];
  };
  return (
    // <TouchableOpacity
    //   onPress={props.couponOnPress}
    //   style={[styles.container, {backgroundColor: props.bg_color}]}>
    //   <View style={styles.top_tab}>
    //     <TouchableOpacity
    //       style={styles.img_container}
    //       onPress={() => props.request_store_details(offer.store.id)}>
    //       <Image
    //         source={{
    //           uri: offer.store?.logo
    //             ? offer.store.logo
    //             : Config.EMPTY_IMAGE_URL,
    //         }}
    //         style={styles.logo_img}
    //       />
    //     </TouchableOpacity>
    //     {offer.store.cashback_enabled ? (
    //       <CashbackString
    //         cb_style={styles.cb_style}
    //         cashback_string={offer.store.cashback_string}
    //         cb_text={styles.cb_string}
    //         color={'secondary'}
    //         icon_size={12}
    //       />
    //     ) : null}
    //   </View>
    //   <Text style={styles.store_title} numberOfLines={2}>
    //     {offer.title}
    //   </Text>
    //   <View style={styles.cpn_code_wrapper}>
    //     {offer.code ? (
    //       <TouchableOpacity style={styles.cpn_code} onPress={() => copy_code()}>
    //         <Image source={AppImages.cb_icon} style={styles.cb_icon} />
    //         <Text style={styles.coupon_code}>{offer.code}</Text>
    //       </TouchableOpacity>
    //     ) : (
    //       <View style={styles.cpn_code_empty} />
    //     )}
    //     <TouchableOpacity
    //       style={styles.cpn_arrow}
    //       onPress={props.couponOnPress}>
    //       <Icon.FontAwesome name="chevron-right" color={Theme.COLORS.white} />
    //     </TouchableOpacity>
    //   </View>
    // </TouchableOpacity>

    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#f5e3e6', '#d9e4f5']}
      style={[styles.gradientCard, props.style]}>
      <View style={[styles.circle, { top: -17 }]} />
      <View style={[styles.circle, { bottom: -17 }]} />
      <View style={styles.cashbackCard}>
        <View style={styles.border}>
          <Text style={[styles.cashbackText]}>CASHBACK</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={props.couponOnPress}
        style={[styles.dealCard, props.style]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={styles.logoImg}>
            <FastImage
              source={{
                uri: offer.store?.logo
                  ? offer.store.logo
                  : Config.EMPTY_IMAGE_URL,
              }}
              style={styles.logo}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.cbText}>
              {get_cb_prefix(offer.store.cashback_string)}
              <Text style={styles.percentText}>
                {' '}
                {get_cashback_string(
                  offer.store.cashback_amount,
                  offer.store.amount_type,
                )}{' '}
              </Text>
              {get_cashback_type(offer.store.cashback_string)}
            </Text>
          </View>
        </View>
        <Text numberOfLines={2} style={[styles.dealTitle, props.titleStyle]}>
          {offer.title}
        </Text>
        {/* <Text style={styles.cbText}>{offer.store.cashback_string}</Text> */}
        <View style={styles.expriryDateView}>
          <View style={styles.expDate}>
            {offer?.expiry_date ? (
              <>
                <Icons.AntDesign
                  name="clockcircleo"
                  size={15}
                  color={Theme.COLORS.grey}
                />
                <Text style={styles.greyText}>
                  Exp. {dayjs(offer.expiry_date).format('DD/MM/YYYY')}
                </Text>
              </>
            ) : null}
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.getCodeBtn}
            onPress={props.couponOnPress}>
            <Text style={styles.getCodeText}>{translate('get_code')}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
}

function TopCouponHomeFooter(props) {
  return (
    <TouchableOpacity
      onPress={() => props.request_coupon_cat_details(props.category.id)}>
      <Text style={styles.view_all_text}>
        {translate('see_all')}
        <Icons.Ionicons
          name={'caret-forward'}
          color={Theme.COLORS.black}
          size={15}
        />
      </Text>
    </TouchableOpacity>
  );
}

const mapDispatchToProps = {
  request_coupon_cat_details,
  request_store_details,
};

const mapStateToProps = ({ params }) => {
  return {};
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopCouponHomeFooter);
export { ConnectedComponent as TopCouponHomeFooter };
export default connect(mapStateToProps, mapDispatchToProps)(TopCouponCard);
const styles = StyleSheet.create({
  container: {
    width: 240,
    marginTop: 8,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
    paddingBottom: 10,
    backgroundColor: Theme.COLORS.secondary,
    justifyContent: 'space-evenly',
  },
  view_all_text: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.primary,
    alignSelf: 'center',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  img_container: {
    height: 35,
    width: 80,
    alignSelf: 'center',
    backgroundColor: Theme.COLORS.white,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logo_img: {
    resizeMode: 'contain',
    height: 35,
    width: 80,
  },
  store_title: {
    ...Theme.fontStyles.h4Bold,
    marginTop: 10,
    marginBottom: 5,
    width: '95%',
    alignSelf: 'center',
  },
  cb_string: {
    ...Theme.fontStyles.h5Regular,
    color: Theme.COLORS.secondary,
    // textAlign: 'center',
    width: '65%',
  },
  cb_style: {
    width: '50%',
    marginLeft: 10,
  },
  top_tab: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  cpn_code_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    alignItems: 'center',
    width: '95%',
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
  cpn_arrow: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    backgroundColor: Theme.COLORS.primary,
    color: Theme.COLORS.white,
    borderRadius: 12,
    alignItems: 'center',
  },
  dealCard: {
    height: 150,
    width: (width * 55) / 100,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 10,
    paddingLeft: 8,
    paddingRight: 10,
    marginBottom: 10,
  },
  gradientCard: {
    height: 130,
    width: 260,
    borderRadius: 10,
    marginHorizontal: 7,
    flexDirection: 'row',
    overflow: 'hidden',
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
        // elevation: 3,
      },
    }),
  },

  cbRateText: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.secondary,
  },
  dealTitle: {
    ...Theme.fontStyles.h4Regular,
    marginTop: 3,
    height: 30,
    width: '85%',
    marginLeft: 8,
    lineHeight: 15,
    // backgroundColor: 'red',
  },
  dealsDescText: {
    ...Theme.fontStyles.h4Regular,
    //textAlign: "center",
    marginTop: 3,
    lineHeight: 15,
  },
  expriryDateView: {
    flexDirection: 'row',
    width: '95%',
    marginTop: 3,
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  expDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  greyText: {
    ...Theme.fontStyles.h4Regular,
    color: Theme.COLORS.grey,
    marginLeft: 4,
  },
  getCodeBtn: {
    height: 25,
    width: 70,
    borderRadius: 20,
    borderColor: Theme.COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: Theme.COLORS.fav_icon,
    //alignSelf: 'flex-end'
  },
  logoImg: {
    height: 45,
    width: 45,
    borderRadius: 40,
    marginBottom: 5,
    // marginHorizontal: 5,
    backgroundColor: Theme.COLORS.white,
  },
  logo: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    resizeMode: 'contain',
  },
  h3White: {
    ...Theme.fontStyles.h3Regular,
    color: Theme.COLORS.black,
  },
  cbText: {
    ...Theme.fontStyles.h5Regular,
    color: Theme.COLORS.black,
  },

  getCodeText: {
    ...Theme.fontStyles.h4Regular,
    color: Theme.COLORS.black,
    textTransform: 'capitalize',
  },
  circle: {
    height: 30,
    width: 30,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: Theme.COLORS.home_bg,
    position: 'absolute',
    zIndex: 99999,
    left: 30,
  },
  percentText: {
    ...Theme.fontStyles.h1Bold,
    fontSize: 20,
    color: Theme.COLORS.black,
  },
  cashbackText: {
    ...Theme.fontStyles.h1Bold,
    transform: [{ rotate: '270deg' }],
    width: 150,
    height: 25,
    alignSelf: 'center',
    textAlign: 'center',
    marginRight: -10,
  },
  border: {
    height: 155,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'dashed',
    borderRadius: 10,
    width: 52,
    marginLeft: -7,
    justifyContent: 'center',
  },
  cashbackCard: {
    height: '100%',
    width: 45,
    // backgroundColor: '#D1C4E9',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
