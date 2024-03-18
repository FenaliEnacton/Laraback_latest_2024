import { AppImages } from '@/Assets/Images';
import { request_all_stores } from '@/Redux/Actions/metaDataActions';
import {
  request_app_settings,
  request_bonus_types,
  request_privacy_terms,
  request_welcome_screen_data,
} from '@/Redux/Actions/publicDataActions';
import { rootApi } from '@/Redux/Services/api';
import { request_user_dashboard } from '@/Redux/USER_REDUX/Actions/userDashboardActions';
import { request_user_favs } from '@/Redux/USER_REDUX/Actions/userFavsActions';
import { internalApi } from '@/Redux/USER_REDUX/Services/api';
import { i18n, translationGetters } from '@/translations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { connect } from 'react-redux';

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

class SplashScreen extends Component<any> {
  unsubscribe: any;
  componentDidMount() {
    i18n.store(translationGetters.en());
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
    let UserLangAsyncData = (await AsyncStorage.getItem('USER_LANG')) as any;
    let parsedUserLang = JSON.parse(UserLangAsyncData);
    if (parsedUserLang || true) {
      i18n.translations = { en: translationGetters.en() };
      i18n.locale = 'en';
      rootApi.setHeader('locale', 'en');
      let isFirstUseAsyncData = (await AsyncStorage.getItem(
        'IS_FIRST_USE',
      )) as any;
      let UserTokenAsyncData = (await AsyncStorage.getItem('USER_AUTH')) as any;
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
          routes: [{ name: 'Home' }],
        });
      } else {
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        });
      }
    } else {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'LanguageSelect' }],
      });
    }
  };

  render() {
    return (
      <>
        <ImageBackground
          style={{ width: '100%', height: '100%' }}
          source={AppImages.launch_screen}
          resizeMode="contain"
        />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
