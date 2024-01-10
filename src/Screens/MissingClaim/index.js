import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  HeaderBackButton,
} from '@components/core';
import {translate} from '@translations';
import Config from 'react-native-config';
import {EmptyListView, BlurNavBar} from '@components/generic';
import {NavigationList, TabLoader} from '@components/user';
import {Theme} from '@assets/Theme';
import dayjs from 'dayjs';
import Icon from '@assets/icons';
import {get_user_internal_nav_list} from '@assets/RouterList';
import {request_user_claim_list, request_claim_info} from '@user_redux/Actions';
import {get_currency_string} from '@user_redux/Utils';
const NAV_LIST = get_user_internal_nav_list([7777]);
import styles from './style';

const mapDispatchToProps = {
  request_user_claim_list,
  request_claim_info,
};

const mapStateToProps = ({params}) => {
  return {
    claims: params.user_claim_list || [],
    loading: params.loading,
  };
};

class MissingClaim extends Component {
  componentDidMount() {
    this.props.request_user_claim_list();
  }

  render_claims = ({item, index}) => {
    return (
      <View
        style={styles.tabCard}
        key={index + item.id.toString()}
        onPress={() => this.props.request_claim_info(item.id)}>
        <View style={styles.storeInfoCard}>
          <Image style={styles.logoImg} source={{uri: item.store.logo}} />
          <Text style={styles.storeName} numberOfLines={1}>
            {item.store?.name}
          </Text>
        </View>
        <View style={styles.storeInfoCard}>
          <View style={styles.date_box}>
            <Icon.AntDesign
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
            <Icon.MaterialCommunityIcons
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
              ? {backgroundColor: Theme.get_status_light_color('completed')}
              : {backgroundColor: Theme.get_status_light_color('pending')},
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
    return <View style={{height: 80}} />;
  };
  render() {
    const {claims, loading} = this.props;
    const loader_arr = [1, 2, 3, 4];
    return (
      <Container>
        <Header>
          <HeaderLeft>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </HeaderLeft>
          <HeaderTitle>
            <Text numberOfLines={1} style={styles.headerTitle}>
              {translate('missing_cashback_claims')}
            </Text>
          </HeaderTitle>
          <HeaderRight />
        </Header>
        <View style={{marginTop: 55}}>
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
