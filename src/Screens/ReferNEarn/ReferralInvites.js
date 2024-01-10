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
import {request_user_referral_invites} from '@user_redux/Actions';
import {get_currency_string} from '@user_redux/Utils';
import dayjs from 'dayjs';
import styles from './style';
import {get_user_internal_nav_list} from '@assets/RouterList';
const NAV_LIST_1 = get_user_internal_nav_list([10003, 10005]);
const monthModal = React.createRef();
const mapDispatchToProps = {
  request_user_referral_invites,
};

const mapStateToProps = ({params}) => {
  return {
    current_selected_month:
      params.user_activity_bonus_month || dayjs().format('YYYYMM'),
    loading: params.loading,
    user_referral_invites: params.user_referral_invites?.data || {},
  };
};

class ReferralInvites extends Component {
  state = {
    showMonthPicker: false,
  };

  componentDidMount() {
    this.props.request_user_referral_invites();
  }

  render_clicks = ({item, index}) => {
    return (
      <View
        style={[styles.tabCard, {height: 35}]}
        key={index + index.toString()}
        onPress={() => this.props.request_claim_info(item.id)}>
        <View style={[styles.storeInfoCard, {alignItems: 'flex-start'}]}>
          <Text style={styles.storeName} numberOfLines={1}>
            {item.email}
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
              {dayjs(item.invited_on).format(Config.DATE_FORMAT)}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  addEmptyCard = () => {
    return <View style={{height: 80}} />;
  };
  render() {
    const {user_referral_invites, loading} = this.props;
    const loader_arr = [1, 2, 3, 4];
    return (
      <Container>
        <Header>
          <HeaderLeft>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </HeaderLeft>
          <HeaderTitle>
            <Text style={styles.headerTitle}>{translate('invited_users')}</Text>
          </HeaderTitle>
          <HeaderRight />
        </Header>
        <View style={styles.content}>
          {!loading ? (
            <FlatList
              data={user_referral_invites}
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
          {!loading && !user_referral_invites?.length && <EmptyListView />}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReferralInvites);
