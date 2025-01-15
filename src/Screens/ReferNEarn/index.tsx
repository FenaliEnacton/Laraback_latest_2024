import { AppImages } from '@/Assets/Images';
import { get_user_internal_nav_list } from '@/Assets/RouterList';
import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import BottomModal from '@/Components/Core/BottomModal';
import CloseButton from '@/Components/Core/CloseButton';
import Container from '@/Components/Core/Container';
import KeyboardAwareContent from '@/Components/Core/Content/keyboardAwareScrollContent';
import ScrollContent from '@/Components/Core/Content/scrollContent';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import LangSupportTxtInput from '@/Components/Core/LangSupportTxtInput';
import Loader from '@/Components/Core/Loader';
import { Toast } from '@/Components/Core/Toast';
import GradientFooter from '@/Components/Generic/GradientFooter';
import NavigationList from '@/Components/User/NavigationList';
import usePublicData from '@/Hooks/Api/use-public-data';
import useUserAuth from '@/Hooks/Api/use-user-auth';
import useUserReferral from '@/Hooks/Api/use-user-referral';
import { get_currency_string, is_email_valid } from '@/Utils';
import { Config } from '@/react-native-config';
import { translate } from '@/translations';
import Clipboard from '@react-native-clipboard/clipboard';
import { ErrorMessage, Formik } from 'formik';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import HTMLView from 'react-native-htmlview';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import { object, string } from 'yup';
import styles from './style';
const NAV_LIST_1 = get_user_internal_nav_list([10003, 10004]);

