import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {AppImages} from '@assets/Images';
import {translate} from '@translations';
import {user_reward_amount} from '@user_redux/Selectors';

import {Theme} from '@assets/Theme';
const windowWidth = Dimensions.get('window').width;

const mapDispatchToProps = {};

const mapStateToProps = ({params}) => {
  return {
    user_reward_data: params.user_dashboard_data
      ? user_reward_amount(params.user_dashboard_data)
      : {},
  };
};

const CashbackEarned = (props) => {
  const {user_reward_data} = props;
  return (
    <View style={styles.cashbackEarnedView}>
      <View style={styles.topTab}>
        <Text style={styles.cashbackSubTitle}>
          {translate('total_reward_earned')}
        </Text>
        <Text style={styles.totalText}>{user_reward_data.total}</Text>
      </View>
      <View style={styles.bottomTab}>
        <View style={styles.cashbackInfo}>
          <View style={styles.pendingBox}>
            <Text style={styles.statusType}>{translate('paid_re')}</Text>
            <Text style={styles.amount}>{user_reward_data.paid}</Text>
          </View>
          <View style={styles.pendingBoxCenter}>
            <Text style={styles.statusType}>{translate('pending_re')}</Text>
            <Text style={styles.amount}>{user_reward_data.pending}</Text>
          </View>
          <View style={styles.pendingBox}>
            <Text style={styles.statusType}>
              {translate('available_payment')}
            </Text>
            <Text style={styles.amount}>{user_reward_data.confirmed}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CashbackEarned);

const styles = StyleSheet.create({
  cashbackEarnedView: {
    width: windowWidth - 20,
    ...Theme.appStyle.userWhiteCard,
  },
  topTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cashbackSubTitle: {
    ...Theme.fontStyles.h2Bold,
  },
  totalText: {
    ...Theme.fontStyles.h2Bold,
    color: Theme.COLORS.secondary,
  },
  bottomTab: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  image: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  cashbackInfo: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: windowWidth - 50,
    alignItems: 'center',
  },
  pendingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  pendingBoxCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: Theme.COLORS.grey_underline,
    borderRightColor: Theme.COLORS.grey_underline,
    flex: 1,
  },
  amount: {
    ...Theme.fontStyles.h3Bold,
    marginTop: 5,
  },
  statusType: {
    ...Theme.fontStyles.h4Regular,
    color: Theme.COLORS.grey_underline,
    textTransform: 'capitalize',
  },
});
