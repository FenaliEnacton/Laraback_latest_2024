import React from 'react';
import {
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity as AndroidTouch,
} from 'react-native';
import {Theme} from '@assets/Theme';
import {AppImages} from '@assets/Images';
import {TouchableOpacity as IOSTouch} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

const TouchableOpacity = Platform.OS === 'ios' ? IOSTouch : AndroidTouch;

const CloseButton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.btn, props.btnStyle]}
      onPress={() => props.onPress()}>
      <FastImage
        source={AppImages.close_white_icon}
        style={styles.icon}
        resizeMode={FastImage.resizeMode.contain}
      />
    </TouchableOpacity>
  );
};

export default CloseButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Theme.COLORS.secondary,
    borderRadius: 15,
    height: 30,
    width: 30,
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
        elevation: 5,
      },
    }),
  },
  icon: {
    alignSelf: 'center',
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
});
