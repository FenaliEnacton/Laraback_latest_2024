import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Header,
  HeaderLeft,
  ScrollContent,
  HeaderBackButton,
  LangSupportTxtInput,
  Loader,
} from '@components/core';
import {
  TopStoreCard,
  TopCouponCard,
  ChildCatCard,
  CouponModal,
  CatCard,
  DealCard,
  DealModal,
  EmptyStoreCard,
} from '@components/generic';
import Icon from '@assets/icons';
import {Theme} from '@assets/Theme';
import Config from 'react-native-config';
import {translate} from '@translations';
import {request_coupon_cat_info, request_deal_info} from '@app_redux/Actions';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mapDispatchToProps = {
  request_coupon_cat_info,
  request_deal_info,
};

const mapStateToProps = state => {
  return {};
};

class Search extends Component {
  state = {
    showClose: false,
    search_txt: '',
    searchRecords: {},
    offerModalShow: false,
    selectedCoupon: {},
    dealModalShow: false,
    noResult: false,
    search_history: [],
  };

  edit_search = text => {
    this.setState({search_txt: text, showClose: true});
  };

  renderStores = ({item, index}) => {
    return (
      <TopStoreCard
        store={item}
        navigation={this.props.navigation}
        bg_color={Theme.get_bg_color(index, 2)}
      />
    );
  };

  renderCategories = ({item, index}) => {
    return (
      <CatCard
        cat={item}
        index={index}
        bg_color={Theme.get_bg_color(index, 2)}
        data_type={'coupon'}
        navigation={this.props.navigation}
      />
    );
  };

  render_empty_stores = ({item, index}) => {
    return <EmptyStoreCard />;
  };

  render_deals = ({item, index}) => {
    return (
      <DealCard
        deal={item}
        bg_color={Theme.get_bg_color(index, 8)}
        style={{marginRight: 10}}
        deal_onPress={() => {
          this.props.request_deal_info(item.id);
          this.setState({dealModalShow: true});
        }}
      />
    );
  };

