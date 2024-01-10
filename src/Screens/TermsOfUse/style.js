import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Theme} from '@assets/Theme';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  terms_content: {
    width: windowWidth - 20,
    alignSelf: 'center',
    padding: 10,
  },
  title: {
    ...Theme.fontStyles.h2Bold,
    textTransform: 'capitalize',
    width: windowWidth - 20,
    alignSelf: 'center',
    marginTop: 10,
  },
});

module.exports = {
  ...Theme.appStyle,
  ...styles,
};
