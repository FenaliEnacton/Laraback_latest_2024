import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Theme} from '@assets/Theme';
import {translate} from '@translations';
import Icon from '@assets/icons';

const SeeAllHeader = props => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      // style={[styles.container, {justifyContent: 'center', flex: 1}]}
    >
      <Text style={styles.view_all_text}>
        {translate('see_all')}
        <Icon.Ionicons
          name={'caret-forward'}
          color={Theme.COLORS.primary}
          size={15}
        />
      </Text>
    </TouchableOpacity>
  );
};

export default SeeAllHeader;

const styles = StyleSheet.create({
  view_all_text: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.primary,
    alignSelf: 'center',
    textTransform: 'capitalize',
    // width: '80%',
    textAlign: 'center',
  },
});
