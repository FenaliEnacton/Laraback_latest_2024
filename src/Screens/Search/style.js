import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Theme} from '@assets/Theme';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: Theme.COLORS.white,
    borderRadius: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    paddingHorizontal: 10,
    marginLeft: 10,
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
        elevation: 3,
      },
    }),
  },
  searchTxtInput: {
    width: '90%',
    marginLeft: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  listEmptyView: {
    width: '90%',
    paddingTop: 20,
    paddingBottom: 15,
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.white,
    borderRadius: 10,
    marginTop: 20,
  },
  noSearchTitle: {
    color: Theme.COLORS.blackText,
  },
  noSearchTxt: {
    color: Theme.COLORS.grey_underline,
    fontSize: 12,
    marginTop: 8,
  },
  listTitle: {
    ...Theme.fontStyles.h3Bold,
    width: '60%',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth - 10,
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  store_list: {
    width: windowWidth - 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  catTab: {
    width: windowWidth - 20,
    backgroundColor: Theme.COLORS.white,
    height: 50,
    alignSelf: 'center',
    paddingHorizontal: 20,
    marginVertical: 5,
    paddingVertical: 8,
    borderRadius: 5,
    justifyContent: 'center',
  },
  catTitle: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.black,
    marginLeft: 10,
  },
  footerTxt: {
    alignSelf: 'center',
    textAlign: 'right',
    width: windowWidth - 20,
    marginBottom: 60,
    color: Theme.COLORS.primary,
  },
  all_text: {
    color: Theme.COLORS.primary,
  },
  list: {
    width: windowWidth,
    backgroundColor: Theme.COLORS.appBackground,
  },
  cat_flatlist: {
    width: windowWidth,
    // backgroundColor: Theme.COLORS.white,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
    paddingBottom: 10,
  },
  btnStyle: {
    width: 40,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  content: {
    backgroundColor: Theme.COLORS.background,
  },
  recentSearchResultText: {
    ...Theme.fontStyles.h1Bold,
    fontWeight: '400',
    fontSize: 14,
    color: Theme.COLORS.secondary,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 5,
  },
  recentSearchResultWrapper: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recentSearchText: {
    ...Theme.fontStyles.h1Bold,
    fontSize: 16,
    fontWeight: '600',
    color: '#27272A',
    marginBottom: 12,
  },
  recentSearchWrapper: {
    maxHeight: 250,
    width: '80%',
    marginLeft: 10,
    marginTop: -10,
    borderWidth: 1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderColor: '#E6E6F0',
    backgroundColor: Theme.COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 12,
    alignSelf: 'center',
  },
});

module.exports = {
  ...Theme.appStyle,
  ...styles,
};
