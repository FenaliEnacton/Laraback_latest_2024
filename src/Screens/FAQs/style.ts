import { Theme } from '@/Assets/Theme';
import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  screen_content: {
    padding: 10,
  },
  sectionTitle: {
    ...Theme.fontStyles.sectionTitle,
    paddingTop: 0,
  },
  faq_card: {
    ...Theme.appStyle.userWhiteCard,
    width: windowWidth - 20,
  },
  faq_card_head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  faq_title: {
    ...Theme.fontStyles.h3Bold,
    flexShrink: 1,
  },
  faq_content: {
    paddingTop: 5,
    marginTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: Theme.COLORS.border_light,
    ...Theme.fontStyles.h3Regular,
    lineHeight: 22,
    letterSpacing: 0.5,
  },
});

const _styles = {
  ...Theme.appStyle,
  ...styles,
};

export default _styles;
