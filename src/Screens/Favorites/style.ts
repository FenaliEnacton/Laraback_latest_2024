import { Theme } from '@/Assets/Theme';
import { Dimensions, StyleSheet } from 'react-native';
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

const _styles = {
  ...Theme.appStyle,
  ...styles,
};

export default _styles;
