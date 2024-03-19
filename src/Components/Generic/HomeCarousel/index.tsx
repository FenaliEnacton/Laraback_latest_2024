import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
const windowWidth = Dimensions.get('window').width;
import { Theme } from '@/Assets/Theme';
import { navigate } from '@/Navigation/appNavigator';
import { request_get_id_by_url } from '@/Redux/Actions/publicDataActions';
import { is_user_logged_in } from '@/Redux/Selectors';
import { Config } from '@/react-native-config';
import ContentLoader, { Rect } from 'react-content-loader/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
export let _carousel = React.createRef();
class HomeCarousel extends Component<any> {
  state = {
    activeSlide: 0,
    carouselData: [],
  };

  //   shouldComponentUpdate(nextProps, nextState) {
  //     return this.state.activeSlide !== nextState.activeSlide;
  //   }
  // componentDidUpdate(prevProp, prevState) {
  //   if (prevProp.home_sliders != this.props.home_sliders) {
  //     if (this.props.home_sliders.length > 0) {
  //       this.props.home_sliders?.map(element => {
  //         let data = Object.values(element);
  //         if (data[0].blockName === 'procash/slider') {
  //           this.setState({carouselData: data[0]?.attrs?.slides});
  //         }
  //       });
  //     }
  //   }
  // }

  open_url = async item => {
    // console.log(item);
    if (item.link_type == 'external') {
      let navigation_options = {
        web_url: item.offer_link,
        cb_text: '',
        header_title: '',
        store_logo: '',
        coupon_code: null,
      };
      navigate('WebViewScreen', {
        out_page_info: navigation_options,
      });
    }
    if (item.link_type == 'internal') {
      // let navigation_options = {
      //   web_url: Config.APP_URL + item.offer_link,
      //   cb_text: '',
      //   header_title: '',
      //   store_logo: '',
      //   coupon_code: null,
      // };
      // this.props.navigation.navigate('WebViewScreen', {
      //   out_page_info: navigation_options,
      // });
      // console.log(navigation_options.web_url);
      // let link_data = navigation_options.web_url.split('/');
      let link_data = item.offer_link.split('/');
      this.props.request_get_id_by_url(
        link_data[1],
        link_data[2],
        // item.store_id,
      );
      // await Linking.openURL(navigation_options.web_url);
    }
    if (item.link_type == 'affiliate') {
      let navigation_options = {
        web_url:
          Config.APP_OUT_URL.replace(':type', 'store')
            .replace(':type_id', item.store_id)
            .replace(':locale', Config.LANG) +
          '?url=' +
          item.offer_link,
        cb_text: '',
        header_title: '',
        store_logo: '',
        coupon_code: null,
      };
      // console.log('resssss', web_url);
      if (this.props.is_member) {
        this.props.navigation.navigate('OutPage', {
          out_page_info: navigation_options,
        });
      } else {
        this.props.navigation.navigate('Login', {
          out_page_info: navigation_options,
        });
      }
    }
    // let navigation_options = {
    //   web_url: Config.APP_OUT_URL.replace(':type', 'store').replace(
    //     ':type_id',
    //     item.id,
    //   ),
    //   cb_text: store.cashback_enabled ? store.cashback_string : '',
    //   header_title: store?.name ? store?.name : '',
    //   store_logo: store?.logo ? store?.logo : '',
    //   coupon_code: coupon.code,
    // };
    //
  };

  pagination = () => {
    const { item } = this.props;
    const { activeSlide } = this.state;
    return (
      <View style={styles.pagination}>
        <Pagination
          dotsLength={item.length}
          activeDotIndex={activeSlide}
          dotStyle={styles.dot_styles}
          inactiveDotStyle={styles.inactive_dot_styles}
          inactiveDotOpacity={1}
          inactiveDotScale={2}
        />
      </View>
    );
  };

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.swiperImage}
        key={index.toString()}
        onPress={() => {
          this.open_url(item);
        }}>
        <Image
          style={styles.image}
          source={{
            uri: item.mobile_image_url[Config.LANG],
          }}
          //   resizeMode={FastImage.resizeMode.stretch}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const { item } = this.props;

    return (
      <View style={styles.swiper}>
        {item.length < 1 ? (
          <View style={styles.svg_loader}>
            <ContentLoader width={windowWidth - 25} height={140}>
              <Rect
                x="0"
                y="0"
                rx="10"
                ry="10"
                width={(windowWidth - 25).toString()}
                height="140"
              />
            </ContentLoader>
          </View>
        ) : (
          <Carousel
            ref={c => {
              _carousel = c;
            }}
            //ref={c => carousel = c}
            loop={true}
            lockScrollWhileSnapping={true}
            loopClonesPerSide={3}
            autoplay={true}
            autoplayDelay={2000}
            data={item}
            enableSnap={true}
            useScrollView={true}
            onSnapToItem={index => {
              this.setState({ activeSlide: index });
            }}
            renderItem={item => this._renderItem(item)}
            sliderWidth={windowWidth - 25}
            autoplayInterval={3000}
            itemWidth={windowWidth - 25}
          />
        )}
        {this.pagination()}
      </View>
    );
  }
}
function mapStateToProps({ params }) {
  // let id = params.user_info?.user?.ID ? params.user_info?.user?.ID : 0;
  return {
    home_sliders: params?.app_home_screen_data
      ? Object.values(params.app_home_screen_data)
      : {},
    is_member: is_user_logged_in(params) || false,
    user_id: 0,
    loading: params.loading,
  };
}

export default connect(mapStateToProps, { request_get_id_by_url })(
  HomeCarousel,
);

const styles = StyleSheet.create({
  swiper: {
    height: 160,
    width: windowWidth,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    // paddingBottom: 5,
    marginBottom: 20,
    // backgroundColor: 'red',
  },
  swiperImage: {
    height: 140,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.white,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.7)',
        shadowOffset: {
          height: 0.7,
          width: 1,
        },
        shadowOpacity: 0.7,
      },
      android: {
        elevation: 7,
      },
    }),
  },
  pagination: {
    position: 'absolute',
    bottom: -30,
    alignItems: 'center',
    alignSelf: 'center',
  },
  dot_styles: {
    width: 20,
    height: 6,
    borderRadius: 3,
    backgroundColor: Theme.COLORS.secondary,
  },
  inactive_dot_styles: {
    width: 3,
    height: 3,
    borderRadius: 2,
    marginRight: -3,
    backgroundColor: Theme.COLORS.primary,
  },
  image: {
    height: 140,
    width: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  svg_loader: {
    height: 140,
    // marginHorizontal: 7,
    marginVertical: 10,
    width: windowWidth - 25,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 20,
  },
});