  render_store_cat = ({item, index}) => {
    return (
      <ChildCatCard
        index={index}
        cat={item}
        data_type={'store'}
        navigation={this.props.navigation}
      />
    );
  };
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.search_input.focus();
      this.get_search_history();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.search_history != this.state.search_history) {
      AsyncStorage.setItem(
        'search_result',
        JSON.stringify(this.state.search_history),
      );
    }
  };

  removeSearchTextFromHistory = text => {
    this.setState({
      search_history: this.state.search_history.filter(a => a !== text),
    });
  };

  get_search_history = () => {
    AsyncStorage.getItem('search_result')
      .then(result => {
        this.setState({search_history: JSON.parse(result)});
      })
      .catch(e => console.log(e));
  };
  search_result = text => {
    let search_string = text ? text : this.state.search_txt;
    if (search_string.length > 0) {
      this.setState({showClose: true, search_loading: true});
      AsyncStorage.getItem('search_result')
        .then(result => {
          JSON.parse(result);
          if (result != null) {
            AsyncStorage.setItem(
              'search_result',
              JSON.stringify([...JSON.parse(result), search_string]),
            );
          } else {
            AsyncStorage.setItem(
              'search_result',
              JSON.stringify([search_string]),
            );
          }
        })
        .catch(e => console.log(e));
      if (search_string.length > 1) {
        fetch(
          Config.API_URL +
            Config.PUBLIC_PREFIX +
            '/app/search?keyword=' +
            search_string,
          {method: 'GET'},
        )
          .then(res => res.json())
          .then(response => {
            console.log(
              response,
              Config.API_URL +
                Config.PUBLIC_PREFIX +
                '/app/search?keyword=' +
                search_string,
            );
            if (response.success) {
              let searchRecords = response.data ? response.data : {};
              let routes = [];
              this.setState({searchRecords});

              if (
                !searchRecords.stores &&
                !searchRecords.coupons &&
                !searchRecords.coupon_categories &&
                !searchRecords.store_categories &&
                !searchRecords.deals &&
                search_string.length > 0
              ) {
                this.setState({
                  noResult: true,
                  searchRecords: {},
                  search_loading: false,
                  routes,
                });
              } else {
                this.setState({
                  showSuggestion: true,
                  noResult: false,
                  search_loading: false,
                  routes,
                });
              }
            }
          });
      } else {
        this.setState({
          showSuggestion: false,
          search_loading: false,
          noResult: false,
        });
      }
    } else {
      this.setState({
        showClose: false,
        searchTxt: '',
        searchRecords: {},
        noResult: false,
        showSuggestion: false,
        search_loading: false,
      });
    }
  };

  render() {
    const {showClose, search_txt, searchRecords} = this.state;
    return (
      <Container>
        <Header>
          <HeaderLeft style={{width: '90%'}}>
            <HeaderBackButton
              // btnStyle={styles.btnStyle}
              onPress={() => this.props.navigation.goBack()}
            />
            <View style={styles.searchBar}>
              <LangSupportTxtInput
                autoFocus={true}
                ref={input => {
                  this.search_input = input;
                }}
                underlineColorAndroid={'transparent'}
                style={styles.searchTxtInput}
                autoCapitalize={'none'}
                onChangeText={text => this.edit_search(text)}
                returnKeyType="search"
                onSubmitEditing={() => {
                  this.search_result();
                }}
                placeholder={translate('search_cat_store')}
                value={search_txt}
              />
              {showClose ? (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      searchData: [],
                      showClose: false,
                      search_txt: '',
                      searchRecords: {},
                    })
                  }>
                  <Icon.AntDesign
                    name="close"
                    color={Theme.COLORS.black}
                    size={20}
                  />
                </TouchableOpacity>
              ) : (
                <Icon.Entypo
                  name="magnifying-glass"
                  color={Theme.COLORS.subText}
                  size={20}
                />
              )}
            </View>
          </HeaderLeft>
        </Header>
        <ScrollContent style={styles.content}>
          {this.state.search_history?.length > 0 ? (
            <View style={styles.recentSearchWrapper}>
              <Text style={styles.recentSearchText}>
                {translate('recent_search')}
              </Text>
              <FlatList
                data={this.state.search_history}
                renderItem={({item}) => {
                  return (
                    <View style={styles.recentSearchResultWrapper}>
                      <TouchableOpacity
                        style={{width: '80%'}}
                        onPress={() => {
                          this.setState({search_txt: item});
                          this.search_result(item);
                        }}>
                        <Text
                          numberOfLines={1}
                          style={styles.recentSearchResultText}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          this.removeSearchTextFromHistory(item);
                        }}>
                        <Icon.AntDesign
                          name="close"
                          color="#808089"
                          size={20}
                          style={{textAlign: 'center'}}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          ) : null}
          {searchRecords.stores && searchRecords.stores.length > 0 ? (
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>{`${translate(
                'stores',
              )} ${translate('with')} "${this.state.search_txt}"`}</Text>
            </View>
          ) : null}
          {searchRecords.stores && searchRecords.stores.length > 0 ? (
            <FlatList
              horizontal={true}
              extraData={this.state}
              style={styles.store_list}
              showsHorizontalScrollIndicator={false}
              data={searchRecords.stores ? searchRecords.stores : []}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderStores}
            />
          ) : null}
          {searchRecords.coupons && searchRecords.coupons.length > 0 ? (
            <View style={[styles.listHeader]}>
              <Text style={styles.listTitle}>{`${translate(
                'offers',
              )} ${translate('with')} "${this.state.search_txt}"`}</Text>
            </View>
          ) : null}
          <FlatList
            extraData={this.state}
            horizontal={true}
            style={styles.store_list}
            data={searchRecords.coupons ? searchRecords.coupons : []}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <TopCouponCard
                offer={item}
                bg_color={Theme.get_bg_color(index, 4)}
                couponOnPress={() =>
                  this.setState({selectedCoupon: item, offerModalShow: true})
                }
              />
            )}
          />
          {searchRecords.store_categories &&
          searchRecords.store_categories.length > 0 ? (
            <View style={[styles.listHeader]}>
              <Text style={styles.listTitle}>{`${translate(
                'store_categories',
              )} ${translate('with')}"${this.state.search_txt}"`}</Text>
            </View>
          ) : null}
          {searchRecords.store_categories &&
          searchRecords.store_categories.length > 0 ? (
            <FlatList
              style={styles.store_list}
              data={
                searchRecords.store_categories
                  ? searchRecords.store_categories
                  : []
              }
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              extraData={this.state}
              renderItem={this.render_store_cat}
            />
          ) : null}
          {searchRecords.coupon_categories &&
          searchRecords.coupon_categories.length > 0 ? (
            <View style={styles.listHeader}>
              <Text
                style={[
                  styles.listTitle,
                  {width: '100%'},
                ]}>{`Searched coupon categories for "${this.state.search_txt}"`}</Text>
            </View>
          ) : null}
          <FlatList
            nestedScrollEnabled={true}
            extraData={this.state}
            horizontal={true}
            style={styles.store_list}
            showsHorizontalScrollIndicator={false}
            data={
              searchRecords.coupon_categories
                ? searchRecords.coupon_categories
                : []
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderCategories}
          />
          {searchRecords.deals && searchRecords.deals.length > 0 ? (
            <View style={styles.listHeader}>
              <Text
                style={[
                  styles.listTitle,
                  {width: '100%'},
                ]}>{`Searched deals categories for "${this.state.search_txt}"`}</Text>
            </View>
          ) : null}
          <FlatList
            style={styles.store_list}
            nestedScrollEnabled={true}
            extraData={this.state}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={searchRecords.deals ? searchRecords.deals : []}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.render_deals}
          />
          {this.state.noResult && !this.state.search_loading ? (
            <View style={styles.listEmptyView}>
              <Text style={styles.noSearchTitle}>
                {translate('no_results_found')}
              </Text>
              <Text style={styles.noSearchTitle}>
                "{this.state.search_txt}"
              </Text>
              <Text style={styles.noSearchTxt}>
                {translate('please_check_spelling')}
              </Text>
            </View>
          ) : null}
          {this.state.search_loading ? (
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={[1, 2, 3, 4]}
              style={{marginLeft: 10}}
              extraData={this.props}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={this.render_empty_stores}
            />
          ) : null}
        </ScrollContent>

        <CouponModal
          setCouponModalVisibleFalse={() =>
            this.setState({offerModalShow: false})
          }
          setCouponModalVisibleTrue={() =>
            this.setState({offerModalShow: true})
          }
          offerModalShow={this.state.offerModalShow}
          navigation={this.props.navigation}
          coupon={this.state.selectedCoupon}
        />
        <DealModal
          setDealModalVisibleFalse={() => this.setState({dealModalShow: false})}
          setDealModalVisibleTrue={() => this.setState({dealModalShow: true})}
          dealModalShow={this.state.dealModalShow}
          navigation={this.props.navigation}
        />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
