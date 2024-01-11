import { Theme } from '@/Assets/Theme';
import { request_get_id_by_url } from '@/Redux/Actions/publicDataActions';
import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
const windowWidth = Dimensions.get('window').width;

const mapDispatchToProps = {
  request_get_id_by_url,
};

const mapStateToProps = ({ params }) => {
  return {
    loading: params.home_loading,
  };
};
const HomeImageCard = props => {
  const open_url = async item => {
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
