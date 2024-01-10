import React from 'react';
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  Animated,
  // TouchableOpacity,
} from 'react-native';
import {Theme} from '@assets/Theme';
import {translate} from '@translations';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppImages} from '@assets/Images';
import FastImage from 'react-native-fast-image';

function FilterButton(props) {
  return (
    <Animated.View
      style={[
        styles.floating_filter_btn,
        {
          opacity: props.opacity,
        },
        props.filter_applied ? {borderColor: Theme.COLORS.primary} : {},
      ]}
      onPress={props.onPress}>
      <TouchableOpacity
        style={[
          styles.btn,
          props.filter_applied ? {borderColor: Theme.COLORS.primary} : {},
        ]}
        onPress={props.onPress}>
        <Text
          style={[
            styles.filter_btn_text,
            props.filter_applied ? {color: Theme.COLORS.primary} : {},
          ]}>
          {translate('filter')}
        </Text>
        <FastImage
          source={
            props.filter_applied
              ? AppImages.filter_applied_icon
              : AppImages.filter_icon
          }
          style={styles.filter_icon}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}
export default FilterButton;
const styles = StyleSheet.create({
  floating_filter_btn: {
    position: 'absolute',

    bottom: 25,
    alignSelf: 'center',
    backgroundColor: Theme.COLORS.white,
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 18,
    height: 35,
    borderWidth: 1,
    borderColor: Theme.COLORS.secondary,
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
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filter_icon: {
    resizeMode: 'contain',
    height: 15,
    width: 15,
  },
  filter_btn_text: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.secondary,
    textTransform: 'capitalize',
    width: 70,
    textAlign: 'center',
  },
});
