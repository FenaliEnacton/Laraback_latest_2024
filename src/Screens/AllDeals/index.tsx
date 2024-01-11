import React, { Component } from 'react';
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

class AllDeals extends Component<any> {
  state = {
    cats: this.props.route?.params?.cats || [],
    stores: this.props.route?.params?.stores || [],
    title: this.props.route?.params?.title || '',
    showFilterModal: false,
    sort_type: 'popular',
    dealModalShow: false,
    min_price: 0,
    max_price: 0,
    page_no: 1,
  };

  componentDidMount() {
    this.props.request_deals_filter_info(this.state.cats, this.state.stores);
    this.props.request_filtered_deals(this.state.cats, this.state.stores);
  }

  render_deals = ({ item, index }) => {
    return (
      <DealCard
        deal={item}
        bg_color={Theme.get_bg_color(index, 4)}
        deal_onPress={() => {
          this.props.request_deal_info(item.id);
          this.setState({ dealModalShow: true });
        }}
      />
    );
  };

  update_list = () => {
    let page_no = this.props.filtered_deals_data.current_page;
    page_no = page_no + 1;
    if (page_no <= this.props.filtered_deals_data.total_pages) {
      this.apply_filter(page_no);
    }
  };

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
    let stores = [...this.state.stores];
    this.props.request_filtered_deals(
      cats,
      stores,
      this.state.sort_type,
      page_no,
      30,
      this.state.min_price,
      this.state.max_price,
    );
    this.setState({ showFilterModal: false });
  };

  render() {
    const filter_icon_opacity = 1;
    const { filtered_deals_data, deals_filter_info } = this.props;
    return (
      <Container>
        <Header>
          <Header.Left>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </Header.Left>
          <Header.Title style={{ width: '70%', height: 42 }}>
            <Text style={[styles.headerTitle, {}]}>
              {this.state.title
                ? translate('deals_from') + this.state.title
                : translate('daily_deals')}
            </Text>
          </Header.Title>
          <Header.Right>
            <SearchButton navigation={this.props.navigation} />
          </Header.Right>
        </Header>
        <View style={styles.content}>
          {!filtered_deals_data.deals?.length && this.props.loading ? (
            <ListLoader />
          ) : null}
          {!this.props.loading && !filtered_deals_data?.deals?.length ? (
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
            extraData={this.props}
            renderItem={this.render_deals}
            onEndReached={() => {
              this.update_list();
            }}
          />
          {deals_filter_info.count ? (
            <FilterButton
              opacity={filter_icon_opacity}
              filter_applied={
                this.state.cats.length > 0 || this.state.stores.length > 0
              }
              onPress={() => this.setState({ showFilterModal: true })}
            />
          ) : null}
        </View>
        <DealModal
          setDealModalVisibleFalse={() =>
            this.setState({ dealModalShow: false })
          }
          setDealModalVisibleTrue={() => this.setState({ dealModalShow: true })}
          dealModalShow={this.state.dealModalShow}
          navigation={this.props.navigation}
        />
        <DealCouponFilter
          filter_data={deals_filter_info}
          filterModalVisible={this.state.showFilterModal}
          sort_type={this.state.sort_type}
          min_price={this.state.min_price}
          max_price={this.state.max_price}
          onPriceValueChanged={(low, high) =>
            this.setState({ min_price: low, max_price: high })
          }
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
              min_price: null,
              max_price: null,
              cats: [],
              stores: [],
              sort_type: 'popular',
              title: '',
            });
            this.props.request_deals_filter_info([], []);
          }}
          getSelectedFilterIds={() => this.apply_filter()}
        />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllDeals);
