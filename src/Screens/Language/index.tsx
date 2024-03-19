import { AppImages } from '@/Assets/Images';
import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import Container from '@/Components/Core/Container';
import { rootApi } from '@/Services/api';
import { Config } from '@/react-native-config';
import { i18n, translationGetters } from '@/translations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  I18nManager,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SplashScreen from 'react-native-bootsplash';
import FastImage from 'react-native-fast-image';
import RNRestart from 'react-native-restart';
import { connect } from 'react-redux';
import styles from './style';

const mapDispatchToProps = {};

const mapStateToProps = state => {
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
    i18n.store(translationGetters.en());
    i18n.locale = 'en';
    rootApi.setHeader('locale', 'en');
    await AsyncStorage.setItem('USER_LANG', JSON.stringify('en'));
    RNRestart.Restart();
    setTimeout(() => {
      props.navigation.navigate('Welcome');
    }, 3000);
  }

  function render_langs({ item, index }) {
    return (
      <TouchableOpacity
        style={styles.lang_box}
        onPress={() => change_lang(item)}>
        <Icons.Ionicons
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
          <Text style={{ color: Theme.COLORS.secondary }}>Language</Text>
        </Text>
        <View style={styles.lang_container}>
          <FlatList
            data={Config.LANGS.keys}
            renderItem={render_langs}
            numColumns={2}
            keyExtractor={index => index.toString()}
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
          <Icons.AntDesign
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
