import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import {AppImages} from '@assets/Images';
import {Theme} from '@assets/Theme';
import Icon from '@assets/icons';

const HeaderMenuButton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.btn, props.btnStyle]}
      onPress={() => props.onPress()}>
      <Icon.Entypo name={'menu'} color={Theme.COLORS.secondary} size={20} />
    </TouchableOpacity>
  );
};

export default HeaderMenuButton;

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
        shadowColor: 'rgba(0,0,0, 0.7)',
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
    alignSelf: 'flex-start',
    resizeMode: 'contain',
    height: 20,
    width: 20,
  },
});
