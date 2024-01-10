import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Theme} from '@assets/Theme';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  user_pay_mode_img: {
    height: 30,
    width: '15%',
    resizeMode: 'contain',
  },
  user_top_content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user_mode_card: {
    width: windowWidth * 0.93,
    backgroundColor: Theme.COLORS.white,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
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
  userPayModeBtnLabel: {
    ...Theme.fontStyles.h4Bold,
    color: Theme.COLORS.white,
  },
  userPayModeBtnStyle: {
    height: 30,
    alignSelf: 'flex-end',
    backgroundColor: Theme.COLORS.secondary,
    marginHorizontal: 0,
    minWidth: 75,
    borderRadius: 10,
  },
  list_title: {
    ...Theme.fontStyles.sectionTitle,
    textAlign: 'center',
    width: windowWidth - 20,
    marginVertical: 5,
  },
  user_mode_name: {
    ...Theme.fontStyles.h3Regular,
    textTransform: 'capitalize',
    // maxWidth: 140,
  },
  user_account_name: {
    ...Theme.fontStyles.h3Regular,
    maxWidth: 140,
    color: Theme.COLORS.grey,
  },
  details_texts_box: {
    alignSelf: 'flex-end',
    width: '50%',
    marginHorizontal: 5,
    alignItems: 'flex-start',
  },
  list: {
    // maxHeight: windowHeight - 400,
    // marginLeft: 10,
  },
  AllowedBalanceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  cb_text: {
    ...Theme.fontStyles.h5Bold,
    marginHorizontal: 5,
    color: Theme.COLORS.green_approved,
  },
  modal_img: {
    alignSelf: 'center',
    marginVertical: 20,
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  sub_text: {
    ...Theme.fontStyles.h3Regular,
    width: windowWidth - 70,
    alignSelf: 'center',
    textAlign: 'center',
  },
  modal_title: {
    ...Theme.fontStyles.h3Bold,
    width: windowWidth - 70,
    alignSelf: 'center',
    textAlign: 'center',
  },
  tb_row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: windowWidth - 40,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Theme.COLORS.home_bg,
    marginBottom: 10,
    paddingBottom: 5,
  },
  tb_label: {
    ...Theme.fontStyles.h3Regular,
    width: '60%',
    textTransform: 'capitalize',
  },
  label: {
    ...Theme.fontStyles.h3Bold,
    width: windowWidth - 55,
    alignSelf: 'center',
    marginTop: 20,
  },
  tb_value: {
    ...Theme.fontStyles.h3Bold,
    width: '30%',
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  input_title: {
    ...Theme.fontStyles.h3Bold,
    marginTop: 15,
    alignSelf: 'center',
    width: windowWidth - 40,
  },
  textInput: {
    alignItems: 'center',
    alignSelf: 'center',
    width: windowWidth - 30,
    backgroundColor: Theme.COLORS.white,
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 45,
    marginTop: 5,
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
  errorMessage: {
    ...Theme.fontStyles.h3Regular,
    color: Theme.COLORS.error,
    marginTop: 5,
    width: windowWidth - 50,
    alignSelf: 'center',
    textAlign: 'right',
  },
  btnStyle: {
    marginVertical: 20,
    width: windowWidth - 50,
  },
  radioTab: {
    width: windowWidth - 50,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  radio: {
    ...Theme.fontStyles.h3Regular,
    width: windowWidth - 70,
    marginLeft: 10,
    color: Theme.COLORS.blackText,
  },
  radio_list: {
    backgroundColor: Theme.COLORS.white,
    width: windowWidth - 20,
    alignSelf: 'center',
    borderRadius: 10,
    paddingVertical: 20,
  },
  otpInput: {
    width: '70%',
    height: 200,
    alignSelf: 'center',
    marginTop: -50,
    marginBottom: -40,
    color: Theme.COLORS.blackText,
  },
  reset_pass_text: {
    ...Theme.fontStyles.h4Regular,
    color: Theme.COLORS.grey,
    marginTop: 5,
    alignSelf: 'center',
    width: windowWidth - 50,
    textAlign: 'right',
    textTransform: 'capitalize',
  },
  app_name: {
    ...Theme.fontStyles.h2Bold,
    textTransform: 'capitalize',
    marginTop: 5,
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalStyle: {
    maxHeight: windowHeight * 0.6,
    paddingBottom: 30,
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
  closeBtn: {
    alignSelf: 'center',
    // marginVertical: 10,
    // marginTop: 30,
  },
  tabCard: {
    width: windowWidth - 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20,
  },
  tabTitle: {
    ...Theme.fontStyles.h3Bold,
    textAlign: 'center',
    width: windowWidth * 0.5 - 20,
  },
  selectedTabText: {
    borderBottomColor: Theme.COLORS.secondary,
    borderBottomWidth: 1,
  },
  navListStyle: {
    // width: 5,
    height: 70,
    // marginRight: ,
  },
  routeText: {
    ...Theme.fontStyles.h4Bold,
    marginTop: 5,
  },
});

module.exports = {
  ...Theme.appStyle,
  ...styles,
};
