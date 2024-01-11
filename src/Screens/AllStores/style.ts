import { Theme } from '@/Assets/Theme';
import { Dimensions, Platform, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  sectionTitle: {
    ...Theme.fontStyles.h3Bold,
    marginHorizontal: 8,
    alignSelf: 'center',
    marginBottom: 10,
  },
  all_stores_wrapper: {
    marginLeft: 10,
    paddingTop: 10,
  },
  svg_container: {
    height: windowHeight - 100,
    marginHorizontal: 7,
    marginTop: 10,
    width: windowWidth - 20,
    borderRadius: 10,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Theme.COLORS.background,
  },
  alpha_list: {
    backgroundColor: Theme.COLORS.light_primary,
    height: 50,
    width: windowWidth * 0.85,
    paddingHorizontal: 10,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#4252DF1A',
        shadowOffset: {
          height: 0.5,
          width: 1,
        },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 2,
      },
    }),
    alignItems: 'center',
    justifyContent: 'center',
  },
  alpha_btn: {
    alignSelf: 'center',
    // borderRadius: 15,
    height: 30,
    //  width: 30,
    justifyContent: 'center',
    backgroundColor: Theme.COLORS.light_primary,
    // overflow: 'visible',
  },
  resultText: {
    ...Theme.fontStyles.h1Bold,
  },
  label: {
    ...Theme.fontStyles.h5Bold,
    lineHeight: 12,
  },
  storeAlphaContainer: {
    width: windowWidth - 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterCard: {
    height: 30,
    width: 30,
    marginLeft: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.white,
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
        elevation: 3,
      },
    }),
  },
  filter_icon: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
  },
  filterModal: {
    borderRadius: 10,
    justifyContent: 'center',
    height: 50,
    backgroundColor: 'red',
  },
  filterText: {
    color: Theme.COLORS.primary,
  },
  filterTextCard: {
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: windowWidth - 20,
    alignSelf: 'center',
    // alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
    flex: 1,
  },
  storeCard: {
    width: (windowWidth - 40) / 2,
    marginBottom: 5,
  },
});

const _styles = {
  ...Theme.appStyle,
  ...styles,
};

export default _styles;
