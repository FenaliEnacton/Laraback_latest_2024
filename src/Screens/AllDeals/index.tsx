import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ListLoader from './ListLoader';
import styles from './style';
import {
  request_deal_info,
  request_deals_filter_info,
  request_filtered_deals,
} from '@/Redux/Actions/publicDataActions';
import DealCard from '@/Components/Generic/DealCard';
import { Theme } from '@/Assets/Theme';
import Container from '@/Components/Core/Container';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import { translate } from '@/translations';
import SearchButton from '@/Components/Core/SearchButton';
import EmptyListView from '@/Components/Generic/EmptyListView';
import FilterButton from '@/Components/Core/FilterButton';
import DealModal from '@/Components/Generic/DealModal';
import DealCouponFilter from '@/Components/Generic/DealCouponFilter';

const mapDispatchToProps = {
  request_filtered_deals,
  request_deals_filter_info,
  request_deal_info,
};

const mapStateToProps = ({ params }) => {
  return {
    filtered_deals_data: params.filtered_deals_data || {},
    deals_filter_info: params.deals_filter_info || {},
    loading: params.loading,
  };
};

const AllDeals = props => {
  const [cats, setCats] = useState<any>(props.route?.params?.cats || []);
  const [stores, setStores] = useState<any>(props.route?.params?.stores || []);
  const [title, setTitle] = useState<any>(props.route?.params?.title || '');
  const [showFilterModal, setShowFilterModal] = useState<any>(false);
  const [sort_type, setSortType] = useState<any>('popular');
  const [dealModalShow, setDealModalShow] = useState<any>(false);
  const [min_price, setMinPrice] = useState<any>(0);
  const [max_price, setMaxPrice] = useState<any>(0);

  useEffect(() => {
    props.request_deals_filter_info(cats, stores);
    props.request_filtered_deals(cats, stores);
  }, []);

  const render_deals = ({ item, index }) => {
    return (
      <DealCard
        deal={item}
        bg_color={Theme.get_bg_color(index, 4)}
        deal_onPress={() => {
          props.request_deal_info(item.id);
          setDealModalShow(true);
        }}
      />
    );
  };

  const update_list = () => {
    let page_no = props.filtered_deals_data.current_page;
    page_no = page_no + 1;
    if (page_no <= props.filtered_deals_data.total_pages) {
      apply_filter(page_no);
    }
  };

  const handle_cat_change = id => {
    if (cats.includes(id)) {
      let _cats = [...cats];
      _cats = _cats.filter(e => e !== id);
      setCats(cats);
    } else {
      let _cats = [...cats, id];
      setCats(_cats);
    }
  };

  const handle_store_change = id => {
    if (stores.includes(id)) {
      let _stores = [...stores];
      _stores = _stores.filter(e => e !== id);
      setStores(_stores);
    } else {
      let _stores = [...stores, id];
      setStores(_stores);
    }
  };

  const apply_filter = (page_no = 1) => {
    // setLast_selected_cat(cats);
    // setLast_selected_stores(stores);

    props.request_filtered_deals(
      cats,
      stores,
      sort_type,
      page_no,
      30,
      min_price,
      max_price,
    );
    setShowFilterModal(false);
  };

  const filter_icon_opacity = 1;
  const { filtered_deals_data, deals_filter_info } = props;
  return (
    <Container>
      <Header>
        <Header.Left>
          <HeaderBackButton onPress={() => props.navigation.goBack()} />
        </Header.Left>
        <Header.Title style={{ width: '70%', height: 42 }}>
          <Text style={[styles.headerTitle, {}]}>
            {title ? translate('deals_from') + title : translate('daily_deals')}
          </Text>
        </Header.Title>
        <Header.Right>
          <SearchButton navigation={props.navigation} />
        </Header.Right>
      </Header>
      <View style={styles.content}>
        {!filtered_deals_data.deals?.length && props.loading ? (
          <ListLoader />
        ) : null}
        {!props.loading && !filtered_deals_data?.deals?.length ? (
          <EmptyListView message={translate('no_deals_found')} />
        ) : null}
        {/* <Text style={styles.top_text}>{translate('deals from')}</Text> */}
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={filtered_deals_data.deals}
          columnWrapperStyle={styles.row}
          style={styles.list}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          extraData={props}
          renderItem={render_deals}
          onEndReached={() => {
            update_list();
          }}
        />
        {deals_filter_info.count ? (
          <FilterButton
            opacity={filter_icon_opacity}
            filter_applied={cats.length > 0 || stores.length > 0}
            onPress={() => setShowFilterModal(true)}
          />
        ) : null}
      </View>
      <DealModal
        setDealModalVisibleFalse={() => setDealModalShow(false)}
        setDealModalVisibleTrue={() => setDealModalShow(true)}
        dealModalShow={dealModalShow}
        navigation={props.navigation}
      />
      <DealCouponFilter
        filter_data={deals_filter_info}
        filterModalVisible={showFilterModal}
        sort_type={sort_type}
        min_price={min_price}
        max_price={max_price}
        onPriceValueChanged={(low, high) => {
          setMinPrice(low);
          setMaxPrice(high);
        }}
        handle_sort_type_change={value => setSortType(value)}
        selected_ids={{
          cats: cats,
          stores: stores,
        }}
        handle_cat_change={id => handle_cat_change(id)}
        handle_store_change={id => handle_store_change(id)}
        setFilterModalVisibleFalse={() => {
          setShowFilterModal(false);
        }}
        resetFilter={() => {
          setMaxPrice(null);
          setMinPrice(null);
          setCats([]);
          setStores([]);
          setSortType('popular');
          setTitle('');
          props.request_deals_filter_info([], []);
        }}
        getSelectedFilterIds={() => apply_filter()}
      />
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDeals);
