import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {AppImages} from '@assets/Images';
import {translate} from '@translations';
import Config from 'react-native-config';
import {user_reward_amount} from '@user_redux/Selectors';
import dayjs from 'dayjs';
import {Theme} from '@assets/Theme';
const windowWidth = Dimensions.get('window').width;

const mapDispatchToProps = {};

const mapStateToProps = ({params}) => {
  return {
    user_claim_info: params.user_claim_info || {},
    user_claim_id: params.user_claim_id || '',
  };
};

const ClaimInfo = (props) => {
  const {user_claim_info, user_claim_id} = props;
  return (
    <View style={styles.cashbackEarnedView}>
      <View style={styles.topTab}>
        <Text style={styles.cashbackSubTitle}>{translate('claim_id')}</Text>
        <Text style={styles.totalText}>#{user_claim_id}</Text>
      </View>
      <View style={styles.bottomTab}>
        <View style={styles.cashbackInfo}>
          <View style={styles.pendingBox}>
            <Text style={styles.statusType}>{translate('created')}</Text>
            <Text style={styles.amount}>
              {dayjs(user_claim_info.created_at).format(Config.DATE_FORMAT)}
            </Text>
          </View>
          <View style={styles.pendingBoxCenter}>
            <Text style={styles.statusType}>{translate('merchant')}</Text>
            <Text style={styles.amount}>{user_claim_info.store?.name}</Text>
          </View>
          <View style={styles.pendingBox}>
            <Text style={styles.statusType}>{translate('purchase_value')}</Text>
            <Text style={styles.amount}>{user_claim_info.order_amount}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomTab}>
        <View style={styles.cashbackInfo}>
          <View style={styles.pendingBox}>
            <Text style={styles.statusType}>{translate('claim_status')}</Text>
            <Text
              style={[
                styles.amount,
                {color: Theme.get_status_dark_color(user_claim_info.status)},
              ]}>
              {user_claim_info.status}
            </Text>
          </View>
          <View style={styles.pendingBoxCenter}>
            <Text style={styles.statusType}>
              {translate('transaction_date')}
            </Text>
            <Text style={styles.amount}>
              {user_claim_info.transaction_date}
            </Text>
          </View>
          <View style={styles.pendingBox}>
            <Text style={styles.statusType}>{translate('order_no')}</Text>
            <Text style={styles.amount}>#{user_claim_info.order_id}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ClaimInfo);

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
    textTransform: 'capitalize',
  },
  statusType: {
    ...Theme.fontStyles.h4Regular,
    color: Theme.COLORS.grey_underline,
    textTransform: 'capitalize',
  },
});
