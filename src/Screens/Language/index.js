import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  I18nManager,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {Container} from '@components/core';
import {AppImages} from '@assets/Images';
import {Theme} from '@assets/Theme';
import Icon from '@assets/icons';
import SplashScreen from 'react-native-bootsplash';
import RNRestart from 'react-native-restart';
import i18n from 'i18n-js';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {translationGetters} from '@translations';
import {rootApi} from '@app_redux/Services/api';
import styles from './style';
import FastImage from 'react-native-fast-image';

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
  return {};
};

function LanguageSelect(props) {
  const [lang, set_lang] = useState('en');

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  function change_lang(sel_lang) {
    set_lang(sel_lang);
  }

  async function set_app_lang() {
    i18n.translations = {en: translationGetters.en()};
    i18n.locale = 'en';
    rootApi.setHeader('locale', 'en');
    await AsyncStorage.setItem('USER_LANG', JSON.stringify('en'));
    RNRestart.Restart();
    setTimeout(() => {
      props.navigation.navigate('Welcome');
    }, 3000);
  }

  function render_langs({item, index}) {
    return (
      <TouchableOpacity
        style={styles.lang_box}
        onPress={() => change_lang(item)}>
        <Icon.Ionicons
          name={lang === item ? 'radio-button-on' : 'radio-button-off-sharp'}
          style={styles.icon}
          color={Theme.COLORS.secondary}
          size={25}
        />
        <FastImage
          source={AppImages[Config.LANGS.images[item]]}
          style={styles.lang_image}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.lang}>{Config.LANGS.all[item]}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <Container style={styles.container}>
      <ImageBackground
        source={AppImages.language_selector}
        style={styles.bg_image}>
        <Text style={styles.choose_lang_text}>
          Choose your{' '}
          <Text style={{color: Theme.COLORS.secondary}}>Language</Text>
        </Text>
        <View style={styles.lang_container}>
          <FlatList
            data={Config.LANGS.keys}
            renderItem={render_langs}
            numColumns={2}
            keyExtractor={(index) => index.toString()}
            columnWrapperStyle={styles.row}
          />
          {/* <TouchableOpacity
            style={styles.lang_box}
            onPress={() => change_lang('hi')}>
            <Icon.Ionicons
              name={
                lang === 'hi' ? 'radio-button-on' : 'radio-button-off-sharp'
              }
              style={styles.icon}
              color={Theme.COLORS.secondary}
              size={25}
            />
            <Image
              source={AppImages.change_language_1}
              style={styles.lang_image}
            />
            <Text style={[styles.lang, {bottom: 10}]}>हिंदी</Text>
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity
          style={styles.apply_btn}
          onPress={() => set_app_lang()}>
          <Icon.AntDesign
            name={I18nManager.isRTL ? 'left' : 'right'}
            color={Theme.COLORS.white}
            size={22}
          />
        </TouchableOpacity>
      </ImageBackground>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelect);
