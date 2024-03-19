import React, { useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import AllCouponCatLoader from './AllCouponCatLoader';
import styles from './style';
import { request_all_categories } from '@/Redux/Actions/metaDataActions';
import { request_coupon_cat_details } from '@/Redux/Actions/publicDataActions';
import CatCard from '@/Components/Generic/CatCard';
import { Theme } from '@/Assets/Theme';
import Container from '@/Components/Core/Container';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import { translate } from '@/translations';
import SearchButton from '@/Components/Core/SearchButton';
import ScrollContent from '@/Components/Core/Content/scrollContent';
import { Config } from '@/react-native-config';

const mapDispatchToProps = {
  request_all_categories,
  request_coupon_cat_details,
};

const mapStateToProps = ({ params }) => {
  return {
    coupon_categories: params.categories?.coupon
      ? params.categories.coupon
      : null,
    loading: params.loading,
  };
};

const AllCouponCategories = props => {
  useEffect(() => {
    if (!props.coupon_categories) {
      props.request_all_categories('coupon');
    }
  }, []);

  const render_cats = ({ item, index }) => {
    return (
      <CatCard
        style={{ marginRight: 10 }}
        index={index}
        cat={item}
        bg_color={Theme.get_bg_color(index, 2)}
        data_type={'coupon'}
        navigation={props.navigation}
      />
    );
  };

  const { coupon_categories, loading } = props;
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
        <Header.Left>
          <HeaderBackButton onPress={() => props.navigation.goBack()} />
        </Header.Left>
        <Header.Title>
          <Text style={styles.headerTitle}>
            {translate('coupon_categories')}
          </Text>
        </Header.Title>
        <Header.Right>
          <SearchButton navigation={props.navigation} />
        </Header.Right>
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
                    props.request_coupon_cat_details(parentCat.id);
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
                    <Text style={styles.parentCat_name}>{parentCat.name}</Text>
                  </View>
                </TouchableOpacity>
                {parentCat.child_cat ? (
                  <FlatList
                    style={styles.child_list}
                    data={parentCat.child_cat}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={render_cats}
                  />
                ) : null}
              </View>
            );
          })
        )}
      </ScrollContent>
    </Container>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllCouponCategories);
