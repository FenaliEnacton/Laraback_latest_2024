import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  FlatList,
  TouchableOpacity,
  Animated,
  Modal,
  Dimensions,
  I18nManager,
} from 'react-native';
import {connect} from 'react-redux';
import CloseButton from '../CloseButton';
import Icon from '@assets/icons';
import LBButton from '../LBButton';
import {AppImages} from '@assets/Images';
import {Theme} from '@assets/Theme';
import {routerList} from '@assets/RouterList';
import {is_user_logged_in} from '@app_redux/Selectors';
import {
  request_user_clicks_summary,
  request_user_payment_summary,
  request_user_cashback_summary,
  request_user_referral_summary,
  request_user_bonus_summary,
} from '@user_redux/Actions';
import {user_info_selector, user_lifetime_earning} from '@user_redux/Selectors';
import {translate} from '@translations';
import Config from '../../../react-native-config';
import FastImage from 'react-native-fast-image';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const mapDispatchToProps = {
  request_user_clicks_summary,
  request_user_payment_summary,
  request_user_cashback_summary,
  request_user_referral_summary,
  request_user_bonus_summary,
};

const mapStateToProps = ({params}) => {
  return {
    is_member: is_user_logged_in(params) || false,
    user_info: user_info_selector(params) || {},
    total_earning: params?.user_dashboard_data
      ? user_lifetime_earning(params.user_dashboard_data)
      : '',
  };
};

function DrawerMenu(props) {
  const [router, setRouter] = useState(null);
  function handleTabPress(item) {
    if (item.id == 41) {
      hideModal();
      props.show_log_out();
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
      hideModal();
      props.navigation.navigate(item.route);
    } else {
      if (routerList) {
        setRouter(item.child_routes);
      } else {
        setRouter(item.child_routes);
      }
    }
  }

  function renderRoutes({item, index}) {
    if ((item.member_access && props.is_member) || !item.member_access) {
      return (
        <TouchableOpacity
          style={[styles.menuTab, index === 0 ? {borderTopWidth: 0} : {}]}
          onPress={() => handleTabPress(item)}>
          <View style={styles.left_tab}>
            {item.is_parent_first ? (
              <Icon.AntDesign
                style={styles.icon}
                name={I18nManager.isRTL ? 'right' : 'left'}
                color={Theme.COLORS.primary}
                size={18}
              />
            ) : (
              <FastImage
                source={item.icon ? item.icon : Config.EMPTY_IMAGE_URL}
                style={styles.iconImage}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}
            <Text style={styles.routeTitle}>{translate(item.title)}</Text>
          </View>
          {item.child_routes ? (
            <Icon.AntDesign
              style={styles.icon}
              name={I18nManager.isRTL ? 'left' : 'right'}
              color={Theme.COLORS.primary}
              size={18}
            />
          ) : null}
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }
  function hideModal() {
    props.setDrawerVisibleFalse();
    setRouter(null);
  }
  return (
    <Modal
      transparent={true}
      animationType="fade"
      onRequestClose={hideModal}
      visible={props.drawerShow}>
      <View
        // onPress={hideModal}
        style={styles.modalBackground}>
        <View style={[styles.modalContent]}>
          <View style={Theme.appStyle.modal_top_notch} />
          <CloseButton
            btnStyle={styles.closeBtnStyle}
            onPress={() => hideModal()}
          />
          <View style={styles.container}>
            {props.is_member ? (
              <TouchableOpacity
                onPress={() => {
                  hideModal();
                  props.navigation.navigate('AccountSettings');
                }}
                style={styles.user_info_btn}>
                <FastImage
                  source={AppImages.home_header_money_icon}
                  style={styles.money_icon}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={styles.earning_text}>
                  {props.total_earning} -{' '}
                </Text>
                <Text style={styles.userName}>{props.user_info.name}</Text>
                <Icon.SimpleLineIcons
                  name={'pencil'}
                  color={Theme.COLORS.white}
                  size={14}
                />
              </TouchableOpacity>
            ) : (
              <>
                <Text style={styles.title}>{translate('sign_in_or_join')}</Text>
                <View style={styles.sign_in_box}>
                  <LBButton
                    label={translate('sign_in')}
                    btnStyle={styles.btnStyle}
                    labelStyle={styles.btn_labelStyle}
                    onPress={() => {
                      hideModal();
                      props.navigation.navigate('Login');
                    }}
                  />
                  <LBButton
                    label={translate('sign_up')}
                    btnStyle={[
                      styles.btnStyle,
                      {backgroundColor: Theme.COLORS.secondary},
                    ]}
                    labelStyle={styles.btn_labelStyle}
                    onPress={() => {
                      hideModal();
                      props.navigation.navigate('Signup');
                    }}
                  />
                </View>
              </>
            )}
            <FlatList
              style={{flex: 1, marginBottom: 20}}
              bounces={false}
              data={router ? router : routerList}
              extraData={routerList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderRoutes}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);

const styles = StyleSheet.create({
  ...Theme.appStyle,
  container: {
    marginTop: -10,
    paddingHorizontal: 15,
    // height: 200,
  },
  closeBtnStyle: {
    // position: 'absolute',
    // bottom: 30,
    top: 5,
    right: 5,
    alignSelf: 'flex-end',
  },
  money_icon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  user_info_btn: {
    backgroundColor: Theme.COLORS.secondary,
    maxWidth: '80%',
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  appIcon: {
    height: 80,
    width: 180,
    resizeMode: 'contain',
    marginTop: -20,
  },
  userName: {
    ...Theme.fontStyles.h2Bold,
    color: Theme.COLORS.white,
    marginHorizontal: 10,
    // backgroundColor: 'red',
  },
  earning_text: {
    ...Theme.fontStyles.h2Bold,
    color: Theme.COLORS.white,
  },
  title: {
    ...Theme.fontStyles.h3Bold,
    width: 200,
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: 5,
    marginTop: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  avatarCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: Theme.COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.5)',
        shadowOffset: {
          height: 0.5,
          width: 1,
        },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  avatarTxt: {
    ...Theme.fontStyles.h1Bold,
    color: Theme.COLORS.white,
  },
  sign_in_box: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
    justifyContent: 'space-between',
  },
  menuTab: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
    marginLeft: 5,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 10,
    borderColor: Theme.COLORS.home_bg,
  },
  left_tab: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImage: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  routeTitle: {
    ...Theme.fontStyles.h2Regular,
    textTransform: 'capitalize',
    marginLeft: 15,
  },
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
  },
  modalContent: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: Theme.COLORS.white,
    width: '100%',
    bottom: 0,
    position: 'absolute',
    maxHeight: windowHeight - 100,
    minHeight: windowHeight * 0.4,
    paddingTop: 5,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});
