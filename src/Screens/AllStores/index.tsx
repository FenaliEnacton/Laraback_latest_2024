import Container from '@/Components/Core/Container';
import ScrollContent from '@/Components/Core/Content/scrollContent';
import Header from '@/Components/Core/Header/Header';
import Loader from '@/Components/Core/Loader';
import SearchButton from '@/Components/Core/SearchButton';
import {
  request_all_categories,
  request_stores_alpha_char_list,
  request_stores_by_alpha,
} from '@/Redux/Actions/metaDataActions';
import { translate } from '@/translations';
import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import styles from './style';
import { get_all_stores_with_chunk } from '@/Redux/Selectors';
import CatCard from '@/Components/Generic/CatCard';
import { Theme } from '@/Assets/Theme';
import TopStoreCard from '@/Components/Generic/TopStoreCard';
import { DrawerActions } from '@react-navigation/native';
import HeaderMenuButton from '@/Components/Core/HeaderMenuButton';
import { AllStoreListLoader } from './AllStoresLoader';
import ComponentAnimation from '@/Components/Core/ComponentAnimation';
import Icons from '@/Assets/icons';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import LogoutModal from '@/Components/Core/LogoutModal';
import DrawerMenu from '@/Components/Core/DrawerMenu';

const mapDispatchToProps = {
  request_stores_by_alpha,
  request_all_categories,
  request_stores_alpha_char_list,
};

const mapStateToProps = ({ params }) => {
  return {
    all_stores: params.stores || {},
    loading: params.loading,
    alpha_stores_loading: params.alpha_stores_loading,
    stores_alpha_char: params.stores_alpha_char || '',
    alpha_stores: params.alpha_stores ? Object.values(params.alpha_stores) : [],
    all_stores_keys: params.stores_alpha_list ? params.stores_alpha_list : [],
    all_stores_with_chunk: params.stores
      ? get_all_stores_with_chunk(params.stores)
      : [],
    store_categories: params.categories?.store ? params.categories.store : null,
    store_details_loading: params.store_details_loading,
  };
};

class AllStores extends Component<any> {
  state = {
    show_drawer: false,
    logout_show: false,
    filter_show: false,
    filterValue: '',
    alpha_stores_list: this.props.alpha_stores || [],
    filter_toggle: true,
  };

  componentDidMount() {
    this.props.request_stores_alpha_char_list();
    if (!this.props.store_categories) {
      this.props.request_all_categories('store');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.alpha_stores != this.props.alpha_stores) {
      this.setState({ alpha_stores_list: this.props.alpha_stores });
    }
  }
  render_store_cat = ({ item, index }) => {
    return (
      <CatCard
        style={{ height: 60, width: 70 }}
        labelStyle={styles.label}
        index={index}
        cat={item}
        bg_color={Theme.get_bg_color(index, 4)}
        data_type={'store'}
        navigation={this.props.navigation}
      />
    );
  };

