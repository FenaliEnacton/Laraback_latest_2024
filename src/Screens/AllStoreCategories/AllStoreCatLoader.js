import React from 'react';
import {Text} from 'react-native';
import ContentLoader from 'react-content-loader/native';
import {Rect} from 'react-native-svg';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Theme} from '@assets/Theme';
import {translate} from '@translations';
import styles from './style';
const windowWidth = Dimensions.get('window').width;

const AllStoreCatLoader = props => {
  const empty_arr = [1, 2, 3, 4, 5, 6];

  return (
    <View style={styles.svg_container}>
      {empty_arr.map(e => {
        return (
          <>
            <ContentLoader
              key={e.toString()}
              width={300}
              height={70}
              duration={1000}>
              <Rect x="0" y="0" rx="4" ry="4" width="50" height="50" />
              <Rect x="70" y="15" rx="4" ry="4" width="150" height="10" />
              <Rect x="70" y="30" rx="4" ry="4" width="100" height="7" />
            </ContentLoader>
            <View style={{flexDirection: 'row'}}>
              {empty_arr.map(e => {
                return (
                  <ContentLoader
                    key={e.toString()}
                    width={180}
                    height={100}
                    duration={1000}>
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
