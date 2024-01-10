import {StyleSheet, Dimensions, Platform} from 'react-native';
import {fontStyles} from './fontStyle';
const windowWidth = Dimensions.get('window').width;
import {COLORS} from './colors';
export const appStyle = StyleSheet.create({
  headerTitle: {
    ...fontStyles.h2Bold,
    color: COLORS.black,
    alignSelf: 'center',
    width: 200,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  content: {
    width: '100%',
    marginTop: 50,
    backgroundColor: COLORS.background,
    flex: 1,
  },
  modalHeader: {
    width: '100%',
    height: 20,
    alignItems: 'center',
    flexDirection: 'row',
    // paddingVertical: 10,
    // paddingHorizontal: 15,
    // borderBottomWidth: 1,
    // borderColor: COLORS.border_light,
    justifyContent: 'space-between',
  },
  flat_list: {
    backgroundColor: COLORS.white,
    width: windowWidth - 20,
    paddingBottom: 10,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    // height: 300,
    maxHeight: 300,
  },
  tabContent: {
    marginTop: 0,
    flex: 1,
  },
  tabContainer: {
    width: windowWidth - 20,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  topTab: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  bottomTab: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 7,
    justifyContent: 'space-between',
  },

  appWhiteCard: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 5,
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
  },
  userWhiteCard: {
    backgroundColor: COLORS.white,
    padding: 10,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
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
  modal_top_notch: {
    height: 4,
    width: 50,
    backgroundColor: COLORS.notch_bg,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 2,
    marginBottom: 10,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    // right: 10,
    // top: 10,
  },
});
