import { AppImages } from '@/Assets/Images';
import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import Container from '@/Components/Core/Container';
import ScrollContent from '@/Components/Core/Content/scrollContent';
import DrawerMenu from '@/Components/Core/DrawerMenu';
import Loader from '@/Components/Core/Loader';
import LogoutModal from '@/Components/Core/LogoutModal';
import GradientFooter from '@/Components/Generic/GradientFooter';
import HomeCarousel from '@/Components/Generic/HomeCarousel';
import HomeCategoryCard from '@/Components/Generic/HomeListComponents/HomeCategoryCard';
import HomeCouponCard from '@/Components/Generic/HomeListComponents/HomeCouponCard';
import HomeDealCard from '@/Components/Generic/HomeListComponents/HomeDealCard';
import HomeImageCard from '@/Components/Generic/HomeListComponents/HomeImageCard';
import HomeLoader from '@/Components/Generic/HomeListComponents/HomeLoader';
import HomeTopStore from '@/Components/Generic/HomeListComponents/HomeTopStore';
import {
  request_app_home_screen_data,
  request_deal_info,
  request_home_screen_data,
} from '@/Redux/Actions/publicDataActions';
import { get_sorted_carousel_by_seq } from '@/Redux/Selectors';
import { user_lifetime_earning } from '@/Redux/USER_REDUX/Selectors';
import { translate } from '@/translations';
import { DrawerActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import SplashScreen from 'react-native-bootsplash';
import { connect } from 'react-redux';
import ComponentAnimation from '../../Components/Core/ComponentAnimation';
import styles from './style';

const mapDispatchToProps = {
  request_home_screen_data,
  request_deal_info,
  request_app_home_screen_data,
};

const mapStateToProps = ({ params }) => {
  return {
    app_home_screen_data: params?.app_home_screen_data
      ? Object.values(params.app_home_screen_data)
      : {},
    total_earning: params?.user_dashboard_data
      ? user_lifetime_earning(params.user_dashboard_data)
      : '',
    data_loading: params.store_details_loading || params.deep_link_loading,
    app_settings: params.app_settings || {},
    loading: params.home_loading,
  };
};
const Home = props => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const { total_earning, app_settings, loading } = props;

  useEffect(() => {
    props.request_app_home_screen_data();
    SplashScreen.hide();
  }, []);

  const getSectionType = ({ item, index }): any => {
    let data = Object.values(item) as object;

    switch (data[0].blockName) {
      case 'procash/slider':
        return (
          <ComponentAnimation index={index + 3}>
            <HomeCarousel
              item={get_sorted_carousel_by_seq(data[0])}
              navigation={props.navigation}
            />
          </ComponentAnimation>
        );
      case 'procash/top-stores':
        return (
          <ComponentAnimation direction={'left'} index={index + 3}>
            <HomeTopStore
              item={data[0]}
              navigation={props.navigation}
              animationDuration={index + 3}
            />
          </ComponentAnimation>
        );
      case 'procash/top-offers':
        return (
          <ComponentAnimation direction={'left'} index={index + 3}>
            <HomeCouponCard item={data[0]} navigation={props.navigation} />
          </ComponentAnimation>
        );
      case 'procash/top-deals':
        return (
          <ComponentAnimation direction={'left'} index={index + 3}>
            <HomeDealCard item={data[0]} navigation={props.navigation} />
          </ComponentAnimation>
        );
      case 'procash/featured-stores':
        return (
          <ComponentAnimation direction={'left'} index={index + 3}>
            <HomeTopStore
              item={data[0]}
              navigation={props.navigation}
              isFeatured={true}
              animationDuration={index + 3}
            />
          </ComponentAnimation>
        );
      case 'procash/image-component':
        return (
          <ComponentAnimation direction={'left'} index={index + 3}>
            <HomeImageCard item={data[0]} navigation={props.navigation} />
          </ComponentAnimation>
        );
      case 'procash/categories':
        return (
          <ComponentAnimation direction={'left'} index={index + 3}>
            <HomeCategoryCard item={data[0]} navigation={props.navigation} />
          </ComponentAnimation>
        );
      default:
        break;
    }
  };
  return (
    <Container style={styles.container}>
      <ComponentAnimation index={2}>
        <View style={styles.topHeader}>
          <TouchableOpacity
            style={styles.menuView}
            onPress={() =>
              props.navigation.dispatch(DrawerActions.openDrawer())
            }>
            <Icons.Entypo
              name={'menu'}
              color={Theme.COLORS.secondary}
              size={20}
            />
          </TouchableOpacity>
          <View
            style={{
              marginLeft: -140,
            }}>
            <Text style={styles.header_welcome_text}>
              {translate('welcome_to')}
            </Text>
            <Text style={styles.app_name}>{translate('app_name')}</Text>
          </View>
          <View style={styles.moneyView}>
            <Icons.Entypo
              name={'wallet'}
              color={Theme.COLORS.secondary}
              size={20}
            />
            <Text style={styles.balance_amount}>
              {total_earning ? total_earning : '00.00'}
            </Text>
          </View>
        </View>
      </ComponentAnimation>
      <ComponentAnimation index={3}>
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => props.navigation.navigate('Search')}>
          <View style={styles.search_textInput}>
            <Text style={styles.search_text}>
              {translate('search_cat_store')}
            </Text>
          </View>
          <Icons.AntDesign
            name={'search1'}
            color={Theme.COLORS.primary}
            size={16}
          />
        </TouchableOpacity>
      </ComponentAnimation>
      <ScrollContent style={styles.content} scrollEventThrottle={16}>
        {props.app_home_screen_data.length > 1 && !loading ? (
          <>
            <FlatList
              data={props.app_home_screen_data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={getSectionType}
            />
            <GradientFooter
              style={{ marginBottom: 80 }}
              button_title={translate('refer_n_earn_now')}
              main_title={translate('home_gr_title')}
              sub_title={translate('home_gr_sub_title').replace(
                '{:cashback_percent}',
                app_settings?.cashback?.referral_percent
                  ? app_settings?.cashback?.referral_percent
                  : 0,
              )}
              image={AppImages.gr_home_img}
              buttonClick={() => props.navigation.navigate('ReferNEarn')}
            />
          </>
        ) : (
          <HomeLoader />
        )}
      </ScrollContent>
      <DrawerMenu
        drawerShow={showDrawer}
        navigation={props.navigation}
        setDrawerVisibleFalse={() => setShowDrawer(false)}
        show_log_out={() => setShowLogout(true)}
      />
      <LogoutModal
        onRequestClose={() => setShowLogout(false)}
        visible={showLogout}
      />

      <Loader show={props.data_loading} />
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
