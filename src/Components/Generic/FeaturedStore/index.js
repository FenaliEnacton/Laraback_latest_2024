import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Theme} from '@assets/Theme';
import {connect} from 'react-redux';
import {request_store_details} from '@app_redux/Actions';

const mapDispatchToProps = {
  request_store_details,
};

const mapStateToProps = ({params}) => {
  return {
    loading: params.loading,
  };
};

const FeaturedStore = props => {
  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.popularBrandIcon, props.style]}
        onPress={() => props.request_store_details(props.store.id)}>
        <Image
          source={{uri: props.store?.logo}}
          style={styles.popularBrandImage}
          borderRadius={40}
        />
      </TouchableOpacity>
      {props.store?.cashback_string && props.store?.cashback_enabled ? (
        <Text style={styles.CBString}>
          {props.store?.cashback_string.replace('Cashback', '')}
        </Text>
      ) : null}
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedStore);

const styles = StyleSheet.create({
  popularBrandIcon: {
    height: 75,
    width: 75,
    borderRadius: 40,
    backgroundColor: Theme.COLORS.white,
    marginHorizontal: 7,
    alignSelf: 'center',
    borderWidth: 0.5,
    marginTop: 10,
    borderColor: Theme.COLORS.white,
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
  popularBrandImage: {
    height: '100%',
    width: '100%',
    // borderRadius: 40,
    resizeMode: 'contain',
  },
  CBString: {
    ...Theme.fontStyles.h4Bold,
    color: Theme.COLORS.secondary,
    marginTop: 5,
    textAlign: 'center',
    marginBottom: 10,
    maxWidth: 70,
  },
});
