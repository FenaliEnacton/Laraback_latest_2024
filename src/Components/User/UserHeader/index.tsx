import { Theme } from '@/Assets/Theme';
import { user_info_selector } from '@/Redux/Selectors';
import { user_lifetime_earning } from '@/Redux/USER_REDUX/Selectors';
import { translate } from '@/translations';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
const windowWidth = Dimensions.get('window').width;

const UserHeader = props => {
  const { user_info } = props;
  return (
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

const mapStateToProps = ({ params }) => {
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
