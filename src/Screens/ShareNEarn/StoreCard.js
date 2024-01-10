import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';

import {
  request_store_cat_details,
  request_store_details,
} from '@app_redux/Actions';
import {CashbackString} from '@components/core';
import {Theme} from '@assets/Theme';
import {translate} from '@translations';
import {is_user_logged_in} from '@app_redux/Selectors';
import {get_fav_stores_ids} from '@app_redux/Selectors';

import {
  request_user_remove_fav,
  request_user_add_fav,
} from '@user_redux/Actions';
import FastImage from 'react-native-fast-image';
import Config from 'react-native-config';
const windowWidth = Dimensions.get('window').width;
function StoreCard(props) {
  const {store} = props;

  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={() => props.request_store_details(store.id)}>
      <View style={[styles.img_container]}>
        <FastImage
          source={{uri: store.logo ? store.logo : ''}}
          style={[styles.logo_img]}
          resizeMode={'contain'}
        />
      </View>
      <Text style={styles.store_title}>
        {store.name[Config.LANG] ? store.name[Config.LANG] : store.name}
      </Text>
      {store.cashback_string && store.cashback_enabled ? (
        <CashbackString
          cb_style={styles.cb_style}
          cashback_string={
            props.cashbackString ? props.cashbackString : store.cashback_string
          }
          cb_text={styles.cb_string}
          color={'secondary'}
        />
      ) : null}
    </TouchableOpacity>
  );
}

const mapDispatchToProps = {
  request_store_cat_details,
  request_store_details,
  request_user_remove_fav,
  request_user_add_fav,
};

const mapStateToProps = ({params}) => {
  return {
    fav_store_ids: get_fav_stores_ids(params) || [],
    is_member: is_user_logged_in(params) || false,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreCard);

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginTop: 8,
    alignItems: 'center',
    marginLeft: 7,
    paddingBottom: 17,
    overflow: 'hidden',
    paddingHorizontal: 5,
  },
  svg_loader: {
    height: 130,
    marginRight: 10,
    marginVertical: 10,
    width: 190,
    backgroundColor: Theme.COLORS.white,
    borderRadius: 10,
  },
  fav_icon: {alignSelf: 'center', marginTop: 5, marginRight: 5},
  cb_style: {
    alignSelf: 'flex-start',
    width: '85%',
    // marginLeft: 5,
    justifyContent: 'flex-start',
  },
  view_all_text: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.grey,
    alignSelf: 'center',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  top_fav: {
    height: 40,
    width: 40,
    marginRight: -5,
    marginTop: -7,
    alignSelf: 'flex-end',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#FDA8A8',
    justifyContent: 'center',
  },
  img_container: {
    height: 55,
    width: '100%',
    alignSelf: 'flex-start',
    marginTop: 5,
    backgroundColor: Theme.COLORS.white,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.5)',
        shadowOffset: {
          height: 0.4,
          width: 1,
        },
        shadowOpacity: 0.4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  logo_img: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
    borderRadius: 5,
  },
  store_title: {
    ...Theme.fontStyles.h4Bold,
    marginTop: 5,
    fontWeight: '600',
    width: '95%',
  },
  cb_string: {
    ...Theme.fontStyles.h4Bold,
    color: Theme.COLORS.secondary,
    // textAlign: 'center',
    lineHeight: 17,
  },
});
