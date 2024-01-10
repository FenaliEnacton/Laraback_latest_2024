import {WebView} from 'react-native-webview';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  BackHandler,
  Modal,
} from 'react-native';
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  ScrollContent,
  HeaderBackButton,
  CashbackString,
} from '@components/core';
import {connect} from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import CloseButton from '../../Components/Core/CloseButton';
import {AppImages} from '@assets/Images';
import {Theme} from '@assets/Theme';
import styles from './style';
import {translate} from '@translations';
import FastImage from 'react-native-fast-image';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

class OutPage extends Component {
  constructor(props) {
    super(props);
    this.webView = {
      canGoBack: false,
      ref: null,
    };
    this.state = {
      height: 120,
      out_page_info: this.props.route?.params?.out_page_info || {},
      showLoader: true,
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      InAppBrowser.close();
      this.openLink();
      this.setState({showLoader: false});
    }, 5000);
    if (Platform.OS === 'android') {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.onAndroidBackPress,
      );
    }
  }

  async openLink() {
    try {
      const url = this.props.route?.params?.out_page_info?.web_url.replace(
        ':user_id',
        this.props.user_id,
      );
      // const url = 'https://www.google.com';
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
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

          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          hasBackButton: true,
          // headers: {
          //   'my-custom-header': 'my custom header value',
          // },
        });
        this.props.navigation.goBack();
      } else Linking.openURL(url);
    } catch (error) {
      // Alert.alert(error.message);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }

  onAndroidBackPress = () => {
    if (this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    } else {
      return false;
    }
  };

  render() {
    const {out_page_info} = this.state;
    const web_url = out_page_info.web_url.replace(
      ':user_id',
      this.props.user_id,
    );
    return (
      <Container>
        <Header>
          <HeaderLeft
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <HeaderBackButton
              btnStyle={{justifyContent: 'center'}}
              onPress={() => this.onAndroidBackPress()}
            />
          </HeaderLeft>
          <HeaderTitle>
            <View>
              <View style={{flexDirection: 'column'}}>
                <Text style={[styles.headerTitle]}>
                  {out_page_info.header_title}
                </Text>
                {out_page_info.cb_text ? (
                  <CashbackString
                    icon={{marginTop: 2, marginRight: 0}}
                    cb_style={{
                      alignSelf: 'center',
                    }}
                    icon_size={12}
                    cb_text={styles.cb_text}
                    cashback_string={out_page_info.cb_text}
                  />
                ) : null}
              </View>
            </View>
          </HeaderTitle>
          <HeaderRight>
            <CloseButton
              btnStyle={{height: 27, width: 27}}
              onPress={() =>
                this.props.navigation && this.props.navigation.goBack()
              }
            />
          </HeaderRight>
        </Header>
        {/* <ScrollContent contentContainerStyle={{flexGrow: 1}}> */}

        {/* </ScrollContent> */}
        {/* <Loader show={this.state.showLoader} /> */}
        <Modal
          transparent
          animationType="fade"
          onRequestClose={() => this.setState({showLoader: false})}
          visible={this.state.showLoader}>
          <View
            activeOpacity={1}
            onPress={() => this.setState({showLoader: false})}
            style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <FastImage
                source={AppImages.out_page_img}
                style={styles.feat_image}
                resizeMode={FastImage.resizeMode.contain}
              />
              <FastImage
                source={AppImages.app_icon}
                style={styles.app_icon}
                resizeMode={FastImage.resizeMode.contain}
              />
              {out_page_info.cb_text ? (
                <View style={styles.cb_circle}>
                  <Text style={styles.cb_text}>{out_page_info.cb_text}</Text>
                  <Text style={[styles.cb_text, {color: Theme.COLORS.primary}]}>
                    {translate('activated')}
                  </Text>
                </View>
              ) : null}
              <View>
                {out_page_info.store_logo ? (
                  <>
                    <Text style={styles.redirect_text}>
                      {translate('you_are_being_redirected_to')}
                    </Text>

                    <View style={styles.img_box}>
                      <FastImage
                        source={{uri: out_page_info.store_logo}}
                        style={styles.store_logo}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </View>
                  </>
                ) : null}
                {out_page_info.coupon_code ? (
                  <Text style={styles.coupon_copied_text}>
                    {translate('coupon_has_been_copied')}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  let id = state.params.user_info?.user_id
    ? state.params.user_info?.user_id
    : 0;
  return {
    user_id: id,
  };
}

export default connect(mapStateToProps, {})(OutPage);
