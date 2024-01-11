import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import {
  request_store_cat_details,
  request_store_details,
} from '@/Redux/Actions/publicDataActions';
import { get_fav_stores_ids, is_user_logged_in } from '@/Redux/Selectors';
import {
  request_user_add_fav,
  request_user_remove_fav,
} from '@/Redux/USER_REDUX/Actions/userFavsActions';
import Config from '@/react-native-config';
import { translate } from '@/translations';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { Rect } from 'react-content-loader/native';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

function TopStoreCard(props) {
  const { store } = props;
  // const [is_fav, setIs_fav] = useState(fav_store_ids.includes(store.id));

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
  const get_cb_prefix = cb => {
    var n = cb.replace(/[^A-Za-z ]/g, '');
    var string = n.replace('Cashback', '').replace('cashback', '');
    return string;
  };

  // function handle_fav_click() {
  //   if (props.is_member) {
  //     if (fav_store_ids.includes(store.id)) {
  //       props.request_user_remove_fav('store', store.id);
  //     } else {
  //       props.request_user_add_fav('store', store.id);
  //     }
  //   } else {
  //     Toast.showBottom(translate('please_login'));
  //   }
  // }

  return (
    <>
      {/* <TouchableOpacity
        style={[styles.container, props.containerStyle]}
        onPress={() => props.request_store_details(store.id)}>
        <View style={[styles.titleCard, {backgroundColor: primaryColor}]}>
          <View style={styles.img_view}>
            <FastImage
              source={{{uri: store.logo ? store.logo : Config.EMPTY_IMAGE_URL}}}
              style={styles.img}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <Text style={[styles.title, {color: storeTitleColor}]}>
            {store.name ? store.name : ''}
          </Text>
        </View>
        <View style={styles.CBStringCard}>
          {store.cashback_string && store.cashback_enabled ? (
            <Text style={styles.cb_text}>
              {get_cb_prefix(store.cashback_string)}
              <Text style={styles.percentText}>
                {' '}
                {get_cashback_string(
                  store.cashback_amount,
                  store.amount_type,
                )}{' '}
              </Text>
            </Text>
          ) : null}
        </View>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.container, props.style]}
        onPress={() => props.request_store_details(store.id)}>
        <Image
          style={styles.store_logo}
          source={{ uri: store.logo ? store.logo : Config.EMPTY_IMAGE_URL }}
          resizeMode={'contain'}
        />
        {/* <Text style={styles.title}>{store.name ? store.name : ''}</Text> */}
        {store.cashback_string && store.cashback_enabled ? (
          <Text style={styles.cb_text}>
            {get_cb_prefix(store.cashback_string)}
            <Text style={styles.percentText}>
              {' '}
              {get_cashback_string(
                store.cashback_amount,
                store.amount_type,
              )}{' '}
            </Text>
            Cashback
          </Text>
        ) : null}
      </TouchableOpacity>

      {/* <Loader show={props.loading} /> */}
    </>
  );
}

function TopStoreHomeFooter(props) {
  return (
    <TouchableOpacity
      onPress={() =>
        props.request_store_cat_details(props.category.id, props.category)
      }>
      <Text style={styles.view_all_text}>
        {translate('see_all')}
        <Icons.Ionicons
          name={'caret-forward'}
          color={Theme.COLORS.black}
          size={15}
        />
      </Text>
    </TouchableOpacity>
  );
}

export const EmptyStoreCard = () => {
  return (
    <View style={styles.container}>
      <ContentLoader height={130}>
        <Rect x="15" y="20" rx="4" ry="4" width="90" height="40" />
        <Rect x="15" y="70" rx="4" ry="4" width="60" height="12" />
        <Rect x="15" y="100" rx="4" ry="4" width="120" height="10" />
      </ContentLoader>
    </View>
  );
};

const mapDispatchToProps = {
  request_store_cat_details,
  request_store_details,
  request_user_remove_fav,
  request_user_add_fav,
};

const mapStateToProps = ({ params }) => {
  return {
    fav_store_ids: get_fav_stores_ids(params) || [],
    is_member: is_user_logged_in(params) || false,
    loading: params.loading,
  };
};
const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopStoreHomeFooter);
export { ConnectedComponent as TopStoreHomeFooter };
export default connect(mapStateToProps, mapDispatchToProps)(TopStoreCard);

const styles = StyleSheet.create({
  container: {
    width: 160,
    borderRadius: 10,
    backgroundColor: Theme.COLORS.white,
    marginHorizontal: 5,
    marginBottom: 20,
    marginTop: 5,
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.5)',
        shadowOffset: {
          height: 0.3,
          width: 1,
        },
        shadowOpacity: 0.3,
      },
      android: {
        shadowColor: Theme.COLORS.light_grey,
        elevation: 15,
      },
    }),
  },
  titleCard: {
    height: 55,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  img_view: {
    height: 40,
    width: 40,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.white,
  },
  img: {
    height: '99%',
    width: '99%',
    borderRadius: 23,
    resizeMode: 'contain',
  },
  title: {
    ...Theme.fontStyles.h2Bold,
    marginLeft: 10,
    // width: '60%',
    // lineHeight: 15,
    fontWeight: '900',
  },
  CBStringCard: {
    height: 40,
    paddingHorizontal: 10,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  cb_style: {
    alignSelf: 'flex-start',
    width: '80%',
    marginTop: 5,
    // width: '80%',
  },
  cb_text: {
    ...Theme.fontStyles.h5Bold,
    color: Theme.COLORS.secondary,
    marginTop: 10,
    textAlign: 'center',
  },
  percentText: {
    ...Theme.fontStyles.h1Bold,
    color: Theme.COLORS.secondary,
  },
  view_all_text: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.primary,
    alignSelf: 'center',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  store_logo: {
    height: 70,
    width: '100%',
    borderRadius: 5,
    // backgroundColor: 'red',
  },
});
