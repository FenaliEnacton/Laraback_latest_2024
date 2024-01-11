import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Config from '@/react-native-config';
import { SimpleAnimation } from 'react-native-simple-animations';
import { connect } from 'react-redux';
import CouponModal from '../CouponModal';
import HomeListHeader from '../HomeListHeader';
import SeeAllHeader from '../SeeAllHeader';
import TopCouponCard, { TopCouponHomeFooter } from '../TopCouponCard';
import { EmptyStoreCard } from '../TopStoreCard';

const mapDispatchToProps = {};

const mapStateToProps = ({ params }) => {
  return {
    loading: params.home_loading,
  };
};
const HomeCouponCard = props => {
  const { item } = props;
  const [top_store_selected_index, setTop_store_selected_index] = useState(0);
  const [offerModalShow, setOfferModalShow] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState([]);

  const render_coupons = ({ item, index }) => {
    return (
      <SimpleAnimation
        delay={0}
        duration={1000}
        distance={120}
        fade
        movementType={'slide'}
        direction={'left'}
        useNativeDriver={true}>
        <TopCouponCard
          index={index}
          offer={item}
          couponOnPress={() => {
            setOfferModalShow(true);
            setSelectedCoupon(item);
          }}
        />
      </SimpleAnimation>
    );
  };
  const render_coupons_footer = () => {
    if (
      props.item?.categories &&
      props.item?.categories[top_store_selected_index] &&
      props.item?.categories[top_store_selected_index].id &&
      props.item?.categories[top_store_selected_index].slug.length > 1
    ) {
      return (
        <TopCouponHomeFooter
          category={props.item?.categories[top_store_selected_index]}
        />
      );
    } else {
      return (
        <SeeAllHeader
          onPress={() => {
            props.navigation.navigate('AllCouponCategories');
          }}
        />
      );
    }
  };

  const render_empty_stores = ({ item, index }) => {
    return <EmptyStoreCard />;
  };
  return (
    <>
      <HomeListHeader
        title={
          typeof props.item.title === 'object'
            ? props.item.title[Config.LANG]
            : props.item.title
        }
        data={props.item.categories ? item.categories : []}
        selected_cat={top_store_selected_index}
        onCatChange={index => setTop_store_selected_index(index)}
        footerComponent={render_coupons_footer()}
      />
      {props.item.categories &&
      props.item.categories[top_store_selected_index].coupons?.length > 0 &&
      !props.loading ? (
        <FlatList
          data={
            props.item.categories
              ? props.item.categories[top_store_selected_index].coupons
              : []
          }
          style={styles.list}
          extraData={props}
          horizontal={true}
          scrollEnabled={true}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={render_coupons}
        />
      ) : (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={[1, 2, 3, 4]}
          style={styles.list}
          extraData={props}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={render_empty_stores}
        />
      )}
      <CouponModal
        setCouponModalVisibleFalse={() => setOfferModalShow(false)}
        setCouponModalVisibleTrue={() => setOfferModalShow(true)}
        offerModalShow={offerModalShow}
        navigation={props.navigation}
        coupon={selectedCoupon}
      />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeCouponCard);

const styles = StyleSheet.create({
  list: {
    marginLeft: 10,
    marginBottom: 5,
  },
});