const ReferNEarn = props => {
  const [showBottomModal, setShowBottomModal] = useState(false);
  const [modalType, setModalType] = useState('terms');

  const { userInfo } = useUserAuth();
  const { request_user_referral_invite } = useUserReferral();
  const {
    referNEarnInfo,
    request_refer_n_earn_info,
    loadingReferNEarnInfo,
    appSettings,
    bonusTypes,
  }: any = usePublicData();
  const is_member = userInfo?.id ? true : false;
  let referral_link = '';
  useEffect(() => {
    if (userInfo?.referral_code) {
      referral_link =
        Config.REGISTER_PAGE.replace(':locale', Config.LANG) +
        (userInfo?.referral_code ? userInfo?.referral_code : '');
    }
  }, [userInfo]);

  useEffect(() => {
    request_refer_n_earn_info();
  }, []);

  const copy_referral_url = () => {
    Clipboard.setString(referral_link);
    Toast.successBottom(translate('copied'));
  };

  const handle_social_share = () => {
    const shareOptions = {
      title: Config.APP_NAME,
      message: `${translate('join_refer')}\n`,
      url: referral_link,
      // social: Share.Social[type],
    };
    Share.open(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const send_invite_link = values => {
    if (values.email) {
      let emails = values.email.split(',');
      if (emails.every(is_email_valid)) {
        request_user_referral_invite(values.email);
      } else {
        Toast.errorBottom(translate('enter_valid_email'));
      }
    }
  };

  const handle_invite_now_click = () => {
    if (is_member) {
      props.navigation.navigate('Login');
    }
  };

  const refer_n_earn_list = referNEarnInfo['procash/section']?.blocks
    ? referNEarnInfo['procash/section']?.blocks
    : [];

  const email_schema = object().shape({
    email: string()
      .trim()
      // .email(translate('email_is_not_valid'))
      .max(255)
      .required(translate('required_field')),
  });
  return (
    <Container>
      <Header>
        <Header.Left>
          <HeaderBackButton onPress={() => props.navigation.goBack()} />
        </Header.Left>
        <Header.Title>
          <Text style={styles.headerTitle}>{translate('refer_n_earn')}</Text>
        </Header.Title>
        <Header.Right />
      </Header>
      {is_member ? (
        <KeyboardAwareContent>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['#f5e3e6', '#d9e4f5']}
            style={[styles.gradientCard]}>
            <LottieView
              source={AppImages.referNEarn_bg}
              style={styles.screen_img}
              loop
              autoPlay
            />
          </LinearGradient>
          {/* <Text style={styles.screen_title}>
              {translate('refer_n_earn')}{' '}
              {user_info.referral_percent
                ? user_info.referral_percent
                : Config.REFERRAL_PERCENT}
              % {translate('bonus_from_your_friend')}
            </Text> */}
          <View style={styles.bonus_types}>
            <View style={{ flexDirection: 'row' }}>
              <Icons.MaterialCommunityIcons
                name={'account-cash'}
                color={Theme.COLORS.secondary}
                size={15}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.bonus_text}>
                {userInfo.referral_percent
                  ? userInfo.referral_percent
                  : appSettings?.cashback?.referral_percent}
                {translate('rewards_make')}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icons.Ionicons
                name={'wallet'}
                color={Theme.COLORS.secondary}
                size={15}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.bonus_text}>
                {translate('joins_earn')}
                {get_currency_string(bonusTypes.refer_bonus.amount)}{' '}
                {translate('referral_bonus')}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icons.FontAwesome5
                name={'user-friends'}
                color={Theme.COLORS.secondary}
                size={15}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.bonus_text}>
                {translate('will_earn')}{' '}
                {get_currency_string(bonusTypes.join_with_refer.amount)}{' '}
                {translate('join_bonus')}
              </Text>
            </View>
          </View>
          {/* <View style={styles.hiw_box}>
              <Text
                style={styles.hiw_text}
                onPress={() =>
                  setState({show_bottom_modal: true, modal_type: 'hiw'})
                }>
                {translate('how_it_works')}{' '}
              </Text>
              <Icon.Entypo
                name={'chevron-down'}
                color={Theme.COLORS.secondary}
                size={18}
              />
            </View> */}
          <View style={styles.hiw_card}>
            {refer_n_earn_list.map((e, index) => {
              return (
                <>
                  <View style={{ flexDirection: 'column', width: 50 }}>
                    <View style={styles.hiw_icon_card}>
                      <FastImage
                        source={{
                          uri: e.image ? e.image : Config.EMPTY_IMAGE_URL,
                        }}
                        style={styles.hiw_img}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </View>
                    <Text style={styles.hiwText}>{e.title[Config.LANG]}</Text>
                  </View>
                  {index != refer_n_earn_list.length - 1 ? (
                    <View style={styles.line} />
                  ) : null}
                </>
              );
            })}
          </View>
          {/* {props.user_info?.email_verified_at ? (
              <> */}
          <Text style={styles.input_title}>
            {translate('copy_invite_friend')}
          </Text>
          <TouchableOpacity
            style={styles.linkCard}
            onPress={() => copy_referral_url()}>
            <Text style={styles.email} numberOfLines={1}>
              {referral_link}
            </Text>
            <View style={styles.copy_btn}>
              <Icons.FontAwesome
                name={'copy'}
                color={Theme.COLORS.primary}
                size={18}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.sub_title}>{translate('unique_referral')}</Text>
          <View style={styles.share_box}>
            <Text style={styles.referLinkTitle}>
              {translate('share_social_network')}
            </Text>
            <View style={styles.socialShareBox}>
              {/* {Social_Share_List.map((item, index) => {
                return ( */}
              <TouchableOpacity
                style={styles.socialBtn}
                onPress={() => handle_social_share()}>
                <Icons.AntDesign
                  name={'sharealt'}
                  color={Theme.COLORS.secondary}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.orView}>
            <View style={styles.separator} />
            <Text style={styles.OrText}>{translate('or')}</Text>
            <View style={styles.separator} />
          </View>
          <Text style={[styles.input_title, { marginTop: 20 }]}>
            {translate('invite_by_email')}
          </Text>
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={email_schema}
            onSubmit={values => send_invite_link(values)}>
            {({ handleBlur, handleChange, values, handleSubmit }) => {
              return (
                <>
                  <View style={styles.email_input}>
                    <LangSupportTxtInput
                      style={styles.textInput}
                      placeholder={translate('enter_emails')}
                      value={values.email}
                      keyboardType={'email-address'}
                      onBlur={handleBlur('email')}
                      onChangeText={handleChange('email')}
                      name="email"
                    />
                    <TouchableOpacity
                      style={[
                        styles.copy_btn,
                        { backgroundColor: Theme.COLORS.cb_rates },
                      ]}
                      onPress={() => {
                        handleSubmit();
                      }}>
                      <Icons.Feather
                        name={'send'}
                        color={Theme.COLORS.secondary}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  <ErrorMessage name="email">
                    {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                  </ErrorMessage>
                </>
              );
            }}
          </Formik>
          <Text
            style={styles.tnc_title}
            onPress={() => {
              setShowBottomModal(true);
              setModalType('terms');
            }}>
            {translate('terms_n_condition')}
          </Text>
          <Text
            style={styles.hiw_text}
            onPress={() => {
              setShowBottomModal(true);
              setModalType('hiw');
            }}>
            {translate('how_it_works')}{' '}
          </Text>

          <NavigationList
            list={NAV_LIST_1}
            navigation={props.navigation}
            style={styles.navListStyle}
            containerStyle={{
              marginVertical: 20,
              alignItems: 'center',
            }}
            numberOfLines={2}
            textStyle={styles.routeText}
          />
          {/* </>
            ) : (
              <EmailVerification />
            )} */}
        </KeyboardAwareContent>
      ) : (
        <ScrollContent>
          <View style={styles.how_to_refer_box}>
            {refer_n_earn_list.map((e, index) => {
              return (
                <View style={styles.refer_tab} key={index.toString()}>
                  <FastImage
                    source={{
                      uri: e.image ? e.image : Config.EMPTY_IMAGE_URL,
                    }}
                    style={styles.refer_img}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <View style={styles.refer_row}>
                    <Text style={styles.refer_title}>
                      {e.title[Config.LANG]}
                    </Text>
                    <Text style={styles.refer_desc}>
                      {e.content[Config.LANG]}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          <GradientFooter
            button_title={translate('invite_now')}
            main_title={''}
            sub_title={translate('home_gr_sub_title').replace(
              '{:cashback_percent}',
              appSettings?.cashback?.referral_percent
                ? appSettings?.cashback?.referral_percent
                : 5,
            )}
            image={AppImages.gr_refer_img}
            buttonClick={() => handle_invite_now_click()}
          />
          <Text style={styles.title}>{translate('terms')}</Text>
          <HTMLView
            style={styles.terms_content}
            value={
              referNEarnInfo['procash/custom-list']?.terms?.markup[Config.LANG]
            }
            stylesheet={StyleSheet.create({
              ...Theme.fontStyles.html_view_txtStyles,
            })}
          />
        </ScrollContent>
      )}
      <BottomModal
        bottomModalShow={showBottomModal}
        setBottomModalVisibleFalse={() => setShowBottomModal(false)}>
        <>
          <View style={styles.modal_top_notch} />

          {modalType === 'terms' ? (
            <Text style={styles.modal_title}>
              {translate('terms_n_condition')}
            </Text>
          ) : (
            <Text style={styles.modal_title}>{translate('how_it_works')}</Text>
          )}
          <ScrollView showsVerticalScrollIndicator={false}>
            {modalType === 'terms' ? (
              <>
                <HTMLView
                  style={styles.terms_content}
                  value={
                    referNEarnInfo['procash/custom-list']?.terms?.markup[
                      Config.LANG
                    ]
                  }
                  stylesheet={StyleSheet.create({
                    ...Theme.fontStyles.html_view_txtStyles,
                  })}
                />
              </>
            ) : (
              <>
                {refer_n_earn_list.map((e, index) => {
                  return (
                    <View style={styles.refer_tab} key={index.toString()}>
                      <FastImage
                        source={{
                          uri: e.image ? e.image : Config.EMPTY_IMAGE_URL,
                        }}
                        style={styles.refer_img}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                      <View style={styles.refer_row}>
                        <Text style={styles.refer_title}>
                          {e.title[Config.LANG]}
                        </Text>
                        <Text style={styles.refer_desc}>
                          {e.content[Config.LANG]}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </>
            )}
          </ScrollView>
          <View style={styles.btnBar}>
            <CloseButton
              // btnStyle={styles.closeBtn}
              onPress={() => setShowBottomModal(false)}
            />
          </View>
        </>
      </BottomModal>
      <Loader show={loadingReferNEarnInfo} />
    </Container>
  );
};

export default ReferNEarn;
