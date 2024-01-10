import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import Config from 'react-native-config';
import {connect} from 'react-redux';
import {
  request_store_cat_details,
  request_coupon_cat_details,
} from '@app_redux/Actions';
import Icon from '@assets/icons';
import {Theme} from '@assets/Theme';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

function CatCard(props) {
  const {cat} = props;
  const icon_url = cat.icon ? cat.icon : Config.EMPTY_IMAGE_URL;

  function handle_cat_click() {
    if (props.data_type === 'store') {
      props.request_store_cat_details(cat.id, cat);
    }
    if (props.data_type === 'coupon') {
      props.request_coupon_cat_details(cat.id);
    }
    if (props.data_type === 'deal') {
      props.navigation.navigate('AllDeals', {
        cats: [cat.id],
        title: cat.name[Config.LANG] ? cat.name[Config.LANG] : cat.name,
      });
    }
  }

  return (
    <>
      {props.data_type === 'coupon' ? (
        <TouchableOpacity
          style={[styles.couponContainer, props.style]}
          onPress={() => {
            handle_cat_click();
          }}>
          <View style={styles.couponIconContainer}>
            <FastImage
              style={styles.couponIconCard}
              source={{uri: icon_url}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <Text style={styles.couponTitle}>
            {cat.name[Config.LANG]
              ? cat.name[Config.LANG]
              : cat.name
              ? cat.name
              : ''}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            handle_cat_click();
          }}>
          <View style={styles.imgCard}>
            <View style={styles.image_container}>
              <FastImage
                source={{uri: icon_url}}
                style={{height: '100%', width: '100%', borderRadius: 10}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </View>
          <Text style={styles.cat_title} numberOfLines={1}>
            {cat.name[Config.LANG]
              ? cat.name[Config.LANG]
              : cat.name
              ? cat.name
              : ''}
          </Text>
          {cat.offers_count ? (
            <Text style={styles.count}>
              ({cat.offers_count ? cat.offers_count : ''})
            </Text>
          ) : null}
        </TouchableOpacity>
      )}
    </>
  );
}

const mapDispatchToProps = {
  request_store_cat_details,
  request_coupon_cat_details,
};

const mapStateToProps = ({params}) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(CatCard);
const styles = StyleSheet.create({
  container: {
    // width: 65,
    // height: 100,
    maxHeight: 150,
    // marginTop: 8,
    alignItems: 'center',
    marginRight: 5,
    overflow: 'hidden',
  },
  image_box: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
  },
  logo_img: {
    resizeMode: 'contain',
    height: 30,
    width: 30,
    alignSelf: 'center',
  },
  cat_title: {
    ...Theme.fontStyles.h4Bold,
    marginTop: 10,
    marginBottom: 5,
    width: 85,
    alignSelf: 'center',
    textAlign: 'center',
  },
  count: {
    ...Theme.fontStyles.h4Regular,
    color: Theme.COLORS.secondary,
  },
  imgCard: {
    height: 55,
    width: 55,
    borderRadius: 30,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.7)',
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
  child_card: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  image_container: {
    height: 35,
    width: 35,
    // marginTop: -20,
    borderRadius: 10,
  },
  titleText: {
    ...Theme.fontStyles.h4Bold,
    textAlign: 'center',
    lineHeight: 15,
    // marginTop: 7,
  },
  couponContainer: {
    width: (windowWidth - 40) / 2,
    paddingVertical: 7,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: Theme.COLORS.white,
    paddingHorizontal: 7,
    flexDirection: 'row',
    marginVertical: 5,
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
  couponIconContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.border_light,
  },
  couponIconCard: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  couponTitle: {
    ...Theme.fontStyles.h4Bold,
    marginLeft: 5,
    width: '70%',
  },
});
