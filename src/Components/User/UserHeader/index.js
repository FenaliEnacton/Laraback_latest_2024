import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  I18nManager,
} from 'react-native';
import {connect} from 'react-redux';
import {translate} from '@translations';
import {AppImages} from '@assets/Images';
import Icon from '@assets/icons';
import {user_info_selector, user_lifetime_earning} from '@user_redux/Selectors';
import {Theme} from '@assets/Theme';
const windowWidth = Dimensions.get('window').width;

const UserHeader = props => {
  const {user_info, show_back} = props;
  return (
    // <ImageBackground
    //   source={AppImages.home_header_bg}
    //   style={styles.headerBackground}>
    //   <View style={styles.header_top_tab}>
    //     <TouchableOpacity onPress={props.headerOnPress}>
    //       <Text style={styles.header_welcome_text}>
    //         {show_back ? (
    //           <Icon.AntDesign
    //             style={styles.icon}
    //             name={I18nManager.isRTL ? 'right' : 'left'}
    //             color={Theme.COLORS.white}
    //             size={20}
    //           />
    //         ) : null}{' '}
    //         {props.title}
    //       </Text>
    //     </TouchableOpacity>
    //     <View style={styles.header_balance_box}></View>
    //   </View>
    //   <View style={styles.profileBox}>
    //     <View style={styles.leftProfileBox}>
    //       <Text style={styles.display_name}>{user_info.name}</Text>
    //       <Text style={styles.earning_text}>
    //         {translate('life_time_earning')}
    //         {': '}
    //         <Text style={styles.life_time_amount}>{props.total_earning}</Text>
    //       </Text>
    //     </View>
    //     {props.editOnPress ? (
    //       <TouchableOpacity
    //         style={styles.editButton}
    //         onPress={props.editOnPress}>
    //         <Icon.SimpleLineIcons
    //           name={'pencil'}
    //           color={Theme.COLORS.primary}
    //           size={14}
    //         />
    //       </TouchableOpacity>
    //     ) : null}
    //   </View>
    // </ImageBackground>
    <View style={styles.container}>
      <Text style={styles.userNameText}>
        {translate('hey')} {user_info.name}
      </Text>

      <Text style={styles.life_time_amount}>
        <Text style={styles.earning_text}>
          {translate('life_time_earning')}
        </Text>{' '}
        {props.total_earning}
      </Text>
    </View>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = ({params}) => {
  return {
    user_info: user_info_selector(params) || {},
    total_earning: params?.user_dashboard_data
      ? user_lifetime_earning(params.user_dashboard_data)
      : '',
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);

const styles = StyleSheet.create({
  headerBackground: {
    width: windowWidth,
    height: 145,
    marginHorizontal: 0,
    resizeMode: 'stretch',
    // marginBottom: 15,
  },
  header_welcome_text: {
    ...Theme.fontStyles.h2Bold,
    color: Theme.COLORS.white,
    textTransform: 'capitalize',
  },
  header_top_tab: {
    marginTop: 40,
    flexDirection: 'row',
    width: windowWidth - 20,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  app_name: {
    ...Theme.fontStyles.h1Bold,
    color: Theme.COLORS.white,
    fontSize: 18,
  },
  leftProfileBox: {
    width: windowWidth - 60,
  },
  profileBox: {
    ...Theme.appStyle.userWhiteCard,
    width: windowWidth - 25,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  display_name: {
    ...Theme.fontStyles.h2Bold,
    paddingTop: 0,
    marginTop: 0,
  },
  earning_text: {
    ...Theme.fontStyles.h4Regular,
    textAlign: 'left',
    marginTop: -5,
  },

  life_time_amount: {
    ...Theme.fontStyles.h2Bold,
    color: Theme.COLORS.secondary,
  },
  userNameText: {
    ...Theme.fontStyles.h1Bold,
    textAlign: 'left',
    color: Theme.COLORS.secondary,
  },
  life_time_amount: {
    ...Theme.fontStyles.h1Bold,
    fontSize: 20,
    textAlign: 'left',
  },
  container: {
    alignSelf: 'center',
    width: windowWidth * 0.95,
  },
});
