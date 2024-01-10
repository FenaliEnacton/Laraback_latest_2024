import React from 'react';
import { View, StyleSheet } from 'react-native';

const HeaderLeft = props => {
  return <View style={[styles.headerLeft, props.style]}>{props.children}</View>;
};
export default HeaderLeft;

const styles = StyleSheet.create({
  headerLeft: {
    // paddingLeft: 10,
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    width: '15%',
    height: '100%',
    // position: 'absolute',
    // left: 0,
    // backgroundColor: 'red',
  },
});
