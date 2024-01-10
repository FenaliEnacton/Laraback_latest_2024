import {WebView} from 'react-native-webview';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  BackHandler,
  Platform,
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
import {AppImages} from '@assets/Images';
import {Theme} from '@assets/Theme';
import styles from './style';
import {translate} from '@translations';

class WebViewScreen extends Component {
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
      this.setState({showLoader: false});
    }, 5000);
    if (Platform.OS === 'android') {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.onAndroidBackPress,
      );
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  };

  render() {
    const {out_page_info} = this.state;
    const web_url = out_page_info.web_url;
    // console.log('WebViewScreen -> render -> web_url', web_url);
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
              onPress={() => this.props.navigation.goBack()}
            />
          </HeaderLeft>
          <HeaderTitle>
            <View>
              <View style={{flexDirection: 'column'}}>
                <Text style={[styles.headerTitle]}>
                  {out_page_info.header_title}
                </Text>
              </View>
            </View>
          </HeaderTitle>
          <HeaderRight />
        </Header>
        <ScrollContent>
          <WebView
            style={{
              width: windowWidth,
              height: windowHeight - 70,
            }}
            ref={webView => {
              this.webView.ref = webView;
            }}
            onNavigationStateChange={navState => {
              this.webView.canGoBack = navState.canGoBack;
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            // renderLoading={true}
            startInLoadingState={true}
            // onLoadStart={() => this.setState({ showLoader: true })}
            // onLoadEnd={() => this.setState({ showLoader: false })}
            source={{uri: web_url}}
          />
        </ScrollContent>
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

export default connect(mapStateToProps, {})(WebViewScreen);
