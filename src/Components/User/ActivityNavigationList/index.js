import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  I18nManager,
  View,
  Platform,
} from 'react-native';
import Icon from '@assets/icons';
import {translate} from '@translations';
import {Theme} from '@assets/Theme';
const windowWidth = Dimensions.get('window').width;

function ActivityNavigationList(props) {
  const lists = props.list;

  function handle_click(item) {
    props.navigation.navigate(item.route);
  }

  return (
    <View style={styles.list}>
      {lists.map((item, i) => {
        return (
          <TouchableOpacity
            onPress={() => {
              props.onPress ? props.onPress(item) : handle_click(item);
            }}
            style={[
              styles.navBtn,
              i === lists.length - 1 ? {borderBottomWidth: 0} : {},
            ]}
            key={i.toString() + item.id}>
            <Text style={styles.title}>{translate(item.title)}</Text>
            <Icon.AntDesign
              style={styles.icon}
              name={I18nManager.isRTL ? 'left' : 'right'}
              color={Theme.COLORS.black}
              size={16}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default ActivityNavigationList;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  list: {
    width: windowWidth - 20,
    ...Theme.appStyle.userWhiteCard,
    marginTop: 10,
  },
  navBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: Theme.COLORS.border_light,
    paddingHorizontal: 10,
    height: 35,
  },
  image: {
    height: 22,
    width: 22,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  icon: {
    position: 'absolute',
    right: 0,
  },
  title: {
    ...Theme.fontStyles.h3Regular,
    textTransform: 'capitalize',
    color: Theme.COLORS.blackText,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
