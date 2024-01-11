import { AppImages } from '@/Assets/Images';
import { Theme } from '@/Assets/Theme';
import Toast from '@/Components/Core/Toast';
// import api, { userFbLogin } from '@/Services/api';
import Config from '@/react-native-config';
import { translate } from '@/translations';
// import { appleAuth } from '@invertase/react-native-apple-authentication';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import React, { useEffect } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
// import FBSDK, { LoginManager } from 'react-native-fbsdk-next';

const VersionIOS = parseInt(Platform.Version.toString(), 10);
const windowWidth = Dimensions.get('window').width;

function SocialSignIns(props) {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.GOOGLE_ID,
      offlineAccess: true,
    });
  }, []);
  // async function fbsignin() {
  //   LoginManager.logOut();
  //   props.set_loading(true);
  //   if (Platform.OS === 'android') {
  //     LoginManager.setLoginBehavior('web_only');
  //   }
  //   const { AccessToken } = FBSDK;
  //   LoginManager.logInWithPermissions(['public_profile', 'email'])
  //     .then(result => {
  //       if (result.isCancelled) {
  //         props.set_loading(false);
  //       } else {
  //         AccessToken.getCurrentAccessToken().then((data: any) => {
  //           const { accessToken } = data;
  //           userFbLogin(accessToken).then(response => {
  //             props.social_login({
  //               email: response.email,
  //               social_id: response.id,
  //               social_type: 'facebook',
  //             });
  //             props.set_loading(false);
  //           });
  //         });
  //       }
  //     })
  //     .catch(e => console.log(e));
  // }

  // async function onAppleButtonPress() {
  //   // performs login request
  //   props.set_loading(true);
  //   const appleAuthRequestResponse: any = await appleAuth.performRequest({
  //     requestedOperation: appleAuth.Operation.LOGIN,
  //     requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //   });
  //   const credentialState = await appleAuth.getCredentialStateForUser(
  //     appleAuthRequestResponse.user,
  //   );
  //   if (credentialState === appleAuth.State.AUTHORIZED) {
  //     api
  //       .user_auth_api('auth/appleUser', {
  //         email: appleAuthRequestResponse.email,
  //         fullName: appleAuthRequestResponse.fullName.givenName,
  //         identityToken: appleAuthRequestResponse.identityToken,
  //         nonce: appleAuthRequestResponse.nonce,
  //         user: appleAuthRequestResponse.user,
  //       })
  //       .then(res => {
  //         if (res.ok && res.data?.data && !res.data?.error) {
  //           props.social_login({
  //             email: res.data?.data?.email,
  //             social_id: res.data?.data.user,
  //             social_type: 'apple',
  //           });
  //         } else {
  //           Toast.showBottom(translate('apple_authentication_failed'));
  //         }
  //       });
  //   } else {
  //     Toast.showBottom(translate('apple_authentication_failed'));
  //   }
  //   props.set_loading(false);
  // }

  async function google_sign_in() {
    try {
      props.set_loading(true);
      let hasPermission = await GoogleSignin.hasPlayServices();
      if (hasPermission) {
        const userInfo = await GoogleSignin.signIn();
        if (userInfo.user) {
          props.social_login({
            email: userInfo.user.email,
            social_id: userInfo.user.id,
            social_type: 'google',
          });
          props.set_loading(false);
        }
        props.set_loading(false);
      } else {
        props.set_loading(false);
      }
    } catch (error: any) {
      props.set_loading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Toast.showBottom(translate('SIGN_IN_CANCELLED'));
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Toast.showBottom(translate('PLAY_SERVICES_NOT_AVAILABLE'));
      } else {
        Toast.errorBottom(translate('login_request_failed'));
        console.log(error);
      }
    }
    props.set_loading(false);
  }

  const show_toast_message = () => {
    Toast.showBottom('Please login with Test user');
  };

  return (
    <>
      <View style={styles.orView}>
        <View style={styles.separator} />
        <Text style={styles.OrText}>{translate('or')}</Text>
        <View style={styles.separator} />
      </View>
      <View style={styles.container}>
        {/* <Text style={styles.title}>{props.title}</Text> */}
        <TouchableOpacity
          style={styles.social_btn}
          onPress={() => {
            // fbsignin();
            show_toast_message();
          }}>
          <FastImage
            source={AppImages.facebook_sign_in_icon}
            style={styles.social_icons}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.social_btn}
          // onPress={() => show_toast_message()}>
          onPress={() => google_sign_in()}>
          <FastImage
            source={AppImages.google_sign_in_icon}
            style={styles.social_icons}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
        {Platform.OS === 'ios' && VersionIOS > 12 ? (
          <TouchableOpacity
            style={styles.social_btn}
            onPress={() => show_toast_message()}>
            {/* // onPress={() => onAppleButtonPress()}> */}
            <FastImage
              source={AppImages.apple_sign_in_icon}
              style={styles.social_icons}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {/* <View style={styles.orView}>
        <View style={styles.separator} />
        <Text style={styles.OrText}>{translate('or')}</Text>
        <View style={styles.separator} />
      </View>
      <AppleButton
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: 160, // You must specify a width
          height: 40, // You must specify a height
          alignSelf: 'center',
        }}
        onPress={() => onAppleButtonPress()}
      /> */}
    </>
  );
}
export default SocialSignIns;

const styles = StyleSheet.create({
  container: {
    maxWidth: windowWidth - 20,
    // height: 40,
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: 10,
    alignSelf: 'center',
    // backgroundColor: Theme.COLORS.white,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: 'rgba(0,0,0, 0.5)',
    //     shadowOffset: {
    //       height: 0.5,
    //       width: 1,
    //     },
    //     shadowOpacity: 0.5,
    //   },
    //   android: {
    //     elevation: 5,
    //   },
    // }),
  },
  title: {
    ...Theme.fontStyles.h4Bold,
    textTransform: 'capitalize',
    marginRight: 5,
    width: '25%',
  },
  social_btn: {
    width: 70,
    height: 50,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: Theme.COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.5)',
        shadowOffset: {
          height: 0.3,
          width: 1,
        },
        shadowOpacity: 0.3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  orView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 250,
    alignSelf: 'center',
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0, 0.2)',
    width: '40%',
  },
  OrText: {
    ...Theme.fontStyles.h3Bold,
    color: 'rgba(0,0,0, 0.4)',
    width: 35,
    textAlign: 'center',
  },
  social_icons: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
    alignSelf: 'center',
  },
});
