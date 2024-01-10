import React from 'react';
import {View, StyleSheet} from 'react-native';

const HeaderTitle = props => {
  return (
    <View style={[styles.headerRight, props.style]}>{props.children}</View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  headerRight: {
    // paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: '100%',
    // position: 'absolute',
    // right: 0
  },
});
