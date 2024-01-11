import { Theme } from '@/Assets/Theme';
import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { View, StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

const TabLoader = props => {
  return (
    <View style={styles.container}>
      <ContentLoader width={windowWidth - 60} height={50}>
        <Rect x="10" y="10" rx="4" ry="4" width="180" height="8" />
        <Rect x="280" y="10" rx="4" ry="4" width="60" height="8" />
        <Rect x="10" y="30" rx="4" ry="4" width="100" height="8" />
      </ContentLoader>
    </View>
  );
};
export default TabLoader;
const styles = StyleSheet.create({
  container: {
    height: 50,
    marginHorizontal: 7,
    marginVertical: 2,
    width: windowWidth - 40,
    alignSelf: 'center',
    backgroundColor: Theme.COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: Theme.COLORS.background,
  },
});
