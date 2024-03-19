import { Theme } from '@/Assets/Theme';
import CashbackString from '@/Components/Core/CashbackString';
import { request_store_details } from '@/Redux/Actions/publicDataActions';
import { get_fav_stores_ids, is_user_logged_in } from '@/Redux/Selectors';
import { Config } from '@/react-native-config';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';

const windowWidth = Dimensions.get('window').width;

function mapStateToProps({ params }) {
  return {
    fav_store_ids: get_fav_stores_ids(params) || [],
    is_member: is_user_logged_in(params) || false,
  };
}

function AllStoreColumnList(props) {
  const render_stores = ({ item, index }) => {
    let cashback_string = item.cashback_string;
    return (
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
          <Text numberOfLines={1} style={styles.title}>
            {item.name}
          </Text>
          <CashbackString
            cashback_string={cashback_string}
            icon_size={10}
            icon={{ marginTop: 2 }}
            cb_style={styles.cb_style}
            cb_text={styles.cb_text_small}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        // key={i.toString() + Date.now()}
        data={props.list}
        // horizontal={true}
        // numColumns={2}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        extraData={props}
        renderItem={render_stores}
      />
    </View>
  );
}

export default connect(mapStateToProps, { request_store_details })(
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
