import { Theme } from '@/Assets/Theme';
import { StyleSheet, Platform, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  headerStyle: {
    height: 140,
    flexDirection: 'column',
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  headerBox: {
    marginTop: 0,
  },
  content: {
    marginTop: 10,
  },
  input_title: {
    ...Theme.fontStyles.h3Bold,
    marginTop: 15,
    alignSelf: 'center',
    width: windowWidth - 40,
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
  sub_title: {
    ...Theme.fontStyles.h5Regular,
    marginTop: 5,
    color: Theme.COLORS.grey_underline,
    width: windowWidth - 40,
    alignSelf: 'center',
  },
  modal_container: {
    marginBottom: 10,
  },
  textInput: {
    alignItems: 'center',
    alignSelf: 'center',
    width: windowWidth - 50,
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
    width: windowWidth - 60,
    marginTop: 20,
  },
  textInputMessage: {
    width: windowWidth - 50,
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
  email_bottom_sub_title: {
    textDecorationLine: 'underline',
    textTransform: 'capitalize',
  },
  closeBtn: {
    alignSelf: 'center',
    // right: 10,
    // top: 10,
  },
  modalStyle: {
    paddingBottom: 30,
    width: windowWidth * 0.97,
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
});

const _styles = {
  ...Theme.appStyle,
  ...styles,
};

export default _styles;
