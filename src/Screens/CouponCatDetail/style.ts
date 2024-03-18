import { Theme } from '@/Assets/Theme';
import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  list: {
    marginTop: 10,
    width: windowWidth,
    alignSelf: 'center',
  },
  row: {
    justifyContent: 'space-around',
    flex: 1,
  },
  animated_header: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    left: 0,
    backgroundColor: Theme.COLORS.primary,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  top_header: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
    width: windowWidth,
  },
  // headerTitle: {
  //   ...Theme.fontStyles.h3Bold,
  //   color: Theme.COLORS.white,
  //   alignSelf: 'center',
  //   textAlign: 'center',
  //   width: '70%',
  // },
});

const _styles = {
  ...Theme.appStyle,
  ...styles,
};

export default _styles;
