import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import LogoutModal from '@/Components/Core/LogoutModal';
import { translate } from '@/translations';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;

function NavigationList(props) {
  const lists = props.list;

  const [modal_show, set_modal_show] = useState(false);

  function handle_click(item) {
    if (item.id === 1000) {
      set_modal_show(true);
    } else {
      props.navigation.navigate(item.route);
    }
  }

  return (
    <View style={[styles.navOuterCard, props.containerStyle]}>
      {props.heading ? (
        <Text style={styles.titleText}>{translate(props.heading)}</Text>
      ) : null}
      <FlatList
        data={lists}
        numColumns={props.numberColumn ? props.numberColumn : 3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={[styles.navCard, props.style]}
              onPress={() =>
                props.onPress ? props.onPress(item) : handle_click(item)
              }>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: Theme.bg_gradient_color(index, 2) },
                ]}>
                <Icons.MaterialCommunityIcons
                  name={item.icon}
                  size={18}
                  color={Theme.bg_gradient_color(index, 3)}
                />
              </View>
              <Text style={[styles.routeTitle, props.textStyle]}>
                {translate(item.title)}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <LogoutModal
        onRequestClose={() => set_modal_show(false)}
        visible={modal_show}
      />
    </View>
  );
}

export default NavigationList;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  list: {
    width: windowWidth - 20,
    ...Theme.appStyle.userWhiteCard,
  },
  navBtn: {
    backgroundColor: Theme.COLORS.white,
    alignItems: 'center',
    width: windowWidth - 40,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: Theme.COLORS.border_light,
    borderRadius: 10,
    height: 35,
  },
  image: {
    height: 18,
    width: 18,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
  title: {
    ...Theme.fontStyles.h3Regular,
    textTransform: 'capitalize',
    color: Theme.COLORS.blackText,
    alignSelf: 'center',
    textAlign: 'center',
  },
  navCard: {
    marginHorizontal: 8,
    marginVertical: 5,
    height: 80,
    width: windowWidth / 3 - 20,
    borderRadius: 10,
    backgroundColor: Theme.COLORS.white,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
    shadowColor: 'rgba(0,0,0, 0.3)',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.4)',
        shadowOffset: {
          height: 0.5,
          width: 1,
        },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  navOuterCard: {
    width: windowWidth - 10,
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  titleText: {
    ...Theme.fontStyles.h2Bold,
    // width: windowWidth / 3 - 20,
    marginHorizontal: 8,
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  iconCircle: {
    height: 30,
    width: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeTitle: {
    ...Theme.fontStyles.h3Bold,
    textAlign: 'center',
    textTransform: 'capitalize',
    // marginTop: 5,
    lineHeight: 17,
  },
});
