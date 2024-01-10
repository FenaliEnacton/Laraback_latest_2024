import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Theme} from '@assets/Theme';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  list: {
    width: windowWidth,
    alignSelf: 'center',
    paddingBottom: 30,
    marginTop: 10,
  },
  row: {
    justifyContent: 'space-around',
    flex: 1,
  },
  top_text: {
    ...Theme.fontStyles.h4Bold,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 10,
  },
});

module.exports = {
  ...Theme.appStyle,
  ...styles,
};
