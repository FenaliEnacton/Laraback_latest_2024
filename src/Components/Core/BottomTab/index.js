import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import {Theme} from '@assets/Theme';
import {AppImages} from '@assets/Images';
import {connect} from 'react-redux';
import {is_user_logged_in} from '@app_redux/Selectors';
import Icon from '@assets/icons';
const windowWidth = Dimensions.get('window').width;

const mapDispatchToProps = {};

const mapStateToProps = ({params}) => {
  return {
    is_member: is_user_logged_in(params) || false,
  };
};

function BottomTab({state, descriptors, navigation, is_member}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.tab}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name === 'UserDashboard' && !is_member) {
              navigation.navigate('Login');
            } else {
              navigation.navigate(route.name);
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index.toString()}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            {/* <Image
              source={
                isFocused
                  ? AppImages[`route_${label}_selected`]
                  : AppImages[`route_${label}`]
              }
              style={styles.icon}
            /> */}
            <Icon.Feather
              style={styles.icon}
              name={
                route.name === 'Home'
                  ? 'home'
                  : route.name === 'AllStores'
                  ? 'grid'
                  : 'user'
              }
              color={isFocused ? Theme.COLORS.primary : Theme.COLORS.secondary}
              size={20}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomTab);

const styles = StyleSheet.create({
  tab: {
    // marginTop: 10,
    width: windowWidth - 100,
    // position: 'absolute',
    zIndex: 99999,
    marginTop: -135,
    height: 50,
    backgroundColor: Theme.COLORS.white,
    justifyContent: 'center',
    borderRadius: 40,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 15,
    borderColor: Theme.COLORS.secondary,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.7)',
        shadowOffset: {
          height: 0.5,
          width: 1,
        },
        shadowOpacity: 0.5,
      },
      android: {
        shadowColor: 'rgba(0, 0, 0, 0.7)',
        elevation: 5,
      },
    }),
  },
  icon: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
