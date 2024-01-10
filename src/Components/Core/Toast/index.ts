import ToastComponent from 'react-native-toast-message';

const Toast = {
  errorTop: msg => {
    ToastComponent.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  },
  errorBottom: msg => {
    ToastComponent.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  },
  error: msg => {
    ToastComponent.show({
      type: 'success',
      position: 'bottom',
      text1: 'Error',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  },
  showTop: msg => {
    ToastComponent.show({
      type: 'info',
      position: 'bottom',
      text1: 'Info',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  },
  showBottom: msg => {
    ToastComponent.show({
      type: 'info',
      position: 'bottom',
      text1: 'Info',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  },
  show: msg => {
    ToastComponent.show({
      type: 'info',
      position: 'bottom',
      text1: 'Info',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  },
  successTop: msg => {
    ToastComponent.show({
      type: 'success',
      position: 'bottom',
      text1: 'Success',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  },
  successBottom: msg => {
    ToastComponent.show({
      type: 'success',
      position: 'bottom',
      text1: 'Success',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  },
  success: msg => {
    ToastComponent.show({
      type: 'success',
      position: 'bottom',
      text1: 'Success',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  },
  warnTop: msg => {
    ToastComponent.show({
      type: 'info',
      position: 'bottom',
      text1: 'Warning',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  },
  warnBottom: msg => {
    ToastComponent.show({
      type: 'info',
      position: 'bottom',
      text1: 'Warning',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  },
  warn: msg => {
    ToastComponent.show({
      type: 'info',
      position: 'bottom',
      text1: 'Warning',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  },
  exitApp: msg => {
    ToastComponent.show({
      type: 'info',
      position: 'bottom',
      text1: 'Info',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  },
};

export default Toast;
