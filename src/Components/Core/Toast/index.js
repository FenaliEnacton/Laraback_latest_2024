import {Platform, NativeModules} from 'react-native';
import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
const FToast = NativeModules.FToast;

// Y offset
const Y_OFFSET_TOP = Platform.select({ios: 87, android: 0});
const Y_OFFSET_BOTTOM = 140;
// const Y_OFFSET_BOTTOM = 70;
const Y_OFFSET_CENTER = 0;

// Color
const COLOR_ERROR = '#CC0000';
const COLOR_SUCCESS = '#007E33';
const COLOR_WARNING = '#FF8800';
const COLOR_INFO = '#000000';

module.exports = {
  errorTop: (msg) => {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    return (
      <>
        {/* {FToast.showCustom(msg, FToast.LONG, FToast.TOP, Y_OFFSET_TOP, COLOR_ERROR)} */}
      </>
    );
  },
  errorBottom: (msg) => {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    return (
      <>
        {/* {
          FToast.showCustom(
            msg,
            FToast.LONG,
            FToast.BOTTOM,
            Y_OFFSET_BOTTOM,
            COLOR_ERROR)
        } */}
      </>
    );
  },
  error: (msg) => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Error',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    return (
      <>
        {/* {FToast.showCustom(
          msg,
          FToast.LONG,
          FToast.CENTER,
          Y_OFFSET_CENTER,
          COLOR_ERROR,
        )} */}
      </>
    );
  },
  showTop: (msg) => {
    Toast.show({
      type: 'info',
      position: 'bottom',
      text1: 'Info',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    return (
      <>
        {/* {FToast.showCustom(msg, FToast.LONG, FToast.TOP, Y_OFFSET_TOP, COLOR_INFO)} */}
      </>
    );
  },

  showBottom: (msg) => {
    Toast.show({
      type: 'info',
      position: 'bottom',
      text1: 'Info',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    return (
      <>
        {/* {FToast.showCustom(
          msg,
          FToast.LONG,
          FToast.BOTTOM,
          Y_OFFSET_BOTTOM,
          COLOR_INFO,
        )} */}
      </>
    );
  },

  show: (msg) => {
    Toast.show({
      type: 'info',
      position: 'bottom',
      text1: 'Info',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    return (
      <>
        {/* {FToast.showCustom(
          msg,
          FToast.LONG,
          FToast.CENTER,
          Y_OFFSET_CENTER,
          COLOR_INFO,
        )} */}
      </>
    );
  },

  successTop: (msg) => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Success',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    return (
      <>
        {/* {
          FToast.showCustom(
            msg,
            FToast.LONG,
            FToast.TOP,
            Y_OFFSET_TOP,
            COLOR_SUCCESS,
          )
        } */}
      </>
    );
  },
  successBottom: (msg) => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Success',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    return (
      <>
        {}
        {/* {FToast.showCustom(
          msg,
          FToast.LONG,
          FToast.BOTTOM,
          Y_OFFSET_BOTTOM,
          COLOR_SUCCESS,
        )} */}
      </>
    );
  },
  success: (msg) => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Success',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    return (
      <>
        {/* {FToast.showCustom(
          msg,
          FToast.LONG,
          FToast.CENTER,
          Y_OFFSET_CENTER,
          COLOR_SUCCESS,
        )} */}
        {/* <ToastMsf msg={msg} color={COLOR_SUCCESS} offset={Y_OFFSET_CENTER} position={'center'} /> */}
      </>
    );
  },

  warnTop: (msg) => {
    Toast.show({
      type: 'info',
      position: 'bottom',
      text1: 'Warning',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    return (
      <>
        {/* {FToast.showCustom(
          msg,
          FToast.LONG,
          FToast.TOP,
          Y_OFFSET_TOP,
          COLOR_WARNING,
        )} */}
        {/* <ToastMsf msg={msg} color={COLOR_WARNING} offset={Y_OFFSET_TOP} position={'bottom'} /> */}
      </>
    );
  },
  warnBottom: (msg) => {
    Toast.show({
      type: 'info',
      position: 'bottom',
      text1: 'Warning',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    return (
      <>
        {/* {FToast.showCustom(
          msg,
          FToast.LONG,
          FToast.BOTTOM,
          Y_OFFSET_BOTTOM,
          COLOR_WARNING,
        )} */}
        {/* <ToastMsf msg={msg} color={COLOR_WARNING} offset={Y_OFFSET_BOTTOM} position={'bottom'} /> */}
      </>
    );
  },
  warn: (msg) => {
    Toast.show({
      type: 'info',
      position: 'bottom',
      text1: 'Warning',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    return (
      <>
        {/* {FToast.showCustom(
          msg,
          FToast.LONG,
          FToast.CENTER,
          Y_OFFSET_CENTER,
          COLOR_WARNING,
        )} */}
        {/* <ToastMsf msg={msg} color={COLOR_WARNING} offset={Y_OFFSET_CENTER} position={'center'} /> */}
      </>
    );
  },
  exitApp: (msg) => {
    Toast.show({
      type: 'info',
      position: 'bottom',
      text1: 'Info',
      text2: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    return (
      <>
        {/* {FToast.showCustom(
          msg,
          FToast.LONG,
          FToast.BOTTOM,
          Y_OFFSET_BOTTOM,
          COLOR_INFO,
        )}
        <ToastMsf msg={msg} color={COLOR_INFO} offset={Y_OFFSET_BOTTOM} position={'bottom'} /> */}
      </>
    );
  },
};
