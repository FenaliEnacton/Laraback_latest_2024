import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
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
import {EmptyListView, BlurNavBar} from '@components/generic';
import Config from 'react-native-config';
import {
  ListHeader,
  ActivityNavigationList,
  TabLoader,
  NavigationList,
} from '@components/user';
import {translate} from '@translations';
import {Theme} from '@assets/Theme';
import {request_user_activity_bonus} from '@user_redux/Actions';
import {get_currency_string} from '@user_redux/Utils';
import {user_activity_months} from '@user_redux/Selectors';
import dayjs from 'dayjs';
import styles from './style';
import {get_user_internal_nav_list} from '@assets/RouterList';
const NAV_LIST_1 = get_user_internal_nav_list([1111, 2222, 3333]);
const monthModal = React.createRef();
const mapDispatchToProps = {
  request_user_activity_bonus,
};

const mapStateToProps = ({params}) => {
  return {
    current_selected_month:
      params.user_activity_bonus_month || dayjs().format('YYYYMM'),
    loading: params.loading,
    user_activity_bonus: params.user_activity_bonus || [],
    bonus_months_data: params.user_bonus_summary
      ? params.user_bonus_summary.months
        ? user_activity_months(params.user_bonus_summary.months)
        : {}
      : {},
  };
};

class Bonus extends Component {
  state = {
    showMonthPicker: false,
  };

  componentDidMount() {
    if (this.props.bonus_months_data?.recent_month) {
      this.props.request_user_activity_bonus(
        this.props.bonus_months_data?.recent_month,
      );
    }
  }

  render_clicks = ({item, index}) => {
    return (
      <View style={styles.tabCard} key={index + item.id.toString()}>
        <View style={[styles.storeInfoCard, {maxWidth: '25%'}]}>
          <Text style={styles.storeName}>{item.type_info?.name}</Text>
          <Text style={styles.bottomText}>
            {translate('amount')} :{' '}
            <Text style={styles.amountItem}>
              {get_currency_string(item.amount)}
            </Text>
          </Text>
        </View>
        <View style={styles.storeInfoCard}>
          <View style={styles.date_box}>
            <Icon.AntDesign
              name={'calendar'}
              color={Theme.COLORS.black}
              size={14}
            />
            <Text style={styles.transDate}>
              {' '}
              {dayjs(item.awarded_on).format(Config.DATE_FORMAT)}
            </Text>
          </View>
          <View style={styles.date_box}>
            <Icon.MaterialCommunityIcons
              name={'clock-time-four-outline'}
              color={Theme.COLORS.black}
              size={14}
            />
            <Text style={styles.transDate}>
              {' '}
              {dayjs(item.expires_on).format(Config.DATE_FORMAT)}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBox,
            {backgroundColor: Theme.get_status_light_color(item.status)},
          ]}>
          <Text style={[styles.status]}>
            {''}
            {item.user_cashback_id
              ? translate('tracked')
              : translate('clicked')}
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
    return <View style={{height: 120}} />;
  };
  render() {
    const {
      bonus_months_data,
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
              {translate('cashback_activities')}
            </Text>
          </HeaderTitle>
          <HeaderRight />
        </Header>
        <View style={styles.content}>
          <View style={styles.navCard}>
            <Text style={styles.screen_title}>{translate('bonus')}</Text>
            <ListHeader
              month={
                user_activity_bonus.length
                  ? dayjs(current_selected_month).format('MMM-YYYY')
                  : null
              }
              title={translate('bonus')}
              onPress={() => this.setState({showMonthPicker: true})}
            />
          </View>
          <View>
            {!loading ? (
              <FlatList
                data={user_activity_bonus}
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
            {!loading && !user_activity_bonus.length && <EmptyListView />}
            {/* </View> */}
          </View>
        </View>
        <BlurNavBar>
          <NavigationList
            list={NAV_LIST_1}
            navigation={this.props.navigation}
            style={styles.navListStyle}
            numberOfLines={3}
            containerStyle={{
              marginTop: 0,
              alignItems: 'center',
            }}
            textStyle={styles.routeText}
          />
        </BlurNavBar>
        <BottomModal
          style={styles.modalStyle}
          ref={monthModal}
          bottomModalShow={this.state.showMonthPicker}
          setBottomModalVisibleFalse={() =>
            this.setState({showMonthPicker: false})
          }>
          <>
            <View style={styles.modal_top_notch} />
            <Text style={styles.title}>{translate('select_month')}</Text>
            <FlatList
              style={styles.modalList}
              data={bonus_months_data.revised_months}
              keyExtractor={(item, index) => index.toString()}
              extraData={this.props}
              renderItem={this.renderMonths}
            />
            <View style={styles.btnBar}>
              <CloseButton
                btnStyle={styles.closeBtn}
                onPress={() => monthModal.current.props.onRequestClose()}
              />
            </View>
          </>
        </BottomModal>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bonus);
