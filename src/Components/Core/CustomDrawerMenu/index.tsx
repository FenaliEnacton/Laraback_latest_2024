import React, { useState } from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { reset } from '../../../Navigation/appNavigator';
import { DrawerActions } from '@react-navigation/native';
import { routerList } from '@/Assets/RouterList';
import { Theme } from '@/Assets/Theme';
import Icon from '@/Assets/icons';
import { translate } from '@/translations';
import WalletCard from '@/Components/Generic/WalletCard';
import LogoutModal from '../LogoutModal';
import {
  request_user_clicks_summary,
  request_user_payment_summary,
  request_user_cashback_summary,
  request_user_referral_summary,
  request_user_bonus_summary,
} from '@/Redux/USER_REDUX/Actions/userSummaryActions';
import { connect } from 'react-redux';
import { is_user_logged_in } from '@/Redux/Selectors';

const height = Dimensions.get('screen').height;

const CustomDrawerMenu = props => {
  const insets = useSafeAreaInsets();
  const [router, setRouter] = useState(null);
  const [show_logout, setShow_logout] = useState(false);
  const [activeSections, setActiveSections] = useState<any>([]);
  // const [toggle, setToggle] = useState(false);
  const [isActive, setIsActive] = useState(false);

  function handleTabPress(item) {
    if (item.id == 41) {
      props.navigation.dispatch(DrawerActions.closeDrawer());
      setShow_logout(true);
      return;
    }
    if (item.id == 13) {
      props.request_user_clicks_summary();
      props.request_user_cashback_summary();
      props.request_user_payment_summary();
      props.request_user_referral_summary();
      props.request_user_bonus_summary();
    }
    if (!item.child_routes && !item.is_parent_first) {
      props.navigation.dispatch(DrawerActions.closeDrawer());
      if (item.id == 11)
        reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      props.navigation.navigate(item.route);
    } else {
      if (routerList) {
        setRouter(item.child_routes);
      } else {
        setRouter(item.child_routes);
      }
    }
  }

  const renderHeader = (item, index, isActive) => {
    if ((item.member_access && props.is_member) || !item.member_access) {
      return (
        <View style={styles.listView}>
          <View style={styles.titleCard}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: Theme.bg_gradient_color(index, 2) },
              ]}>
              <Icon.MaterialCommunityIcons
                name={item.icon}
                size={18}
                color={Theme.bg_gradient_color(index, 3)}
              />
            </View>
            <Text style={styles.titleText}>{translate(item.title)}</Text>
          </View>
          {item.child_routes ? (
            <Icon.Feather
              name={'chevron-down'}
              size={15}
              color={Theme.bg_gradient_color(index, 3)}
            />
          ) : null}
        </View>
      );
    } else {
      return null;
    }
  };

  const renderContent = (section, index, isActive) => {
    setIsActive(isActive);

    return (
      <View
      // duration={400}
      // style={[styles.content, isActive ? styles.active : styles.inactive]}
      // transition="backgroundColor"
      >
        {section?.child_routes?.length
          ? section?.child_routes?.map((item, index) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.listView,
                    {
                      width: '82%',
                      alignSelf: 'flex-end',
                      marginRight: 10,
                    },
                  ]}
                  onPress={() => {
                    handleTabPress(item);
                  }}>
                  <View style={styles.titleCard}>
                    <View
                      style={[
                        styles.iconCircle,
                        { backgroundColor: Theme.bg_gradient_color(index, 2) },
                      ]}>
                      <Icon.MaterialCommunityIcons
                        name={item.icon}
                        size={18}
                        color={Theme.bg_gradient_color(index, 3)}
                      />
                    </View>
                    <Text style={styles.titleText}>
                      {translate(item.title)}
                    </Text>
                  </View>
                  {item.child_routes ? (
                    <Icon.Feather
                      name={'chevron-down'}
                      size={15}
                      color={Theme.bg_gradient_color(index, 3)}
                    />
                  ) : null}
                </TouchableOpacity>
              );
            })
          : null}
        <Text
        // animation={isActive ? 'bounceIn' : undefined}
        ></Text>
      </View>
    );
  };

  const setSections = (sections, isActive) => {
    // console.log("is Actiobve:-",isActive);
    setIsActive(!isActive);
    if (routerList[sections[0]]?.child_routes) {
      setActiveSections(sections.includes(undefined) ? [] : sections);
    } else {
      if (!routerList[sections[0]]?.route) {
        setActiveSections([]);
      } else {
        handleTabPress(routerList[sections[0]]);
      }
    }
  };

  return (
    <View style={[styles.container, { paddingTop: 10 + insets.top }]}>
      <WalletCard navigation={props.navigation} />
      <View style={[styles.routeContainer, { height: height - 260 }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Accordion
            activeSections={activeSections}
            sections={routerList}
            touchableComponent={TouchableOpacity}
            renderHeader={renderHeader as any}
            renderContent={renderContent}
            duration={400}
            onChange={setSections as any}
            renderAsFlatList={false}
          />
        </ScrollView>
        <LogoutModal
          onRequestClose={() => setShow_logout(false)}
          visible={show_logout}
        />
      </View>
    </View>
  );
};

const mapDispatchToProps = {
  request_user_clicks_summary,
  request_user_payment_summary,
  request_user_cashback_summary,
  request_user_referral_summary,
  request_user_bonus_summary,
};

const mapStateToProps = ({ params }) => {
  return {
    is_member: is_user_logged_in(params) || false,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerMenu);

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    // alignItems: 'center',
  },
  routeContainer: {
    width: '100%',
    marginTop: 40,
    alignSelf: 'center',
    // height: height - 250,
  },
  listView: {
    minHeight: 45,
    width: '92%',
    alignSelf: 'center',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: Theme.COLORS.white,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: 'grey',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 0.3,
          width: 1,
        },
        shadowOpacity: 0.3,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  iconCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    ...Theme.fontStyles.h3Regular,
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  listCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
