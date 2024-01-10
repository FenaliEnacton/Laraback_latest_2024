import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  View,
  Platform,
  ScrollView,
} from 'react-native';
import {translate} from '@translations';
import {Theme} from '@assets/Theme';
import {CashbackString} from '@components/core';
import TopStoreCard from '../TopStoreCard';
import {request_store_details} from '@app_redux/Actions';
import {connect} from 'react-redux';
import _ from 'lodash';
import Config from 'react-native-config';
import Icon from '@assets/icons';
import {get_fav_stores_ids, is_user_logged_in} from '@app_redux/Selectors';
import FastImage from 'react-native-fast-image';

const windowWidth = Dimensions.get('window').width;

function mapStateToProps({params}) {
  return {
    fav_store_ids: get_fav_stores_ids(params) || [],
    is_member: is_user_logged_in(params) || false,
  };
}

function AllStoreColumnList(props) {
  const get_cashback_string = (amount, amount_type) => {
    let string = '';
    let amt = Number(amount).toFixed(2);
    if (amount_type === 'percent') {
      string = amt + '%';
    } else if (amount_type === 'fixed') {
      string = Config.CURRENCY_PREFIX + amt;
    }
    return string;
  };
  const get_cb_prefix = (cb) => {
    var n = cb?.split(' ');
    return n?.[0];
  };
  // console.log(
  //   '🚀 ~ file: index.js ~ line 28 ~ AllStoreColumnList ~ props',
  //   props,
  // );

  const lists = _.chunk(props.list, 10);
  const render_stores = ({item, index}) => {
    let cashback_string = item.cashback_string;
    return (
      // <TouchableOpacity
      //   key={index.toString()}
      //   style={styles.st_card}
      //   onPress={() => props.request_store_details(item.id)}>
      //   <View style={styles.st_logo_box}>
      //     <Image
      //       source={{
      //         uri: item.logo ? item.logo : Config.EMPTY_IMAGE_URL,
      //       }}
      //       style={styles.st_logo}
      //     />
      //   </View>
      //   <View>
      //     <Text style={styles.st_name} numberOfLines={1}>
      //       {item.name}
      //     </Text>
      //     {/* <Text style={styles.st_cb}>{cashback_string}</Text> */}
      //     <CashbackString
      //       cashback_string={cashback_string}
      //       icon_size={10}
      //       icon={{marginTop: 2}}
      //       cb_style={styles.cb_style}
      //       cb_text={styles.cb_text_small}
      //     />
      //     <Text style={styles.st_offers}>
      //       {item.offers_count} {translate('offers')}
      //     </Text>
      //   </View>
      // </TouchableOpacity>
      // <TouchableOpacity
      //   style={styles.storeCard}
      //   onPress={() => props.request_store_details(item.id)}>
      //   <TouchableOpacity
      //     style={styles.top_fav}
      //     onPress={() => handle_fav_click()}>
      //     <Icon.AntDesign
      //       style={styles.fav_icon}
      //       name={props.fav_store_ids.includes(item.id) ? 'heart' : 'hearto'}
      //       color={
      //         props.fav_store_ids.includes(item.id)
      //           ? Theme.COLORS.secondary
      //           : Theme.COLORS.primary
      //       }
      //       size={15}
      //     />
      //   </TouchableOpacity>
      //   <View style={styles.titleCard}>
      //     <Image
      //       style={styles.logoCard}
      //       source={{
      //         uri: item.logo ? item.logo : Config.EMPTY_IMAGE_URL,
      //       }}
      //     />
      //     <Text numberOfLines={1} style={styles.StoreTitle}>
      //       {' '}
      //       {item.name}
      //     </Text>
      //   </View>
      //   <Text style={styles.cb_text}>
      //     {get_cb_prefix(cashback_string)}
      //     <Text style={styles.percentText}>
      //       {' '}
      //       {get_cashback_string(item.cashback_amount, item.amount_type)}{' '}
      //     </Text>
      //   </Text>
      // </TouchableOpacity>
      // <TopStoreCard
      //   store={item}
      //   // bg_color={Theme.bg_color(index, 2)}
      //   containerStyle={styles.container}
      // />
      <TouchableOpacity
        style={styles.container}
        onPress={() => props.request_store_details(item.id)}>
        <View style={styles.storeLogo}>
          <FastImage
            source={{
              uri: item.logo ? item.logo : Config.EMPTY_IMAGE_URL,
            }}
            style={styles.st_logo}
            resizeMode={FastImage.resizeMode.contain}
          />
          {/* <FastImage
            source={{uri: icon_url}}
            style={{height: '100%', width: '100%', borderRadius: 10}}
            resizeMode={FastImage.resizeMode.stretch}
          /> */}
        </View>
        <View style={styles.storeContent}>
          <Text numberOfLines={1} style={styles.h4Bold}>
            {item.name}
          </Text>
          <CashbackString
            cashback_string={cashback_string}
            icon_size={10}
            icon={{marginTop: 2}}
            cb_style={styles.cb_style}
            cb_text={styles.cb_text_small}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.Content}>
      <FlatList
        // key={i.toString() + Date.now()}
        data={props.list}
        // horizontal={true}
        // numColumns={2}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        extraData={props}
        renderItem={(item, index) => render_stores(item, index)}
      />
    </View>
  );
}

export default connect(mapStateToProps, {request_store_details})(
  AllStoreColumnList,
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: windowWidth,
    height: 100,
  },
  list: {
    width: windowWidth,
    marginBottom: 10,
    // marginTop: 20,
  },
  container: {
    width: windowWidth,
    paddingHorizontal: 10,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
  storeLogo: {
    height: 45,
    width: '27%',
    borderRadius: 10,
    marginLeft: 5,
    paddingHorizontal: 8,
    backgroundColor: Theme.COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.3)',
        shadowOffset: {
          height: 0.3,
          width: 1,
        },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  st_logo: {
    height: '100%',
    width: '100%',
  },
  title: {
    ...Theme.fontStyles.h4Bold,
  },
  storeContent: {
    marginLeft: 15,
    width: '65%',
  },
  st_cb: {
    ...Theme.fontStyles.h4Regular,
    color: Theme.COLORS.secondary,
    marginTop: 2,
    width: 130,
    flexShrink: 1,
  },
  cb_style: {
    marginBottom: 0,
  },
  cb_text_small: {
    ...Theme.fontStyles.h5Bold,
    color: Theme.COLORS.secondary,
  },
});
