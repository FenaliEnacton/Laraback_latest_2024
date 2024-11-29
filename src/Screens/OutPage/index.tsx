import { Theme } from '@/Assets/Theme';
import CloseButton from '@/Components/Core/CloseButton';
import Container from '@/Components/Core/Container';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import useUserAccountSettings from '@/Hooks/Api/use-user-account-settings';
import { translate } from '@/translations';
import React, { useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  Linking,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import styles from './style';
import { AppImages } from '@/Assets/Images';

const OutPage = props => {
  const outPageInfo = props.route?.params?.out_page_info || {};
  const [showLoader, setShowLoader] = useState(true);
  const { userInfo } = useUserAccountSettings();

  const webViewRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      InAppBrowser.close();
      openLink();
      setShowLoader(false);
    }, 5000);

    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    }

    return () => {
      if (Platform.OS === 'android') {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onAndroidBackPress,
        );
      }
    };
  }, []);

  const openLink = async () => {
    try {
      const url = props.route?.params?.out_page_info?.web_url.replace(
        ':user_id',
        //@ts-ignore
        userInfo.user_id,
      );

      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: Theme.COLORS.primary,
          preferredControlTintColor: 'white',
          readerMode: true,
          animated: true,
          modalPresentationStyle: 'currentContext',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: Theme.COLORS.primary,
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: false,
          forceCloseOnRedirection: false,
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          hasBackButton: true,
        });
        props.navigation.goBack();
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
      // Handle error
    }
  };

  const onAndroidBackPress = () => {
    if (webViewRef.current) {
      // webViewRef.current.goBack();
      return true;
    } else {
      return false;
    }
  };

  // const webUrl = out
  return (
    <Container style={{ backgroundColor: Theme.COLORS.white }}>
      <Header>
        <Header.Left
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <HeaderBackButton
            btnStyle={{
              justifyContent: 'center',
              backgroundColor: Theme.COLORS.primary,
            }}
            onPress={() => onAndroidBackPress()}
          />
        </Header.Left>
        <Header.Title>
          <Text style={[styles.headerTitle]}>{outPageInfo.header_title}</Text>
        </Header.Title>
        <Header.Right>
          <CloseButton
            btnStyle={{ height: 27, width: 27 }}
            onPress={() => props.navigation && props.navigation.goBack()}
          />
        </Header.Right>
      </Header>

      <Modal
        transparent
        animationType="fade"
        onRequestClose={() => {
          setShowLoader(false);
        }}
        visible={showLoader}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowLoader(false)}
          style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <FastImage
              source={AppImages.out_page_img}
              style={styles.feat_image}
              resizeMode={FastImage.resizeMode.contain}
            />

            {outPageInfo.cb_text ? (
              <View style={styles.cb_circle}>
                <Text style={styles.cb_text}>{outPageInfo.cb_text}</Text>
                <Text style={[styles.cb_text, { color: Theme.COLORS.primary }]}>
                  {translate('activated')}
                </Text>
              </View>
            ) : null}
            <View>
              {outPageInfo.store_logo ? (
                <>
                  <Text style={styles.redirect_text}>
                    {translate('you_are_being_redirected_to')}
                  </Text>

                  <View style={styles.img_box}>
                    <FastImage
                      source={{ uri: outPageInfo.store_logo }}
                      style={styles.store_logo}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                </>
              ) : null}
              {outPageInfo.coupon_code ? (
                <Text style={styles.coupon_copied_text}>
                  {translate('coupon_has_been_copied')}
                </Text>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </Container>
  );
};
export default OutPage;
