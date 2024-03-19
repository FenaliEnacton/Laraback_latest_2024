import { Theme } from '@/Assets/Theme';
import Container from '@/Components/Core/Container';
import ScrollContent from '@/Components/Core/Content/scrollContent';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import Loader from '@/Components/Core/Loader';
import SearchButton from '@/Components/Core/SearchButton';
import CatCard from '@/Components/Generic/CatCard';
import EmptyListView from '@/Components/Generic/EmptyListView';
import { get_all_stores } from '@/Redux/Selectors';
import { Config } from '@/react-native-config';
import { translate } from '@/translations';
import React, { Component } from 'react';
import { Animated, FlatList, ImageBackground, Text, View } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import FeaturedStore from '../../Components/Generic/FeaturedStore';
import AllStoresLoader from '../AllStores/AllStoresLoader';
import styles from './style';

const mapDispatchToProps = {};

const mapStateToProps = ({ params }) => {
  return {
    store_cat_data: params.store_cat_details || {},
    all_stores_keys: params.store_cat_details
      ? get_all_stores(params.store_cat_details)
      : [],
    store_categories: params.categories?.store ? params.categories.store : null,
    store_cat: params.store_cat || {},
    loading: params.loading,
    store_details_loading: params.store_details_loading,
  };
};

class StoreCatDetail extends Component<any> {
  state: any = {
    scrollY: new Animated.Value(0),
    show_drawer: false,
  };

  render_store_cat = ({ item, index }) => {
    return (
      <CatCard
        cat={item}
        index={index}
        bg_color={Theme.get_bg_color(index, 2)}
        data_type={'store'}
        navigation={this.props.navigation}
      />
    );
  };

  render() {
    const { all_stores_keys, loading, store_cat } = this.props;

    return (
      <Container style={{ backgroundColor: Theme.COLORS.white }}>
        <Header headerStyle={{ backgroundColor: 'white' }}>
          <Header.Left>
            <HeaderBackButton
              // btnStyle={{width: '10%'}}
              onPress={() => this.props.navigation.goBack()}
            />
          </Header.Left>
          <Header.Title>
            <Text style={styles.headerTitle}>
              {this.props.store_cat.name[Config.LANG]
                ? this.props.store_cat.name[Config.LANG]
                : this.props.store_cat.name}
            </Text>
          </Header.Title>

          <Header.Right>
            <SearchButton navigation={this.props.navigation} />
          </Header.Right>
        </Header>
        <SafeAreaInsetsContext.Consumer>
          {(insets: any) => (
            <View style={[styles.imageCard, { marginTop: insets.top + 30 }]}>
              <ImageBackground
                source={{ uri: store_cat.header_image }}
                style={styles.header_image}
                borderRadius={10}>
                {/* <View style={styles.overlay}>
                  <Text style={styles.header_store_text}>
                    {this.props.store_cat.name[Config.LANG]
                      ? this.props.store_cat.name[Config.LANG]
                      : this.props.store_cat.name}
                  </Text>
                </View> */}
              </ImageBackground>
            </View>
          )}
        </SafeAreaInsetsContext.Consumer>
        <ScrollContent
          style={{
            backgroundColor: Theme.COLORS.white,
            marginTop: 20,
          }}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this.state.scrollY,
                },
              },
            },
          ])}>
          <View style={styles.all_stores_wrapper}>
            <View>
              {all_stores_keys.length < 1 && loading ? (
                <AllStoresLoader />
              ) : (
                <FlatList
                  // listKey={(item, index) => index.toString()}
                  keyExtractor={(item, index) => index.toString()}
                  data={all_stores_keys}
                  showsVerticalScrollIndicator={false}
                  numColumns={3}
                  columnWrapperStyle={{ justifyContent: 'space-between' }}
                  renderItem={({ item, index }) => {
                    return (
                      <View>
                        <FeaturedStore store={item} />
                      </View>
                    );
                  }}
                />
              )}
              {all_stores_keys.length < 1 && !loading ? (
                <EmptyListView message={translate('no_stores_found')} />
              ) : null}
            </View>
          </View>
        </ScrollContent>

        <Loader show={this.props.store_details_loading} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreCatDetail);
