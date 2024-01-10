import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';

const SearchButton = props => {
  return (
    <TouchableOpacity
      style={[styles.btn, props.btnStyle]}
      onPress={() => props.navigation.navigate('Search')}>
      <Icons.AntDesign
        name={'search1'}
        color={Theme.COLORS.secondary}
        size={16}
      />
    </TouchableOpacity>
  );
};

export default SearchButton;

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
        shadowColor: 'rgba(0,0,0, 0.5)',
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
  },
  icon: {},
});
