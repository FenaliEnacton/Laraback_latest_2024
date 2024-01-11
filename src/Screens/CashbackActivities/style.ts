import { Theme } from '@/Assets/Theme';
import { Dimensions, Platform, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  screen_title: {
    ...Theme.fontStyles.sectionTitle,
    fontSize: 16,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  tabContent: {
    marginTop: 0,
    flex: 1,
  },
  tabContainer: {
    width: windowWidth - 20,
    alignSelf: 'center',
    paddingHorizontal: 10,
    alignItems: 'center',
    // paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Theme.COLORS.border_light,
  },
  topTab: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  // list: {
  //   ...Theme.appStyle.userWhiteCard,
  //   maxHeight: 267,
  //   width: windowWidth - 20,
  //   alignSelf: 'center',
  //   padding: 0,
  //   borderBottomLeftRadius: 10,
  //   borderBottomRightRadius: 10,
  // },
  bottomTab: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 5,
    justifyContent: 'space-between',
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  storeName: {
    ...Theme.fontStyles.h4Bold,
    color: Theme.COLORS.blackText,
    textAlign: 'center',
  },

  status: {
    ...Theme.fontStyles.h4Regular,
    textTransform: 'capitalize',
    color: Theme.COLORS.primary,
    zIndex: 9999999,
  },
  bottomText: {
    ...Theme.fontStyles.h5Regular,
    color: Theme.COLORS.black,
    marginTop: 3,
  },
  dateText: {
    ...Theme.fontStyles.h5Regular,
    color: Theme.COLORS.blackText,
  },
  monthTab: {
    width: '100%',
    borderBottomColor: Theme.COLORS.background,
    justifyContent: 'center',
    height: 40,
    borderBottomWidth: 1,
    borderRadius: 10,
  },
  transDate: {
    ...Theme.fontStyles.h4Regular,
    color: Theme.COLORS.black,
  },
  monthText: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.blackText,
    alignSelf: 'center',
  },
  date_box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBox: {
    paddingHorizontal: 15,
    height: 23,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...Theme.fontStyles.h2Bold,
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  modalList: {
    marginTop: 15,
    width: '90%',
  },
  closeBtn: {
    alignSelf: 'center',
    // marginVertical: 10,
    // marginTop: 30,
  },
  status_tab_line: {
    position: 'absolute',
    left: 0,
    top: 5,
    height: '90%',
    width: 5,
    backgroundColor: Theme.COLORS.black,
    alignSelf: 'center',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },

  amountItem: {
    ...Theme.fontStyles.h4Bold,
  },
  silver_bar: {
    height: 5,
    width: 50,
    backgroundColor: '#00000026',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 10,
  },
  modalStyle: {
    maxHeight: windowHeight * 0.6,
    paddingBottom: 30,
  },
  btnBar: {
    position: 'absolute',
    bottom: -15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    maxWidth: '90%',
    minWidth: '70%',
    alignItems: 'center',
  },
  navListStyle: {
    width: 65,
    height: 50,
    marginRight: 0,
    // backgroundColor: 'red',
  },
  navCard: {
    flexDirection: 'row',
    width: windowWidth - 20,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    alignSelf: 'center',
    // marginTop: 10,
  },
  routeText: {
    ...Theme.fontStyles.h4Bold,
    marginTop: 5,
  },
  tabCard: {
    paddingVertical: 10,
    width: windowWidth - 20,
    backgroundColor: Theme.COLORS.white,
    alignSelf: 'center',
    marginVertical: 7,
    borderRadius: 10,
    paddingHorizontal: 5,
    // marginLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.4)',
        shadowOffset: {
          height: 0.5,
          width: 1,
        },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  logoImg: {
    height: 30,
    width: 50,
    // backgroundColor: 'red',
    resizeMode: 'contain',
  },
  storeInfoCard: {
    // width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    maxHeight: windowHeight - 180,
  },
});

const _styles = {
  ...Theme.appStyle,
  ...styles,
};

export default _styles;
