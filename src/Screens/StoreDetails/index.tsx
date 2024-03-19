import { get_constructed_cashback } from '@/Assets/AppDataConfig';
import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import BottomModal from '@/Components/Core/BottomModal';
import CashbackString from '@/Components/Core/CashbackString';
import CloseButton from '@/Components/Core/CloseButton';
import Container from '@/Components/Core/Container';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import SearchButton from '@/Components/Core/SearchButton';
import { Toast } from '@/Components/Core/Toast';
import CouponModal from '@/Components/Generic/CouponModal';
import DealCouponFilter from '@/Components/Generic/DealCouponFilter';
import EmptyListView from '@/Components/Generic/EmptyListView';
import StoreCouponCard from '@/Components/Generic/StoreCouponCard';
import {
  failed_filtered_coupons,
  request_filtered_coupons,
} from '@/Redux/Actions/publicDataActions';
import { get_fav_stores_ids, is_user_logged_in } from '@/Redux/Selectors';
import {
  request_user_add_fav,
  request_user_remove_fav,
} from '@/Redux/USER_REDUX/Actions/userFavsActions';
import { Config } from '@/react-native-config';
import { translate } from '@/translations';
import React, { Component } from 'react';
import {
  Animated,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux';
import styles from './style';

const termsModal = React.createRef() as any;

const mapDispatchToProps = {
  request_filtered_coupons,
  request_user_remove_fav,
  request_user_add_fav,
  failed_filtered_coupons,
};

const mapStateToProps = ({ params }) => {
  return {
    store_details: params.store_details || {},
    coupons: params.filtered_coupons_data?.coupons || [],
    coupon_count: params.filtered_coupons_data?.total || [],
    filtered_coupons_data: params.filtered_coupons_data || [],
    cb_rates: params.store_details?.store?.cashback || [],
    filter_page: params.filter_page,
    is_member: is_user_logged_in(params) || false,
    app_settings: params.app_settings || {},
    welcome_data_list: params.welcome_screen_data
      ? params.welcome_screen_data['procash/section']?.blocks
        ? params.welcome_screen_data['procash/section'].blocks
        : []
      : [],
    fav_store_ids: get_fav_stores_ids(params) || [],
  };
};

class StoreDetails extends Component<any> {
  state: any = {
    scrollY: new Animated.Value(0),
    modal_type: '',
    showTermsModal: false,
    showRatesModal: false,
    showFilterModal: false,
    cats: [],
    stores: [],
    sort_type: 'popular',
    offerModalShow: false,
    selectedCoupon: {},
    coupons: [],
    selectedTab: 'coupon',
    headerHeight: '',
    filter_show: false,
    isActive: false,
  };

  componentDidMount() {
    if (this.props.store_details.store?.id) {
      this.initial_filter_coupon_call();
    }
  }

  componentDidUpdate(prev, curr) {
    if (prev.store_details.store?.id !== this.props.store_details.store?.id) {
      this.initial_filter_coupon_call();
    }
  }

  initial_filter_coupon_call = () => {
    this.props.failed_filtered_coupons();
    this.props.request_filtered_coupons(
      [],
      [this.props.store_details.store?.id],
      'popular',
      1,
      null,
      null,
      'StoreDetails',
    );
  };

  get_cashback_type = cb => {
    var n = cb?.split(' ');
    return n ? n[n.length - 2] : null;
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.coupons !== prevState.coupons &&
      nextProps.filter_page === 'StoreDetails'
    ) {
      return {
        coupons: nextProps.coupons,
      };
    } else {
      return null;
    }
  }

  handle_cat_change = id => {
    if (this.state.cats.includes(id)) {
      let cats = [...this.state.cats];
      cats = cats.filter(e => e !== id);
      this.setState({ cats });
    } else {
      let cats = [...this.state.cats, id];
      this.setState({ cats });
    }
  };

  handle_store_change = id => {
    if (this.state.stores.includes(id)) {
      let stores = [...this.state.stores];
      stores = stores.filter(e => e !== id);
      this.setState({ stores });
    } else {
      let stores = [...this.state.stores, id];
      this.setState({ stores });
    }
  };

  apply_filter = (page_no = 1) => {
    this.setState({
      last_selected_cat: this.state.cats,
      last_selected_stores: this.state.stores,
    });
    let cats = [...this.state.cats];
    let stores = [this.props.store_details.store?.id];
    this.props.request_filtered_coupons(
      cats,
      stores,
      this.state.sort_type,
      page_no,
      null,
      null,
      'StoreDetails',
    );
    this.setState({ showFilterModal: false });
  };

  renderCouponList = ({ item, index }) => (
    <View style={index % 2 == 0 ? { marginRight: 2 } : { marginLeft: -5 }}>
      <StoreCouponCard
        offer={item}
        is_store_page={true}
        couponOnPress={() =>
          this.setState({ offerModalShow: true, selectedCoupon: item })
        }
      />
    </View>
  );

  update_list = () => {
    let page_no = this.props.filtered_coupons_data.current_page;
    page_no = page_no + 1;
    if (page_no <= this.props.filtered_coupons_data.total_pages) {
      this.apply_filter(page_no);
    }
  };

  store_detail_out_page = () => {
    const { store_details, is_member, navigation } = this.props;
    let navigation_options = {
      web_url: Config.APP_OUT_URL.replace(':type', 'store').replace(
        ':type_id',
        store_details.store?.id,
      ),

      cb_text: store_details?.store?.cashback_enabled
        ? store_details.store.cashback_string
        : '',
      header_title: store_details.store?.name ? store_details.store?.name : '',
      store_logo: store_details.store?.logo ? store_details.store?.logo : '',
      coupon_code: null,
    };
    if (is_member) {
      navigation.navigate('OutPage', { out_page_info: navigation_options });
    } else {
      navigation.navigate('Login', { out_page_info: navigation_options });
    }
  };

  fav_clicked = () => {
    if (this.props.is_member) {
      if (
        this.props.fav_store_ids.includes(this.props.store_details.store?.id)
      ) {
        this.props.request_user_remove_fav(
          'store',
          this.props.store_details.store?.id,
        );
      } else {
        this.props.request_user_add_fav(
          'store',
          this.props.store_details.store?.id,
        );
      }
    } else {
      Toast.showBottom(translate('please_login'));
    }
  };

  render_empty_coupon_list = () => {
    return <EmptyListView message={translate('no_data_found')} />;
  };
  onBackdropPress = () => {
    this.setState({ filter_show: false });
  };
  renderCashbackRate = ({ item, index }) => {
    return (
      <View
        style={[
          styles.cbRateCard,
          this.props.cb_rates.length - 1 == index
            ? { borderBottomWidth: 0 }
            : {},
        ]}
        key={index.toString()}>
        <View style={styles.offerTag}>
          <Text style={[styles.cb_text]}>
            {get_constructed_cashback(item.rate_type, item.cashback)}
          </Text>
        </View>
        <Text style={styles.cb_rate_title}>{item.title}</Text>
      </View>
    );
  };
  render() {
    const {
      store_details,
      cb_rates,
      app_settings,
      welcome_data_list,
      fav_store_ids,
      coupon_count,
    } = this.props;
    const { coupons, modal_type } = this.state;
    const is_fav = fav_store_ids.includes(store_details.store?.id);
    const hiw = store_details?.static_blocks?.store_hiw[0]?.attrs?.blocks
      ? store_details?.static_blocks?.store_hiw[0]?.attrs?.blocks
      : welcome_data_list;
    const terms = store_details?.static_blocks?.store_terms[0]?.attrs?.message
      ? store_details?.static_blocks?.store_terms[0]?.attrs?.message[
          Config.LANG
        ]
      : welcome_data_list;

    return (
      <Container style={styles.container}>
        <Header
          onLayout={event => {
            this.setState({ headerHeight: event.nativeEvent.layout });
          }}>
          <Header.Left>
            <HeaderBackButton
              // btnStyle={{width: '10%'}}
              onPress={() => this.props.navigation.goBack()}
            />
          </Header.Left>
          <Header.Title style={styles.headerTitleCard}>
            <TouchableOpacity
              style={styles.favBtn}
              onPress={() => this.fav_clicked()}>
              <Icons.FontAwesome
                name={is_fav ? 'heart' : 'heart-o'}
                size={15}
                color={Theme.COLORS.secondary}
              />
            </TouchableOpacity>
          </Header.Title>
          <Header.Right>
            <SearchButton navigation={this.props.navigation} />
          </Header.Right>
        </Header>
        <ScrollView>
          <View style={styles.StoreDetailsContainer}>
            <View>
              <View style={styles.storeDetailCard}>
                <View style={styles.st_logo_wrapper}>
                  <FastImage
                    source={{
                      uri: store_details.store?.logo
                        ? store_details.store?.logo
                        : Config.EMPTY_IMAGE_URL,
                    }}
                    style={styles.st_logo}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View>
                  <Text style={styles.storeTitle}>
                    {store_details.store?.name}
                  </Text>
                  {store_details.store?.cashback_enabled ? (
                    <CashbackString
                      icon={{ marginTop: 5 }}
                      cb_style={styles.cb_style}
                      cb_text={styles.cbText}
                      cashback_string={store_details.store?.cashback_string}
                    />
                  ) : null}
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={[styles.hiwCard]}
                  onPress={() =>
                    this.setState({ showTermsModal: true, modal_type: 'hiw' })
                  }>
                  <Icons.MaterialCommunityIcons
                    name={'message-question'}
                    size={15}
                    color={Theme.COLORS.black}
                  />
                  <View>
                    <Text style={styles.hiwText}>
                      {translate('how_it_works')}
                    </Text>
                    <View style={styles.dashBorderContainer}>
                      <View style={styles.dashBorderView} />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.hiwCard}
                  onPress={() =>
                    this.setState({ showTermsModal: true, modal_type: 'terms' })
                  }>
                  <Icons.Ionicons
                    name={'ios-document-text'}
                    size={15}
                    color={Theme.COLORS.black}
                  />
                  <View>
                    <Text style={styles.hiwText}>
                      {translate('terms_n_condition')}
                    </Text>
                    <View style={styles.dashBorderContainer}>
                      <View style={styles.dashBorderView} />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.shopNowBtn}
                onPress={() => this.store_detail_out_page()}>
                <Text style={styles.shopNowText}>{translate('shop_now')}</Text>
              </TouchableOpacity>
            </View>
            <View>
              {store_details.store?.cashback_string ? (
                <View style={styles.cashbackRateContainer}>
                  <Text style={styles.CbRateText}>
                    {this.get_cashback_type(
                      store_details.store?.cashback_string,
                    )}
                  </Text>
                  <Text style={styles.cashback}>cashback</Text>
                </View>
              ) : null}
              {coupon_count > 0 ? (
                <View
                  style={[
                    styles.cashbackRateContainer,
                    { backgroundColor: Theme.COLORS.gradient_card_bg },
                  ]}>
                  <Text
                    style={[styles.CbRateText, { color: Theme.COLORS.black }]}>
                    {coupon_count}
                  </Text>
                  <Text
                    style={[styles.cashback, { color: Theme.COLORS.black }]}>
                    {translate('coupons')}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          {store_details.store?.cashback_enabled ? (
            <View style={styles.cashbackInfo}>
              <View style={styles.trackedCard}>
                <View style={styles.iconCard}>
                  <Icons.MaterialCommunityIcons
                    name={'clock-check-outline'}
                    color={Theme.COLORS.black}
                    size={20}
                  />
                </View>
                <View>
                  <Text style={styles.track_title}>
                    {translate('tracked_within')}
                  </Text>
                  <Text style={styles.track_label}>
                    {store_details.store.tracking_speed
                      ? store_details.store.tracking_speed
                      : app_settings.store.tracking_speed[Config.LANG]}
                  </Text>
                </View>
              </View>
              <View style={styles.trackedCard}>
                <View style={styles.iconCard}>
                  <Icons.AntDesign
                    name={'calendar'}
                    color={Theme.COLORS.black}
                    size={20}
                  />
                </View>
                <View>
                  <Text style={styles.track_title}>
                    {translate('paid_within')}
                  </Text>
                  <Text style={styles.track_label}>
                    {store_details.store.confirm_days
                      ? store_details.store.confirm_days
                      : app_settings.store.confirm_duration}
                  </Text>
                </View>
              </View>
              <View style={styles.trackedCard}>
                <View style={styles.iconCard}>
                  <Icons.MaterialCommunityIcons
                    name={'ticket-percent-outline'}
                    size={20}
                    color={Theme.COLORS.black}
                  />
                </View>
                <View>
                  <Text style={styles.track_title}>
                    {translate('missing_cashback')}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={[styles.track_label, { marginRight: 5 }]}>
                      {store_details?.store?.is_claimable
                        ? translate('allowed')
                        : translate('not_allowed')}
                    </Text>
                    {store_details?.store?.is_claimable ? (
                      <Icons.FontAwesome
                        name={'check-circle'}
                        size={16}
                        color={Theme.COLORS.green_approved}
                      />
                    ) : (
                      <Icons.Entypo
                        name={'circle-with-cross'}
                        size={16}
                        color={Theme.COLORS.error}
                      />
                    )}
                  </View>
                </View>
              </View>
            </View>
          ) : null}

          {cb_rates.length > 0 ? (
            <View style={{ marginTop: 5 }}>
              <Text
                style={[styles.sectionTitle, { marginBottom: 10, width: 130 }]}>
                {translate('cashback_rates')}
              </Text>
              <FlatList
                style={{ flexGrow: 0 }}
                keyExtractor={(item, index) => index.toString()}
                data={cb_rates?.slice(0, 2)}
                showsVerticalScrollIndicator={false}
                renderItem={this.renderCashbackRate}
              />
              {store_details.store?.cashback?.length > 2 &&
              !this.state.isActive ? (
                <TouchableOpacity
                  style={styles.loadMoreBtn}
                  onPress={() => {
                    this.setState({ isActive: true });
                  }}>
                  <Text style={styles.loadMoreText}>
                    {translate('show_more')}
                  </Text>
                  <Icons.FontAwesome5
                    name={'chevron-down'}
                    size={15}
                    style={{ marginTop: 2, marginLeft: 5 }}
                    color="white"
                  />
                </TouchableOpacity>
              ) : null}
              <Collapsible collapsed={!this.state.isActive} duration={250}>
                <FlatList
                  style={{ flexGrow: 0 }}
                  keyExtractor={(item, index) => index.toString()}
                  data={cb_rates?.slice(3, cb_rates?.length)}
                  showsVerticalScrollIndicator={false}
                  renderItem={this.renderCashbackRate}
                />
                {this.state.isActive ? (
                  <TouchableOpacity
                    style={styles.loadMoreBtn}
                    onPress={() => {
                      this.setState({ isActive: false });
                    }}>
                    <Text style={styles.loadMoreText}>
                      {translate('show_less')}
                    </Text>
                    <Icons.FontAwesome5
                      name={'chevron-up'}
                      size={15}
                      style={{ marginTop: 2, marginLeft: 5 }}
                      color="white"
                    />
                  </TouchableOpacity>
                ) : null}
              </Collapsible>
            </View>
          ) : null}
          <View>
            <View style={styles.couponFilter}>
              <Text style={styles.sectionTitle}>{translate('coupons')}</Text>
              {store_details?.filter?.count ? (
                <TouchableOpacity
                  style={styles.filterCard}
                  onPress={() => {
                    this.setState({
                      showFilterModal: !this.state.showFilterModal,
                    });
                  }}>
                  <Icons.AntDesign
                    name={'filter'}
                    size={20}
                    color={Theme.COLORS.black}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            {this.state?.coupons?.length ? (
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={coupons}
                style={styles.list}
                columnWrapperStyle={styles.row}
                numColumns={2}
                extraData={this.state}
                renderItem={this.renderCouponList}
                ListEmptyComponent={() => this.render_empty_coupon_list()}
                onEndReached={() => {
                  this.update_list();
                }}
              />
            ) : (
              this.render_empty_coupon_list()
            )}
          </View>
        </ScrollView>
        <BottomModal
          ref={termsModal}
          bottomModalShow={this.state.showTermsModal}
          style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}
          setBottomModalVisibleFalse={() =>
            this.setState({ showTermsModal: false })
          }>
          <>
            {/* <View style={styles.hiw_modal_content}> */}

            {modal_type === 'hiw' ? (
              <>
                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      fontSize: 24,
                      paddingTop: 0,
                      marginTop: 10,
                      textAlign: 'left',
                    },
                  ]}>
                  {translate('how_it_works')}
                </Text>
                {hiw
                  ? hiw.map((e, index) => {
                      return (
                        <View style={styles.hiw_row} key={index}>
                          <Text style={styles.hiw_num}>{index + 1}</Text>
                          <View>
                            <Text style={styles.hiw_title}>
                              {e.title[Config.LANG]}
                            </Text>
                            <Text style={styles.hiw_desc}>
                              {e.content[Config.LANG]}
                            </Text>
                          </View>
                        </View>
                      );
                    })
                  : this.render_empty_coupon_list()}
              </>
            ) : (
              <>
                <Text
                  style={[
                    styles.sectionTitle,
                    { fontSize: 24, paddingTop: 0, marginTop: 10 },
                  ]}>
                  {translate('terms_n_condition')}
                </Text>
                {/* <ScrollView> */}
                <HTMLView
                  style={styles.terms_content}
                  value={terms}
                  stylesheet={StyleSheet.create({
                    ...Theme.fontStyles.html_view_txtStyles,
                  })}
                />
                {/* </ScrollView> */}
              </>
            )}
            {/* </View> */}
            <View style={styles.btnBar}>
              <CloseButton
                onPress={() => termsModal.current.props.onRequestClose()}
              />
            </View>
          </>
        </BottomModal>
        <CouponModal
          setCouponModalVisibleFalse={() =>
            this.setState({ offerModalShow: false })
          }
          setCouponModalVisibleTrue={() =>
            this.setState({ offerModalShow: true })
          }
          offerModalShow={this.state.offerModalShow}
          navigation={this.props.navigation}
          coupon={this.state.selectedCoupon}
        />
        <DealCouponFilter
          is_store_page={true}
          filter_data={store_details.filter}
          filterModalVisible={this.state.showFilterModal}
          sort_type={this.state.sort_type}
          handle_sort_type_change={value => this.setState({ sort_type: value })}
          selected_ids={{
            cats: this.state.cats,
            stores: this.state.stores,
          }}
          handle_cat_change={id => this.handle_cat_change(id)}
          handle_store_change={id => this.handle_store_change(id)}
          setFilterModalVisibleFalse={() =>
            this.setState({ showFilterModal: false })
          }
          resetFilter={() => {
            this.setState({
              stores: [],
              cats: [],
              sort_type: 'popular',
            });
          }}
          getSelectedFilterIds={() => this.apply_filter()}
        />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreDetails);
