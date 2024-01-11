import React from 'react';
import ContentLoader from 'react-content-loader/native';
import { Dimensions, Text, View } from 'react-native';
import { Rect } from 'react-native-svg';
import styles from './style';
import { translate } from '@/translations';
const windowWidth = Dimensions.get('window').width;

const AllStoreLoader = props => {
  const empty_arr = [1, 2, 3, 4, 5, 6];

  return (
    <View style={styles.svg_container}>
      {props.show_title ? (
        <Text style={styles.sectionTitle}>
          {translate('view_stores_by_cat')}
        </Text>
      ) : null}
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        {empty_arr.map(e => {
          return (
            <ContentLoader key={e.toString()} width={70} height={70}>
              <Rect x="0" y="0" rx="4" ry="4" width="50" height="50" />
            </ContentLoader>
          );
        })}
      </View>
      <View style={[styles.alpha_list, { marginBottom: 15 }]} />
      {empty_arr.map(e => {
        return (
          <ContentLoader
            key={e.toString()}
            width={windowWidth - 20}
            height={100}>
            <Rect x="10" y="10" rx="4" ry="4" width="50" height="50" />
            <Rect x="80" y="20" rx="4" ry="4" width="120" height="8" />
            <Rect x="300" y="20" rx="4" ry="4" width="120" height="8" />
            <Rect x="220" y="10" rx="4" ry="4" width="60" height="50" />
            <Rect x="80" y="40" rx="4" ry="4" width="120" height="8" />
            <Rect x="300" y="40" rx="4" ry="4" width="120" height="8" />
          </ContentLoader>
        );
      })}
    </View>
  );
};
const AllStoreListLoader = () => {
  const empty_arr = [1, 2, 3, 4, 5, 6];
  return (
    <View style={{ marginTop: 15 }}>
      {empty_arr.map(e => {
        return (
          <ContentLoader
            key={e.toString()}
            width={windowWidth - 20}
            height={100}>
            <Rect x="10" y="10" rx="4" ry="4" width="50" height="50" />
            <Rect x="80" y="20" rx="4" ry="4" width="120" height="8" />
            <Rect x="300" y="20" rx="4" ry="4" width="120" height="8" />
            <Rect x="220" y="10" rx="4" ry="4" width="60" height="50" />
            <Rect x="80" y="40" rx="4" ry="4" width="120" height="8" />
            <Rect x="300" y="40" rx="4" ry="4" width="120" height="8" />
          </ContentLoader>
        );
      })}
    </View>
  );
};
export { AllStoreListLoader };
export default AllStoreLoader;
