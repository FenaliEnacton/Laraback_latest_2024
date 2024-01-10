import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Theme} from '@assets/Theme';

const ScrollContent = (props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      {...props}
      style={[styles.container, props.style]}>
      {props.children}
    </ScrollView>
  );
};
export default ScrollContent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 50,
    backgroundColor: Theme.COLORS.background,
    flex: 1,
  },
});
