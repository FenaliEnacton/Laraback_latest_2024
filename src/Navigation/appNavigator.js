import React, {Component} from 'react';
import {BackHandler, Linking} from 'react-native';
import {Toast, CustomDrawerMenu, BottomTab} from '@components/core';
import {NavigationContainer, CommonActions} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import {translate} from '@translations';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import {createDrawerNavigator} from 'react-navigation-drawer';
// import {CommonActions} from '@react-navigation/native';
import {is_user_logged_in} from '@app_redux/Selectors';
// import {BottomTab} from '@components/core';
import {connect} from 'react-redux';
import Home from '../Screens/Home';
import LanguageSelect from '../Screens/Language';
import Login from '../Screens/Auth/Login';
import Signup from '../Screens/Auth/Signup';
import AllStores from '../Screens/AllStores';
import StoreDetails from '../Screens/StoreDetails';
import UserDashboard from '../Screens/UserDashboard';
import Clicks from '../Screens/CashbackActivities/Clicks';
import Shopping from '../Screens/CashbackActivities/Shopping';
import Referral from '../Screens/CashbackActivities/Referral';
import Bonus from '../Screens/CashbackActivities/Bonus';
import CashbackPayment from '../Screens/CashbackPayment';
import ContactUs from '../Screens/ContactUs';
import Welcome from '../Screens/Welcome';
import AllStoreCategories from '../Screens/AllStoreCategories';
import AllCouponCategories from '../Screens/AllCouponCategories';
import AllDealsCategories from '../Screens/AllDealsCategories';
import StoreCatDetail from '../Screens/StoreCatDetail';
import ReferNEarn from '../Screens/ReferNEarn';
import ReferralActivities from '../Screens/ReferNEarn/ReferralActivities';
import ReferralInvites from '../Screens/ReferNEarn/ReferralInvites';
import ShareNEarn from '../Screens/ShareNEarn';
import ConfirmRegistration from '../Screens/Auth/ConfirmRegistration';
import AboutUs from '../Screens/AboutUs';
import OutPage from '../Screens/OutPage';
import TermsOfUse from '../Screens/TermsOfUse';
import HowItWorks from '../Screens/HowItWorks';
import PrivacyPolicy from '../Screens/PrivacyPolicy';
import CouponCatDetails from '../Screens/CouponCatDetail';
import FAQs from '../Screens/FAQs';
import Favorites from '../Screens/Favorites';
import CreateClaim from '../Screens/CreateClaim';
import CashbackPaymentHistory from '../Screens/CashbackPaymentHistory';
import MissingClaim from '../Screens/MissingClaim';
import SplashScreen from '../Screens/SplashScreen';
import AllDeals from '../Screens/AllDeals';
import ForgotPass from '../Screens/Auth/ForgotPass';
import NoInternet from '../Screens/NoInternet';
import ChangePassword from '../Screens/Auth/ChangePassword';
import VerifyUser from '../Screens/Auth/VerifyUser';
import Search from '../Screens/Search';
import WebViewScreen from '../Screens/WebViewScreen';
import ShareNEarnHistory from '../Screens/ShareNEarn/ShareNEarnHistory';
import ViewMissingClaim from '../Screens/MissingClaim/ViewMissingClaim';
import AccountSettings from '../Screens/AccountSettings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OneSignal from 'react-native-onesignal';
import {request_get_id_by_url} from '@app_redux/Actions';
import {Theme} from '@assets/Theme';

import Config from 'react-native-config';
// import CustomDrawerMenu from '../Components/Core/CustomDrawerMenu';
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
const MainStack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const navigationRef = React.createRef();
export const isReadyRef = React.createRef();

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // // console.log('navigation failed');
  }
}

export function reset(...args) {
  navigationRef.current?.dispatch(CommonActions.reset(...args));
}

export function go_back() {
  navigationRef.current?.dispatch(CommonActions.goBack());
}

const mapDispatchToProps = {
  request_get_id_by_url,
};
const mapStateToProps = state => {
  return {
    loading: state.params.loading,
    is_member: is_user_logged_in(state.params) || false,
  };
};

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <BottomTab {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="AllStores" component={AllStores} />
      <Tab.Screen name="UserDashboard" component={UserDashboard} />
    </Tab.Navigator>
  );
}

function MyDrawer() {
  return (
    // <NavigationContainer>
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerMenu {...props} />}
      screenOptions={{
        headerShown: false,
        // drawerStyle: {backgroundColor: 'transparent'},
      }}
      initialRouteName="Home">
      <Drawer.Screen name="Home" component={MyTabs} />
      {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
    </Drawer.Navigator>
    // </NavigationContainer>
  );
}
class AppNavigator extends Component {
  state = {
    lastBack: null,
  };

