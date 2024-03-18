import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '@/Assets/Theme';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  skip_img: {
    position: 'absolute',
    right: 0,
    height: 130,
    width: 180,
    resizeMode: 'contain',
    paddingTop: 40,
  },
  headerIcon: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
  },
  swiper_content: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  welcome_title: {
    ...Theme.fontStyles.h1Bold,
    marginVertical: 20,
    width: windowWidth - 50,
    textAlign: 'center',
    color: Theme.COLORS.primary,
  },
  welcome_desc: {
    ...Theme.fontStyles.h3Regular,
    marginVertical: 10,
    width: windowWidth - 100,
    textAlign: 'center',
    color: Theme.COLORS.primary,
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
    backgroundColor: Theme.COLORS.secondary,
    width: 30,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  dotStyle: {
    backgroundColor: Theme.COLORS.primary,
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
    width: '30%',
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  skip_text: {
    ...Theme.fontStyles.h2Bold,
    color: Theme.COLORS.white,
    width: 80,
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  swiper_image: {
    // marginTop: ,
    width: windowWidth - 100,
    height: windowWidth - 100,
    resizeMode: 'contain',
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
  },
});

const _styles = {
  ...Theme.appStyle,
  ...styles,
};

export default _styles;
