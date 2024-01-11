import { Theme } from '@/Assets/Theme';
import { Dimensions, StyleSheet } from 'react-native';
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

const _styles = {
  ...Theme.appStyle,
  ...styles,
};

export default _styles;
