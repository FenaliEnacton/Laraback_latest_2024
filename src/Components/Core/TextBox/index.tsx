import { Theme } from '@/Assets/Theme';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  Platform,
} from 'react-native';

const width = Dimensions.get('window').width;

const InputText = props => {
  return (
    <>
      <View style={[styles.container, props.containerStyle]}>
        {props.preFixContent ? props.preFixContent : null}
        <View>
          {props.content}
          <TextInput
            // {...inputProps}
            style={[styles.TextInput, props.style]}
            placeholder={props.placeholder}
            placeholderTextColor={Theme.COLORS.grey}
            onChangeText={props.onChangeText}
            keyboardType={props.keyboardType}
            value={props.value}
            autoCapitalize="none"
            secureTextEntry={props.secureTextEntry}
            autoFocus={props.autoFocus}
            multiline={props.multiline}
            underlineColorAndroid="transparent"
          />
          {/* <TextInput
          /> */}
        </View>
        <View style={styles.rightView}>{props.children}</View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    // ...Theme.fontStyles.h4Regular,
    height: '100%',
    color: Theme.COLORS.black,
    //backgroundColor: 'red',
    marginRight: 5,
    width: (width * 75) / 100,
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 5,
  },
  container: {
    height: 50,
    width: (width * 93) / 100,
    borderRadius: 15,
    borderColor: Theme.COLORS.border_light,
    borderWidth: 0.4,
    marginVertical: 5,
    paddingLeft: 7,
    alignSelf: 'center',
    backgroundColor: Theme.COLORS.white,
    flexDirection: 'row',
    paddingVertical: 3,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.5)',
        shadowOffset: {
          height: 0.3,
          width: 1,
        },
        shadowOpacity: 0.3,
      },
      android: {
        elevation: 3,
      },
    }),
    //justifyContent: 'space-between'
  },
  rightView: {
    flex: 1,
    alignSelf: 'center',
  },
});
export default InputText;
