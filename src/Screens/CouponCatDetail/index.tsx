import { Component } from 'react';
import { Animated, FlatList, Text, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import Container from '@/Components/Core/Container';
import { request_filtered_coupons } from '@/Redux/Actions/publicDataActions';
import StoreCouponCard from '@/Components/Generic/StoreCouponCard';
import EmptyListView from '@/Components/Generic/EmptyListView';
import { translate } from '@/translations';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import SearchButton from '@/Components/Core/SearchButton';
import ListLoader from '../AllDeals/ListLoader';
import FilterButton from '@/Components/Core/FilterButton';
import DealCouponFilter from '@/Components/Generic/DealCouponFilter';
import CouponModal from '@/Components/Generic/CouponModal';

// const HEADER_EXPANDED_HEIGHT = 160;
// const HEADER_COLLAPSED_HEIGHT = 70;

const mapDispatchToProps = {
  request_filtered_coupons: request_filtered_coupons,
};

const mapStateToProps = ({ params }) => {
  return {
    coupon_cat_details: params.coupon_cat_details || {},
    coupons: params.filtered_coupons_data?.coupons || [],
    filtered_coupons_data: params.filtered_coupons_data || [],
    filter_page: params.filter_page,
    loading: params.loading,
  };
};

class CouponCatDetails extends Component<any> {
  state: any = {
    scrollY: new Animated.Value(0),
    showFilterModal: false,
    cats: [],
    stores: [],
    sort_type: 'popular',
    offerModalShow: false,
    selectedCoupon: {},
    coupons: [],
  };

  componentDidMount() {
    this.props.request_filtered_coupons(
      [this.props.coupon_cat_details?.category?.id],
      [],
      'popular',
      1,
      null,
      null,
      'CouponCatDetails',
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.coupons !== prevState.coupons &&
      nextProps.filter_page === 'CouponCatDetails'
    ) {
      return {
        coupons: nextProps.coupons,
      };
    } else {
      return null;
    }
  }

  renderCouponList = ({ item }) => (
    <StoreCouponCard
      offer={item}
      couponOnPress={() =>
        this.setState({ offerModalShow: true, selectedCoupon: item })
      }
    />
  );

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
    let cats = [
      ...this.state.cats,
      this.props.coupon_cat_details?.category?.id,
    ];
    let stores = [...this.state.stores];
    this.props.request_filtered_coupons(
      cats,
      stores,
      this.state.sort_type,
      page_no,
      null,
      null,
      'CouponCatDetails',
    );
    this.setState({ showFilterModal: false });
  };

  update_list = () => {
    let page_no = this.props.filtered_coupons_data.current_page;
    page_no = page_no + 1;
    if (page_no <= this.props.filtered_coupons_data.total_pages) {
      this.apply_filter(page_no);
    }
  };

  render_empty_coupon_list = () => {
    return <EmptyListView message={translate('no_coupons_found')} />;
  };

  render() {
    const { coupon_cat_details } = this.props;
    const { coupons } = this.state;

    // const headerHeight = this.state.scrollY.interpolate({
    //   inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    //   outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
    //   extrapolate: 'clamp',
    // });

    // const paddingTop = this.state.scrollY.interpolate({
    //   inputRange: [HEADER_COLLAPSED_HEIGHT, HEADER_EXPANDED_HEIGHT],
    //   outputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT + 100],
    //   extrapolate: 'clamp',
    // });

    // const heroTitleOpacity = this.state.scrollY.interpolate({
    //   inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    //   outputRange: [1, 0],
    //   extrapolate: 'clamp',
    // });

    const filter_icon_opacity = 1;
    return (
      <Container>
        <Header>
          <Header.Left>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </Header.Left>
          <Header.Title>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {coupon_cat_details.category?.name}
            </Text>
          </Header.Title>
          <Header.Right>
            <SearchButton navigation={this.props.navigation} />
          </Header.Right>
        </Header>
        {/* <Animated.View
          style={[
            styles.animated_header,
            {
              height: headerHeight,
              width: SCREEN_WIDTH,
            },
          ]}>
          <View style={styles.top_header}>
            <HeaderBackButton
              btnStyle={{width: '10%'}}
              onPress={() => this.props.navigation.goBack()}
            />
            <Text style={styles.headerTitle}>
              {coupon_cat_details.category?.name}
            </Text>
            <HeaderRight>
              <SearchButton navigation={this.props.navigation} />
            </HeaderRight>
          </View>
          <Animated.View
            style={[
              styles.st_details_card,
              {
                opacity: heroTitleOpacity,
              },
            ]}>
            <View style={styles.header_image}>
              <Text style={styles.header_store_text}></Text>
            </View>
          </Animated.View>

          {/* </Header> 
        </Animated.View> */}
        <View style={[styles.content]}>
          {!coupons?.length && this.props.loading ? <ListLoader /> : null}
          <FlatList
            // onScroll={Animated.event([
            //   {
            //     nativeEvent: {
            //       contentOffset: {
            //         y: this.state.scrollY,
            //       },
            //     },
            //   },
            // ])}
            data={coupons}
            extraData={this.state}
            style={styles.list}
            ListEmptyComponent={() => this.render_empty_coupon_list()}
            columnWrapperStyle={styles.row}
            numColumns={2}
            renderItem={this.renderCouponList}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => {
              this.update_list();
            }}
          />
          {coupon_cat_details?.filter?.count ? (
            <FilterButton
              opacity={filter_icon_opacity}
              filter_applied={
                this.state.cats.length > 0 || this.state.stores.length > 0
              }
              onPress={() => this.setState({ showFilterModal: true })}
            />
          ) : null}
        </View>
        <DealCouponFilter
          filter_data={coupon_cat_details.filter}
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
              cats: [],
              stores: [],
              sort_type: 'popular',
            });
          }}
          getSelectedFilterIds={() => this.apply_filter()}
        />
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
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CouponCatDetails);
