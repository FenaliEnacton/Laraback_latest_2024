import React, {useState, forwardRef} from 'react';
import {View, StyleSheet, Animated, Dimensions, Modal} from 'react-native';
import Content from '../Content/keyboardAwareScrollContent';
import {Theme} from '@assets/Theme';
const windowHeight = Dimensions.get('window').height;

const FormBottomModal = forwardRef((props, ref) => {
  const {setBottomModalVisibleFalse, bottomModalShow} = props;
  // const [yPosition, setyPosition] = useState(700);
  // const transformHeight = new Animated.Value(yPosition);

  // const startAnimation = () => {
  //   Animated.timing(transformHeight, {
  //     toValue: 0,
  //     duration: 500,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // const hidePopup = () => {
  //   Animated.timing(transformHeight, {
  //     toValue: yPosition,
  //     duration: 400,
  //     useNativeDriver: true,
  //   }).start();
  //   setTimeout(() => {
  //     setBottomModalVisibleFalse();
  //   }, 500);
  // };

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
      <View
        activeOpacity={1}
        onPress={hideModal}
        style={styles.modalBackground}>
        <View
          // onLayout={(event) => {
          //   const {height} = event.nativeEvent.layout;
          //   setyPosition(height);
          // }}
          style={[styles.modalContent]}>
          {props.children}
        </View>
      </View>
    </Modal>
  );
});

// function mapStateToProps(state) {
//   return {};
// }

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
