import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Theme } from '@/Assets/Theme';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  terms_content: {
    width: windowWidth - 20,
    alignSelf: 'center',
    paddingBottom: 15,
  },

  how_to_refer_box: {
    width: windowWidth - 20,
    alignSelf: 'center',
    // ...Theme.appStyle.userWhiteCard,
    marginTop: 15,
    marginBottom: 15,
  },
  refer_tab: {
    flexDirection: 'row',
    width: windowWidth * 0.9,
    marginVertical: 5,
  },
  share_title_number: {
    ...Theme.fontStyles.h1Bold,
    fontSize: 50,
    color: Theme.COLORS.secondary,
    // marginRight: 10,
    marginHorizontal: 5,
  },
  share_row: {
    // marginBottom: 5,
    // flexShrink: 1,
  },
  share_title: {
    ...Theme.fontStyles.h2Bold,
    textAlign: 'left',
  },
  share_desc: {
    ...Theme.fontStyles.h2Regular,
    textAlign: 'left',
    width: windowWidth * 0.75,
  },
  email_input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.COLORS.white,
    marginTop: 10,
    width: windowWidth - 30,
    paddingHorizontal: 5,
    alignSelf: 'center',
    paddingLeft: 10,
    borderRadius: 10,
    height: 40,
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
  email: {
    ...Theme.fontStyles.h4Bold,
    width: '80%',
  },
  copy_btn: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 5,
  },
  textInput: {
    alignItems: 'center',
    width: '90%',
    height: 45,
    alignSelf: 'flex-start',
  },
  sub_title: {
    ...Theme.fontStyles.h5Regular,
    marginTop: 5,
    color: Theme.COLORS.grey_underline,
    width: windowWidth - 40,
    alignSelf: 'center',
  },
  input_title: {
    ...Theme.fontStyles.h3Bold,
    marginTop: 15,
    alignSelf: 'center',
    width: windowWidth - 40,
  },
  screen_title: {
    ...Theme.fontStyles.h3Bold,
    width: windowWidth - 100,
    alignSelf: 'center',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  hiw_text: {
    ...Theme.fontStyles.h3Regular,
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    color: Theme.COLORS.secondary,
  },
  hiw_box: {
    marginVertical: 10,
    width: windowWidth,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  OrText: {
    ...Theme.fontStyles.h3Bold,
    color: 'rgba(0,0,0, 0.4)',
    width: 35,
    textAlign: 'center',
  },
  socialShareBox: {
    flexDirection: 'row',
    width: windowWidth - 150,
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  socialBtn: {
    backgroundColor: Theme.COLORS.white,
    borderRadius: 20,
    height: 40,
    width: 40,
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
        elevation: 5,
      },
    }),
  },
  share_box: {
    width: windowWidth - 30,
    marginTop: 10,
    backgroundColor: Theme.COLORS.white,
    paddingTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
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
  btnStyle: {
    width: '80%',
  },
  tnc_title: {
    ...Theme.fontStyles.h4Regular,
    width: windowWidth - 100,
    marginTop: 5,
    alignSelf: 'center',
    textAlign: 'center',
    textTransform: 'capitalize',
    color: Theme.COLORS.grey_underline,
  },
  modal_title: {
    ...Theme.fontStyles.h2Bold,
    textTransform: 'capitalize',
    width: windowWidth * 0.9,
    alignSelf: 'center',
    marginBottom: 20,
    // marginTop: -5,
  },
  errorMessage: {
    ...Theme.fontStyles.h4Regular,
    color: Theme.COLORS.error,
    marginTop: 5,
    width: windowWidth - 50,
    alignSelf: 'center',
    textAlign: 'right',
  },
  tabContainer: {
    width: windowWidth - 20,
    alignSelf: 'center',
    paddingHorizontal: 10,
    alignItems: 'center',
    // paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Theme.COLORS.border_light,
  },
  topTab: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  date_box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBox: {
    paddingHorizontal: 15,
    height: 23,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTab: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 5,
    justifyContent: 'space-between',
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  storeName: {
    ...Theme.fontStyles.h4Bold,
    color: Theme.COLORS.blackText,
  },
  bottomText: {
    ...Theme.fontStyles.h5Regular,
    color: Theme.COLORS.black,
  },
  list: {
    maxHeight: windowHeight - 150,
  },
  transDate: {
    ...Theme.fontStyles.h4Regular,
    color: Theme.COLORS.black,
  },
  orView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 250,
    alignSelf: 'center',
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0, 0.2)',
    width: '40%',
  },
  select_outlet_txt_style: {
    ...Theme.fontStyles.h3Regular,
    color: Theme.COLORS.grey_underline,
    // textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  sectionTitle: {
    ...Theme.fontStyles.h3Bold,
    // marginTop: 10,
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  get_direction_view: {
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
    backgroundColor: Theme.COLORS.white,
    borderRadius: 10,
    paddingLeft: 5,
  },
  offerName: {
    ...Theme.fontStyles.h3Regular,
    color: Theme.COLORS.blackText,
  },
  btnBar: {
    position: 'absolute',
    bottom: -15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    maxWidth: '90%',
    minWidth: '70%',
    alignItems: 'center',
  },
  gradientCard: {
    height: 220,
    width: windowWidth,
    justifyContent: 'center',
  },
  hiw_card: {
    flexDirection: 'row',
    width: windowWidth - 35,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 30,
  },
  hiw_icon_card: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Theme.COLORS.secondary,
    borderWidth: 1,
  },
  hiw_img: {
    height: 30,
    width: 30,
  },
  line: {
    height: 1,
    flex: 1,
    marginTop: 25,
    backgroundColor: Theme.COLORS.secondary,
  },
  hiwText: {
    ...Theme.fontStyles.h5Bold,
    textAlign: 'center',
    width: 55,
    marginTop: 5,
  },
  screen_img: {
    height: 250,
    width: windowWidth,
    resizeMode: 'contain',
    alignSelf: 'center',
    // marginVertical: 20,
  },
  bonus_types: {
    width: '95%',
    alignSelf: 'center',
    marginTop: -15,
    borderRadius: 10,
    padding: 10,
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
        elevation: 5,
      },
    }),
  },
  inputHeaderText: {
    ...Theme.fontStyles.h5Regular,
    color: Theme.COLORS.grey,
    marginTop: 5,
    marginLeft: 3,
    //backgroundColor: 'green'
  },
  linkCard: {
    width: windowWidth - 30,
    marginTop: 10,
    backgroundColor: Theme.COLORS.copy_code_bg,
    height: 45,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Theme.COLORS.grey,
  },
  navListStyle: {
    width: 80,
    height: 70,
  },
  routeText: {
    ...Theme.fontStyles.h4Bold,
    marginTop: 5,
  },
  title: {
    ...Theme.fontStyles.h3Bold,
    width: windowWidth * 0.93,
    alignSelf: 'center',
  },
  referLinkTitle: {
    ...Theme.fontStyles.h2Bold,
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  tabCard: {
    height: 60,
    width: windowWidth - 20,
    backgroundColor: Theme.COLORS.white,
    alignSelf: 'center',
    marginVertical: 7,
    borderRadius: 10,
    paddingHorizontal: 5,
    // marginLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.4)',
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
  logoImg: {
    height: 30,
    width: 50,
    // backgroundColor: 'red',
    resizeMode: 'contain',
  },
  storeInfoCard: {
    // width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const _styles = {
  ...Theme.appStyle,
  ...styles,
};

export default _styles;
