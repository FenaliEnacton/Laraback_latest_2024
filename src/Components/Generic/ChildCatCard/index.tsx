import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Theme } from '@/Assets/Theme';
import {
  request_coupon_cat_details,
  request_store_cat_details,
} from '@/Redux/Actions/publicDataActions';
import { Config } from '@/react-native-config';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

function ChildCatCard(props) {
  const { cat, data_type } = props;

  function handle_cat_click() {
    if (data_type === 'store') {
      props.request_store_cat_details(cat.id, cat);
    }
    if (data_type === 'coupon') {
      props.request_coupon_cat_details(cat.id);
    }
    if (data_type === 'deal') {
      props.navigation.navigate('AllDeals', {
        cats: [cat.id],
        title: cat.name[Config.LANG] ? cat.name[Config.LANG] : cat.name,
      });
    }
  }

  return (
    <LinearGradient
      start={{ x: 1.0, y: 0.5 }}
      end={{ x: 0.25, y: 0 }}
      colors={[
        Theme.GRADIENT_COLOR_SET[1][
          props.index % Theme.GRADIENT_COLOR_SET[1].length
        ],
        Theme.GRADIENT_COLOR_SET[2][
          props.index % Theme.GRADIENT_COLOR_SET[2].length
        ],
        // Theme.COLORS.white,
      ]}
      style={[styles.container, props.style]}>
      <TouchableOpacity
        style={styles.child_card}
        onPress={() => handle_cat_click()}>
        <View style={styles.image_container}>
          <FastImage
            source={{ uri: cat.icon ? cat.icon : Config.EMPTY_IMAGE_URL }}
            style={{ height: '100%', width: '100%', borderRadius: 10 }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <Text
          style={[
            styles.titleText,
            {
              color:
                Theme.GRADIENT_COLOR_SET[3][
                  props.index % Theme.GRADIENT_COLOR_SET[3].length
                ],
            },
          ]}>
          {cat.name[Config.LANG]
            ? cat.name[Config.LANG]
            : cat.name
            ? cat.name
            : ''}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const mapDispatchToProps = {
  request_store_cat_details,
  request_coupon_cat_details,
};

const mapStateToProps = ({ params }) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ChildCatCard);
const styles = StyleSheet.create({
  child_cat_container: {
    height: 100,
    width: 200,
    borderRadius: 10,
    marginRight: 5,
    // justifyContent: 'center',
  },
  overView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    height: 100,
    width: 190,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  cat_featured_img: {
    height: 100,
    width: 190,
    marginRight: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  cat_name: {
    ...Theme.fontStyles.h3Regular,
    color: Theme.COLORS.white,
    width: '85%',
  },
  cat_stores: {
    ...Theme.fontStyles.h3Regular,
    color: Theme.COLORS.white,
    width: '85%',
  },
  container: {
    height: 70,
    width: 80,
    borderRadius: 10,
    marginVertical: 10,
    marginTop: 15,
    paddingHorizontal: 5,
    marginHorizontal: 7,
    overflow: 'visible',
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
        elevation: 3,
      },
    }),
  },
  child_card: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  image_container: {
    height: 40,
    width: 40,
    marginTop: -20,
    borderRadius: 10,
  },
  titleText: {
    ...Theme.fontStyles.h4Bold,
    textAlign: 'center',
    lineHeight: 15,
    // marginTop: 7,
  },
});
