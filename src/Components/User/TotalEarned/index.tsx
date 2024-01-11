import { Theme } from '@/Assets/Theme';
import { payout_amount_selectors } from '@/Redux/USER_REDUX/Selectors';
import { translate } from '@/translations';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';

const windowWidth = Dimensions.get('window').width;

const TotalEarned = props => {
  const { user_cashback_data } = props;
  return (
    <View style={styles.image}>
      <View style={styles.cardContainer}>
        <View style={styles.balanceCard}>
          <View style={styles.headingText}>
            <Text style={styles.TotalEarningText}> {translate('payment')}</Text>
            <Text
              style={[
                styles.TotalEarningText,
                { color: Theme.COLORS.secondary },
              ]}>
              {user_cashback_data.available_for_payment}
            </Text>
          </View>
          <View style={styles.cashbackCard}>
            <View style={{ marginHorizontal: 5 }}>
              <Text style={styles.pendingAmount}>
                {' '}
                {user_cashback_data.available_for_payment}
              </Text>
              <Text style={styles.cashbackTypeText}>
                {translate('total_available')}
              </Text>
            </View>
            <View style={{ marginHorizontal: 5 }}>
              <Text style={styles.pendingAmount}>
                {' '}
                {user_cashback_data.available_cashback}
              </Text>
              <Text style={styles.cashbackTypeText}>
                {translate('cashback')}
              </Text>
            </View>
            <View style={{ marginHorizontal: 5 }}>
              <Text style={styles.pendingAmount}>
                {user_cashback_data.available_reward}
              </Text>
              <Text style={styles.cashbackTypeText}>{translate('reward')}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
    // <View style={styles.cashbackEarnedView}>
    //   <View style={styles.topTab}>
    //     <Text style={styles.cashbackSubTitle}>{translate('payment')}</Text>
    //     <Text style={styles.totalText}>
    //       {user_cashback_data.available_for_payment}
    //     </Text>
    //   </View>
    //   <View style={styles.bottomTab}>
    //     <View style={styles.cashbackInfo}>
    //       <View style={styles.pendingBox}>
    //         <Text style={styles.statusType}>
    //           {translate('total_available')}
    //         </Text>
    //         <Text style={styles.amount}>
    //           {user_cashback_data.available_for_payment}
    //         </Text>
    //       </View>
    //       <View style={styles.pendingBoxCenter}>
    //         <Text style={styles.statusType}>{translate('cashback')}</Text>
    //         <Text style={styles.amount}>
    //           {user_cashback_data.available_cashback}
    //         </Text>
    //       </View>
    //       <View style={styles.pendingBox}>
    //         <Text style={styles.statusType}>{translate('reward')}</Text>
    //         <Text style={styles.amount}>
    //           {user_cashback_data.available_reward}
    //         </Text>
    //       </View>
    //     </View>
    //   </View>
    // </View>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = ({ params }) => {
  return {
    user_cashback_data:
      payout_amount_selectors(params.user_payment_methods?.earning) || {},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TotalEarned);

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
  },
  topBrandCard: {
    flex: 1,
    alignItems: 'flex-start',
  },
  image: {
    height: 100,
    width: windowWidth * 0.88,
    borderRadius: 10,
    resizeMode: 'cover',
    alignSelf: 'center',
    backgroundColor: Theme.COLORS.gradient_card_bg,
  },
  pagination: {
    position: 'absolute',
    top: 90,
    //alignItems: 'center',
    alignSelf: 'center',
  },
  dot_styles: {
    width: 15,
    height: 3,
    marginRight: -10,
    //borderRadius: 3,
    backgroundColor: Theme.COLORS.primary,
  },
  inactive_dot_styles: {
    width: 6,
    height: 3,
    //marginLeft: -5,
    //borderRadius: 3,
    backgroundColor: Theme.COLORS.grey,
  },
  cbTitleText: {
    ...Theme.fontStyles.h4Bold,
    color: Theme.COLORS.white,
  },
  redeembtnText: {
    ...Theme.fontStyles.h4Bold,
    color: Theme.COLORS.white,
  },
  whiteText: {
    ...Theme.fontStyles.h1Bold,
    color: Theme.COLORS.white,
  },
  redeemBtn: {
    height: 35,
    width: '50%',
    marginLeft: 20,
    //marginTop: 10,
    borderWidth: 1,
    borderColor: Theme.COLORS.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContentView: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    width: '50%',
    height: 50,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  balanceCard: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TotalEarningText: {
    ...Theme.fontStyles.h1Bold,
  },
  cashbackTypeText: {
    ...Theme.fontStyles.h4Bold,
    color: Theme.COLORS.grey,
    textTransform: 'capitalize',
  },
  circle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  pendingAmount: {
    ...Theme.fontStyles.h3Bold,
    textAlign: 'center',
  },
  cashbackCard: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    // marginTop: 5,
    marginVertical: 5,
  },
  pendingTitle: {
    ...Theme.fontStyles.h3Bold,
    textAlign: 'center',
    width: '30%',
  },
  headingText: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});
