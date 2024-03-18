import { get_user_internal_nav_list } from '@/Assets/RouterList';
import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import Container from '@/Components/Core/Container';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import Toast from '@/Components/Core/Toast';
import BlurNavBar from '@/Components/Generic/BlurNavBar';
import EmptyListView from '@/Components/Generic/EmptyListView';
import NavigationList from '@/Components/User/NavigationList';
import TabLoader from '@/Components/User/TabLoader';
import { request_user_link_list } from '@/Redux/USER_REDUX/Actions/userLinkActions';
import { get_currency_string } from '@/Utils';
import Config from '@/react-native-config';
import { translate } from '@/translations';
import Clipboard from '@react-native-community/clipboard';
import dayjs from 'dayjs';
import React, { Component } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
const NAV_LIST_1 = get_user_internal_nav_list([10007]);
const monthModal = React.createRef() as any;
const mapDispatchToProps = {
  request_user_link_list: request_user_link_list,
};

const mapStateToProps = ({ params }) => {
  return {
    current_selected_month:
      params.user_activity_bonus_month || dayjs().format('YYYYMM'),
    loading: params.loading,
    user_link_list: params.user_link_list?.data || [],
    user_link_created_data: params.user_link_created_data || {},
    user_link_created: params.user_link_created || {},
  };
};

class ShareNEarnHistory extends Component<any> {
  state = {
    showMonthPicker: false,
  };

  componentDidMount() {
    this.props.request_user_link_list();
  }

  copy_url = link => {
    Clipboard.setString(link);
    Toast.successBottom(translate('copied'));
  };

  render_clicks = ({ item, index }) => {
    return (
      <View style={styles.tabCard} key={index + item.id.toString()}>
        <View style={styles.storeInfoCard}>
          <Image style={styles.logoImg} source={{ uri: item.store?.logo }} />
          <Text style={styles.storeName} numberOfLines={1}>
            {item.store?.name?.[Config.LANG]}
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
              {dayjs(item.created_at).format(Config.DATE_FORMAT)}
            </Text>
          </View>
          <Text
            style={[styles.bottomText, { marginTop: 3 }]}
            onPress={() =>
              this.copy_url(
                Config.SHARE_LINK_URL.replace(':code', item.code).replace(
                  ':locale',
                  Config.LANG,
                ),
              )
            }>
            <Icons.FontAwesome
              name={'copy'}
              color={Theme.COLORS.green_approved}
              size={12}
            />{' '}
            {Config.SHARE_LINK_URL.replace(':code', item.code).replace(
              ':locale',
              Config.LANG,
            )}
          </Text>
        </View>
        <View style={styles.storeInfoCard}>
          <Text style={styles.transDate}>
            {translate('clicks')} : {item.clicks}
          </Text>

          <Text style={[styles.transDate, { color: Theme.COLORS.secondary }]}>
            {item.referrer_earned
              ? get_currency_string(item.earnings)
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

  renderMonths = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
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
    return <View style={{ height: 80 }} />;
  };
  render() {
    const { user_link_list, loading } = this.props;
    const loader_arr = [1, 2, 3, 4];
    return (
      <Container>
        <Header>
          <Header.Left>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </Header.Left>
          <Header.Title>
            <Text style={styles.headerTitle}>
              {translate('share_n_earn_history')}
            </Text>
          </Header.Title>
          <Header.Right />
        </Header>
        <View style={styles.content}>
          <View>
            {!loading ? (
              <FlatList
                data={user_link_list}
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
            {!loading && !user_link_list?.length && <EmptyListView />}
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShareNEarnHistory);
