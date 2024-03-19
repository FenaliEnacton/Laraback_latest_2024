import Container from '@/Components/Core/Container';
import ScrollContent from '@/Components/Core/Content/scrollContent';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import Loader from '@/Components/Core/Loader';
import SearchButton from '@/Components/Core/SearchButton';
import ChildCatCard from '@/Components/Generic/ChildCatCard';
import { request_all_categories } from '@/Redux/Actions/metaDataActions';
import { request_store_cat_details } from '@/Redux/Actions/publicDataActions';
import { Config } from '@/react-native-config';
import { translate } from '@/translations';
import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import AllStoreCatLoader from '../AllStoreCategories/AllStoreCatLoader';
import styles from './style';

const mapDispatchToProps = {
  request_all_categories,
  request_store_cat_details,
};

const mapStateToProps = ({ params }) => {
  return {
    store_categories: params.categories?.store ? params.categories.store : null,
    loading: params.loading,
  };
};

const AllStoreCategories = props => {
  useEffect(() => {
    if (!props.store_categories) {
      props.request_all_categories('store');
    }
  }, []);

  const render_cats = ({ item, index }) => {
    return (
      <ChildCatCard
        index={index}
        cat={item}
        data_type={'store'}
        navigation={props.navigation}
      />
    );
  };

  const { store_categories } = props;
  const parent_coupon_cat = store_categories?.length
    ? store_categories
        .filter(e => e.parent_id === 0 || e.parent_id === null)
        .map(e => {
          return {
            ...e,
            child_cat: store_categories.filter(i => i.parent_id === e.id),
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
          <Text style={styles.headerTitle}>{translate('store_category')}</Text>
        </Header.Title>
        <Header.Right>
          <SearchButton navigation={props.navigation} />
        </Header.Right>
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
                      props.request_store_cat_details(parentCat.id, parentCat)
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
                    <Text style={styles.parentCat_name}>{parentCat.name}</Text>
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
                    renderItem={render_cats}
                  />
                ) : null}
              </View>
            );
          })
        ) : (
          <AllStoreCatLoader />
        )}
      </ScrollContent>
      <Loader show={props.loading} />
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AllStoreCategories);
