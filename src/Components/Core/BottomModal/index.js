import React, {useState, forwardRef} from 'react';
import {View, StyleSheet, Animated, Dimensions, Modal} from 'react-native';
import {Theme} from '@assets/Theme';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BottomModal = forwardRef((props, ref) => {
  const {setBottomModalVisibleFalse, bottomModalShow} = props;
  // const [yPosition, setyPosition] = useState(700);
  // const transformHeight = new Animated.Value(yPosition);

  // const startAnimation = () => {
  //   Animated.timing(transformHeight, {
  //     toValue: 0,
  //     duration: 400,
  //     useNativeDriver: true,
  //   }).start();
  // };

  const hidePopup = () => {
    // Animated.timing(transformHeight, {
    //   toValue: yPosition,
    //   duration: 400,
    //   useNativeDriver: true,
    // }).start();
    // setTimeout(() => {
    setBottomModalVisibleFalse();
    // }, 500);
  };

  const hideModal = () => {
    setBottomModalVisibleFalse();
  };

  return (
    <Modal
      ref={ref}
      transparent={true}
      animationType="fade"
      onRequestClose={hideModal}
      visible={bottomModalShow}
      // onShow={startAnimation}
    >
      <View
        activeOpacity={1}
        onPress={setBottomModalVisibleFalse}
        style={styles.modalBackground}>
        <View
          // onLayout={(event) => {
          //   const {height} = event.nativeEvent.layout;
          //   setyPosition(height);
          // }}
          // useNativeDriver={true}
          style={[styles.modalContent, props.style]}>
          {/* <TouchableOpacity activeOpacity={1} onPress={hideModal}>
              <Text>Close</Text>
            </TouchableOpacity> */}
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
    backgroundColor: Theme.COLORS.white,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    maxHeight: windowHeight - 150,
    // minHeight: windowHeight * 0.4,
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 10,
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
});

export default BottomModal;
