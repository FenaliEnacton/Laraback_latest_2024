import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Theme} from '@assets/Theme';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  headerStyle: {
    height: 140,
    flexDirection: 'column',
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  headerBox: {
    marginTop: 0,
  },
  content: {
    marginTop: 0,
    backgroundColor: Theme.COLORS.home_bg,
    marginBottom: 50,
    // paddingTop: 10,
  },
  headerBackground: {
    width: windowWidth,
    height: 140,
    marginHorizontal: 0,
    resizeMode: 'stretch',
  },
  header_welcome_text: {
    ...Theme.fontStyles.h2Bold,
    color: Theme.COLORS.white,
    textTransform: 'capitalize',
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
    color: Theme.COLORS.white,
    fontSize: 18,
  },
  leftProfileBox: {
    width: windowWidth - 60,
  },
  profileBox: {
    width: windowWidth - 25,
    backgroundColor: Theme.COLORS.white,
    alignSelf: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    paddingVertical: 15,
  },
  display_name: {
    ...Theme.fontStyles.h3Bold,
  },
  earning_text: {
    ...Theme.fontStyles.h4Regular,
    marginTop: 5,
  },
  editButton: {
    height: 30,
    width: 30,
    // justifyContent: 'center',
  },

  transDate: {
    color: Theme.COLORS.grey,
  },
  cbBalance: {
    height: 110,
    width: '100%',
    borderRadius: 10,
    marginTop: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
});

module.exports = {
  ...Theme.appStyle,
  ...styles,
};
