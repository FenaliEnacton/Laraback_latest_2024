import { Theme } from '@/Assets/Theme';
import { StyleSheet, Platform, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  content: {
    backgroundColor: Theme.COLORS.background,
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
    width: windowWidth - 30,
    alignSelf: 'center',
    textAlign: 'right',
  },
  textInputMessage: {
    width: (windowWidth * 93) / 100,
    height: 100,
    // alignItems: 'baseline',
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
    textAlignVertical: 'top',
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
  },
  label: {
    ...Theme.fontStyles.h2Regular,
    width: windowWidth - 55,
    alignSelf: 'center',
    marginTop: 20,
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
  subjectTab: {
    height: 40,
    borderBottomWidth: 1,
    borderRadius: 20,
    borderColor: Theme.COLORS.background,
    width: windowWidth * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  select_sub: {
    ...Theme.fontStyles.h3Regular,
    width: '70%',
  },
  subText: {
    ...Theme.fontStyles.h2Regular,
    textAlign: 'center',
    width: '90%',
  },
  title: {
    marginTop: 20,
    ...Theme.fontStyles.h2Bold,
  },
  submitBtn: {
    backgroundColor: Theme.COLORS.primary,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    // paddingHorizontal: 10,
    width: 100,
    alignSelf: 'center',
    marginTop: 20,
  },
  submitBtnText: {
    ...Theme.fontStyles.h2Bold,
    color: Theme.COLORS.white,
    alignSelf: 'center',
  },
  modalList: {
    marginVertical: 20,
  },
  btnStyle: {
    width: windowWidth - 50,
    marginTop: 20,
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
  header_image: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

const _styles = {
  ...Theme.appStyle,
  ...styles,
};

export default _styles;
