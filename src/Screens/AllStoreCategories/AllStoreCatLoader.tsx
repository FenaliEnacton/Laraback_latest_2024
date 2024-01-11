import React from 'react';
import ContentLoader from 'react-content-loader/native';
import { View } from 'react-native';
import { Rect } from 'react-native-svg';
import styles from './style';

const AllStoreCatLoader = props => {
  const empty_arr = [1, 2, 3, 4, 5, 6];

  return (
    <View style={styles.svg_container}>
      {empty_arr.map(e => {
        return (
          <>
            <ContentLoader key={e.toString()} width={300} height={70}>
              <Rect x="0" y="0" rx="4" ry="4" width="50" height="50" />
              <Rect x="70" y="15" rx="4" ry="4" width="150" height="10" />
              <Rect x="70" y="30" rx="4" ry="4" width="100" height="7" />
            </ContentLoader>
            <View style={{ flexDirection: 'row' }}>
              {empty_arr.map(e => {
                return (
                  <ContentLoader key={e.toString()} width={180} height={100}>
                    <Rect x="0" y="0" rx="4" ry="4" width="160" height="80" />
                  </ContentLoader>
                );
              })}
            </View>
          </>
        );
      })}
    </View>
  );
};
export default AllStoreCatLoader;
