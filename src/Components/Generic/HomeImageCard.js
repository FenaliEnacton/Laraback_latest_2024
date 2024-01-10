import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  HomeListHeader,
  NewStoresCard,
  EmptyStoreCard,
  TopStoreHomeFooter,
  SeeAllHeader,
} from '@components/generic';
import Icon from '@assets/icons';
import {connect} from 'react-redux';
import {Theme} from '@assets/Theme';
import {translate} from '@translations';
import Config from 'react-native-config';
import {request_get_id_by_url} from '@app_redux/Actions';
const windowWidth = Dimensions.get('window').width;

const mapDispatchToProps = {
  request_get_id_by_url,
};

const mapStateToProps = ({params}) => {
  return {
    loading: params.home_loading,
  };
};
const HomeImageCard = props => {
  const {item} = props;

  const renderStores = ({item, index}) => {
    return (
      <NewStoresCard store={item} />
      //   <TopStoreCard store={item} bg_color={Theme.get_bg_color(index, 2)} />
    );
  };
  const open_url = async item => {
    console.log(item);
    if (item.redirect_link) {
      let link_data = item.redirect_link.split('/');
      props.request_get_id_by_url(link_data[1], link_data[2]);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.imageComponent}
        onPress={() => {
          open_url(props.item);
        }}>
        <Image
          style={styles.image_component_img}
          source={{
            uri: props.item.attrs
              ? props.item.attrs?.image_url
              : props.item.image_url,
          }}
        />
      </TouchableOpacity>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeImageCard);

const styles = StyleSheet.create({
  list: {
    marginLeft: 10,
    marginBottom: 10,
  },
  imageComponent: {
    height: 150,
    width: windowWidth,
    marginVertical: 10,
  },
  image_component_img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    backgroundColor: Theme.COLORS.white,
  },
});
