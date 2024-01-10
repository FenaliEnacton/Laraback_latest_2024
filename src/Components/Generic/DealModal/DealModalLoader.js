import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import ContentLoader from 'react-content-loader/native';
import {Rect} from 'react-native-svg';
import {Theme} from '@assets/Theme';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DealModalLoader = () => {
  const empty_arr = [1, 2, 3, 4, 5, 6];

  return (
    <View style={styles.svg_container}>
      <ContentLoader width={windowWidth * 0.95} height={300} duration={1000}>
        <Rect x="240" y="30" rx="4" ry="4" width="100" height="40" />
        <Rect x="125" y="90" rx="4" ry="4" width="120" height="70" />
        <Rect x="130" y="180" rx="4" ry="4" width="100" height="10" />
        <Rect
          x="20"
          y="200"
          rx="4"
          ry="4"
          width={windowWidth * 0.85}
          height="50"
        />
      </ContentLoader>
    </View>
  );
};

export default DealModalLoader;

const styles = StyleSheet.create({
  svg_container: {
    marginHorizontal: 7,
    marginTop: 10,
    width: windowWidth * 0.95,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: Theme.COLORS.background,
  },
});
