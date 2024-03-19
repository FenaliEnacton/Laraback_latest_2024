import Container from '@/Components/Core/Container';
import ScrollContent from '@/Components/Core/Content/scrollContent';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import SearchButton from '@/Components/Core/SearchButton';
import ChildCatCard from '@/Components/Generic/ChildCatCard';
import { request_all_categories } from '@/Redux/Actions/metaDataActions';
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
};

const mapStateToProps = ({ params }) => {
  return {
    deal_categories: params.categories?.deal ? params.categories.deal : null,
    loading: params.loading,
  };
};

const AllDealsCategories = props => {
  useEffect(() => {
    if (!props.deal_categories) {
      props.request_all_categories('deal');
    }
  }, []);

  const render_cats = ({ item, index }) => {
    return (
      <ChildCatCard
        index={index}
        cat={item}
        data_type={'deal'}
        navigation={props.navigation}
      />
    );
  };
  const { deal_categories, loading } = props;
  const parent_coupon_cat = deal_categories?.length
    ? deal_categories
        .filter(e => e.parent_id === 0 || e.parent_id === null)
        .map(e => {
          return {
            ...e,
            child_cat: deal_categories.filter(i => i.parent_id === e.id),
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
          <Text style={styles.headerTitle}>{translate('deal_categories')}</Text>
        </Header.Title>
        <Header.Right>
          <SearchButton navigation={props.navigation} />
        </Header.Right>
      </Header>
      <ScrollContent>
        <View style={{ paddingBottom: 30 }}>
          {!parent_coupon_cat || loading ? (
            <AllStoreCatLoader />
          ) : (
            parent_coupon_cat.map((parentCat, index) => {
              return (
                <View key={index.toString()} style={styles.cat_list}>
                  <TouchableOpacity
                    style={styles.cat_list_header}
                    onPress={() =>
                      props.navigation.navigate('AllDeals', {
                        cats: [parentCat.id],
                        title: parentCat.name[Config.LANG]
                          ? parentCat.name[Config.LANG]
                          : parentCat.name,
                      })
                    }>
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
                        {parentCat.name[Config.LANG]
                          ? parentCat.name[Config.LANG]
                          : parentCat.name}
                      </Text>
                    </View>
                    {/* <Text style={styles.store_count}>
                        {translate('deals')}
                      </Text> */}
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
        </View>
      </ScrollContent>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDealsCategories);
