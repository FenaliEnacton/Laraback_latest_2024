import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  ScrollContent,
  Header,
  HeaderLeft,
  Container,
  Loader,
  HeaderTitle,
  LBButton,
  HeaderBackButton,
  HeaderRight,
} from '@components/core';
import {
  Text,
  View,
  BackHandler,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Theme} from '@assets/Theme';
import {AppImages} from '@assets/Images';
import NetInfo from '@react-native-community/netinfo';
import {translate} from '@translations';
import FastImage from 'react-native-fast-image';
const windowWidth = Dimensions.get('window').width;
// import {requestInit} from '@actions';

const styles = StyleSheet.create({
  ...Theme.appStyle,
  cBackground: {
    backgroundColor: Theme.COLORS.white,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    flex: 1,
    marginTop: 40,
    paddingVertical: 10,
  },
  internetText: {
    ...Theme.fontStyles.h1Bold,
    width: windowWidth - 100,
    alignSelf: 'center',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  sub_text: {
    ...Theme.fontStyles.h3Regular,
    color: Theme.COLORS.grey,
    width: windowWidth - 100,
    alignSelf: 'center',
    textAlign: 'center',
  },
  button: {
    height: 40,
    marginTop: 20,
    backgroundColor: Theme.COLORS.secondary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  noImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  app_icon: {height: 60, width: 150, resizeMode: 'contain'},
  btnStyle: {
    width: windowWidth - 100,
    backgroundColor: Theme.COLORS.secondary,
    marginVertical: 20,
  },
});

class NoInternet extends Component {
  handleBackPress = () => {
    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
    this.unsubscribe = NetInfo.addEventListener((state) => {
      this.handleConnectivityChange(state);
    });
  }
  componentWillUnmount() {
    this.backHandler.remove();
    this.unsubscribe();
  }

  handleConnectivityChange = ({isConnected}) => {
    if (isConnected && this.props.navigation.canGoBack()) {
      this.props.navigation.goBack();
    }
  };

  render() {
    const {loading} = this.props;
    return (
      <Container>
        <Header>
          <HeaderLeft>
            <HeaderBackButton onPress={() => {}} />
          </HeaderLeft>
          <HeaderTitle>
            <Text style={styles.headerTitle}>{translate('app_name')}</Text>
          </HeaderTitle>
          <HeaderRight />
        </Header>
        <ScrollContent style={styles.cBackground}>
          <View style={styles.textContainer}>
            <FastImage
              source={AppImages.app_icon}
              style={styles.app_icon}
              resizeMode={FastImage.resizeMode.contain}
            />
            <FastImage
              source={AppImages.no_internet}
              style={styles.noImage}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={styles.internetText}>
              {translate('no_internet_connection')}
            </Text>
            <Text style={styles.sub_text}>
              {translate('please_check_your_internet')}
            </Text>
            <LBButton
              label={translate('retry')}
              onPress={() => {}}
              btnStyle={styles.btnStyle}
            />
          </View>
        </ScrollContent>
        <Loader show={loading} />
      </Container>
    );
  }
}

function mapStateToProps({params}) {
  return {
    loading: params.loading || false,
  };
}

export default connect(mapStateToProps, {})(NoInternet);
