import { Theme } from '@/Assets/Theme';
import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const HomeLoader = props => {
  const empty_arr = [1, 2, 3, 4, 5, 6];

  return (
    <View style={{}}>
      <View style={styles.carousel}>
        <ContentLoader width={windowWidth - 25} height={140}>
          <Rect
            x="0"
            y="0"
            rx="10"
            ry="10"
            width={(windowWidth - 25).toString()}
            height="140"
          />
        </ContentLoader>
      </View>
      <ScrollView horizontal>
        {empty_arr.map(e => {
          return (
            <View style={styles.svg_loader}>
              <ContentLoader height={130}>
                <Rect x="15" y="20" rx="4" ry="4" width="90" height="40" />
                <Rect x="15" y="70" rx="4" ry="4" width="60" height="12" />
                <Rect x="15" y="100" rx="4" ry="4" width="120" height="10" />
              </ContentLoader>
            </View>
          );
        })}
      </ScrollView>

      <ScrollView horizontal>
        {empty_arr.map(e => {
          return (
            <View style={styles.svg_loader}>
              <ContentLoader height={130}>
                <Rect x="15" y="20" rx="4" ry="4" width="90" height="40" />
                <Rect x="15" y="70" rx="4" ry="4" width="60" height="12" />
                <Rect x="15" y="100" rx="4" ry="4" width="120" height="10" />
              </ContentLoader>
            </View>
          );
        })}
      </ScrollView>
      <ScrollView horizontal>
        {empty_arr.map(e => {
          return (
            <View style={styles.svg_loader}>
              <ContentLoader height={130}>
                <Rect x="15" y="20" rx="4" ry="4" width="90" height="40" />
                <Rect x="15" y="70" rx="4" ry="4" width="60" height="12" />
                <Rect x="15" y="100" rx="4" ry="4" width="120" height="10" />
              </ContentLoader>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  svg_loader: {
    height: 130,
    // marginRight: 10,
    marginVertical: 10,
    width: 190,
    backgroundColor: Theme.COLORS.white,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  carousel: {
    height: 140,
    // marginHorizontal: 7,
    marginVertical: 10,
    width: windowWidth - 25,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 20,
  },
});
export default HomeLoader;
