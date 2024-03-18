import { Theme } from '@/Assets/Theme';
import { Dimensions, StyleSheet } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  logoContainer: {
    width: windowWidth - 40,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: windowHeight * 0.01,
  },
  skip_img: {
    // position: 'absolute',

    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    resizeMode: 'contain',
    backgroundColor: Theme.COLORS.declined_bg,
  },
  headerIcon: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
  },
  swiper_content: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: windowWidth - 70,
    paddingTop: 200,
    alignItems: 'center',
    backgroundColor: Theme.COLORS.primary,
    marginTop: windowHeight * 0.1,
    borderRadius: 25,
    height: windowHeight * 0.5,
  },
  swiper_image: {
    width: windowHeight * 0.4,
    maxWidth: windowWidth - 70,
    position: 'absolute',
    top: -100,
    height: windowHeight * 0.4,
    resizeMode: 'contain',
  },
  welcome_title: {
    ...Theme.fontStyles.h1Bold,
    // marginVertical: 20,
    width: windowWidth - 50,
    textAlign: 'center',
    // marginTop: '20%',
    color: Theme.COLORS.secondary,
  },
  welcome_desc: {
    ...Theme.fontStyles.h3Regular,
    // marginVertical: 20,
    marginTop: 15,
    width: windowWidth - 100,
    textAlign: 'center',
    color: Theme.COLORS.white,
  },
  sign_in_button: {
    backgroundColor: Theme.COLORS.primary,
    height: 46,
    width: 140,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sign_in_text: {
    ...Theme.fontStyles.h2Bold,
    color: Theme.COLORS.white,
    textTransform: 'uppercase',
    width: 100,
    alignSelf: 'center',
    textAlign: 'center',
  },
  btn_container: {
    flexDirection: 'row',
    marginVertical: 50,
    width: windowWidth,
    justifyContent: 'space-evenly',
  },
  pagination_style: {
    flexDirection: 'row',
  },
  activeDotStyle: {
    backgroundColor: Theme.COLORS.primary,
    width: 30,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  dotStyle: {
    backgroundColor: Theme.COLORS.secondary,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  footer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  skip_text: {
    ...Theme.fontStyles.h2Bold,
  },
  skip_btn: {
    zIndex: 9999999,
  },
  apply_btn: {
    height: 30,
    width: 100,
    backgroundColor: Theme.COLORS.primary,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  app_icon: {
    height: 80,
    width: 150,
    resizeMode: 'contain',
  },
});
const _styles = {
  ...Theme.appStyle,
  ...styles,
};

export default _styles;
