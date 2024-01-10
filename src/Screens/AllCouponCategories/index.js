import React, {Component} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Theme} from '@assets/Theme';
import Config from 'react-native-config';
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  ScrollContent,
  HeaderBackButton,
  SearchButton,
} from '@components/core';
import {CatCard} from '@components/generic';
import {translate} from '@translations';
import AllCouponCatLoader from './AllCouponCatLoader';
import {
  request_all_categories,
  request_coupon_cat_details,
} from '@app_redux/Actions';
import styles from './style';
import FastImage from 'react-native-fast-image';

const mapDispatchToProps = {
  request_all_categories,
  request_coupon_cat_details,
};

const mapStateToProps = ({params}) => {
  return {
    coupon_categories: params.categories?.coupon
      ? params.categories.coupon
      : null,
    loading: params.loading,
  };
};

class AllCouponCategories extends Component {
  componentDidMount() {
    if (!this.props.coupon_categories) {
      this.props.request_all_categories('coupon');
    }
  }

  render_cats = ({item, index}) => {
    return (
      <CatCard
        style={{marginRight: 10}}
        index={index}
        cat={item}
        bg_color={Theme.get_bg_color(index, 2)}
        data_type={'coupon'}
        navigation={this.props.navigation}
      />
    );
  };

  render() {
    const {coupon_categories, loading} = this.props;
    const parent_coupon_cat = coupon_categories?.length
      ? coupon_categories
          .filter(e => e.parent_id === 0 || e.parent_id === null)
          .map(e => {
            return {
              ...e,
              child_cat: coupon_categories.filter(i => i.parent_id === e.id),
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
              {translate('coupon_categories')}
            </Text>
          </HeaderTitle>
          <HeaderRight>
            <SearchButton navigation={this.props.navigation} />
          </HeaderRight>
        </Header>
        <ScrollContent>
          {!coupon_categories && loading ? (
            <AllCouponCatLoader />
          ) : (
            parent_coupon_cat.map((parentCat, index) => {
              return (
                <View key={index.toString()} style={styles.cat_list}>
                  <TouchableOpacity
                    style={styles.cat_list_header}
                    onPress={() => {
                      this.props.request_coupon_cat_details(parentCat.id);
                    }}>
                    <View style={styles.cat_left_box}>
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
                    </View>
                  </TouchableOpacity>
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
          )}
        </ScrollContent>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllCouponCategories);
