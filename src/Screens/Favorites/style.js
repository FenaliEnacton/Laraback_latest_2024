import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Theme} from '@assets/Theme';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  list: {
    marginTop: 10,
    width: windowWidth - 30,
    alignSelf: 'center',
  },
  row: {
    justifyContent: 'space-around',
    flex: 1,
  },
  store_nav: {
    ...Theme.fontStyles.h4Regular,
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    color: Theme.COLORS.secondary,
  },
});

module.exports = {
  ...Theme.appStyle,
  ...styles,
};
