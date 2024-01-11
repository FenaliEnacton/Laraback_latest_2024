import { Theme } from '@/Assets/Theme';
import { user_cashback_amount } from '@/Redux/Selectors';
import { translate } from '@/translations';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
const windowWidth = Dimensions.get('window').width;

const CashbackEarned = props => {
  const { user_cashback_data } = props;
  return (
    <View style={styles.cashbackEarnedView}>
      <View style={styles.topTab}>
        <Text style={styles.cashbackSubTitle}>
          {translate('total_cashback_earned')}
        </Text>
        <Text style={styles.totalText}>{user_cashback_data.total}</Text>
      </View>
      <View style={styles.bottomTab}>
        <View style={styles.cashbackInfo}>
          <View style={styles.pendingBox}>
            <Text style={styles.statusType}>{translate('paid_cb')}</Text>
            <Text style={styles.amount}>{user_cashback_data.paid}</Text>
          </View>
          <View style={styles.pendingBoxCenter}>
            <Text style={styles.statusType}>{translate('pending_cb')}</Text>
            <Text style={styles.amount}>{user_cashback_data.pending}</Text>
          </View>
          <View style={styles.pendingBox}>
            <Text style={styles.statusType}>
              {translate('available_payment')}
            </Text>
            <Text style={styles.amount}>{user_cashback_data.confirmed}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = ({ params }) => {
  return {
    user_cashback_data: params.user_dashboard_data
      ? user_cashback_amount(params.user_dashboard_data)
      : {},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CashbackEarned);

const styles = StyleSheet.create({
  cashbackEarnedView: {
    width: windowWidth - 20,
    ...Theme.appStyle.userWhiteCard,
    marginTop: 10,
  },
  topTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cashbackSubTitle: {
    ...Theme.fontStyles.h2Bold,
    paddingTop: 0,
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
  cashbackInfo: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: windowWidth - 50,
    alignItems: 'center',
    alignSelf: 'center',
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
