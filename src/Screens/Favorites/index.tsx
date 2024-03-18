import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { translate } from '@/translations';
import TopStoreCard from '@/Components/Generic/TopStoreCard';
import Container from '@/Components/Core/Container';
import Header from '@/Components/Core/Header/Header';
import HeaderLeft from '@/Components/Core/Header/HeaderLeft';
import HeaderRight from '@/Components/Core/Header/HeaderRight';
import HeaderTitle from '@/Components/Core/Header/HeaderTitle';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import EmptyListView from '@/Components/Generic/EmptyListView';
import styles from './style';
import { get_fav_stores } from '@/Redux/USER_REDUX/Selectors';
import { Theme } from '@/Assets/Theme';

const mapDispatchToProps = {};

const mapStateToProps = ({ params }) => {
  return {
    fav_stores: get_fav_stores(params.user_fav_data) || [],
  };
};

class Favorites extends Component<any> {
  renderStores = ({ item, index }) => {
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
    const { fav_stores } = this.props;
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
