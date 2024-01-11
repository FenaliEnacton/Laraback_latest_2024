import { Theme } from '@/Assets/Theme';
import Config from '@/react-native-config';
import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ComponentAnimation from '../../Core/ComponentAnimation';
import FeaturedStore from '../FeaturedStore';
import HomeListHeader from '../HomeListHeader';
import SeeAllHeader from '../SeeAllHeader';
import TopStoreCard, {
  EmptyStoreCard,
  TopStoreHomeFooter,
} from '../TopStoreCard';

const mapDispatchToProps = {};

const mapStateToProps = ({ params }) => {
  return {
    loading: params.home_loading,
  };
};
const HomeTopStore = props => {
  const { item } = props;
  const [top_store_selected_index, setTop_store_selected_index] = useState(0);
  const renderStores = ({ item, index }) => {
    return (
      <ComponentAnimation direction={'left'} index={index + 5}>
        {props.isFeatured ? (
          <FeaturedStore store={item} />
        ) : (
          <TopStoreCard store={item} bg_color={Theme.bg_color(index, 2)} />
        )}
      </ComponentAnimation>
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
        <TopStoreHomeFooter
          category={props.item?.categories[top_store_selected_index]}
        />
      );
    } else {
      return (
        <SeeAllHeader
          onPress={() => {
            props.navigation.navigate('AllStores');
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
      <ComponentAnimation direction={'left'} index={props.animationDuration}>
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
      </ComponentAnimation>
      {props.item?.categories &&
      props.item?.categories[top_store_selected_index].stores?.length > 0 &&
      !props.loading ? (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={
            props.item?.categories
              ? props.item?.categories[top_store_selected_index].stores
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
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeTopStore);

const styles = StyleSheet.create({
  list: {
    marginLeft: 10,
    // marginBottom: 5,
  },
});
