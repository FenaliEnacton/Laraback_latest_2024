import { get_user_internal_nav_list } from '@/Assets/RouterList';
import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import Container from '@/Components/Core/Container';
import Header from '@/Components/Core/Header/Header';
import { request_user_activity_bonus } from '@/Redux/USER_REDUX/Actions/userActivityActions';
import { user_activity_months } from '@/Redux/USER_REDUX/Selectors';
import { get_currency_string } from '@/Utils';
import { Config } from '@/react-native-config';
import { translate } from '@/translations';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import ListHeader from '@/Components/User/ListHeader';
import TabLoader from '@/Components/User/TabLoader';
import EmptyListView from '@/Components/Generic/EmptyListView';
import BlurNavBar from '@/Components/Generic/BlurNavBar';
import NavigationList from '@/Components/User/NavigationList';
import BottomModal from '@/Components/Core/BottomModal';
import CloseButton from '@/Components/Core/CloseButton';

const NAV_LIST_1 = get_user_internal_nav_list([1111, 2222, 3333]);
const monthModal: any = React.createRef();
const mapDispatchToProps = {
  request_user_activity_bonus,
};

const mapStateToProps = ({ params }) => {
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

const Bonus = props => {
  const {
    bonus_months_data,
    current_selected_month,
    user_activity_bonus,
    loading,
  } = props;
  const loader_arr = [1, 2, 3, 4];
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  useEffect(() => {
    if (props.bonus_months_data?.recent_month) {
      props.request_user_activity_bonus(props.bonus_months_data?.recent_month);
    }
  }, []);
  const render_clicks = ({ item, index }) => {
    return (
      <View style={styles.tabCard} key={index + item.id.toString()}>
        <View style={[styles.storeInfoCard, { maxWidth: '25%' }]}>
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
          <View style={styles.date_box}>
            <Icons.MaterialCommunityIcons
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
            { backgroundColor: Theme.get_status_light_color(item.status) },
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

  const handle_month_selection = month_id => {
    props.request_user_activity_bonus(month_id);
    monthModal.current.props.onRequestClose();
  };
  const renderMonths = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          styles.monthTab,
          {
            backgroundColor:
              props.current_selected_month === item.month_id
                ? Theme.COLORS.primary
                : Theme.COLORS.white,
          },
        ]}
        onPress={() => handle_month_selection(item.month_id)}>
        <Text
          style={[
            styles.monthText,
            {
              color:
                props.current_selected_month === item.month_id
                  ? Theme.COLORS.white
                  : Theme.COLORS.blackText,
            },
          ]}>
          {item.month_title}
        </Text>
      </TouchableOpacity>
    );
  };
  const addEmptyCard = () => {
    return <View style={{ height: 120 }} />;
  };
  return (
    <Container>
      <Header>
        <Header.Left>
          <HeaderBackButton onPress={() => props.navigation.goBack()} />
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
          <Text style={styles.screen_title}>{translate('bonus')}</Text>
          <ListHeader
            month={
              user_activity_bonus.length
                ? dayjs(current_selected_month).format('MMM-YYYY')
                : null
            }
            title={translate('bonus')}
            onPress={() => setShowMonthPicker(true)}
          />
        </View>
        <View>
          {!loading ? (
            <FlatList
              data={user_activity_bonus}
              showsVerticalScrollIndicator={false}
              extraData={props}
              renderItem={render_clicks}
              keyExtractor={(item, index) => index.toString()}
              // style={styles.list}
              ListFooterComponent={addEmptyCard}
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
          navigation={props.navigation}
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
        bottomModalShow={showMonthPicker}
        setBottomModalVisibleFalse={() => setShowMonthPicker(false)}>
        <>
          <View style={styles.modal_top_notch} />
          <Text style={styles.title}>{translate('select_month')}</Text>
          <FlatList
            style={styles.modalList}
            data={bonus_months_data.revised_months}
            keyExtractor={(item, index) => index.toString()}
            extraData={props}
            renderItem={renderMonths}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Bonus);
