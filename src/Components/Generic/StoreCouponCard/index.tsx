import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import { request_store_details } from '@/Redux/Actions/publicDataActions';
import { Config } from '@/react-native-config';
import { translate } from '@/translations';
import dayjs from 'dayjs';
import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
const windowWidth = Dimensions.get('window').width;

function StoreCouponCard(props) {
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
    <TouchableOpacity
      style={[styles.gradientCard, props.style]}
      // onPress={props.couponOnPress}
    >
      {/* <View>
        {props.is_store_page ? (
          <CashbackString
            cashback_string={offer.store.cashback_string}
            cb_text={styles.cb_text}
          />
        ) : (
          <View style={styles.top_tab}>
            <TouchableOpacity
              style={styles.logo_container}
              onPress={() => props.request_store_details(offer?.store?.id)}>
              <FastImage
                style={styles.store_logo}
                source={{
                  uri: offer.store.logo
                    ? offer.store.logo
                    : Config.EMPTY_IMAGE_URL,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
            <CashbackString
              icon_size={10}
              icon={{marginTop: 2}}
              cb_style={styles.cb_style}
              cashback_string={offer.store.cashback_string}
              cb_text={styles.cb_text_small}
            />
          </View>
        )}
        <Text style={styles.cpn_title} numberOfLines={2}>
          {offer.title}
        </Text>
        <Text style={styles.cpn_dis} numberOfLines={3}>
          {offer.description}
        </Text>
      </View>
      <View style={styles.cpn_code_wrapper}>
        {offer.code ? (
          <TouchableOpacity style={styles.cpn_code} onPress={() => copy_code()}>
            <FastImage
              source={AppImages.cb_icon}
              style={styles.cb_icon}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={styles.coupon_code} numberOfLines={1}>
              {offer.code}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.empty_cpn_code} />
        )}
        <TouchableOpacity
          style={styles.cpn_arrow}
          onPress={props.couponOnPress}>
          <Icon.FontAwesome name="chevron-right" color={Theme.COLORS.white} />
        </TouchableOpacity>
      </View> */}
      {/* {props.is_store_page ? (
        <>
          <View style={styles.cbRateCardArrow}></View>
          <View style={styles.cbRateCard}>
           
            <Text style={styles.cbText}>{offer.store.cashback_string}</Text>
          </View>
        </>
      ) : (
        <View style={styles.top_tab}>
          <TouchableOpacity
            style={styles.logo_container}
            onPress={() => props.request_store_details(offer?.store?.id)}>
            <FastImage
              style={styles.store_logo}
              source={{
                uri: offer.store.logo
                  ? offer.store.logo
                  : Config.EMPTY_IMAGE_URL,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
          <CashbackString
            icon_size={10}
            icon={{marginTop: 2}}
            cb_style={styles.cb_style}
            cashback_string={offer.store.cashback_string}
            cb_text={styles.cb_text_small}
          />
        </View>
      )}
      <Text style={styles.cpn_title} numberOfLines={3}>
        {offer.title}
      </Text> */}
      {/* <View style={styles.btnCard}>
        <TouchableOpacity style={styles.redeemBtn}>
          <Text style={styles.redeemText}>{translate('redeem')}</Text>
        </TouchableOpacity>
        {
          offer.code ? (
            <TouchableOpacity style={styles.couponCard}>
              <View style={[styles.circle, {left: -10}]} />
              <View style={[styles.circle, {right: -10}]} />
              <Text style={styles.coupon_code} numberOfLines={1}>
                {offer.code}
              </Text>
            </TouchableOpacity>
          ) : null
          // <View
          //   style={[
          //     styles.couponCard,
          //     {backgroundColor: Theme.COLORS.white},
          //   ]}></View>
        }
      </View> */}
      {/* <TouchableOpacity style={styles.couponCard}>
        <Text>{translate('redeem_now')}</Text>
      </TouchableOpacity> */}
      <View style={[styles.circle, { left: -11 }]} />
      <View style={[styles.circle, { right: -11 }]} />

      <TouchableOpacity onPress={props.couponOnPress} style={[props.style]}>
        <View>
          <View
            style={{ justifyContent: 'center', marginTop: 10, marginLeft: 5 }}>
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
        <Text numberOfLines={3} style={[styles.dealTitle, props.titleStyle]}>
          {offer.title}
        </Text>
        {/* <Text style={styles.cbText}>{offer.store.cashback_string}</Text> */}
      </TouchableOpacity>
      <View style={styles.expriryDateView}>
        <View style={styles.dashedBorder}>
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
      </View>
    </TouchableOpacity>
  );
}

const mapDispatchToProps = {
  request_store_details,
};

