import React from 'react';
import ContentLoader from 'react-content-loader/native';
import {Rect} from 'react-native-svg';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Theme} from '@assets/Theme';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ListLoader = props => {
  const empty_arr = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      {empty_arr.map((e, index) => {
        return (
          <ContentLoader
            key={index.toString() + Date.now()}
            width={windowWidth - 20}
            height={200}
            duration={1000}>
            <Rect
              x="10"
              y="10"
              rx="10"
              ry="10"
              width={windowWidth / 2 - 30}
              height="190"
            />
            <Rect x="40" y="20" rx="4" ry="4" width="100" height="100" />
            <Rect x="40" y="130" rx="4" ry="4" width="100" height="6" />
            <Rect x="30" y="160" rx="4" ry="4" width="130" height="8" />
            <Rect x="20" y="180" rx="4" ry="4" width="150" height="5" />
            <Rect
              x={windowWidth / 2}
              y="10"
              rx="10"
              ry="10"
              width={windowWidth / 2 - 30}
              height="190"
            />
            <Rect
              x={windowWidth / 2 + 45}
              y="20"
              rx="4"
              ry="4"
              width="100"
              height="100"
            />
            <Rect
              x={windowWidth / 2 + 30}
              y="130"
              rx="4"
              ry="4"
              width="130"
              height="10"
            />
            <Rect
              x={windowWidth / 2 + 30}
              y="160"
              rx="4"
              ry="4"
              width="130"
              height="8"
            />
            <Rect
              x={windowWidth / 2 + 20}
              y="180"
              rx="4"
              ry="4"
              width="150"
              height="5"
            />
            {/* <Rect x="80" y="20" rx="4" ry="4" width="170" height="8" />
            <Rect x="300" y="20" rx="4" ry="4" width="60" height="8" />
            <Rect x="80" y="40" rx="4" ry="4" width="170" height="8" />
            <Rect x="300" y="40" rx="4" ry="4" width="60" height="8" />
            <Rect x="80" y="60" rx="4" ry="4" width="170" height="8" />
            <Rect x="300" y="60" rx="4" ry="4" width="60" height="8" />
            <Rect x="15" y="90" rx="4" ry="4" width="350" height="1" /> */}
          </ContentLoader>
        );
      })}
    </View>
  );
};
export default ListLoader;
const styles = StyleSheet.create({
  container: {
    height: windowHeight - 100,
    marginHorizontal: 7,
    marginTop: 10,
    width: windowWidth - 20,
    borderRadius: 10,
    alignSelf: 'center',
    // backgroundColor: Theme.COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: Theme.COLORS.background,
  },
});
