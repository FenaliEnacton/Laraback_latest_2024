import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {translate} from '@translations';
import {Theme} from '@assets/Theme';

const EmptyListView = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {props.message ? props.message : translate('no_data_found')}
      </Text>
    </View>
  );
};

export default EmptyListView;

const styles = StyleSheet.create({
  text: {
    ...Theme.fontStyles.h2Bold,
  },
  container: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