const mapStateToProps = ({ params }) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(StoreCouponCard);
const styles = StyleSheet.create({
  coupon_card: {
    backgroundColor: Theme.COLORS.white,
    paddingVertical: 10,
    borderRadius: 5,
    width: windowWidth / 2 - 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Theme.COLORS.black,
    borderWidth: 1,
    borderStyle: 'dashed',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
          height: 0.2,
          width: 1,
        },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cpn_title: {
    ...Theme.fontStyles.h4Bold,
    marginTop: 5,
    width: '70%',
    height: 40,
    textAlign: 'center',
  },
  cpn_dis: {
    ...Theme.fontStyles.h4Regular,
    marginTop: 5,
    width: '100%',
    marginBottom: 5,
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
    paddingLeft: 10,
    paddingRight: 10,
    maxWidth: 120,
    backgroundColor: Theme.COLORS.coupon_code_bg_color,
  },
  coupon_code: {
    ...Theme.fontStyles.h4Bold,
    color: Theme.COLORS.black,
    marginLeft: 5,
    maxWidth: 85,
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
  cb_text: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.secondary,
    // width: '95%',
  },
  cb_text_small: {
    ...Theme.fontStyles.h5Bold,
    color: Theme.COLORS.secondary,
    width: '95%',
  },
  silver_bar: {
    height: 5,
    width: 50,
    backgroundColor: '#00000026',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  top_tab: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  store_logo: {
    resizeMode: 'contain',
    height: 25,
    width: 60,
    alignSelf: 'center',
  },
  logo_container: {
    height: 30,
    width: 70,
    borderRadius: 5,
    backgroundColor: Theme.COLORS.white,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.7)',
        shadowOffset: {
          height: 0.5,
          width: 1,
        },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cb_style: {
    width: '50%',
    alignSelf: 'flex-end',
  },
  // cbRateCard: {
  //   width: '80%',
  //   backgroundColor: Theme.COLORS.secondary,
  //   justifyContent: 'center',
  //   // alignItems: 'center',
  //   height: 20,
  //   paddingLeft: 5,
  //   alignSelf: 'flex-start',
  // },
  // cbRateCardArrow: {
  //   // paddingHorizontal: 5,
  //   // width: '20%',
  //   // paddingVertical: 5,
  //   backgroundColor: Theme.COLORS.secondary,
  //   borderColor: 'transparent',
  //   borderRightColor: Theme.COLORS.white,
  //   borderWidth: 10,
  //   position: 'absolute',
  //   height: 17,
  //   // marginLeft: -5,
  //   alignSelf: 'flex-start',
  //   top: 10,
  //   right: '20%',
  //   zIndex: 999,
  // },
  // cbText: {
  //   ...Theme.fontStyles.h4Bold,
  //   color: Theme.COLORS.primary,
  // },
  // couponCard: {
  //   height: 30,
  //   paddingHorizontal: 10,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   // marginTop: 5,
  //   borderRadius: 5,
  //   backgroundColor: Theme.COLORS.pending_bg,
  // },
  // circle: {
  //   height: 15,
  //   width: 15,
  //   borderRadius: 15,
  //   alignSelf: 'center',
  //   backgroundColor: Theme.COLORS.white,
  //   position: 'absolute',
  //   zIndex: 99999,
  //   // left: 30,
  // },
  // redeemBtn: {
  //   height: 30,
  //   borderRadius: 10,
  //   backgroundColor: Theme.COLORS.primary,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   paddingHorizontal: 5,
  // },
  // btnCard: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   width: '90%',
  //   marginTop: 5,
  // },
  // redeemText: {
  //   ...Theme.fontStyles.h4Regular,
  //   color: Theme.COLORS.white,
  // },
  gradientCard: {
    height: 140,
    width: windowWidth / 2 - 15,
    borderRadius: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    marginTop: 10,
    overflow: 'hidden',
    backgroundColor: Theme.COLORS.coupon_card_bg,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: 'rgba(0,0,0, 0.7)',
    //     shadowOffset: {
    //       height: 0.5,
    //       width: 1,
    //     },
    //     shadowOpacity: 0.5,
    //   },
    //   android: {
    //     elevation: 3,
    //   },
    // }),
  },

  cbRateText: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.secondary,
  },
  dealTitle: {
    ...Theme.fontStyles.h4Regular,
    marginTop: 5,
    height: 50,
    width: windowWidth / 2 - 25,
    marginHorizontal: 5,
    lineHeight: 15,
    // backgroundColor: 'red',
  },
  dealsDescText: {
    ...Theme.fontStyles.h4Regular,
    //textAlign: "center",
    marginTop: 3,
    lineHeight: 15,
  },
  dashedBorder: {
    borderWidth: 1,
    borderColor: Theme.COLORS.grey_underline,
    borderStyle: 'dashed',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 45,
    width: windowWidth / 2,
    alignSelf: 'center',
  },
  iconView: {
    position: 'absolute',
    top: 65,
    zIndex: 9999,
  },
  expriryDateView: {
    height: 35,
    width: '100%',
    position: 'absolute',
    bottom: 5,
    paddingHorizontal: 5,
    marginTop: 3,
    overflow: 'hidden',
  },
  expDate: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: 10,
  },
  greyText: {
    ...Theme.fontStyles.h5Regular,
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
    height: 22,
    width: 20,
    borderRadius: 15,
    alignSelf: 'center',
    backgroundColor: Theme.COLORS.background,
    position: 'absolute',
    zIndex: 99999,
    top: '65%',
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
  cashbackCard: {
    height: '100%',
    width: 45,
    // backgroundColor: '#D1C4E9',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  border: {
    height: 155,
    borderWidth: 1,
    borderColor: Theme.COLORS.grey_underline,
    borderStyle: 'dashed',
    borderRadius: 10,
    width: 52,
    marginLeft: -7,
    justifyContent: 'center',
  },
});
