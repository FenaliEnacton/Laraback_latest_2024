import { Theme } from '@/Assets/Theme';
import { Dimensions, StyleSheet } from 'react-native';

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

const _styles = {
  ...Theme.appStyle,
  ...styles,
};

export default _styles;
