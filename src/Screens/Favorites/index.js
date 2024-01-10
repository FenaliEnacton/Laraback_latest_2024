import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  HeaderBackButton,
} from '@components/core';
import {TopStoreCard} from '@components/generic';
import {get_fav_stores} from '@user_redux/Selectors';
import {translate} from '@translations';
import {Theme} from '@assets/Theme';
import {EmptyListView} from '@components/generic';

import styles from './style';

const mapDispatchToProps = {};

const mapStateToProps = ({params}) => {
  return {
    fav_stores: get_fav_stores(params.user_fav_data) || [],
  };
};

class Favorites extends Component {
  renderStores = ({item, index}) => {
    return (
      <TopStoreCard store={item} bg_color={Theme.get_bg_color(index, 2)} />
    );
  };

  render_empty = () => {
    return (
      <>
        <EmptyListView message={translate('no_fav_found')} />
        <Text
          style={styles.store_nav}
          onPress={() => this.props.navigation.navigate('AllStores')}>
          {translate('click_here_to_add')}
        </Text>
      </>
    );
  };
  render() {
    const {fav_stores} = this.props;
    return (
      <Container>
        <Header>
          <HeaderLeft>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </HeaderLeft>
          <HeaderTitle>
            <Text style={styles.headerTitle}>
              {translate('favorites_stores')}
            </Text>
          </HeaderTitle>
          <HeaderRight />
        </Header>
        <View style={styles.content}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={fav_stores}
            style={styles.list}
            extraData={this.props}
            columnWrapperStyle={styles.row}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => this.render_empty()}
            renderItem={this.renderStores}
          />
        </View>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
