import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import {Theme} from '@assets/Theme';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '@assets/icons';
import {user_info_selector, user_lifetime_earning} from '@user_redux/Selectors';
import {is_user_logged_in} from '@app_redux/Selectors';
import LBButton from '../../Core/LBButton';
import {translate} from '@translations';
import {BlurView} from '@react-native-community/blur';
import {NavigationList} from '@components/user';
import {Register} from '@assets/RouterList';

const width = Dimensions.get('window').width;

const mapDispatchToProps = {};

const mapStateToProps = ({params}) => {
  return {
    user_info: user_info_selector(params) || {},
    total_earning: params?.user_dashboard_data
      ? user_lifetime_earning(params.user_dashboard_data)
      : '',
    is_member: is_user_logged_in(params) || false,
  };
};

const WalletCard = props => {
  return (
    <View>
      <View style={styles.walletCardBack}>
        <View style={styles.walletCard}>
          <LinearGradient
            start={{x: 0, y: -1}}
            end={{x: 1, y: 0}}
            locations={[0.2, 0.6, 1]}
            colors={['#f9a5e1', '#f99cbb', '#fcd2bc']}
            style={[styles.linearWalletCard]}>
            <TouchableOpacity
              style={styles.walletBtn}
              onPress={() => {
                props.navigation.navigate('AccountSettings');
              }}>
              <Icon.SimpleLineIcons
                name={'pencil'}
                color={Theme.COLORS.white}
                size={12}
              />
            </TouchableOpacity>
            <Text style={styles.userNameText}>
              {props.is_member ? props.user_info.name : translate('user')}
            </Text>
            <View style={styles.amountView}>
              <Text style={[styles.amountText]}>
                {' '}
                {props.is_member ? props.total_earning : '22,345'}
              </Text>
              <Text style={styles.cashbackTitle}>
                {translate('life_time_earning')}
              </Text>
            </View>
          </LinearGradient>

          {!props.is_member ? (
            <View
              style={[
                styles.linearWalletCard,
                {
                  overflow: 'hidden',
                  paddingHorizontal: 0,
                  justifyContent: 'center',
                },
              ]}>
              <View style={[styles.sign_in_box]}>
                <NavigationList
                  list={Register}
                  navigation={props.navigation}
                  style={styles.navListStyle}
                  containerStyle={{
                    // marginVertical: 20,
                    alignItems: 'center',
                    width: '100%',
                  }}
                  numberOfLines={2}
                  textStyle={styles.routeText}
                />
              </View>
              <BlurView
                style={{
                  height: '100%',
                  width: '100%',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
                overlayColor=""
                blurType="light"
                blurAmount={7}
                reducedTransparencyFallbackColor={
                  Theme.COLORS.white
                }></BlurView>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletCard);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  sign_in_box: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: width * 0.6,
    justifyContent: 'space-between',
    // height: 45,
    position: 'absolute',
    zIndex: 9999,
    // backgroundColor: 'red',
  },
  walletCardBack: {
    alignSelf: 'center',
    height: 120,
    width: '90%',
    backgroundColor: '#7a64e6',
    borderRadius: 10,
    marginTop: 10,
    transform: [{rotate: '173deg'}],
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.5)',
        shadowOffset: {
          height: 0.5,
          width: 5,
        },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  walletCard: {
    height: 120,
    width: '100%',
    position: 'absolute',
    borderRadius: 10,
    // backgroundColor: Theme.bg_color(3, 2),
    left: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.5)',
        shadowOffset: {
          height: 0.5,
          width: 5,
        },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 3,
      },
    }),

    // top: 7,
    // transform: [{rotate: '-173deg'}],
  },
  linearWalletCard: {
    height: 120,
    width: '100%',
    position: 'absolute',
    borderRadius: 10,
    transform: [{rotate: '-173deg'}],
    top: 7,
    left: 0,
    paddingHorizontal: 10,
    // justifyContent: 'center',
  },
  walletBtn: {
    height: 20,
    width: 25,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: Theme.COLORS.black,
    position: 'absolute',
    top: 15,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cashbackTitle: {
    ...Theme.fontStyles.h4Regular,
    // color: Theme.COLORS.white,
    marginTop: -5,
  },
  amountText: {
    ...Theme.fontStyles.h1Bold,
    fontSize: 20,
  },
  userNameText: {
    ...Theme.fontStyles.h2Bold,
    marginTop: 15,
  },
  amountView: {
    alignItems: 'center',
    marginTop: 10,
  },
  btn: {
    height: 40,
    width: '45%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.5)',
        shadowOffset: {
          height: 0.5,
          width: 5,
        },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 5,
        shadowColor: 'rgba(0,0,0, 0.9)',
      },
    }),
  },
  btnText: {
    ...Theme.fontStyles.h3Regular,
  },
  navListStyle: {
    width: 80,
    height: 70,
  },
  routeText: {
    ...Theme.fontStyles.h4Bold,
    marginTop: 5,
  },
});
