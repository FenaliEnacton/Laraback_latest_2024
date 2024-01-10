import { Theme } from '@/Assets/Theme';
import React, { forwardRef } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
const windowHeight = Dimensions.get('window').height;

const FormBottomModal = forwardRef((props: any, ref: any) => {
  const { setBottomModalVisibleFalse, bottomModalShow } = props;

  const hideModal = () => {
    setBottomModalVisibleFalse();
  };

  return (
    <Modal
      ref={ref}
      transparent={true}
      animationType="fade"
      onRequestClose={hideModal}
      visible={bottomModalShow}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={hideModal}
        style={styles.modalBackground}>
        <View style={[styles.modalContent]}>{props.children}</View>
      </TouchableOpacity>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.white,
    width: '97%',
    alignSelf: 'center',
    // bottom: 0,
    // position: 'absolute',
    paddingTop: 5,
    paddingHorizontal: 8,
    paddingBottom: 30,
    minHeight: windowHeight * 0.4,
    maxHeight: windowHeight - 300,
  },
});

export default FormBottomModal;
