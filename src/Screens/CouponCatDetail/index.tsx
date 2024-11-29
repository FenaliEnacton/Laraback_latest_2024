import Container from '@/Components/Core/Container';
import FilterButton from '@/Components/Core/FilterButton';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import SearchButton from '@/Components/Core/SearchButton';
import CouponModal from '@/Components/Generic/CouponModal';
import DealCouponFilter from '@/Components/Generic/DealCouponFilter';
import EmptyListView from '@/Components/Generic/EmptyListView';
import StoreCouponCard from '@/Components/Generic/StoreCouponCard';
import { request_filtered_coupons } from '@/Redux/Actions/publicDataActions';
import { translate } from '@/translations';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { connect } from 'react-redux';
import ListLoader from '../AllDeals/ListLoader';
import styles from './style';

const mapDispatchToProps = {
  request_filtered_coupons,
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

const CouponCatDetails = props => {
  const {
    coupon_cat_details,
    coupons,
    filter_page,
    filtered_coupons_data,
    loading,
    request_filtered_coupons,
    navigation,
  } = props;

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [cats, setCats] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [sortType, setSortType] = useState('popular');
  const [offerModalShow, setOfferModalShow] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState({});
  const [localCoupons, setLocalCoupons] = useState([]);

  useEffect(() => {
    request_filtered_coupons(
      [coupon_cat_details?.category?.id],
      [],
      'popular',
      1,
      null,
      null,
      'CouponCatDetails',
    );
  }, [coupon_cat_details, request_filtered_coupons]);

  useEffect(() => {
    if (coupons !== localCoupons && filter_page === 'CouponCatDetails') {
      setLocalCoupons(coupons);
    }
  }, [coupons, filter_page, localCoupons]);

  const renderCouponList = ({ item }) => (
    <StoreCouponCard
      offer={item}
      couponOnPress={() => {
        setOfferModalShow(true);
        setSelectedCoupon(item);
      }}
    />
  );

  const handleCatChange = (id: any) => {
    if (cats.includes(id)) {
      setCats(cats.filter(e => e !== id));
    } else {
      setCats([...cats, id]);
    }
  };

  const handleStoreChange = (id: any) => {
    if (stores.includes(id)) {
      setStores(stores.filter(e => e !== id));
    } else {
      setStores([...stores, id]);
    }
  };

  const applyFilter = (pageNo = 1) => {
    const selectedCats = [...cats, coupon_cat_details?.category?.id];
    request_filtered_coupons(
      selectedCats,
      stores,
      sortType,
      pageNo,
      null,
      null,
      'CouponCatDetails',
    );
    setShowFilterModal(false);
  };

  const updateList = () => {
    let pageNo = filtered_coupons_data.current_page + 1;
    if (pageNo <= filtered_coupons_data.total_pages) {
      applyFilter(pageNo);
    }
  };

  const renderEmptyCouponList = () => (
    <EmptyListView message={translate('no_coupons_found')} />
  );

  const filterIconOpacity = 1;

  return (
    <Container>
      <Header>
        <Header.Left>
          <HeaderBackButton onPress={() => navigation.goBack()} />
        </Header.Left>
        <Header.Title>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {coupon_cat_details?.category?.name}
          </Text>
        </Header.Title>
        <Header.Right>
          <SearchButton navigation={navigation} />
        </Header.Right>
      </Header>

      <View style={styles.content}>
        {!localCoupons.length && loading ? <ListLoader /> : null}
        <FlatList
          data={localCoupons}
          extraData={localCoupons}
          style={styles.list}
          ListEmptyComponent={renderEmptyCouponList}
          columnWrapperStyle={styles.row}
          numColumns={2}
          renderItem={renderCouponList}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={updateList}
        />
        {coupon_cat_details?.filter?.count ? (
          <FilterButton
            opacity={filterIconOpacity}
            filter_applied={cats.length > 0 || stores.length > 0}
            onPress={() => setShowFilterModal(true)}
          />
        ) : null}
      </View>
      <DealCouponFilter
        filter_data={coupon_cat_details.filter}
        filterModalVisible={showFilterModal}
        sort_type={sortType}
        handle_sort_type_change={setSortType}
        selected_ids={{ cats, stores }}
        handle_cat_change={handleCatChange}
        handle_store_change={handleStoreChange}
        setFilterModalVisibleFalse={() => setShowFilterModal(false)}
        resetFilter={() => {
          setCats([]);
          setStores([]);
          setSortType('popular');
        }}
        getSelectedFilterIds={applyFilter}
      />
      <CouponModal
        setCouponModalVisibleFalse={() => setOfferModalShow(false)}
        setCouponModalVisibleTrue={() => setOfferModalShow(true)}
        offerModalShow={offerModalShow}
        navigation={navigation}
        coupon={selectedCoupon}
      />
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CouponCatDetails);
