import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Theme} from '@assets/Theme';

const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  textInput: {
    alignItems: 'center',
    alignSelf: 'center',
    width: windowWidth - 50,
    backgroundColor: Theme.COLORS.white,
    paddingHorizontal: 20,
    borderRadius: 7,
    height: 45,
    marginTop: 5,
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
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  textInput_with_icon: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    height: '100%',
  },
  text_input_box_with_icon: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: windowWidth - 50,
    backgroundColor: Theme.COLORS.white,
    paddingHorizontal: 20,
    borderRadius: 7,
    height: 45,
    marginTop: 5,
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
  submitButton: {
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: Theme.COLORS.green_approved,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  welcome_title: {
    ...Theme.fontStyles.h1Bold,
    width: '90%',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  welcome_to_title: {
    ...Theme.fontStyles.h4Bold,
    width: '90%',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 10,
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
  errorMessage: {
    ...Theme.fontStyles.h4Regular,
    color: Theme.COLORS.error,
    marginTop: 5,
    width: windowWidth - 50,
    alignSelf: 'center',
    textAlign: 'right',
  },
  label: {
    ...Theme.fontStyles.h3Bold,
    width: windowWidth - 50,
    alignSelf: 'center',
    marginTop: 15,
  },
  btnStyle: {
    marginTop: 30,
    height: 40,
    borderRadius: 20,
    width: windowWidth - 50,
    backgroundColor: Theme.COLORS.secondary,
  },
  btn_labelStyle: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.white,
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  reset_pass_text: {
    ...Theme.fontStyles.h4Regular,
    color: Theme.COLORS.grey,
    // marginTop: 5,
    alignSelf: 'center',
    width: windowWidth - 50,
    textAlign: 'right',
    textTransform: 'capitalize',
  },
  footer_text: {
    ...Theme.fontStyles.h3Regular,
    marginTop: 10,
    marginBottom: 30,
    width: windowWidth,
    alignSelf: 'center',
    textAlign: 'center',
  },
  show_pass_img: {
    height: 15,
    width: 15,
    alignSelf: 'center',
  },
  popup_scroll: {
    height: '60%',
    width: '100%',
    // marginBottom: 20,
    marginTop: 10,
  },
  form: {
    justifyContent: 'space-between',
    flex: 1,
    height: '80%',
  },
  underlineStyleBase: {
    color: Theme.COLORS.primary,
    backgroundColor: Theme.COLORS.white,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.3)',
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
  underlineStyleHighLighted: {
    color: Theme.COLORS.primary,
  },
  otpInput: {
    width: '70%',
    height: 200,
    alignSelf: 'center',
    marginTop: -50,
    marginBottom: -40,
    color: Theme.COLORS.blackText,
  },
  mobile_text: {
    ...Theme.fontStyles.h3Regular,
  },
  monthTab: {
    width: windowWidth - 50,
    borderBottomColor: Theme.COLORS.background,
    justifyContent: 'center',
    height: 40,
    borderBottomWidth: 1,
    borderRadius: 10,
  },
  monthText: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.blackText,
    alignSelf: 'center',
  },
  title: {
    ...Theme.fontStyles.h2Bold,
    alignSelf: 'center',
    width: '95%',
    textTransform: 'capitalize',
    marginVertical: 20,
  },
  modalList: {
    marginVertical: 20,
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
  inputHeaderText: {
    ...Theme.fontStyles.h5Regular,
    color: Theme.COLORS.grey,
    marginTop: 5,
    marginLeft: 3,
    //backgroundColor: 'green'
  },
  mobileInputContainer: {
    height: 45,
    width: (windowWidth * 85) / 100,
    borderRadius: 5,
    borderColor: Theme.COLORS.border_light,
    borderWidth: 0.4,
    marginVertical: 7,
    paddingLeft: 7,
    alignSelf: 'center',
    backgroundColor: Theme.COLORS.bg_textBox,
    flexDirection: 'row',
    paddingVertical: 3,
  },
  mobileTextInput: {
    // ...Theme.fontStyles.h4Regular,
    height: '100%',
    width: (windowWidth * 80) / 100,
    color: Theme.COLORS.white,
    marginRight: 5,
    // width: "84%",
    paddingBottom: 0,
    paddingTop: 0,
    //backgroundColor: 'red'
  },
});

module.exports = {
  ...styles,
  ...Theme.appStyle,
};
