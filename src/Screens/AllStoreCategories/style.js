import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Theme} from '@assets/Theme';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  par_img_box: {
    height: 50,
    width: 50,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: Theme.COLORS.white,
    justifyContent: 'center',
  },
  iconImage: {
    resizeMode: 'contain',
    height: 30,
    width: 30,
    alignSelf: 'center',
  },
  parentCat_name: {
    ...Theme.fontStyles.h3Bold,
  },
  store_count: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.secondary,
  },
  cat_list: {
    marginTop: 15,
    marginLeft: 10,
  },
  cat_left_box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cat_list_header: {
    flexDirection: 'row',
    width: windowWidth - 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  child_list: {
    marginTop: 10,
  },
  child_cat_container: {
    height: 100,
    width: 200,
    borderRadius: 15,
    marginRight: 5,
    justifyContent: 'center',
  },
  overView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    height: 100,
    width: 190,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  cat_featured_img: {
    height: 100,
    width: 200,
    marginRight: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  svg_container: {
    marginHorizontal: 7,
    marginTop: 10,
    width: windowWidth - 20,
    borderRadius: 10,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Theme.COLORS.background,
  },
});

module.exports = {
  ...Theme.appStyle,
  ...styles,
};
