import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  I18nManager,
  Platform,
} from 'react-native';

const HeaderBackButton = props => {
  return (
    <TouchableOpacity
      style={[styles.btn, props.btnStyle]}
      onPress={() => props.onPress()}>
      <Icons.Ionicons
        style={styles.icon}
        name={I18nManager.isRTL ? 'arrow-forward' : 'arrow-back-sharp'}
        color={Theme.COLORS.secondary}
        size={20}
      />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;

const styles = StyleSheet.create({
  btn: {
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
          height: 0.5,
          width: 1,
        },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 2,
      },
    }),
    // backgroundColor: 'black',
  },
  icon: {
    // alignSelf: 'flex-start',
    resizeMode: 'contain',
    height: 20,
    width: 20,
  },
});
