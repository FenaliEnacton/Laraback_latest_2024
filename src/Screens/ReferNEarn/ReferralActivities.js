import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Icon from '@assets/icons';
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  HeaderBackButton,
  BottomModal,
  CloseButton,
} from '@components/core';
import Config from 'react-native-config';
import {EmptyListView, BlurNavBar} from '@components/generic';
import {
  ListHeader,
  ActivityNavigationList,
  TabLoader,
  NavigationList,
} from '@components/user';
import {translate} from '@translations';
import {Theme} from '@assets/Theme';
import {request_user_referral_list} from '@user_redux/Actions';
import {get_currency_string} from '@user_redux/Utils';
import {user_activity_months} from '@user_redux/Selectors';
import dayjs from 'dayjs';
import styles from './style';
import {get_user_internal_nav_list} from '@assets/RouterList';
const NAV_LIST_1 = get_user_internal_nav_list([10004, 10005]);
const monthModal = React.createRef();
const mapDispatchToProps = {
  request_user_referral_list,
};

const mapStateToProps = ({params}) => {
  return {
    current_selected_month:
      params.user_activity_bonus_month || dayjs().format('YYYYMM'),
    loading: params.loading,
    user_referral_list: params.user_referral_list || {},
  };
};

class ReferralActivities extends Component {
  state = {
    showMonthPicker: false,
  };

  componentDidMount() {
    this.props.request_user_referral_list();
  }

  render_clicks = ({item, index}) => {
    return (
      <View
        style={styles.tabCard}
        key={index + index.toString()}
        onPress={() => this.props.request_claim_info(item.id)}>
        <View style={[styles.storeInfoCard, {alignItems: 'flex-start'}]}>
          <Text style={styles.storeName} numberOfLines={1}>
            {item.email}
          </Text>
          <Text style={styles.bottomText}>
            {item.first_name} {item.last_name}
          </Text>
        </View>
        <View style={[styles.storeInfoCard, {alignItems: 'flex-end'}]}>
          <View style={styles.date_box}>
            <Icon.AntDesign
              name={'calendar'}
              color={Theme.COLORS.grey}
              size={14}
            />
            <Text style={styles.transDate}>
              {' '}
              {dayjs(item.created_at).format(Config.DATE_FORMAT)}
            </Text>
          </View>
          <Text style={styles.referralMoneyText}>
            {item.referrer_earned
              ? get_currency_string(item.referrer_earned.amount)
              : get_currency_string(0.0)}
          </Text>
        </View>
      </View>
    );
  };

  handle_month_selection = month_id => {
    this.props.request_user_activity_bonus(month_id);
    monthModal.current.props.onRequestClose();
  };

  renderMonths = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.monthTab,
          {
            backgroundColor:
              this.props.current_selected_month === item.month_id
                ? Theme.COLORS.primary
                : Theme.COLORS.white,
          },
        ]}
        onPress={() => this.handle_month_selection(item.month_id)}>
        <Text
          style={[
            styles.monthText,
            {
              color:
                this.props.current_selected_month === item.month_id
                  ? Theme.COLORS.white
                  : Theme.COLORS.blackText,
            },
          ]}>
          {item.month_title}
        </Text>
      </TouchableOpacity>
    );
  };
  addEmptyCard = () => {
    return <View style={{height: 80}} />;
  };
  render() {
    const {
      user_referral_list,
      current_selected_month,
      user_activity_bonus,
      loading,
    } = this.props;
    const loader_arr = [1, 2, 3, 4];
    return (
      <Container>
        <Header>
          <HeaderLeft>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </HeaderLeft>
          <HeaderTitle>
            <Text style={styles.headerTitle}>
              {translate('referral_activities')}
            </Text>
          </HeaderTitle>
          <HeaderRight />
        </Header>
        <View style={styles.content}>
          {!loading ? (
            <FlatList
              data={user_referral_list?.data}
              showsVerticalScrollIndicator={false}
              extraData={this.props}
              renderItem={this.render_clicks}
              keyExtractor={(item, index) => index.toString()}
              // style={styles.list}
              ListFooterComponent={this.addEmptyCard}
            />
          ) : (
            loader_arr.map((item, index) => {
              return <TabLoader key={item.toString() + index} />;
            })
          )}
          {!loading && !user_referral_list?.data?.length && <EmptyListView />}
        </View>
        <BlurNavBar>
          <NavigationList
            list={NAV_LIST_1}
            navigation={this.props.navigation}
            style={styles.navListStyle}
            containerStyle={{
              alignItems: 'center',
              marginTop: 0,
            }}
            numberOfLines={2}
            textStyle={styles.routeText}
          />
        </BlurNavBar>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReferralActivities);
