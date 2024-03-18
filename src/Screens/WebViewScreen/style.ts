import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Theme } from '@/Assets/Theme';
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  modalContent: {
    backgroundColor: Theme.COLORS.white,
    width: '100%',
    flex: 1,
    position: 'absolute',
    bottom: 100,
    padding: 10,
    top: 0,
    marginTop: 100,
    alignItems: 'center',
    alignSelf: 'center',
    height: '90%',
  },
  activatedCircle: {
    height: 120,
    width: 120,
    justifyContent: 'center',
    borderRadius: 60,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.primary,
  },
  loaderText: {
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: 10,
    width: '80%',
    fontSize: 16,
  },
  storeTitle: {
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center',
  },
  loaderTextActivated: {
    fontWeight: Platform.OS === 'android' ? 'bold' : '500',
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 10,
    width: 200,
    textAlign: 'center',
  },
  redirect_string: {
    ...Theme.fontStyles.h2Regular,
    color: Theme.COLORS.grey_underline,
    alignSelf: 'center',
    marginTop: 10,
    width: 200,
    textAlign: 'center',
  },
  redirect_text: {
    ...Theme.fontStyles.h3Bold,
    width: windowWidth - 50,
    alignSelf: 'center',
    marginTop: 10,
    textAlign: 'center',
  },
  coupon_copied_text: {
    ...Theme.fontStyles.h4Regular,
    width: windowWidth - 50,
    marginTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
    color: Theme.COLORS.grey_underline,
  },
  img_box: {
    height: 50,
    width: 120,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.COLORS.white,
    borderColor: Theme.COLORS.background,
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
  store_logo: {
    height: 40,
    width: 120,
    resizeMode: 'contain',
  },
  cb_circle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderStyle: 'dashed',
    backgroundColor: Theme.COLORS.white,
    justifyContent: 'center',
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
  cb_text: {
    ...Theme.fontStyles.h5Bold,
    width: '60%',
    alignSelf: 'center',
    textAlign: 'center',
    color: Theme.COLORS.secondary,
  },
  feat_image: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
  app_icon: { height: 60, width: 150, resizeMode: 'contain' },
});

const _styles = {
  ...Theme.appStyle,
  ...styles,
};

export default _styles;
