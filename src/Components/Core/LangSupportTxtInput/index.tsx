import React, { forwardRef } from 'react';
import { TextInput, StyleSheet, I18nManager } from 'react-native';
import { Theme } from '@/Assets/Theme';

const LangSupportTxtInput = forwardRef((props: any, ref: any) => {
  return (
    <TextInput
      ref={ref}
      {...props}
      underlineColorAndroid="transparent"
      style={[styles.textInput, props.style]}
      autoCapitalize="none"
    />
  );
});

export default LangSupportTxtInput;

const styles = StyleSheet.create({
  textInput: {
    ...Theme.fontStyles.h3Regular,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});
