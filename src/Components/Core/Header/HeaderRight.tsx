import React from 'react';
import { View, StyleSheet } from 'react-native';

const HeaderRight = props => {
  return (
    <View style={[styles.headerRight, props.style]}>{props.children}</View>
  );
};
export default HeaderRight;
const styles = StyleSheet.create({
  headerRight: {
    // paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '15%',
    height: '100%',
    // position: 'absolute',
    // right: 0,
  },
});
