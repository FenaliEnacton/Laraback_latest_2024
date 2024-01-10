import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  HeaderBackButton,
  ScrollContent,
  SearchButton,
  Loader,
} from '@components/core';
import {ChildCatCard} from '@components/generic';
import {translate} from '@translations';
import Config from 'react-native-config';
import {
  request_all_categories,
  request_store_cat_details,
} from '@app_redux/Actions';
import AllStoreCatLoader from './AllStoreCatLoader';
import styles from './style';
import FastImage from 'react-native-fast-image';

const mapDispatchToProps = {
  request_all_categories,
  request_store_cat_details,
};

const mapStateToProps = ({params}) => {
  return {
    store_categories: params.categories?.store ? params.categories.store : null,
    loading: params.loading,
  };
};

class AllStoreCategories extends Component {
  render_cats = ({item, index}) => {
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
    if (!this.props.store_categories) {
      this.props.request_all_categories('store');
    }
  }

  render() {
    const {store_categories, loading} = this.props;
    const parent_coupon_cat = store_categories?.length
      ? store_categories
          .filter((e) => e.parent_id === 0 || e.parent_id === null)
          .map((e) => {
            return {
              ...e,
              child_cat: store_categories.filter((i) => i.parent_id === e.id),
            };
          })
      : [];

    return (
      <Container>
        <Header>
          <HeaderLeft>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </HeaderLeft>
          <HeaderTitle>
            <Text style={styles.headerTitle}>
              {translate('store_category')}
            </Text>
          </HeaderTitle>
          <HeaderRight>
            <SearchButton navigation={this.props.navigation} />
          </HeaderRight>
        </Header>
        <ScrollContent>
          {parent_coupon_cat?.length ? (
            parent_coupon_cat.map((parentCat, index) => {
              return (
                <View key={index.toString()} style={styles.cat_list}>
                  <View style={styles.cat_list_header}>
                    <TouchableOpacity
                      style={styles.cat_left_box}
                      onPress={() =>
                        this.props.request_store_cat_details(
                          parentCat.id,
                          parentCat,
                        )
                      }>
                      <View style={styles.par_img_box}>
                        <FastImage
                          source={{
                            uri: parentCat.icon
                              ? parentCat.icon
                              : Config.EMPTY_IMAGE_URL,
                          }}
                          style={styles.iconImage}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </View>
                      <Text style={styles.parentCat_name}>
                        {parentCat.name}
                      </Text>
                    </TouchableOpacity>
                    {/* <Text style={styles.store_count}>
                      {translate('stores')}
                    </Text> */}
                  </View>
                  {parentCat.child_cat ? (
                    <FlatList
                      style={styles.child_list}
                      data={parentCat.child_cat}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this.render_cats}
                    />
                  ) : null}
                </View>
              );
            })
          ) : (
            <AllStoreCatLoader />
          )}
        </ScrollContent>
        <Loader show={this.props.loading} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllStoreCategories);
