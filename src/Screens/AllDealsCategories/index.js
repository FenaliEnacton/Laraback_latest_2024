import React, {Component} from 'react';
import {View, Text, Image, FlatList} from 'react-native';
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
} from '@components/core';
import {translate} from '@translations';
import {ChildCatCard} from '@components/generic';
import Config from 'react-native-config';
import {request_all_categories} from '@app_redux/Actions';
import AllStoreCatLoader from '../AllStoreCategories/AllStoreCatLoader';
import styles from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

const mapDispatchToProps = {
  request_all_categories,
};

const mapStateToProps = ({params}) => {
  return {
    deal_categories: params.categories?.deal ? params.categories.deal : null,
    loading: params.loading,
  };
};

class AllDealsCategories extends Component {
  componentDidMount() {
    if (!this.props.deal_categories) {
      this.props.request_all_categories('deal');
    }
  }

  render_cats = ({item, index}) => {
    return (
      <ChildCatCard
        index={index}
        cat={item}
        data_type={'deal'}
        navigation={this.props.navigation}
      />
    );
  };

  render() {
    const {deal_categories, loading} = this.props;
    const parent_coupon_cat = deal_categories?.length
      ? deal_categories
          .filter((e) => e.parent_id === 0 || e.parent_id === null)
          .map((e) => {
            return {
              ...e,
              child_cat: deal_categories.filter((i) => i.parent_id === e.id),
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
              {translate('deal_categories')}
            </Text>
          </HeaderTitle>
          <HeaderRight>
            <SearchButton navigation={this.props.navigation} />
          </HeaderRight>
        </Header>
        <ScrollContent>
          <View style={{paddingBottom: 30}}>
            {!parent_coupon_cat || loading ? (
              <AllStoreCatLoader />
            ) : (
              parent_coupon_cat.map((parentCat, index) => {
                return (
                  <View key={index.toString()} style={styles.cat_list}>
                    <TouchableOpacity
                      style={styles.cat_list_header}
                      onPress={() =>
                        this.props.navigation.navigate('AllDeals', {
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
                        renderItem={this.render_cats}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllDealsCategories);