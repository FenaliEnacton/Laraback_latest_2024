import React from 'react';
import {StyleSheet, TouchableOpacity, Platform, Text} from 'react-native';
import {Theme} from '@assets/Theme';

function CloseButton(props) {
  return (
    <TouchableOpacity
      style={[styles.btn, props.btnStyle]}
      onPress={() => props.onPress()}>
      <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
    </TouchableOpacity>
  );
}

export default CloseButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Theme.COLORS.primary,
    borderRadius: 17,
    height: 34,
    marginVertical: 10,
    alignSelf: 'center',
    marginHorizontal: 15,
    minWidth: 100,
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
        elevation: 5,
      },
    }),
  },
  label: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.white,
    alignSelf: 'center',
    textTransform: 'capitalize',
  },
});
