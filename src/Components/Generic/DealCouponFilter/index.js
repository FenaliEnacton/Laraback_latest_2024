import React, {Component, createRef} from 'react';
import {
  Text,
  TouchableOpacity,
  Platform,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import Icon from '@assets/icons';
import {CloseButton} from '@components/core';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {AppImages} from '@assets/Images';
import {Theme} from '@assets/Theme';
import {translate} from '@translations';
import {filter_sort_arr} from '@assets/AppDataConfig';
import RangeSlider from 'rn-range-slider';
import FastImage from 'react-native-fast-image';
export const _rangeSlider = React.createRef();

export default class DealCouponFilter extends Component {
  state = {
    modalUpdate: false,
  };

  updateData = () => {
    if (this.props.filter_data && this.props.min_price) {
      _rangeSlider?.current?.setLowValue(
        this.props.min_price
          ? this.props.min_price
          : this.props.filter_data?.price?.min
          ? this.props.filter_data?.price?.min
          : '',
      );
      _rangeSlider?.current?.setHighValue(
        this.props.max_price
          ? this.props.max_price
          : this.props.filter_data?.price?.max
          ? this.props.filter_data.price.max
          : '',
      );
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.modalUpdate !== nextProps.modalUpdate) {
      return true;
    } else return false;
  }

  updateModal = (key, index) => {
    //to force this component to re-render when sectionList changes
    this.setState({modalUpdate: !this.state.modalUpdate});
    this.props.addIdsToFilterList(key, index);
  };

  render_cats = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.filter_tab}
        onPress={() => this.props.handle_cat_change(item.id)}>
        <Icon.FontAwesome
          name={
            this.props.selected_ids.cats.includes(item.id)
              ? 'check-square-o'
              : 'square'
          }
          color={
            this.props.selected_ids.cats.includes(item.id)
              ? Theme.COLORS.primary
              : Theme.COLORS.secondary
          }
          size={30}
        />
        <Text style={styles.store_name}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render_stores = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.filter_tab}
        onPress={() => this.props.handle_store_change(item.id)}>
        <Icon.FontAwesome
          name={
            this.props.selected_ids.stores.includes(item.id)
              ? 'check-square-o'
              : 'square'
          }
          color={
            this.props.selected_ids.stores.includes(item.id)
              ? Theme.COLORS.primary
              : Theme.COLORS.secondary
          }
          size={30}
        />
        <Text style={styles.store_name}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render_sort_type = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.sort_tab,
          this.props.sort_type === item.value
            ? {backgroundColor: Theme.COLORS.primary}
            : {},
        ]}
        onPress={() => this.props.handle_sort_type_change(item.value)}>
        <Text style={styles.sort_type}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  renderThumb = () => {
    return (
      <View style={styles.renderThumbStyle}>
        <View style={styles.thumbInnerStyle}></View>
      </View>
    );
  };
  renderRail = () => {
    return <View style={styles.renderRailStyle}></View>;
  };
  selectedRail = () => {
    return <View style={styles.selectedRailStyle}></View>;
  };
  render() {
    const {
      filterModalVisible,
      setFilterModalVisibleFalse,
      getSelectedFilterIds,
      resetFilter,
      filter_data,
      onPriceValueChanged,
      is_store_page,
    } = this.props;
    return (
      <Modal
        transparent={true}
        onShow={this.updateData}
        animationType="fade"
        onRequestClose={setFilterModalVisibleFalse}
        visible={filterModalVisible}>
        <View
          activeOpacity={1}
          onPress={setFilterModalVisibleFalse}
          style={styles.modalBackground}>
          {/* <TouchableOpacity
            style={styles.closeBtn}
            activeOpacity={1}
            onPress={setFilterModalVisibleFalse}
          /> */}
          <ScrollView
            style={styles.modalContent}
            contentContainerStyle={{
              justifyContent: 'center',
              // alignItems: 'center',
            }}
            bounces={false}>
            <View style={Theme.appStyle.modal_top_notch} />
            <CloseButton
              btnStyle={styles.closeBtnStyle}
              onPress={() => setFilterModalVisibleFalse()}
            />

            <View style={{marginTop: 15}}>
              <Text style={styles.filter_title}>{translate('sort_by')}</Text>
              <FlatList
                style={styles.sort_box}
                data={filter_sort_arr}
                extraData={this.props}
                horizontal={true}
                renderItem={this.render_sort_type}
              />
            </View>
            {filter_data?.price ? (
              <View style={styles.price_filter}>
                <Text style={styles.filter_title}>
                  {translate('price_range')}{' '}
                  {this.props.min_price
                    ? `[${this.props.min_price} : ${this.props.max_price}]`
                    : ''}
                </Text>
                <View style={styles.price_box}>
                  <Text style={styles.price_title}>
                    {filter_data.price.min}
                  </Text>
                  <Text style={styles.price_title}>
                    {filter_data.price.max}
                  </Text>
                </View>

                <RangeSlider
                  style={styles.slider}
                  gravity={'center'}
                  min={filter_data.price.min}
                  max={filter_data.price.max}
                  // low={
                  //   this.props.min_price
                  //     ? this.props.min_price
                  //     : this.props.filter_data?.price?.min
                  //     ? this.props.filter_data?.price?.min
                  //     : filter_data.price.min
                  // }
                  // high={
                  //   this.props.max_price
                  //     ? this.props.max_price
                  //     : this.props.filter_data?.price?.max
                  //     ? this.props.filter_data.price.max
                  //     : filter_data.price.max
                  // }
                  renderThumb={this.renderThumb}
                  renderRail={this.renderRail}
                  renderRailSelected={this.selectedRail}
                  step={1}
                  onValueChanged={(low, high, fromUser) => {
                    clearTimeout(this.sliderTimeOutId);
                    this.sliderTimeOutId = setTimeout(() => {
                      onPriceValueChanged(low, high);
                    }, 10);
                  }}
                />
              </View>
            ) : null}
            {filter_data?.data?.cats &&
            Object.keys(filter_data?.data?.cats).length !== 0 ? (
              <View>
                <Text style={styles.filter_title}>
                  {translate('cat_filter')}
                </Text>
                <View style={styles.filter_card}>
                  <FlatList
                    data={filter_data?.data?.cats}
                    extraData={this.props}
                    renderItem={this.render_cats}
                    persistentScrollbar
                    numColumns={2}
                  />
                </View>
              </View>
            ) : null}
            {filter_data?.data?.stores &&
            !is_store_page &&
            Object.keys(filter_data?.data?.stores).length !== 0 ? (
              <View>
                <Text style={styles.filter_title}>
                  {translate('store_filter')}
                </Text>
                <View style={styles.filter_card}>
                  <FlatList
                    data={filter_data?.data?.stores}
                    extraData={this.props}
                    renderItem={this.render_stores}
                    persistentScrollbar
                    numColumns={2}
                  />
                </View>
              </View>
            ) : null}
            <TouchableOpacity style={styles.close_btn} onPress={resetFilter}>
              <Text style={styles.reset_text}>{translate('reset_all')}</Text>
              <FastImage
                source={AppImages.reset_icon}
                style={styles.close_icon}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footer_btn}
              onPress={getSelectedFilterIds}>
              <Text style={styles.btnTxt}>{translate('filter')}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  ...Theme.appStyle,
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    borderRadius: 20,
    backgroundColor: Theme.COLORS.white,
    width: '95%',
    // justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    maxHeight: windowHeight - 200,
    paddingTop: 5,
    paddingBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.7)',
        shadowOffset: {
          height: 0.5,
          width: 1,
        },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  close_icon: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
  },
  closeBtnStyle: {
    right: 10,
    // top: 10,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  close_btn: {
    // position: 'absolute',
    alignSelf: 'flex-end',
    right: 20,
    // top: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reset_text: {
    ...Theme.fontStyles.h4Regular,
    marginRight: 10,
  },
  price_box: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
  },
  price_title: {
    ...Theme.fontStyles.h3Bold,
    width: 70,
    marginTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
  slider: {
    width: windowWidth - 40,
    //height: 60,
    marginTop: 10,
  },
  footer_btn: {
    height: 35,
    borderRadius: 20,
    width: windowWidth - 70,
    alignSelf: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.secondary,
  },
  btnTxt: {
    ...Theme.fontStyles.h2Bold,
    width: 100,
    color: Theme.COLORS.white,
    alignSelf: 'center',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  content: {
    width: windowWidth,
    marginTop: Platform.OS === 'android' ? 100 : 70,
    backgroundColor: Theme.COLORS.background,
    flex: 1,
  },
  filter_card: {
    maxHeight: 140,
    marginBottom: 10,
    // backgroundColor: Theme.COLORS.primary,
    width: windowWidth - 20,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
  },
  filter_tab: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: windowWidth / 2 - 30,
  },
  store_name: {
    ...Theme.fontStyles.h4Bold,
    marginLeft: 5,
    color: Theme.COLORS.blackText,
    width: windowWidth / 2 - 70,
  },
  filter_title: {
    ...Theme.fontStyles.h3Bold,

    marginTop: 10,
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  sort_tab: {
    height: 28,
    borderRadius: 14,
    backgroundColor: Theme.COLORS.secondary,
    marginRight: 10,
    justifyContent: 'center',
    width: 90,
    alignItems: 'center',
  },
  sort_type: {
    ...Theme.fontStyles.h4Bold,
    color: Theme.COLORS.white,
    textTransform: 'capitalize',
    width: '90%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  sort_box: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 5,
  },
  price_filter: {
    marginTop: 10,
    alignItems: 'center',
  },
  renderThumbStyle: {
    height: 15,
    width: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.black,
  },
  thumbInnerStyle: {
    height: 7,
    width: 7,
    borderRadius: 5,
    backgroundColor: Theme.COLORS.white,
  },
  renderRailStyle: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: Theme.COLORS.grey,
  },
  selectedRailStyle: {
    height: 4,
    backgroundColor: Theme.COLORS.black,
    borderRadius: 2,
  },
});
