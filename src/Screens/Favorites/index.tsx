import Container from '@/Components/Core/Container';
import DrawerMenu from '@/Components/Core/DrawerMenu';
import Header from '@/Components/Core/Header/Header';
import HeaderLeft from '@/Components/Core/Header/HeaderLeft';
import HeaderRight from '@/Components/Core/Header/HeaderRight';
import HeaderTitle from '@/Components/Core/Header/HeaderTitle';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import LogoutModal from '@/Components/Core/LogoutModal';
import EmptyListView from '@/Components/Generic/EmptyListView';
import TopStoreCard from '@/Components/Generic/TopStoreCard';
import useUserFav from '@/Hooks/Api/use-user-fav';
import { translate } from '@/translations';
import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import styles from './style';

const Favorites = props => {
  const { userFavData } = useUserFav();
  const [showDrawer, setShowDrawer] = useState(false);
  const [logoutShow, setLogoutShow] = useState(false);

  const render_empty = () => {
    return (
      <View>
        <EmptyListView message={translate('no_fav_found')} />
        <Text
          style={styles.store_nav}
          onPress={() => props.navigation.navigate('AllStores')}>
          {translate('click_here_to_add')}
        </Text>
      </View>
    );
  };
  const renderStores = ({ item, index }) => {
    return <TopStoreCard store={item} isFavorite={true} />;
  };
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <HeaderBackButton onPress={() => props.navigation.goBack()} />
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
          data={userFavData?.['0']?.['fav_data']}
          style={styles.list}
          columnWrapperStyle={styles.row}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => render_empty()}
          renderItem={renderStores}
        />
      </View>
      <DrawerMenu
        drawerShow={showDrawer}
        navigation={props.navigation}
        setDrawerVisibleFalse={() => setShowDrawer(false)}
        show_log_out={() => setLogoutShow(true)}
      />
      <LogoutModal
        onRequestClose={() => setLogoutShow(false)}
        visible={logoutShow}
      />
    </Container>
  );
};
export default Favorites;
