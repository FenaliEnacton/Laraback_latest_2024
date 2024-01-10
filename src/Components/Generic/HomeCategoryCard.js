import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {
  HomeListHeader,
  EmptyStoreCard,
  TopStoreHomeFooter,
  SeeAllHeader,
  CatCard,
} from '@components/generic';
import Icon from '@assets/icons';
import {connect} from 'react-redux';
import {Theme} from '@assets/Theme';
import {translate} from '@translations';
import Config from 'react-native-config';

const mapDispatchToProps = {};

const mapStateToProps = ({params}) => {
  return {
    loading: params.home_loading,
  };
};
const HomeCategoryCard = props => {
  const item = props.item?.attrs ? props.item?.attrs : props.item;
  // const renderStores = ({item, index}) => {
  //   return (
  //     <NewStoresCard store={item} />
  //     //   <TopStoreCard store={item} bg_color={Theme.get_bg_color(index, 2)} />
  //   );
  // };
  const render_store_cat = ({item, index}) => {
    return (
      // <ChildCatCard
      //   cat={item}
      //   bg_color={Theme.get_bg_color(index, 8)}
      //   data_type={'store'}
      //   navigation={this.props.navigation}
      // />
      <CatCard
        cat={item}
        index={index}
        bg_color={Theme.get_bg_color(index, 4)}
        data_type={'store'}
        navigation={props.navigation}
      />
    );
  };
  const render_categories = ({item, index}) => {
    return (
      <CatCard
        cat={item}
        index={index}
        bg_color={Theme.get_bg_color(index, 4)}
        data_type={'coupon'}
        navigation={props.navigation}
      />
    );
  };
  const render_deal_cat = ({item, index}) => {
    return (
      // <ChildCatCard
      //   cat={item}
      //   bg_color={Theme.get_bg_color(index, 2)}
      //   data_type={'deal'}
      //   navigation={this.props.navigation}
      // />
      <CatCard
        cat={item}
        index={index}
        bg_color={Theme.get_bg_color(index, 4)}
        data_type={'deal'}
        navigation={props.navigation}
      />
    );
  };

  const render_footer = () => {
    return (
      <SeeAllHeader
        onPress={() => {
          item?.categories
            ? item?.category_type === 'CouponCategory'
              ? props.navigation.navigate('AllCouponCategories')
              : item?.category_type === 'DealCategory'
              ? props.navigation.navigate('AllDealsCategories')
              : props.navigation.navigate('AllStoreCategories')
            : props.navigation.navigate('AllStoreCategories');
        }}
      />
    );
  };

  const render_empty_stores = ({item, index}) => {
    return <EmptyStoreCard />;
  };
  const selectedCategories = item?.categories.slice(0, 8);
  return (
    <>
      <HomeListHeader
        title={
          typeof item.title === 'object' ? item.title[Config.LANG] : item.title
        }
        titleStyle={styles.titleStyle}
        footerComponent={render_footer()}
      />
      {item?.categories && item?.categories.length > 0 && !props.loading ? (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={item?.categories ? selectedCategories : []}
          style={styles.list}
          extraData={props}
          numColumns={item?.category_type === 'CouponCategory' ? 2 : 4}
          key={index => index.toString}
          columnWrapperStyle={styles.row}
          renderItem={
            item?.categories
              ? item?.category_type === 'CouponCategory'
                ? render_categories
                : item?.category_type === 'DealCategory'
                ? render_deal_cat
                : render_store_cat
              : render_store_cat
          }
        />
      ) : null}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeCategoryCard);

const styles = StyleSheet.create({
  list: {
    // marginLeft: 10,
    marginBottom: 10,
  },
  titleStyle: {
    width: '90%',
  },
  row: {
    justifyContent: 'space-around',
    flex: 1,
  },
});
