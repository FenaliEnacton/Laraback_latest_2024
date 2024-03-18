import { Theme } from '@/Assets/Theme';
import { StyleSheet, Platform, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  content: {
    backgroundColor: Theme.COLORS.background,
  },
  page_title: {
    ...Theme.fontStyles.h3Bold,
    textTransform: 'capitalize',
    width: windowWidth,
    marginVertical: 10,
    marginLeft: 10,
  },
  form_container: {
    // backgroundColor: Theme.COLORS.white,
    width: windowWidth - 20,
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 70,
  },
  input_label: {
    ...Theme.fontStyles.h3Bold,
    textTransform: 'capitalize',
    // marginBottom: 5,
    width: windowWidth - 30,
  },
  textInput: {
    alignItems: 'center',
    alignSelf: 'center',
    width: windowWidth - 30,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    marginBottom: 10,
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
  amountTab: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: windowWidth * 0.93,
    justifyContent: 'space-between',
    height: 45,

    marginBottom: 10,
    marginTop: 5,
  },
  textInputAmount: {
    alignItems: 'center',
    width: '45%',
    paddingHorizontal: 20,
    height: 45,
  },
  textInputComment: {
    alignItems: 'center',
    alignSelf: 'center',
    width: windowWidth - 30,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 80,
    marginTop: 5,
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
    textAlignVertical: 'top',
  },
  errorMessage: {
    ...Theme.fontStyles.h3Regular,
    color: Theme.COLORS.error,
    marginTop: 5,
    width: windowWidth - 50,
    alignSelf: 'center',
    textAlign: 'right',
  },
  subView: {
    alignItems: 'center',
    alignSelf: 'center',
    width: windowWidth - 30,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 15,
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
  currency: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '45%',
    marginRight: 10,
    paddingLeft: 5,
    borderLeftWidth: 1,
    justifyContent: 'space-between',
  },
  // placeholder: {
  //   ...Theme.fontStyles.h3Regular,
  //   textTransform: 'capitalize',
  //   color: Theme.COLORS.grey_underline,
  // },
  submitBtn: {
    backgroundColor: Theme.COLORS.primary,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    paddingHorizontal: 15,
    // width: 100,
    alignSelf: 'center',
    marginTop: 20,
  },
  submitBtnText: {
    ...Theme.fontStyles.h2Bold,
    color: Theme.COLORS.white,
    alignSelf: 'center',
  },
  selectTab: {
    width: '100%',
    borderBottomColor: Theme.COLORS.background,
    justifyContent: 'center',
    height: 40,
    borderBottomWidth: 1,
    borderRadius: 10,
  },
  modalHeader: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 15,
    borderBottomWidth: 1,
    borderColor: Theme.COLORS.background,
  },
  title: {
    ...Theme.fontStyles.h2Bold,
    textTransform: 'capitalize',
    width: '98%',
    alignSelf: 'center',
  },
  select_text: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.blackText,
    alignSelf: 'center',
  },
  modalList: {
    marginTop: 15,
    marginBottom: 20,
  },
  header_image: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
  btnStyle: {
    width: windowWidth - 60,
    marginVertical: 20,
  },
  placeholder: {
    ...Theme.fontStyles.h3Regular,
    textTransform: 'capitalize',
    color: Theme.COLORS.grey_underline,
  },
  receiptInfo: {
    ...Theme.fontStyles.h4Regular,
    color: Theme.COLORS.grey,
  },
  receiptInfoView: {
    // marginTop: -10,
    marginBottom: 10,
  },
  touchableInput: {
    height: 50,
    width: (windowWidth * 93) / 100,
    borderRadius: 15,
    // borderColor: Theme.COLORS.border_light,
    // borderWidth: 0.4,
    marginVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'center',
    backgroundColor: Theme.COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: Theme.COLORS.white,
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
  orderIdtext: {
    ...Theme.fontStyles.h5Regular,
    color: Theme.COLORS.grey,
    marginTop: 5,
  },
  placeholderText: {
    ...Theme.fontStyles.h5Regular,
    color: Theme.COLORS.grey,
    marginBottom: 3,
  },
  h3Text: {
    ...Theme.fontStyles.h3Regular,
    color: Theme.COLORS.grey,
    textAlignVertical: 'center',
  },
  inputHeaderText: {
    ...Theme.fontStyles.h5Regular,
    color: Theme.COLORS.grey,
    marginTop: 5,
    marginLeft: 3,
    //backgroundColor: 'green'
  },
  containerStyle: {
    width: '49%',
  },
  navListStyle: {
    width: 75,
    height: 70,
    marginRight: 0,
    alignSelf: 'center',
    // backgroundColor: 'red',
  },
  routeText: {
    ...Theme.fontStyles.h4Bold,
    marginTop: 5,
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
  btn_labelStyle: {},
  text: {},
});

const _styles = {
  ...Theme.appStyle,
  ...styles,
};

export default _styles;
