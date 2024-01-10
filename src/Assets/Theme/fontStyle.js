import {Platform, I18nManager} from 'react-native';
import {COLORS} from './colors';
const bold_fontFamily = Platform.OS === 'ios' ? 'circe-bold' : 'circeBold';
const regular_fontFamily =
  Platform.OS === 'ios' ? 'circe-regular' : 'circeSemiBold';
export const fontStyles = {
  h1Bold: {
    fontSize: 18,
    ...Platform.select({
      ios: {
        fontWeight: '500',
        fontFamily: 'circe-bold',
      },
      android: {
        fontFamily: 'circeBold',
      },
    }),
    color: COLORS.blackText,
  },
  h1Regular: {
    ...Platform.select({
      ios: {
        fontFamily: 'circe-regular',
      },
      android: {
        fontFamily: 'circeSemiBold',
      },
    }),
    fontSize: 18,
    color: COLORS.blackText,
  },
  h2Bold: {
    ...Platform.select({
      ios: {
        fontWeight: '500',
        fontFamily: 'circe-bold',
      },
      android: {
        fontFamily: 'circeBold',
      },
    }),
    fontSize: 16,
    color: COLORS.blackText,
  },
  h2Regular: {
    ...Platform.select({
      ios: {
        fontFamily: 'circe-regular',
      },
      android: {
        fontFamily: 'circeSemiBold',
      },
    }),
    color: COLORS.blackText,
    fontSize: 16,
  },
  h3Bold: {
    fontSize: 14,
    color: COLORS.blackText,
    ...Platform.select({
      ios: {
        fontWeight: '500',
        fontFamily: 'circe-bold',
      },
      android: {
        // fontWeight: 'bold',
        fontFamily: 'circeBold',
      },
    }),
  },
  h3Regular: {
    ...Platform.select({
      ios: {
        fontFamily: 'circe-regular',
      },
      android: {
        fontFamily: 'circeSemiBold',
      },
    }),
    fontSize: 14,
    color: COLORS.blackText,
  },
  h4Regular: {
    fontSize: 12,
    ...Platform.select({
      ios: {
        fontFamily: 'circe-regular',
      },
      android: {
        fontFamily: 'circeSemiBold',
      },
    }),
    color: COLORS.blackText,
  },
  h4Bold: {
    fontSize: 12,
    color: COLORS.blackText,
    ...Platform.select({
      ios: {
        fontWeight: '500',
        fontFamily: 'circe-bold',
      },
      android: {
        // fontWeight: 'bold',
        fontFamily: 'circeBold',
      },
    }),
  },
  h5Regular: {
    ...Platform.select({
      ios: {
        fontFamily: 'circe-regular',
      },
      android: {
        fontFamily: 'circeSemiBold',
      },
    }),
    fontSize: 10,
    color: COLORS.blackText,
  },
  h5Bold: {
    fontSize: 10,
    color: COLORS.blackText,
    ...Platform.select({
      ios: {
        fontWeight: '500',
        fontFamily: 'circe-bold',
      },
      android: {
        // fontWeight: 'bold',
        fontFamily: 'circeBold',
      },
    }),
  },
  sectionTitle: {
    fontSize: 14,
    textTransform: 'capitalize',
    paddingTop: 10,
    paddingBottom: 10,
    ...Platform.select({
      ios: {
        fontWeight: '500',
        fontFamily: 'circe-bold',
      },
      android: {
        // fontWeight: 'bold',
        fontFamily: 'circeBold',
      },
    }),
    color: COLORS.blackText,
  },
  html_view_txtStyles: {
    b: {
      direction: I18nManager.isRTL ? 'rtl' : 'ltr',
      alignSelf: 'flex-start',
    },
    p: {
      alignSelf: 'flex-start',
      direction: I18nManager.isRTL ? 'rtl' : 'ltr',
      textAlign: 'left',
      fontFamily: regular_fontFamily,
    },
    h1: {
      fontFamily: bold_fontFamily,
    },
    h2: {
      fontFamily: bold_fontFamily,
    },
    h3: {
      fontFamily: bold_fontFamily,
    },
    h4: {
      fontFamily: bold_fontFamily,
    },
    h5: {
      fontFamily: bold_fontFamily,
    },
    h6: {
      fontFamily: bold_fontFamily,
    },
  },
};