  render_stores = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          styles.alpha_btn,
          this.props.stores_alpha_char === item ? { zIndex: 99999 } : {},
        ]}
        onPress={() => this.props.request_stores_by_alpha(item)}>
        <Text
          style={[
            styles.sectionTitle,
            this.props.stores_alpha_char === item
              ? { fontSize: 20, color: Theme.COLORS.primary }
              : { color: Theme.COLORS.grey },
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  render_store_by_alpha = ({ item, index }) => {
    return <TopStoreCard store={item} style={styles.storeCard} />;
  };
  getItemLayout = (data, index) => ({
    length: 100,
    offset: 100 * index,
    index,
  });
  onBackdropPress = () => {
    this.setState({ filter_show: false });
  };

  getMostPopularStore = () => {
    this.setState({
      filter_toggle: !this.state.filter_toggle,
      alpha_stores_list: this.props.alpha_stores.sort(
        (a, b) => a.clicks - b.clicks,
      ),
    });
  };

  getHighestCashbackStore = () => {
    let percent = [];
    let fixed = [];
    percent = this.props.alpha_stores
      .filter(a => a.amount_type === 'percent')
      .sort((a, b) => Number(b.cashback_amount) - Number(a.cashback_amount));

    fixed = this.props.alpha_stores
      .filter(a => a.amount_type === 'fixed')
      .sort((a, b) => Number(b.cashback_amount) - Number(a.cashback_amount));

    this.setState({
      alpha_stores_list: fixed.concat(percent),
      filter_toggle: !this.state.filter_toggle,
    });
  };

  render() {
    const { all_stores_keys, store_categories, loading, alpha_stores_loading } =
      this.props;
    const { logout_show } = this.state;
    const parent_st_cat = store_categories?.length
      ? store_categories.filter(e => e.parent_id === 0 || e.parent_id === null)
      : [];
    return (
      <Container>
        <Header>
          <Header.Left>
            <HeaderMenuButton
              onPress={() =>
                this.props.navigation.dispatch(DrawerActions.openDrawer())
              }
            />
          </Header.Left>
          <Header.Title>
            <Text style={styles.headerTitle}>{translate('all_stores')}</Text>
          </Header.Title>
          <Header.Right>
            <SearchButton navigation={this.props.navigation} />
          </Header.Right>
        </Header>
        <ScrollContent>
          {all_stores_keys.length < 1 && loading ? (
            <AllStoreListLoader />
          ) : (
            <View style={styles.all_stores_wrapper}>
              <ComponentAnimation index={2} direction={'left'}>
                <Text style={styles.sectionTitle}>
                  {translate('view_stores_by_cat')}
                </Text>
                <FlatList
                  data={parent_st_cat}
                  extraData={this.props}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={this.render_store_cat}
                  keyExtractor={(item, index) => index.toString()}
                />
              </ComponentAnimation>
              <ComponentAnimation index={3}>
                <View style={styles.storeAlphaContainer}>
                  <View style={styles.alpha_list}>
                    <FlatList
                      data={all_stores_keys}
                      extraData={this.props}
                      horizontal
                      nestedScrollEnabled={true}
                      renderItem={this.render_stores}
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'visible',
                      }}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.filterCard}
                    onPress={() => {
                      this.setState({ filter_show: !this.state.filter_show });
                    }}>
                    <Icons.FontAwesome5
                      name={'sort'}
                      size={20}
                      color={Theme.COLORS.black}
                    />
                  </TouchableOpacity>
                  <Menu
                    opened={this.state.filter_show}
                    onBackdropPress={() => {
                      this.onBackdropPress();
                    }}
                    rendererProps={{ anchorStyle: styles.filterModal }}>
                    <MenuTrigger />
                    <MenuOptions>
                      <MenuOption
                        customStyles={{}}
                        onSelect={() => {
                          this.setState({
                            filter_show: false,
                          });
                          this.getMostPopularStore();
                        }}>
                        <View style={styles.filterTextCard}>
                          <Text style={styles.filterText}>Most Popular</Text>
                        </View>
                      </MenuOption>
                      <MenuOption
                        onSelect={() => {
                          this.setState({
                            filter_show: false,
                          });
                          this.getHighestCashbackStore();
                        }}>
                        <View style={styles.filterTextCard}>
                          <Text style={styles.filterText}>
                            Highest Cashback
                          </Text>
                        </View>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              </ComponentAnimation>
            </View>
          )}
          <View style={{ marginTop: 15 }}>
            {alpha_stores_loading ? (
              <AllStoreListLoader />
            ) : (
              <>
                <ComponentAnimation index={4}>
                  <FlatList
                    data={this.state.alpha_stores_list}
                    // horizontal={true}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.props}
                    renderItem={this.render_store_by_alpha}
                    style={styles.list}
                    columnWrapperStyle={styles.row}
                  />
                </ComponentAnimation>
                <View style={{ height: 150 }} />
              </>
            )}
          </View>
        </ScrollContent>
        <DrawerMenu
          drawerShow={this.state.show_drawer}
          navigation={this.props.navigation}
          setDrawerVisibleFalse={() => this.setState({ show_drawer: false })}
          show_log_out={() => this.setState({ logout_show: true })}
        />
        <LogoutModal
          onRequestClose={() => this.setState({ logout_show: false })}
          visible={logout_show}
        />

        <Loader show={this.props.store_details_loading} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllStores);
