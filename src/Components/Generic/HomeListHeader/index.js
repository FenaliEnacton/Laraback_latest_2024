import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Theme} from '@assets/Theme';
const windowWidth = Dimensions.get('window').width;

export default function HomeListHeader(props) {
  function render_cat({item, index}) {
    return (
      <TouchableOpacity
        style={styles.cat_button}
        onPress={() => props.onCatChange(index)}>
        <Text
          style={[
            styles.cat_name,
            props.selected_cat === index ? {color: Theme.COLORS.secondary} : {},
          ]}>
          {item.name}
        </Text>
        <View
          style={[
            styles.underLine,
            props.selected_cat === index
              ? {backgroundColor: Theme.COLORS.secondary}
              : {},
          ]}
        />
      </TouchableOpacity>
    );
  }
  return (
    <>
      <View style={styles.list_header}>
        <Text
          style={[
            styles.list_title,
            // props.data?.length ? {} : {width: '100%'},
          ]}>
          {props.title}
        </Text>
        {props.footerComponent ? props.footerComponent : null}
      </View>
      <View style={styles.cat_list}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={props.data}
          renderItem={render_cat}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cat_list: {
    // width: '95%',
    marginLeft: 15,
    alignItems: 'flex-start',
  },
  list_title: {
    ...Theme.fontStyles.h3Bold,
    textTransform: 'capitalize',
    paddingVertical: 5,
    fontWeight: '700',
    // width: '40%',
    // fontSize: 14,
  },
  cat_button: {
    paddingRight: 15,
    paddingVertical: 5,
  },
  cat_name: {
    ...Theme.fontStyles.h4Bold,
    color: Theme.COLORS.grey_underline,
    textTransform: 'capitalize',
  },
  underLine: {
    width: 15,
    height: 2,
    marginTop: 2,
    alignSelf: 'center',
  },
  list_header: {
    flexDirection: 'row',
    width: windowWidth - 20,
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
    // marginBottom: 5,
  },
});
