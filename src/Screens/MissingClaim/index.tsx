import { get_user_internal_nav_list } from '@/Assets/RouterList';
import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import Container from '@/Components/Core/Container';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import BlurNavBar from '@/Components/Generic/BlurNavBar';
import EmptyListView from '@/Components/Generic/EmptyListView';
import NavigationList from '@/Components/User/NavigationList';
import TabLoader from '@/Components/User/TabLoader';
import {
  request_claim_info,
  request_user_claim_list,
} from '@/Redux/USER_REDUX/Actions/userClaimActions';
import { Config } from '@/react-native-config';
import { translate } from '@/translations';
import dayjs from 'dayjs';
import React, { Component } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
const NAV_LIST = get_user_internal_nav_list([7777]);

const mapDispatchToProps = {
  request_user_claim_list,
  request_claim_info,
};

const mapStateToProps = ({ params }) => {
  return {
    claims: params.user_claim_list || [],
    loading: params.loading,
  };
};

class MissingClaim extends Component<any> {
  componentDidMount() {
    this.props.request_user_claim_list();
  }

  render_claims = ({ item, index }) => {
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
            {item.user_cashback_id
              ? translate('tracked')
              : translate('clicked')}
          </Text>
        </View>
      </View>
    );
  };
  addEmptyCard = () => {
    return <View style={{ height: 80 }} />;
  };
  render() {
    const { claims, loading } = this.props;
    const loader_arr = [1, 2, 3, 4];
    return (
      <Container>
        <Header>
          <Header.Left>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </Header.Left>
          <Header.Title>
            <Text numberOfLines={1} style={styles.headerTitle}>
              {translate('missing_cashback_claims')}
            </Text>
          </Header.Title>
          <Header.Right />
        </Header>
        <View style={{ marginTop: 55 }}>
          <View>
            {!loading ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                extraData={this.props}
                data={claims}
                renderItem={this.render_claims}
                keyExtractor={(item, index) => index.toString()}
                // style={styles.list}
                ListFooterComponent={this.addEmptyCard}
              />
            ) : (
              loader_arr.map((item, index) => {
                return <TabLoader key={item.toString() + index} />;
              })
            )}
            {!loading && !claims.length && <EmptyListView />}
          </View>
        </View>
        <BlurNavBar>
          <NavigationList
            list={NAV_LIST}
            navigation={this.props.navigation}
            style={styles.navListStyle}
            numberColumn={1}
            containerStyle={{
              marginTop: 0,
            }}
            textStyle={styles.routeText}
          />
        </BlurNavBar>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MissingClaim);
