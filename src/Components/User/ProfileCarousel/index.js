import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {AppImages} from '@assets/Images';
import {Theme} from '@assets/Theme';
import {connect} from 'react-redux';
import {translate} from '@translations';
import {user_cashback_amount} from '@user_redux/Selectors';
import {user_reward_amount} from '@user_redux/Selectors';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const mapDispatchToProps = {};

const mapStateToProps = ({params}) => {
  return {
    user_cashback_data: params.user_dashboard_data
      ? user_cashback_amount(params.user_dashboard_data)
      : {},
    user_reward_data: params.user_dashboard_data
      ? user_reward_amount(params.user_dashboard_data)
      : {},
  };
};
export const Carousel1 = props => {
  const {user_cashback_data} = props;
  return (
    <View style={styles.cardContainer}>
      <View style={styles.balanceCard}>
        <View style={styles.headingText}>
          <Text style={styles.TotalEarningText}>
            {translate('total_cashback_earned')}
          </Text>
          <Text
            style={[styles.TotalEarningText, {color: Theme.COLORS.secondary}]}>
            {user_cashback_data.total}
          </Text>
        </View>
        <View style={styles.cashbackCard}>
          <View style={{marginHorizontal: 5}}>
            <Text style={styles.pendingAmount}>{user_cashback_data.paid}</Text>
            <Text style={styles.cashbackTypeText}>{translate('paid_cb')}</Text>
          </View>
          <View style={{marginHorizontal: 5}}>
            <Text style={styles.pendingAmount}>
              {user_cashback_data.pending}
            </Text>
            <Text style={styles.cashbackTypeText}>
              {translate('pending_cb')}
            </Text>
          </View>
          <View style={{marginHorizontal: 5}}>
            <Text style={styles.pendingAmount}>
              {user_cashback_data.confirmed}
            </Text>
            <Text style={styles.cashbackTypeText}>
              {translate('available_payment')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export const Carousel2 = props => {
  const {user_reward_data} = props;
  return (
    <View style={styles.cardContainer}>
      <View style={styles.balanceCard}>
        <View style={styles.headingText}>
          <Text style={styles.TotalEarningText}>
            {' '}
            {translate('total_reward_earned')}
          </Text>
          <Text
            style={[styles.TotalEarningText, {color: Theme.COLORS.secondary}]}>
            {user_reward_data.total}
          </Text>
        </View>
        <View style={styles.cashbackCard}>
          <View style={{marginHorizontal: 5}}>
            <Text style={styles.pendingAmount}>{user_reward_data.paid}</Text>
            <Text style={styles.cashbackTypeText}>{translate('paid_re')}</Text>
          </View>
          <View style={{marginHorizontal: 5}}>
            <Text style={styles.pendingAmount}>{user_reward_data.pending}</Text>
            <Text style={styles.cashbackTypeText}>
              {translate('pending_re')}
            </Text>
          </View>
          <View style={{marginHorizontal: 5}}>
            <Text style={styles.pendingAmount}>
              {user_reward_data.confirmed}
            </Text>
            <Text style={styles.cashbackTypeText}>
              {translate('available_payment')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const ProfileCarousel = props => {
  const [activeSlide, setactiveSlide] = useState(0);
  const data = [
    {
      id: 1,
      image: AppImages.profileCarousel1,
      renderItem: (
        <Carousel1
          navigation={props.navigation}
          user_cashback_data={props.user_cashback_data}
        />
      ),
    },
    {
      id: 2,
      image: AppImages.profileCarousel2,
      renderItem: (
        <Carousel2
          navigation={props.navigation}
          user_reward_data={props.user_reward_data}
        />
      ),
    },
  ];

  return (
    <View>
      <Carousel
        //ref={c => carousel = c}
        data={data}
        loop={false}
        autoplay={false}
        //autoplayDelay={1000}
        enableSnap={true}
        useScrollView={false}
        sliderWidth={width}
        autoplayInterval={3000}
        itemWidth={width - 60}
        inactiveSlideOpacity={0.8}
        onSnapToItem={index => setactiveSlide(index)}
        lockScrollWhileSnapping={true}
        contentContainerCustomStyle={
          activeSlide % 2 != 0 ? {marginLeft: 5} : {marginLeft: -10}
        }
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.topBrandCard}
              key={index.toString()}>
              <View
                style={styles.image}
                // source={item.image}
                borderRadius={10}
                //   resizeMode={FastImage.resizeMode.stretch}
              >
                {item.renderItem}
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <View style={styles.pagination}>
        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          dotStyle={styles.dot_styles}
          inactiveDotStyle={styles.inactive_dot_styles}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  topBrandCard: {
    flex: 1,
    alignItems: 'flex-start',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
    alignSelf: 'flex-start',
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
    marginVertical: 10,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileCarousel);
