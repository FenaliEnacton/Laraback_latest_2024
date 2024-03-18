import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Theme } from '@/Assets/Theme';
const windowWidth = Dimensions.get('window').width;

// const insets = useSafeAreaInsets();

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.COLORS.background,
  },
  screen_content: {
    padding: 10,
  },
  animated_header: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    left: 0,
    backgroundColor: Theme.COLORS.white,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 10,
  },
  st_logo_wrapper: {
    ...Theme.appStyle.appWhiteCard,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: -25,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.5)',
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
  st_logo: {
    resizeMode: 'contain',
    height: 45,
    width: 45,
    // backgroundColor: 'red',
  },
  list: {
    width: windowWidth,
    alignSelf: 'center',
    height: 100,
  },

  row: {
    justifyContent: 'space-around',
    flex: 1,
  },
  st_details_card: {
    ...Theme.appStyle.appWhiteCard,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    alignSelf: 'center',
    width: windowWidth - 80,
    overflow: 'hidden',
    paddingBottom: 20,
    zIndex: 1,
  },
  shop_now_btn: { width: 200, height: 30, borderRadius: 15, zIndex: 999999 },
  fav_icon_wrapper: {
    height: 50,
    width: 50,
    backgroundColor: Theme.COLORS.coupon_code_bg_color,
    borderRadius: 25,
    alignItems: 'center',
    paddingTop: 10,
    justifyContent: 'center',
    marginRight: -15,
    marginTop: -5,
    alignSelf: 'flex-end',
  },
  st_tracker: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
  },
  hiw_text: {
    ...Theme.fontStyles.h4Regular,
    color: Theme.COLORS.grey_underline,
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  track_time: {
    ...Theme.fontStyles.h4Regular,
    width: windowWidth / 3 - 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  track_label: {
    ...Theme.fontStyles.h4Bold,
  },
  sectionTitle: {
    ...Theme.fontStyles.h2Bold,
    // marginTop: 20,
    textTransform: 'capitalize',
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: 'auto',
  },
  selectedTabText: {
    borderBottomColor: Theme.COLORS.secondary,
    borderBottomWidth: 1,
    // marginBottom: 10,
    // marginRight: 10,

    // color: Theme.COLORS.secondary,
  },
  cb_card: {
    backgroundColor: Theme.COLORS.white,
    paddingTop: 10,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.5)',
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
  cb_modal_content: {
    height: 300,
    marginBottom: 50,
    width: windowWidth - 40,
    alignSelf: 'center',
  },
  closeBtnStyle: {
    alignSelf: 'center',
  },
  cb_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 5,
    marginBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: Theme.COLORS.border_light,
  },
  view_more_btn: {
    height: 35,
    width: '100%',
    // position: 'absolute',
    // bottom: 0,
    // marginBottom: 8,
    alignSelf: 'center',
    zIndex: 999,
  },
  view_more_cb: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.cb_rates,
    borderBottomRightRadius: 5,
    height: 35,
    width: '100%',
    borderBottomLeftRadius: 5,
  },
  view_more_text: {
    ...Theme.fontStyles.h3Regular,
  },
  cb_text: {
    ...Theme.fontStyles.h4Regular,
    color: Theme.COLORS.white,
    transform: [{ rotate: '180deg' }],
    marginLeft: 30,
  },
  down_arrow: {
    marginLeft: 5,
    position: 'relative',
  },

  coupon_card: {
    backgroundColor: Theme.COLORS.white,
    padding: 10,
    borderRadius: 5,
    position: 'relative',
    width: windowWidth / 2 - 15,
    marginRight: 10,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#4252DF1A',
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

  cpn_title: {
    ...Theme.fontStyles.h3Bold,
    marginTop: 5,
    marginBottom: 5,
  },

  cpn_code_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    alignItems: 'center',
  },

  cb_icon: {
    height: 10,
    width: 14,
  },

  cpn_code: {
    borderWidth: 1,
    borderColor: Theme.COLORS.secondary,
    color: Theme.COLORS.secondary,
    borderStyle: 'dashed',
    borderRadius: 30,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#E6936B4D',
  },
  cpn_arrow: {
    padding: 10,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: Theme.COLORS.blackText,
    color: Theme.COLORS.white,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  silver_bar: {
    height: 5,
    width: 50,
    backgroundColor: '#00000026',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  hiw_row: {
    flexDirection: 'row',
    paddingBottom: 8,
    marginBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: Theme.COLORS.border_light,
  },

  hiw_num: {
    ...Theme.fontStyles.h2Bold,
    color: Theme.COLORS.secondary,
    marginRight: 10,
    fontSize: 30,
  },

  hiw_title: {
    ...Theme.fontStyles.h2Bold,
  },
  hiw_desc: {
    ...Theme.fontStyles.h3Regular,
    // flexWrap: 'wrap',
    // flex: 8,
    width: windowWidth * 0.85,
  },
  cb_style: {
    marginLeft: 10,
    marginTop: -5,
  },
  cbText: {
    ...Theme.fontStyles.h4Regular,
    color: Theme.COLORS.secondary,
  },
  filter_head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackingContainer: {
    flexDirection: 'row',
    width: windowWidth - 20,
    height: 70,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  dateContainer: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalSeparator: {
    height: '80%',
    alignSelf: 'center',
    width: 1,
    backgroundColor: Theme.COLORS.grey_underline,
  },
  track_title: {
    ...Theme.fontStyles.h5Regular,
    textTransform: 'capitalize',
  },
  headerBackground: {
    width: windowWidth,
    height: 145,
    marginHorizontal: 0,
    resizeMode: 'stretch',
    // marginBottom: 15,
  },
  header_welcome_text: {
    ...Theme.fontStyles.h2Bold,
    color: Theme.COLORS.white,
    textTransform: 'capitalize',
  },
  headerTitle: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.black,
    // alignSelf: 'flex-end',
    // textAlign: 'center',
    // width: '70%',
  },
  top_header: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
    width: windowWidth,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  about_us_text: {
    ...Theme.fontStyles.h4Regular,
    width: windowWidth - 30,
    alignSelf: 'center',
  },
  cb_rate_title: {
    ...Theme.fontStyles.h3Regular,
    textAlign: 'center',
    marginTop: -2,
    // width: '80%',
  },
  headerTitleCard: {
    justifyContent: 'flex-end',
    width: '70%',
    marginRight: -30,
  },
  favBtn: {
    height: 30,
    width: 30,
    borderRadius: 10,
    backgroundColor: Theme.COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
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
        elevation: 2,
      },
    }),
    // backgroundColor: 'black',
  },
  StoreDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 55,
    paddingLeft: 10,
    width: windowWidth,
  },
  storeDetailCard: {
    width: windowWidth * 0.6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeTitle: {
    ...Theme.fontStyles.h1Bold,
    color: Theme.COLORS.black,
    marginLeft: 10,
  },
  cashbackRateContainer: {
    paddingHorizontal: 8,
    height: 35,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginTop: 5,
    backgroundColor: Theme.COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CbRateText: {
    ...Theme.fontStyles.h2Regular,
    color: Theme.COLORS.white,
  },
  cashback: {
    ...Theme.fontStyles.h5Regular,
    color: Theme.COLORS.white,
    lineHeight: 12,
    textTransform: 'capitalize',
  },
  hiwCard: {
    flexDirection: 'row',
    // marginLeft: 35,
    marginTop: 10,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  hiwText: {
    ...Theme.fontStyles.h4Regular,
    marginLeft: 5,
  },
  dashBorderContainer: {
    height: 1,
    overflow: 'hidden',
    marginLeft: 5,
  },
  dashBorderView: {
    height: 2,
    borderWidth: 1,
    borderColor: '#black',
    borderStyle: 'dashed',
  },
  terms_content: {
    width: windowWidth - 20,
    alignSelf: 'center',
    padding: 10,
  },
  btnBar: {
    position: 'absolute',
    bottom: -15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    maxWidth: '90%',
    minWidth: '70%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  shopNowBtn: {
    height: 35,
    width: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: Theme.COLORS.primary,
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
  shopNowText: {
    ...Theme.fontStyles.h3Regular,
    color: Theme.COLORS.white,
  },
  cashbackInfo: {
    // padding: 5,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 5,
    paddingRight: 5,
    marginLeft: -5,
    width: windowWidth - 15,
    height: 50,
    marginBottom: 5,
    alignSelf: 'center',
  },

  trackedCard: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: windowWidth / 3 - 20,
    paddingVertical: 10,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  iconCard: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Theme.COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.4)',
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
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.95,
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  cbRateCard: {
    minHeight: 50,
    // borderWidth: 3,
    // borderColor: Theme.COLORS.home_bg,
    width: windowWidth * 0.95,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingTop: 15,
    paddingHorizontal: 30,
    marginBottom: 13,
    overflow: 'hidden',
    backgroundColor: Theme.COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.4)',
        shadowOffset: {
          height: 0.3,
          width: 1,
        },
        shadowOpacity: 0.3,
      },
      android: {
        elevation: 10,
        shadowColor: 'rgba(0,0,0, 0.7)',
      },
    }),
  },
  offerTag: {
    height: 20,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.secondary,
    transform: [{ rotate: '130deg' }],
    alignSelf: 'center',
    position: 'absolute',
    left: -45,
  },
  scrollContent: {
    marginTop: 0,
    // alignItems: 'center',
  },
  scrollCard: {
    // height: windowHeight - 330,
    marginTop: 0,
  },
  filterCard: {
    height: 30,
    width: 30,
    // marginLeft: 10,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.5)',
        shadowOffset: {
          height: 0.5,
          width: 1,
        },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  filter_icon: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
  },
  filterModal: {
    borderRadius: 10,
    justifyContent: 'center',
    height: 50,
    backgroundColor: 'red',
  },
  filterText: {
    color: Theme.COLORS.primary,
  },
  filterTextCard: {
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cbRateView: {
    flexDirection: 'row',
  },
  loadMoreBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Theme.COLORS.secondary,
    marginTop: 10,
    borderRadius: 20,
  },
  loadMoreText: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.white,
    textTransform: 'capitalize',
  },
  couponFilter: {
    flexDirection: 'row',
    marginTop: 20,
    width: windowWidth - 10,
    justifyContent: 'space-between',
    alignSelf: 'center',
    // backgroundColor: 'red',
    alignItems: 'center',
  },
});

const _styles = {
  ...Theme.appStyle,
  ...styles,
};

export default _styles;