  componentDidMount() {
    NetInfo.addEventListener(state => this.handleConnectivityChange(state));
    this.oneSignalInit();
    // OneSignal.init(Config.ONE_SIGNAL);
    // OneSignal.addEventListener('received', this.onReceived);
    // OneSignal.addEventListener('opened', this.onOpened);
    // OneSignal.addEventListener('ids', this.onIds);
    // OneSignal.configure(); // triggers the ids event;

    //deeplinking
    Linking.addEventListener('url', this.handle_deep_link_URL);
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          setTimeout(() => {
            this.handle_deep_link_URL(url);
          }, 6000);
        }
      })
      .catch(err => console.error('An error occurred', err));

    BackHandler.addEventListener('hardwareBackPress', () => {
      if (navigationRef.current) {
        let lastBack = this.state.lastBack;
        let currentTime = new Date().getTime();
        if (!!lastBack && lastBack + 10 * 1000 > currentTime) {
          return;
        } else {
          Toast.showBottom('Press back again to Exit');
        }
        this.setState({lastBack: currentTime});
        return true;
      } else {
        BackHandler.exitApp();
      }
      return true;
    });
  }

  oneSignalInit = () => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(Config.ONE_SIGNAL);
    //END OneSignal Init Code

    //Prompt for push on iOS
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.log('Prompt response:', response);
    });

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        );
        let notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
      },
    );

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('OneSignal: notification opened:', notification);
    });
  };

  handleConnectivityChange = ({isConnected}) => {
    if (isConnected) {
      this.setState({isConnected});
    } else {
      this.setState({isConnected});
      navigate('NoInternet');
    }
  };

  componentWillUnmount() {
    isReadyRef.current = false;
    Linking.removeEventListener('url', this.handle_deep_link_URL);
    // OneSignal.removeEventListener('received', this.onReceived);
    // OneSignal.removeEventListener('opened', this.onOpened);
    // OneSignal.removeEventListener('ids', this.onIds);
  }

  handle_deep_link_URL = link_obj => {
    console.log(
      '🚀 ~ file: appNavigator.js ~ line 166 ~ AppNavigator ~ link_obj',
      link_obj,
    );
    let url = link_obj.url ? link_obj.url : link_obj;
    let extracted_link = url.replace(Config.DEEP_LINK_URL, '');
    let link_data = [];
    if (extracted_link.includes('?referral=')) {
      link_data = extracted_link.split('?referral=');
      if (!this.props.is_member) {
        navigate('Signup', {referrer_code: link_data[1]});
      } else {
        Toast.showBottom(translate('you_are_already_logged_in'));
      }
    } else {
      link_data = extracted_link.split('/');
      this.props.request_get_id_by_url(link_data[1], link_data[2]);
    }
  };

  render() {
    return (
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}>
        <MainStack.Navigator
          headerMode="none"
          screenOptions={{headerShown: false}}
          initialRouteName={'SplashScreen'}>
          <Stack.Screen name="LanguageSelect" component={LanguageSelect} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ContactUs" component={ContactUs} />
          <Stack.Screen name="Home" component={MyDrawer} />
          <Stack.Screen name="Clicks" component={Clicks} />
          <Stack.Screen name="Shopping" component={Shopping} />
          <Stack.Screen name="CashbackPayment" component={CashbackPayment} />
          <Stack.Screen name="Bonus" component={Bonus} />
          <Stack.Screen name="Referral" component={Referral} />
          <Stack.Screen name="MissingClaims" component={MissingClaim} />
          <Stack.Screen name="ReferNEarn" component={ReferNEarn} />
          <Stack.Screen name="ShareNEarn" component={ShareNEarn} />
          <Stack.Screen name="FAQs" component={FAQs} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="HowItWorks" component={HowItWorks} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="CouponCatDetails" component={CouponCatDetails} />
          <Stack.Screen name="AllDeals" component={AllDeals} />
          <Stack.Screen name="ForgotPass" component={ForgotPass} />
          <Stack.Screen name="OutPage" component={OutPage} />
          <Stack.Screen name="StoreCatDetail" component={StoreCatDetail} />
          <Stack.Screen name="StoreDetails" component={StoreDetails} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="VerifyUser" component={VerifyUser} />
          <Stack.Screen name="Favorites" component={Favorites} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="AccountSettings" component={AccountSettings} />
          <Stack.Screen name="CreateClaim" component={CreateClaim} />
          <Stack.Screen name="ReferralInvites" component={ReferralInvites} />
          <Stack.Screen name="NoInternet" component={NoInternet} />
          <Stack.Screen name="ViewMissingClaim" component={ViewMissingClaim} />
          <Stack.Screen
            name="ShareNEarnHistory"
            component={ShareNEarnHistory}
          />
          <Stack.Screen
            name="ReferralActivities"
            component={ReferralActivities}
          />
          <Stack.Screen
            name="ConfirmRegistration"
            component={ConfirmRegistration}
          />
          <Stack.Screen
            name="AllStoreCategories"
            component={AllStoreCategories}
          />
          <Stack.Screen
            name="AllDealsCategories"
            component={AllDealsCategories}
          />
          <Stack.Screen
            name="AllCouponCategories"
            component={AllCouponCategories}
          />
          <Stack.Screen
            name="CashbackPaymentHistory"
            component={CashbackPaymentHistory}
          />
          <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
        </MainStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
