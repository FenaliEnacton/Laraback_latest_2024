import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Theme } from '@/Assets/Theme';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  screen_title: {
    marginTop: 10,
    width: windowWidth - 20,
    alignSelf: 'center',
    ...Theme.fontStyles.h2Bold,
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
  list: {
    maxHeight: windowHeight - 140,
    marginTop: 10,
  },
  bottomTab: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 7,
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  storeName: {
    ...Theme.fontStyles.h4Bold,
    color: Theme.COLORS.blackText,
  },
  status: {
    ...Theme.fontStyles.h5regular,
    color: Theme.COLORS.primary,
    zIndex: 9999999,
  },
  bottomText: {
    ...Theme.fontStyles.h5regular,
    color: Theme.COLORS.black,
  },
  transDate: {
    ...Theme.fontStyles.h4Regular,
    color: Theme.COLORS.grey,
  },
  monthTab: {
    width: '100%',
    borderBottomColor: Theme.COLORS.border_light,
    justifyContent: 'center',
    height: 40,
    borderBottomWidth: 0.5,
    borderRadius: 10,
  },
  monthText: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.blackText,
    alignSelf: 'center',
  },
  date_box: {
    flexDirection: 'row',
  },
  statusBox: {
    paddingHorizontal: 15,
    height: 20,
    borderRadius: 12,
    justifyContent: 'center',
  },
  title: {
    ...Theme.fontStyles.h2Bold,
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  modalList: {
    marginTop: 15,
  },
  closeBtn: {
    alignSelf: 'center',
    marginVertical: 10,
    marginTop: 30,
  },
  status_tab_line: {
    position: 'absolute',
    left: 0,
    height: '90%',
    width: 3,
    backgroundColor: Theme.COLORS.black,
    alignSelf: 'center',
    borderTopRightRadius: 1.5,
    borderBottomRightRadius: 1.5,
  },
  amountItem: {
    ...Theme.fontStyles.h4Regular,
  },
  textInput: {
    width: windowWidth - 30,
    paddingBottom: 25,
    height: 100,
    // alignItems: 'baseline',
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingTop: 15,
    textAlignVertical: 'top',
    marginTop: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.7)',
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
  send_btn: {
    position: 'absolute',
    bottom: 5,
    right: 25,
  },
  errorMessage: {
    ...Theme.fontStyles.h3Regular,
    color: Theme.COLORS.error,
    marginTop: 5,
    width: windowWidth - 30,
    alignSelf: 'center',
    textAlign: 'right',
  },
  btnStyle: {
    width: '80%',
    marginVertical: 15,
    marginTop: 20,
  },
  tab_root_view: {
    flexDirection: 'row',
    marginTop: 10,
    width: windowWidth - 70,
    height: 20,
    borderRadius: 20,
    alignSelf: 'center',
  },
  tab_view: {
    justifyContent: 'center',
    height: 30,
    width: (windowWidth - 70) / 2,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  in_store_view: {
    backgroundColor: Theme.COLORS.secondary,
    justifyContent: 'center',
    height: 30,
    width: (windowWidth - 70) / 2,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  navListStyle: {
    width: 80,
    height: 65,
    marginRight: 0,
    // backgroundColor: 'red',
  },
  navCard: {
    flexDirection: 'row',
    width: windowWidth - 20,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    alignSelf: 'center',
    marginTop: 10,
  },
  routeText: {
    ...Theme.fontStyles.h4Bold,
    marginTop: 10,
    lineHeight: 14,
  },
  tabCard: {
    height: 60,
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
});

const _styles = {
  ...Theme.appStyle,
  ...styles,
};

export default _styles;
