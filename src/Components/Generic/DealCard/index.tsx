import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import { get_currency_string } from '@/Utils';
import { Config } from '@/react-native-config';
import { translate } from '@/translations';
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { navigate } from '../../../Navigation/appNavigator';
const windowWidth = Dimensions.get('window').width;

function DealCard(props) {
  const { deal } = props;

  // function copy_code() {
  //   Clipboard.setString(deal.code);
  //   Toast.successBottom(translate('copied'));
  // }

  return (
    // <TouchableOpacity
    //   activeOpacity={0.9}
    //   style={[styles.container, props.style, {backgroundColor: props.bg_color}]}
    //   onPress={props.deal_onPress}>
    //   <View style={styles.logo_img}>
    //     <Image
    //       // source={{uri: deal.image ? deal.image : Config.EMPTY_IMAGE_URL}}
    //       source={AppImages.launch_screen_kk}
    //       style={styles.logo}
    //       // resizeMode={FastImage.resizeMode.contain}
    //     />
    //     {deal.cashback_string && deal.store.cashback_enabled ? (
    //       <View style={styles.cb_box}>
    //         <Text style={styles.cb_string}>{deal.cashback_string}</Text>
    //       </View>
    //     ) : null}
    //   </View>
    //   <Text style={styles.deal_store_title}>{deal.store.name}</Text>
    //   <Text style={styles.deal_title} numberOfLines={2}>
    //     {deal.title}
    //   </Text>
    //   <View style={styles.price_box}>
    //     <Text style={styles.retail_price}>
    //       {get_currency_string(deal.retail_price)}
    //     </Text>
    //     <Text style={styles.offer_price}>
    //       {get_currency_string(deal.offer_price)}
    //     </Text>
    //   </View>
    //   <View style={styles.cpn_code_wrapper}>
    //     {deal.code ? (
    //       <TouchableOpacity style={styles.cpn_code} onPress={() => copy_code()}>
    //         <FastImage
    //           source={AppImages.cb_icon}
    //           style={styles.cb_icon}
    //           resizeMode={FastImage.resizeMode.contain}
    //         />
    //         <Text style={styles.coupon_code}>{deal.code}</Text>
    //       </TouchableOpacity>
    //     ) : (
    //       <View style={styles.cpn_code_empty} />
    //     )}
    //     {/* <TouchableOpacity style={styles.cpn_arrow} onPress={props.deal_onPress}>
    //       <Icon.FontAwesome name="chevron-right" color={Theme.COLORS.white} />
    //     </TouchableOpacity> */}
    //   </View>
    // </TouchableOpacity>
    // <LinearGradient
    //   start={{x: 0, y: 0}}
    //   end={{x: 0, y: 1}}
    //   colors={[primaryColor, secondaryColor]}
    //   style={[styles.container, props.style]}>
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.container, props.style]}
      onPress={props.deal_onPress}>
      <View style={styles.logo_img}>
        <Image
          source={{ uri: deal.image ? deal.image : Config.EMPTY_IMAGE_URL }}
          // source={AppImages.launch_screen_kk}
          style={styles.logo}
          // resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View style={styles.storeLogo}>
        <FastImage
          source={{
            uri: deal.store.logo ? deal.store.logo : Config.EMPTY_IMAGE_URL,
          }}
          style={{ height: '100%', width: '100%' }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      <View style={styles.price_box}>
        <Text style={styles.retail_price}>
          {get_currency_string(deal.retail_price)}
        </Text>
        <Text style={styles.offer_price}>
          {get_currency_string(deal.offer_price)}
        </Text>
      </View>
      <Text style={styles.deal_title} numberOfLines={2}>
        {deal.title}
      </Text>
      <TouchableOpacity style={styles.cbRateView} onPress={props.deal_onPress}>
        <Text style={[styles.cbRateText]}>{deal.cashback_string}</Text>
        <Icons.FontAwesome
          name="chevron-right"
          color={Theme.COLORS.secondary}
        />
      </TouchableOpacity>
    </TouchableOpacity>
    // </LinearGradient>
  );
}

function TopDealHomeFooter(props) {
  return (
    <TouchableOpacity
      onPress={() =>
        navigate('AllDeals', {
          cats: [props.category.id],
          title: props.category.name,
        })
      }>
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

const mapDispatchToProps = {};

const mapStateToProps = ({ params }) => {
  return {};
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopDealHomeFooter);
export { ConnectedComponent as TopDealHomeFooter };
export default connect(mapStateToProps, mapDispatchToProps)(DealCard);
const styles = StyleSheet.create({
  container: {
    width: windowWidth / 2 - 25,
    height: 230,
    backgroundColor: Theme.COLORS.white,
    marginTop: 10,
    borderRadius: 7,
    alignItems: 'center',
    paddingVertical: 5,
    marginBottom: 10,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    // overflow: 'hidden',
    // justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.5)',
        shadowOffset: {
          height: 0.3,
          width: 1,
        },
        shadowOpacity: 0.3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  view_all_text: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.primary,
    alignSelf: 'center',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  img_container: {
    width: 130,
    height: 45,
    backgroundColor: Theme.COLORS.white,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Theme.COLORS.background,
    justifyContent: 'center',
  },
  logo_img: {
    height: 120,
    width: '99%',
    alignSelf: 'center',
    // backgroundColor: Theme.COLORS.white,
    borderRadius: 10,
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
    //     elevation: 5,
    //   },
    // }),
  },
  logo: {
    height: 100,
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
    // backgroundColor: 'red',
  },
  deal_store_title: {
    ...Theme.fontStyles.h3Bold,
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'center',
    width: '80%',
    textAlign: 'center',
  },
  deal_title: {
    ...Theme.fontStyles.h5Regular,
    marginBottom: 5,
    width: '90%',
    textAlign: 'center',
    marginTop: 5,
    height: 30,
    // marginLeft: 5,
  },
  cb_string: {
    ...Theme.fontStyles.h5Regular,
    color: Theme.COLORS.black,
    textAlign: 'center',
    marginLeft: 4,
  },
  cb_string_box: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginLeft: 15,
  },
  cb_box: {
    position: 'absolute',
    top: 0,
    right: 0,
    // zIndex: 9999999,
    paddingHorizontal: 5,
    backgroundColor: Theme.COLORS.secondary,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: 20,
    justifyContent: 'center',
  },
  price_box: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  offer_price: {
    ...Theme.fontStyles.h5Bold,
    color: Theme.COLORS.green_approved,
  },
  retail_price: {
    ...Theme.fontStyles.h5Bold,
    textDecorationLine: 'line-through',
    marginRight: 5,
    color: Theme.COLORS.black,
  },
  footer: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 10,
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
    minWidth: '50%',
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
  storeLogo: {
    height: 25,
    width: '50%',
    borderRadius: 5,
    backgroundColor: Theme.COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Theme.COLORS.border_light,
    borderWidth: 1,
    // alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: -12,
  },
  ribbonImg: {
    height: 16,
    paddingHorizontal: 5,
    // width: '90%',
    zIndex: 999,
    // maxWidth: '90%',
    position: 'absolute',
    top: -3,
    // left: -35,
    alignSelf: 'flex-start',
  },
  cbRateText: {
    ...Theme.fontStyles.h4Bold,
    color: Theme.COLORS.secondary,
  },
  cbRateView: {
    width: '95%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
