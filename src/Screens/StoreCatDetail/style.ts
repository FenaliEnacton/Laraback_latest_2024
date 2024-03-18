import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Theme } from '@/Assets/Theme';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  sectionTitle: {
    ...Theme.fontStyles.sectionTitle,
    // marginTop: 10,
    width: windowWidth - 20,
  },
  all_stores_wrapper: {
    alignSelf: 'center',
    marginBottom: 50,
    width: windowWidth - 40,
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
  headerTitle: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.black,
    alignSelf: 'center',
    textAlign: 'center',
    width: '70%',
  },
  header_image: {
    // ...Theme.appStyle.appWhiteCard,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 0,
    // marginBottom: 15,
    alignSelf: 'center',
    width: '100%',
    overflow: 'hidden',
    zIndex: 1,
    backgroundColor: Theme.COLORS.white,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0, 0.5)',
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 0.3,
          width: 1,
        },
        shadowOpacity: 0.3,
      },
      android: {
        elevation: 25,
      },
    }),
  },
  overlay: {
    height: '100%',
    width: '100%',
    // backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  header_store_text: {
    ...Theme.fontStyles.h2Bold,
    color: Theme.COLORS.black,
    alignSelf: 'center',
    // marginBottom: 20,
  },
  imageCard: {
    height: 120,
    width: windowWidth * 0.7,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    // backgroundColor: Theme.COLORS.white,
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
  catImg: {
    height: 250,
    width: windowWidth,
    backgroundColor: Theme.COLORS.white,
  },
  fadedView: {
    height: 250,
    width: windowWidth,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: windowWidth,
    paddingHorizontal: 15,
  },
  cloaseIconView: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const _styles = {
  ...Theme.appStyle,
  ...styles,
};

export default _styles;
