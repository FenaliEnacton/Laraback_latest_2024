import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Theme} from '@assets/Theme';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  headerStyle: {
    height: 80,
    flexDirection: 'column',
    marginHorizontal: 0,
    justifyContent: 'space-evenly',
    paddingHorizontal: 0,
    // backgroundColor: 'transparent',
  },
  headerBox: {
    marginTop: 0,
  },
  top_slider: {
    backgroundColor: Theme.COLORS.primary,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    // marginBottom: 10,
  },
  headerBackground: {
    width: windowWidth,
    height: '100%',
    marginHorizontal: 0,
    resizeMode: 'cover',
    zIndex: 9999,
    backgroundColor: Theme.COLORS.primary,
  },
  header_welcome_text: {
    ...Theme.fontStyles.h4Bold,
    color: Theme.COLORS.primary,
  },
  header_top_tab: {
    marginTop: 40,
    flexDirection: 'row',
    width: windowWidth - 20,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  app_name: {
    ...Theme.fontStyles.h1Bold,
    color: Theme.COLORS.primary,
    fontSize: 16,
  },
  searchBar: {
    backgroundColor: Theme.COLORS.white,
    width: windowWidth - 25,
    alignSelf: 'center',
    height: 40,
    borderRadius: 10,
    marginTop: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.5)',
        shadowOffset: {
          height: 0.3,
          width: 1,
        },
        shadowOpacity: 0.3,
      },
      android: {
        shadowColor: Theme.COLORS.light_grey,
        elevation: 15,
      },
    }),
  },
  search_textInput: {
    width: windowWidth - 80,
  },
  search_header_textInput: {
    width: '90%',
    alignItems: 'center',
  },
  search_text: {
    ...Theme.fontStyles.h3Regular,
    width: windowWidth - 80,
    color: Theme.COLORS.grey_underline,
  },
  search_header_text: {
    ...Theme.fontStyles.h4Regular,
    width: '90%',
    alignSelf: 'center',
    textAlignVertical: 'center',
    color: Theme.COLORS.grey_underline,
  },
  content: {
    marginTop: 10,
    backgroundColor: Theme.COLORS.home_bg,
    marginBottom: 70,
  },
  container: {
    backgroundColor: Theme.COLORS.home_bg,
    // marginBottom: 10,
  },
  header_balance_box: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    width: '40%',
  },
  balance_amount: {
    ...Theme.fontStyles.h3Regular,
    // width: '50%',
    color: Theme.COLORS.secondary,
  },
  money_icon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
  list: {
    marginLeft: 10,
    marginBottom: 10,
  },
  icon: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 30,
    width: 30,
    marginRight: 10,
  },
  search_header_btn: {
    marginRight: 10,
    backgroundColor: Theme.COLORS.white,
    borderRadius: 10,
    height: 40,
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
    minWidth: windowWidth * 0.6,
    maxWidth: windowWidth * 0.7,
    justifyContent: 'space-between',
  },
  topHeader: {
    width: windowWidth * 0.93,
    // backgroundColor: 'red',
    height: 30,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuView: {
    height: 30,
    width: 30,
    borderRadius: 10,
    backgroundColor: Theme.COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.5)',
        shadowOffset: {
          height: 0.3,
          width: 1,
        },
        shadowOpacity: 0.3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  moneyView: {
    height: 30,
    paddingHorizontal: 10,
    backgroundColor: Theme.COLORS.white,
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
});

module.exports = {
  ...Theme.appStyle,
  ...styles,
};
