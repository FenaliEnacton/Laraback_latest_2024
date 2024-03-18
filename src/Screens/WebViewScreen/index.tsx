import React, { Component } from 'react';
import { BackHandler, Dimensions, Platform, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Container from '@/Components/Core/Container';
import ScrollContent from '@/Components/Core/Content/scrollContent';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import styles from './style';

class WebViewScreen extends Component<any> {
  constructor(props) {
    super(props);
  }
  webView: any = {
    canGoBack: false,
    ref: null,
  };
  state: any = {
    height: 120,
    out_page_info: this.props.route?.params?.out_page_info || {},
    showLoader: true,
    loading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showLoader: false });
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
      BackHandler.removeEventListener('hardwareBackPress', () => false);
    }
  }

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      // this.webView.ref.goBack();
      return true;
    }
    return false;
  };

  render() {
    const { out_page_info } = this.state;
    const web_url = out_page_info.web_url;
    // console.log('WebViewScreen -> render -> web_url', web_url);
    return (
      <Container>
        <Header>
          <Header.Left
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <HeaderBackButton
              btnStyle={{ justifyContent: 'center' }}
              onPress={() => this.props.navigation.goBack()}
            />
          </Header.Left>
          <Header.Title>
            <View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={[styles.headerTitle]}>
                  {out_page_info.header_title}
                </Text>
              </View>
            </View>
          </Header.Title>
          <Header.Right />
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
            source={{ uri: web_url }}
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
