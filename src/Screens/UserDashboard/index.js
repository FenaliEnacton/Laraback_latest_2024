import React, {Component} from 'react';
import {FlatList, View, Text} from 'react-native';
import {
  Container,
  Header,
  ScrollContent,
  DrawerMenu,
  LogoutModal,
} from '@components/core';
import {connect} from 'react-redux';
import {translate} from '@translations';
import styles from './style';
import {
  CashbackEarned,
  RewardEarned,
  NavigationList,
  UserHeader,
  ProfileCarousel,
} from '@components/user';
import {Theme} from '@assets/Theme';
import Icon from '@assets/icons';
import {
  request_user_dashboard,
  request_user_clicks_summary,
  request_user_payment_summary,
  request_user_cashback_summary,
  request_user_referral_summary,
  request_user_bonus_summary,
} from '@user_redux/Actions';
import {get_nav_list, NavList} from '@assets/RouterList';
import {user_lifetime_earning} from '@user_redux/Selectors';
import ComponentAnimation from '../../Components/Core/ComponentAnimation';
import {SimpleAnimation} from 'react-native-simple-animations';
const NAV_LIST_1 = get_nav_list([111, 222, 333]);
const NAV_LIST_2 = get_nav_list([444]);
const NAV_LIST_3 = get_nav_list([555, 666]);
const NAV_LIST_4 = get_nav_list([777, 888, 999, 1000]);

const mapDispatchToProps = {
  request_user_dashboard,
  request_user_clicks_summary,
  request_user_payment_summary,
  request_user_cashback_summary,
  request_user_referral_summary,
  request_user_bonus_summary,
};

const mapStateToProps = ({params}) => {
  return {
    total_earning: params?.user_dashboard_data
      ? user_lifetime_earning(params.user_dashboard_data)
      : '',
  };
};

class UserDashboard extends Component {
  state = {
    show_drawer: false,
    logout_show: false,
  };
  componentDidMount() {
    this.props.request_user_dashboard();
    this.props.request_user_clicks_summary();
    this.props.request_user_cashback_summary();
    this.props.request_user_payment_summary();
    this.props.request_user_referral_summary();
    this.props.request_user_bonus_summary();
  }

  render() {
    const {logout_show} = this.state;
    return (
      <Container>
        {/* <Header headerStyle={styles.headerStyle} headerBox={styles.headerBox}> */}
        <UserHeader
          headerOnPress={() => this.setState({show_drawer: true})}
          title={translate('my_account')}
          editOnPress={() => this.props.navigation.navigate('AccountSettings')}
        />
        {/* </Header> */}
        <ScrollContent style={styles.content}>
          <View style={styles.cbBalance}>
            <SimpleAnimation
              delay={0}
              duration={1500}
              distance={120}
              aim={'in'}
              friction={18}
              staticType={'zoom'}
              movementType={'spring'}>
              <ProfileCarousel
                navigation={this.props.navigation}
                total_earning={this.props.total_earning}
              />
            </SimpleAnimation>
          </View>
          <View style={{marginTop: 10}}>
            <NavigationList
              list={NAV_LIST_1}
              navigation={this.props.navigation}
              heading={'cashback'}
            />
            <NavigationList
              list={NAV_LIST_2}
              navigation={this.props.navigation}
              heading={'fav'}
            />
            <NavigationList
              list={NAV_LIST_3}
              navigation={this.props.navigation}
              heading={'earn_more'}
            />
            <NavigationList
              list={NAV_LIST_4}
              navigation={this.props.navigation}
              heading={'account_settings'}
            />
            <View style={{height: 90}} />
          </View>
        </ScrollContent>
        <DrawerMenu
          drawerShow={this.state.show_drawer}
          navigation={this.props.navigation}
          setDrawerVisibleFalse={() => this.setState({show_drawer: false})}
          show_log_out={() => this.setState({logout_show: true})}
        />
        <LogoutModal
          onRequestClose={() => this.setState({logout_show: false})}
          visible={logout_show}
        />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
