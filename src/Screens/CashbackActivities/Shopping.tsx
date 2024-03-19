import { get_user_internal_nav_list } from '@/Assets/RouterList';
import { Theme } from '@/Assets/Theme';
import BottomModal from '@/Components/Core/BottomModal';
import CloseButton from '@/Components/Core/CloseButton';
import Container from '@/Components/Core/Container';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import BlurNavBar from '@/Components/Generic/BlurNavBar';
import EmptyListView from '@/Components/Generic/EmptyListView';
import ListHeader from '@/Components/User/ListHeader';
import NavigationList from '@/Components/User/NavigationList';
import TabLoader from '@/Components/User/TabLoader';
import { request_user_activity_cashback } from '@/Redux/USER_REDUX/Actions/userActivityActions';
import { user_activity_months } from '@/Redux/USER_REDUX/Selectors';
import { get_currency_string } from '@/Utils';
import { Config } from '@/react-native-config';
import { translate } from '@/translations';
import dayjs from 'dayjs';
import React, { Component } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import Icons from '@/Assets/icons';

const NAV_LIST_1 = get_user_internal_nav_list([1111, 3333, 4444]);
const monthModal: any = React.createRef();
const mapDispatchToProps = {
  request_user_activity_cashback,
};

const mapStateToProps = ({ params }) => {
  return {
    user_activity_cashback: params.user_activity_cashback || [],
    cashback_months_data: params.user_cashback_summary
      ? params.user_cashback_summary.months
        ? user_activity_months(params.user_cashback_summary.months)
        : {}
      : {},
    current_selected_month:
      params.user_cashback_activity_month || dayjs().format('YYYYMM'),
    loading: params.loading,
  };
};

class Shopping extends Component<any> {
  state = {
    showMonthPicker: false,
  };

  componentDidMount() {
    if (this.props.cashback_months_data?.recent_month) {
      this.props.request_user_activity_cashback(
        this.props.cashback_months_data?.recent_month,
      );
    }
  }

  render_cashback = ({ item, index }) => {
    return (
      <View style={styles.tabCard} key={index + item.id.toString()}>
        <View style={[styles.storeInfoCard, { maxWidth: '25%' }]}>
          <Image style={styles.logoImg} source={{ uri: item.store?.logo }} />
          <Text style={styles.storeName}>{item.store?.name}</Text>
        </View>
        <View style={styles.storeInfoCard}>
          <View style={styles.date_box}>
            <Icons.AntDesign
              name={'calendar'}
              color={Theme.COLORS.black}
              size={14}
            />
            <Text style={styles.transDate}>
              {' '}
              {dayjs(item.awarded_on).format(Config.DATE_FORMAT)}
            </Text>
          </View>
          <Text>
            {translate('order')} :{' '}
            <Text style={styles.amountItem}>
              {item.order_amount} {item.currency}
            </Text>
          </Text>

          <Text>
            {translate('cashback')} :{' '}
            <Text style={styles.amountItem}>
              {get_currency_string(item.cashback)}
            </Text>
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View
            style={[
              styles.statusBox,
              { backgroundColor: Theme.get_status_light_color(item.status) },
            ]}>
            <Text style={[styles.status]}>
              {''}
              {item.user_cashback_id
                ? translate('tracked')
                : translate('clicked')}
            </Text>
          </View>
          <Text style={styles.bottomText}>#{item.click.code}</Text>
        </View>
      </View>
    );
  };

  handle_month_selection = month_id => {
    this.props.request_user_activity_cashback(month_id);
    monthModal.current.props.onRequestClose();
  };

  renderMonths = ({ item, index }) => {
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
    return <View style={{ height: 120 }} />;
  };
  render() {
    const {
      cashback_months_data,
      current_selected_month,
      user_activity_cashback,
      loading,
    } = this.props;
    const loader_arr = [1, 2, 3, 4];
    return (
      <Container>
        <Header>
          <Header.Left>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </Header.Left>
          <Header.Title>
            <Text style={styles.headerTitle}>
              {translate('cashback_activities')}
            </Text>
          </Header.Title>
          <Header.Right />
        </Header>
        <View style={styles.content}>
          <View style={styles.navCard}>
            <Text style={styles.screen_title}>
              {translate('shopping_trips')}
            </Text>
            <ListHeader
              month={
                user_activity_cashback.length
                  ? dayjs(current_selected_month).format('MMM-YYYY')
                  : null
              }
              title={translate('shopping_trips')}
              onPress={() => this.setState({ showMonthPicker: true })}
            />
          </View>
          {!loading ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              extraData={this.props}
              data={user_activity_cashback}
              renderItem={this.render_cashback}
              keyExtractor={(item, index) => index.toString()}
              // style={styles.list}
              ListFooterComponent={this.addEmptyCard}
            />
          ) : (
            loader_arr.map((item, index) => {
              return <TabLoader key={item.toString() + index} />;
            })
          )}
          {!loading && !user_activity_cashback.length && <EmptyListView />}
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
            this.setState({ showMonthPicker: false })
          }>
          <>
            <View style={styles.modal_top_notch} />
            <Text style={styles.title}>{translate('select_month')}</Text>

            <FlatList
              style={styles.modalList}
              data={cashback_months_data.revised_months}
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

export default connect(mapStateToProps, mapDispatchToProps)(Shopping);
