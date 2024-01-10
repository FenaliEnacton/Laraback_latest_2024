import React, {Component} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import {Container} from '@components/core';
import i18n from 'i18n-js';
import {AppImages} from '@assets/Images';
import {translationGetters} from '@translations';
import {internalApi} from '@user_redux/Services/api';
import {request_user_dashboard, request_user_favs} from '@user_redux/Actions';
import {rootApi} from '@app_redux/Services/api';
import NetInfo from '@react-native-community/netinfo';
import RNBootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  request_welcome_screen_data,
  request_privacy_terms,
  request_app_settings,
  request_bonus_types,
  request_all_stores,
} from '@app_redux/Actions';

const mapDispatchToProps = {
  request_welcome_screen_data,
  request_privacy_terms,
  request_app_settings,
  request_user_dashboard,
  request_user_favs,
  request_bonus_types,
  request_all_stores,
};

const mapStateToProps = state => {
  return {};
};

class SplashScreen extends Component {
  componentDidMount() {
    i18n.translations = {en: translationGetters.en()};
    i18n.locale = 'en';
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkConnectivity();
    });
    rootApi.setHeader('locale', 'en');
  }

  checkConnectivity = async () => {
    const connectivityState = await NetInfo.fetch();
    if (connectivityState.isConnected) {
      this.get_entry_data();
      this.props.request_welcome_screen_data();
      this.props.request_privacy_terms();
      this.props.request_app_settings();
      this.props.request_bonus_types();
      this.props.request_all_stores();
      RNBootSplash.hide();
    } else {
      // this.noInternetScreen();
      RNBootSplash.hide();
      this.props.navigation.navigate('NoInternet');
    }
  };

  // componentDidMount() {
  //   rootApi.setHeader('locale', 'en');
  //   this.get_entry_data();
  //   this.props.request_welcome_screen_data();
  //   this.props.request_privacy_terms();
  //   this.props.request_app_settings();
  //   this.props.request_bonus_types();
  // }

  get_entry_data = async () => {
    let UserLangAsyncData = await AsyncStorage.getItem('USER_LANG');
    let parsedUserLang = JSON.parse(UserLangAsyncData);
    if (parsedUserLang || true) {
      i18n.translations = {en: translationGetters.en()};
      i18n.locale = 'en';
      rootApi.setHeader('locale', 'en');
      let isFirstUseAsyncData = await AsyncStorage.getItem('IS_FIRST_USE');
      let UserTokenAsyncData = await AsyncStorage.getItem('USER_AUTH');
      let parsedUser = JSON.parse(isFirstUseAsyncData);
      let parsedUserToken = JSON.parse(UserTokenAsyncData);
      if (parsedUserToken && parsedUserToken.token) {
        internalApi.setHeaders({
          Authorization: parsedUserToken.token,
        });
        this.props.request_user_dashboard(false);
        this.props.request_user_favs('store');
      }
      if (parsedUser && !parsedUser.is_first_use) {
        this.props.navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } else {
        this.props.navigation.reset({
          index: 0,
          routes: [{name: 'Welcome'}],
        });
      }
    } else {
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'LanguageSelect'}],
      });
    }
  };

  render() {
    return (
      <>
        <ImageBackground
          style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          source={AppImages.launch_screen}
        />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
