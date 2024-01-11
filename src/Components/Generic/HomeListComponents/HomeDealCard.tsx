import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Theme } from '@/Assets/Theme';
import { request_deal_info } from '@/Redux/Actions/publicDataActions';
import Config from '@/react-native-config';
import { SimpleAnimation } from 'react-native-simple-animations';
import { connect } from 'react-redux';
import DealCard, { TopDealHomeFooter } from '../DealCard';
import DealModal from '../DealModal';
import HomeListHeader from '../HomeListHeader';
import SeeAllHeader from '../SeeAllHeader';
import { EmptyStoreCard } from '../TopStoreCard';

const mapDispatchToProps = {
  request_deal_info,
};

const mapStateToProps = ({ params }) => {
  return {
    loading: params.deal_loading,
  };
};
const HomeDealCard = props => {
  const { item } = props;
  const [top_store_selected_index, setTop_store_selected_index] = useState(0);
  const [DealModalShow, setDealModalShow] = useState(false);

  const renderStores = ({ item, index }) => {
    return (
      <SimpleAnimation
        delay={0}
        duration={1000}
        distance={120}
        fade
        movementType={'slide'}
        direction={'left'}
        useNativeDriver={true}>
        <DealCard
          deal={item}
          bg_color={Theme.get_bg_color(index, 8)}
          style={{ marginHorizontal: 8 }}
          deal_onPress={() => {
            setDealModalShow(true);
            props.request_deal_info(item.id);
          }}
        />
      </SimpleAnimation>
    );
  };

  const render_stores_footer = () => {
    if (
      props.item?.categories &&
      props.item?.categories[top_store_selected_index] &&
      props.item?.categories[top_store_selected_index].id &&
      props.item?.categories[top_store_selected_index].slug.length > 1
    ) {
      return (
        <TopDealHomeFooter
          category={props.item?.categories[top_store_selected_index]}
        />
      );
    } else {
      return (
        <SeeAllHeader
          onPress={() => {
            props.navigation.navigate('AllDeals');
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
        footerComponent={render_stores_footer()}
      />
      {props.item?.categories &&
      props.item?.categories[top_store_selected_index].deals?.length > 0 &&
      !props.loading ? (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={
            props.item?.categories
              ? props.item?.categories[top_store_selected_index].deals
              : []
          }
          style={styles.list}
          horizontal={true}
          extraData={props}
          showsHorizontalScrollIndicator={false}
          renderItem={renderStores}
          ListFooterComponent={render_stores_footer}
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
      <DealModal
        setDealModalVisibleFalse={() => setDealModalShow(false)}
        setDealModalVisibleTrue={() => setDealModalShow(true)}
        dealModalShow={DealModalShow}
        navigation={props.navigation}
      />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeDealCard);

const styles = StyleSheet.create({
  list: {
    marginLeft: 10,
    marginBottom: 5,
  },
});
