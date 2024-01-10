import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity as AndroidTouch,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import LBButton from '../LBButton';
// import Toast from '../Toast/FToast';
import {connect} from 'react-redux';
import {Theme} from '@assets/Theme';
import {request_log_out} from '../../../Redux/Actions';
import {translate} from '@translations';
import {AppImages} from '../../../Assets/Images';
import {TouchableOpacity as IOSTouch} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

const TouchableOpacity = Platform.OS === 'ios' ? IOSTouch : AndroidTouch;

const mapDispatchToProps = {
  request_log_out,
};

const mapStateToProps = state => {
  return {
    page_data: state.params.public_pages_data || {},
  };
};

function LogoutModal(props) {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      onRequestClose={props.onRequestClose}
      visible={props.visible}>
      <TouchableOpacity
        onPress={props.onRequestClose}
        style={styles.modalContainer}>
        <View style={styles.confirmContainer}>
          <FastImage
            source={AppImages.log_out_img}
            style={styles.lg_img}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.title}>
            {translate('are_you_sure_you_want_to_logout')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              props.request_log_out();
            }}>
            <LBButton
              label={translate('log_out')}
              btnStyle={[styles.btnStyle]}
              labelStyle={styles.btn_labelStyle}
              onPress={() => {
                props.request_log_out();
              }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutModal);

const styles = StyleSheet.create({
  title: {
    ...Theme.fontStyles.h2Bold,
    width: '90%',
    textAlign: 'center',
  },
  modalContainer: {
    // flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0003',
    alignSelf: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  confirmContainer: {
    backgroundColor: Theme.COLORS.white,
    borderRadius: 10,
    // height: 0,
    width: windowWidth - 40,
    marginHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: windowWidth - 70,
    justifyContent: 'space-between',
  },
  logoutBtn: {
    borderRadius: 20,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.primary,
  },
  btnTxt: {
    ...Theme.fontStyles.h3Bold,
    color: Theme.COLORS.white,
    paddingVertical: 8,
    width: 100,
    textTransform: 'capitalize',
    alignSelf: 'center',
    textAlign: 'center',
  },
  lg_img: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
});
