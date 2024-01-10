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
import {EmptyListView, BlurNavBar} from '@components/generic';
import {
  ListHeader,
  ActivityNavigationList,
  TabLoader,
  NavigationList,
} from '@components/user';
import {get_currency_string} from '@user_redux/Utils';
import Config from 'react-native-config';
import {translate} from '@translations';
import {Theme} from '@assets/Theme';
import {
  request_user_payment_list,
  request_user_payment_email_verify,
} from '@user_redux/Actions';
import {user_activity_months} from '@user_redux/Selectors';
import dayjs from 'dayjs';
import styles from './style';
import {get_user_internal_nav_list} from '@assets/RouterList';
const NAV_LIST_1 = get_user_internal_nav_list([6666]);
const monthModal = React.createRef();
const mapDispatchToProps = {
  request_user_payment_list,
  request_user_payment_email_verify,
};

const mapStateToProps = ({params}) => {
  return {
    user_payment_list: params.user_payment_list || [],
    current_selected_month:
      params.user_payment_month || dayjs().format('YYYYMM'),
    loading: params.loading,
    payment_months_data: params.user_payment_summary
      ? params.user_payment_summary.months
        ? user_activity_months(params.user_payment_summary.months)
        : {}
      : {},
  };
};

class CashbackPaymentHistory extends Component {
  state = {
    showMonthPicker: false,
  };

  componentDidMount() {
    if (this.props.payment_months_data?.recent_month) {
      this.props.request_user_payment_list(
        this.props.payment_months_data?.recent_month,
      );
    }
  }

  render_clicks = ({item, index}) => {
    return (
      <View style={styles.tabCard} key={index + item.id.toString()}>
        <View style={styles.storeInfoCard}>
          <Text style={styles.bottomText}>
            {translate('amount')} :{' '}
            <Text style={styles.amountItem}>
              {get_currency_string(item.amount)}
            </Text>
          </Text>
          <Text style={styles.bottomText}>
            {translate('ac')}.{translate('type')}:{' '}
            <Text style={styles.amountItem}>{item.method_info.name}</Text>
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
              {dayjs(item.created_at).format(Config.DATE_FORMAT)}
            </Text>
          </View>
          <Text style={styles.storeName}>{item.account}</Text>
        </View>
        <View>
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
          <Text style={styles.bottomText}>#{item.payment_id}</Text>
          {item.status === 'created' && item.verified_at == null ? (
            <TouchableOpacity
              style={styles.resend_btn}
              onPress={() =>
                this.props.request_user_payment_email_verify(item.id)
              }>
              <Text style={styles.resend_txt}>{translate('resend')}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  handle_month_selection = month_id => {
    this.props.request_user_payment_list(month_id);
    monthModal.current.props.onRequestClose();
  };
  addEmptyCard = () => {
    return <View style={{height: 80}} />;
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

  render() {
    const {
      payment_months_data,
      current_selected_month,
      user_payment_list,
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
            <Text style={styles.headerTitle} numberOfLines={1}>
              {translate('cashback_payment_history')}
            </Text>
          </HeaderTitle>
          <HeaderRight />
        </Header>
        <View style={styles.content}>
          {/* <Text style={styles.screen_title}>
            {translate('cashback_payment_history')}
          </Text> */}

          <View style={styles.navCard}>
            <ListHeader
              month={
                user_payment_list.length
                  ? dayjs(current_selected_month).format('MMM-YYYY')
                  : null
              }
              title={translate('cashback_payment_history')}
              onPress={() => this.setState({showMonthPicker: true})}
            />
          </View>
          <View style={{marginTop: 5}}>
            <FlatList
              data={user_payment_list}
              extraData={this.props}
              showsVerticalScrollIndicator={false}
              renderItem={this.render_clicks}
              keyExtractor={(item, index) => index.toString()}
              style={styles.list}
              ListFooterComponent={this.addEmptyCard}
            />
            {loading &&
              loader_arr.map((item, index) => {
                return <TabLoader key={item.toString() + index} />;
              })}
            {!loading && !user_payment_list.length && <EmptyListView />}
          </View>
          {/* <ActivityNavigationList
            list={NAV_LIST_1}
            navigation={this.props.navigation}
          /> */}
        </View>
        <BlurNavBar>
          <NavigationList
            list={NAV_LIST_1}
            navigation={this.props.navigation}
            style={styles.navListStyle}
            containerStyle={{
              // marginVertical: 20,
              alignItems: 'center',
              marginTop: 0,
            }}
            numberOfLines={1}
            textStyle={styles.routeText}
          />
        </BlurNavBar>
        <BottomModal
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
              data={payment_months_data.revised_months}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CashbackPaymentHistory);
