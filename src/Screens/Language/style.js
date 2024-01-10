import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Theme} from '@assets/Theme';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  lang_container: {
    // flexDirection: 'row',
    width: windowWidth - 30,
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  row: {
    justifyContent: 'space-around',
    flex: 1,
  },
  lang_box: {
    width: windowWidth / 2 - 25,
    height: windowWidth / 2 - 25,
    maxHeight: 170,
    maxWidth: 170,
    alignSelf: 'center',
    backgroundColor: Theme.COLORS.white,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
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
  lang_image: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  icon: {
    alignSelf: 'flex-end',
  },
  choose_lang_text: {
    ...Theme.fontStyles.h1Bold,
    fontSize: 22,
    width: windowWidth - 30,
    alignSelf: 'center',
    marginBottom: 10,
  },
  container: {
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
  },
  lang: {
    ...Theme.fontStyles.h1Bold,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 15,
    left: 10,
  },
  bg_image: {
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  apply_btn: {
    height: 36,
    width: 100,
    backgroundColor: Theme.COLORS.primary,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
});

module.exports = {
  ...styles,
  ...Theme.appStyle,
};
