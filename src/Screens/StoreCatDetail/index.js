import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Animated,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Theme} from '@assets/Theme';
import {connect} from 'react-redux';
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  ScrollContent,
  HeaderBackButton,
  DrawerMenu,
  SearchButton,
  Loader,
} from '@components/core';
import Icon from '@assets/icons';
import LinearGradient from 'react-native-linear-gradient';
import {CatCard, AllStoreColumnList, EmptyListView} from '@components/generic';
import AllStoresLoader from '../AllStores/AllStoresLoader';
import {get_store_cat_detail_data, get_all_stores} from '@app_redux/Selectors';
import Config from 'react-native-config';
import {translate} from '@translations';
import {AppImages} from '@assets/Images';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const HEADER_EXPANDED_HEIGHT = 160;
const HEADER_COLLAPSED_HEIGHT = 70;
import styles from './style';
import {ScrollView} from 'react-native-gesture-handler';
import FeaturedStore from '../../Components/Generic/FeaturedStore';

const mapDispatchToProps = {};

const mapStateToProps = ({params}) => {
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

class StoreCatDetail extends Component {
  constructor() {
    super();
    this.state = {
      scrollY: new Animated.Value(0),
      show_drawer: false,
    };
  }

  render_store_cat = ({item, index}) => {
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
    const {store_cat_data, all_stores_keys, loading, store_cat} = this.props;

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: 'clamp',
    });

    const heroTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <Container style={{backgroundColor: Theme.COLORS.white}}>
        <Header headerStyle={{backgroundColor: 'white'}}>
          <HeaderLeft>
            <HeaderBackButton
              // btnStyle={{width: '10%'}}
              onPress={() => this.props.navigation.goBack()}
            />
          </HeaderLeft>
          <HeaderTitle>
            <Text style={styles.headerTitle}>
              {this.props.store_cat.name[Config.LANG]
                ? this.props.store_cat.name[Config.LANG]
                : this.props.store_cat.name}
            </Text>
          </HeaderTitle>

          <HeaderRight>
            <SearchButton navigation={this.props.navigation} />
          </HeaderRight>
        </Header>
        <SafeAreaInsetsContext.Consumer>
          {insets => (
            <View style={[styles.imageCard, {marginTop: insets.top + 30}]}>
              <ImageBackground
                source={{uri: store_cat.header_image}}
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
                  listKey={(item, index) => index.toString()}
                  // keyExtractor={(item, index) => {
                  //   index.toString();
                  // }}
                  data={all_stores_keys}
                  showsVerticalScrollIndicator={false}
                  numColumns={3}
                  columnWrapperStyle={{justifyContent: 'space-between'}}
                  renderItem={({item, index}) => {
                    return (
                      <View style={styles.IconBox}>
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
