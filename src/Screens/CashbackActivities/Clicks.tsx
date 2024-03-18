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
import { user_activity_months } from '@/Redux/USER_REDUX/Selectors';
import { translate } from '@/translations';
import dayjs from 'dayjs';
import React, { Component } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import { request_user_activity_clicks } from '@/Redux/USER_REDUX/Actions/userActivityActions';
import Icons from '@/Assets/icons';

const NAV_LIST_1 = get_user_internal_nav_list([2222, 3333, 4444]);
const monthModal: any = React.createRef();
const mapDispatchToProps = {
  request_user_activity_clicks,
};

const mapStateToProps = ({ params }) => {
  return {
    user_activity_clicks: params.user_activity_clicks || [],
    current_selected_month:
      params.user_activity_clicks_month || dayjs().format('YYYYMM'),
    loading: params.loading,
    click_months_data: params.user_clicks_summary
      ? params.user_clicks_summary.months
        ? user_activity_months(params.user_clicks_summary.months)
        : {}
      : {},
  };
};

class Clicks extends Component<any> {
  state = {
    showMonthPicker: false,
  };

  componentDidMount() {
    if (this.props.click_months_data?.recent_month) {
      this.props.request_user_activity_clicks(
        this.props.click_months_data?.recent_month,
      );
    }
  }

  render_clicks = ({ item, index }) => {
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
              {dayjs(item.click_time).format('MMMM DD,YYYY h:mm a')}
            </Text>
          </View>
          <Text style={styles.bottomText}>#{item.code}</Text>
        </View>
        <View
          style={[
            styles.statusBox,
            item.user_cashback_id
              ? { backgroundColor: Theme.get_status_light_color('completed') }
              : { backgroundColor: Theme.get_status_light_color('pending') },
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
    this.props.request_user_activity_clicks(month_id);
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
      click_months_data,
      current_selected_month,
      user_activity_clicks,
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
            <Text style={styles.screen_title}>{translate('clicks')}</Text>
            <ListHeader
              month={
                user_activity_clicks.length
                  ? dayjs(current_selected_month).format('MMM-YYYY')
                  : null
              }
              title={translate('click_entries')}
              onPress={() => this.setState({ showMonthPicker: true })}
            />
          </View>
          <View>
            {!loading ? (
              <FlatList
                data={user_activity_clicks}
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
            {!loading && !user_activity_clicks.length && <EmptyListView />}
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
            this.setState({ showMonthPicker: false })
          }>
          <>
            <View style={styles.modal_top_notch} />

            <Text style={styles.title}>{translate('select_month')}</Text>
            <FlatList
              style={styles.modalList}
              data={click_months_data.revised_months}
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

export default connect(mapStateToProps, mapDispatchToProps)(Clicks);