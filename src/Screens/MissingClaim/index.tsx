import { get_user_internal_nav_list } from '@/Assets/RouterList';
import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import Container from '@/Components/Core/Container';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import EmptyListView from '@/Components/Generic/EmptyListView';
import NavigationList from '@/Components/User/NavigationList';
import TabLoader from '@/Components/User/TabLoader';
import useUserClaim from '@/Hooks/Api/use-user-claim';
import { Config } from '@/react-native-config';
import { translate } from '@/translations';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { Dimensions, FlatList, Image, Text, View } from 'react-native';
import styles from './style';
const NAV_LIST = get_user_internal_nav_list([7777]);
const windowWidth = Dimensions.get('window').width;
const MissingClaim = props => {
  const { request_user_claim_list, loadingUserClaimList, userClaimList } =
    useUserClaim();

  useEffect(() => {
    request_user_claim_list();
  }, []);
  const loader_arr = [1, 2, 3, 4];

  const render_claims = ({ item, index }) => {
    return (
      <View style={styles.tabCard} key={index + item.id.toString()}>
        <View style={styles.storeInfoCard}>
          <Image style={styles.logoImg} source={{ uri: item.store.logo }} />
          <Text style={styles.storeName} numberOfLines={1}>
            {item.store?.name}
          </Text>
        </View>
        <View style={styles.storeInfoCard}>
          <View style={styles.date_box}>
            <Icons.AntDesign
              name={'calendar'}
              color={Theme.COLORS.grey}
              size={14}
            />
            <Text style={styles.transDate}>
              {' '}
              {dayjs(item.transaction_date).format(Config.DATE_FORMAT)}
            </Text>
          </View>
          <View style={styles.date_box}>
            <Icons.MaterialCommunityIcons
              name={'clock-time-four-outline'}
              color={Theme.COLORS.grey}
              size={14}
            />
            <Text style={styles.transDate}>
              {' '}
              {dayjs(item.created_at).format(Config.DATE_FORMAT)}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBox,
            item.user_cashback_id
              ? { backgroundColor: Theme.get_status_light_color('completed') }
              : { backgroundColor: Theme.get_status_light_color('pending') },
          ]}>
          <Text style={[styles.status]}>
            {''}
            {item.status}
          </Text>
        </View>
      </View>
    );
  };
  // const addEmptyCard = () => {
  //   return <View style={{ height: 80 }} />;
  // };
  return (
    <Container>
      <Header>
        <Header.Left>
          <HeaderBackButton
            btnStyle={{ backgroundColor: Theme.COLORS.primary }}
            onPress={() => props.navigation.goBack()}
          />
        </Header.Left>
        <Header.Title>
          <Text numberOfLines={1} style={styles.headerTitle}>
            {translate('missing_cashback_claims')}
          </Text>
        </Header.Title>
        <Header.Right />
      </Header>
      <View style={{ marginTop: 55, width: windowWidth }}>
        {!loadingUserClaimList ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={userClaimList}
            renderItem={render_claims}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<EmptyListView />}
          />
        ) : (
          loader_arr.map((item, index) => {
            return <TabLoader key={item.toString() + index} />;
          })
        )}

        <NavigationList
          list={NAV_LIST}
          navigation={props.navigation}
          style={styles.navListStyle}
          numberColumn={1}
          containerStyle={{
            marginTop: 0,
          }}
          textStyle={styles.routeText}
        />
      </View>
    </Container>
  );
};

export default MissingClaim;
