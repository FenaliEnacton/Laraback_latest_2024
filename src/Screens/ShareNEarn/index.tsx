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
import HeaderRight from '@/Components/Core/Header/HeaderRight';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import LBButton from '@/Components/Core/LBButton';
import Loader from '@/Components/Core/Loader';
import TextBox from '@/Components/Core/TextBox';
import Toast from '@/Components/Core/Toast';
import EmptyListView from '@/Components/Generic/EmptyListView';
import GradientFooter from '@/Components/Generic/GradientFooter';
import NavigationList from '@/Components/User/NavigationList';
import { request_share_n_earn_info } from '@/Redux/Actions/publicDataActions';
import { get_all_stores, is_user_logged_in } from '@/Redux/Selectors';
import {
  failed_user_link_create,
  request_user_link_create,
} from '@/Redux/USER_REDUX/Actions/userLinkActions';
import Config from '@/react-native-config';
import { translate } from '@/translations';
import Clipboard from '@react-native-community/clipboard';
import { ErrorMessage, Formik } from 'formik';
import LottieView from 'lottie-react-native';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
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
import { connect } from 'react-redux';
import { object, string } from 'yup';
import FeaturedStore from '../../Components/Generic/FeaturedStore';
import styles from './style';

const NAV_LIST_1 = get_user_internal_nav_list([10006]);
const bottom_modal = React.createRef() as any;

const mapDispatchToProps = {
  request_share_n_earn_info,
  request_user_link_create,
  failed_user_link_create,
};

const mapStateToProps = ({ params }) => {
  return {
    share_n_earn_info: params.share_n_earn_info || {},
    is_member: is_user_logged_in(params) || false,
    user_link_created_data: params.user_link_created_data || {},
    all_stores: get_all_stores(params.stores) || {},
    loading: params.loading,
  };
};

class ShareNEarn extends Component<any> {
  state: any = {
    show_bottom_modal: false,
    modal_type: 'terms',
    highest_cashback_stores_list: {},
    showLoader: true,
  };

  getHighestCashbackStore = () => {
    let percent = [];
    let fixed = [];
    percent = this.props.all_stores
      .filter(a => a.amount_type === 'percent')
      .sort((a, b) => Number(b.cashback_amount) - Number(a.cashback_amount));

    fixed = this.props.all_stores
      .filter(a => a.amount_type === 'fixed')
      .sort((a, b) => Number(b.cashback_amount) - Number(a.cashback_amount));

    this.setState({
      highest_cashback_stores_list: fixed.concat(percent)?.slice(0, 25),
    });
  };

  componentDidMount() {
    this.props.request_share_n_earn_info();
    this.getHighestCashbackStore();
  }

  create_link = values => {
    if (values.title && values.link) {
      this.props.request_user_link_create(values.link, values.title);
    }
  };

  copy_referral_url = () => {
    Clipboard.setString(this.props.user_link_created_data.link);
    Toast.successBottom(translate('copied'));
  };

  renderStore = ({ item, index }) => {
    return <FeaturedStore store={item} />;
  };
  handle_social_share = () => {
    const shareOptions = {
      title: Config.APP_NAME,
      message: '',
      url: this.props.user_link_created_data.link,
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

  render() {
    const {
      share_n_earn_info,
      is_member,
      user_link_created_data,
      failed_user_link_create,
    } = this.props;

    const { modal_type, showLoader } = this.state;

    const share_n_earn_list = share_n_earn_info['procash/section']?.blocks
      ? share_n_earn_info['procash/section']?.blocks
      : [];

    const share_schema = object().shape({
      title: string().trim().required(translate('required_field')),
      link: string().trim().required(translate('required_field')),
    });

    return (
      <Container>
        <Header>
          <Header.Left>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </Header.Left>
          <Header.Title>
            <Text style={styles.headerTitle}>{translate('share_n_earn')}</Text>
          </Header.Title>
          <HeaderRight />
        </Header>
        {is_member ? (
          <KeyboardAwareContent>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={['#f5e3e6', '#d9e4f5']}
              style={[styles.gradientCard]}>
              <LottieView
                source={AppImages.share_n_earn}
                style={styles.screen_img}
                loop
                autoPlay
              />
            </LinearGradient>
            <View style={styles.bonus_types}>
              <Text style={styles.screen_title}>
                {translate('create_share_link')}
              </Text>
            </View>
            <View style={styles.hiw_card}>
              {share_n_earn_list.map((e, index) => {
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
                    {index != share_n_earn_list.length - 1 ? (
                      <View style={styles.line} />
                    ) : null}
                  </>
                );
              })}
            </View>

            {/* {this.props.user_info?.email_verified_at ? (
              <> */}
            {user_link_created_data.link ? (
              <>
                <Text style={styles.referLinkTitle}>
                  {translate('copy_link_n_share')}
                </Text>
                <TouchableOpacity
                  style={styles.linkCard}
                  onPress={() => this.copy_referral_url()}>
                  <Text style={styles.email} numberOfLines={1}>
                    {user_link_created_data.link}
                  </Text>
                  <View style={styles.copy_btn}>
                    <Icons.FontAwesome
                      name={'copy'}
                      color={Theme.COLORS.primary}
                      size={18}
                    />
                  </View>
                </TouchableOpacity>
              </>
            ) : (
              <Formik
                initialValues={{
                  title: '',
                  link: '',
                }}
                validationSchema={share_schema}
                onSubmit={values => this.create_link(values)}>
                {({ handleBlur, handleChange, values, handleSubmit }) => {
                  return (
                    <>
                      <TextBox
                        placeholder={translate('offer_title')}
                        value={values.title}
                        onChangeText={handleChange('title')}
                        onBlur={handleBlur('title')}
                        style={
                          values.title ? { height: '40%' } : { height: '100%' }
                        }
                        content={
                          values.title ? (
                            <Text style={styles.inputHeaderText}>
                              {' '}
                              {translate('offer_title')}
                            </Text>
                          ) : null
                        }></TextBox>

                      <Text style={styles.sub_title}>
                        {translate('enter_unique_offer_title')}
                      </Text>
                      <ErrorMessage name="title">
                        {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                      </ErrorMessage>
                      <TextBox
                        placeholder={translate('offer_link')}
                        value={values.link}
                        onChangeText={handleChange('link')}
                        onBlur={handleBlur('link')}
                        style={
                          values.link ? { height: '40%' } : { height: '100%' }
                        }
                        content={
                          values.link ? (
                            <Text style={styles.inputHeaderText}>
                              {' '}
                              {translate('offer_link')}
                            </Text>
                          ) : null
                        }></TextBox>

                      <Text style={styles.sub_title}>
                        {translate('enter_offer_link_sub')}
                      </Text>
                      <ErrorMessage name="link">
                        {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                      </ErrorMessage>
                      <LBButton
                        label={translate('create_link')}
                        btnStyle={[
                          styles.btnStyle,
                          { backgroundColor: Theme.COLORS.secondary },
                        ]}
                        onPress={handleSubmit}
                      />
                    </>
                  );
                }}
              </Formik>
            )}

            {user_link_created_data.link ? (
              <>
                <View style={styles.orView}>
                  <View style={styles.separator} />
                  <Text style={styles.OrText}>{translate('or')}</Text>
                  <View style={styles.separator} />
                </View>
                <View style={styles.share_box}>
                  <Text style={styles.referLinkTitle}>
                    {translate('share_social_network')}
                  </Text>
                  <View style={styles.socialShareBox}>
                    {/* {Social_Share_List.map((item, index) => {
                return ( */}
                    <TouchableOpacity
                      style={styles.socialBtn}
                      onPress={() => this.handle_social_share()}>
                      <Icons.AntDesign
                        name={'sharealt'}
                        color={Theme.COLORS.secondary}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <LBButton
                  label={translate('create_new_link')}
                  btnStyle={[
                    styles.btnStyle,
                    { backgroundColor: Theme.COLORS.secondary },
                  ]}
                  onPress={() => {
                    failed_user_link_create();
                  }}
                />
              </>
            ) : null}

            <Text style={[styles.referLinkTitle, { marginTop: 20 }]}>
              {translate('share_from_highest_cashback_store')}
            </Text>
            <FlatList
              data={this.state.highest_cashback_stores_list}
              horizontal={true}
              onEndReachedThreshold={0.9}
              maxToRenderPerBatch={10}
              legacyImplementation={true}
              ListEmptyComponent={<EmptyListView />}
              initialNumToRender={10}
              ListFooterComponent={
                showLoader &&
                this.state.highest_cashback_stores_list?.length > 0 ? (
                  <ActivityIndicator size={'small'} />
                ) : null
              }
              onEndReached={() => {
                this.setState({ showLoader: false });
              }}
              showsHorizontalScrollIndicator={false}
              renderItem={this.renderStore}
            />
            <Text
              style={styles.tnc_title}
              onPress={() =>
                this.setState({
                  show_bottom_modal: true,
                  modal_type: 'terms',
                })
              }>
              {translate('terms_n_condition')}
            </Text>
            <View style={styles.hiw_box}>
              <Text
                style={styles.hiw_text}
                onPress={() =>
                  this.setState({ show_bottom_modal: true, modal_type: 'hiw' })
                }>
                {translate('how_it_works')}{' '}
              </Text>
              <Icons.Entypo
                name={'chevron-down'}
                color={Theme.COLORS.secondary}
                size={18}
              />
            </View>
            <NavigationList
              list={NAV_LIST_1}
              navigation={this.props.navigation}
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
              {share_n_earn_list.map((e, index) => {
                return (
                  <View
                    style={[
                      styles.refer_tab,
                      { flexDirection: index % 2 == 0 ? 'row' : 'row-reverse' },
                    ]}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.share_title_number}>
                        0{index + 1}
                      </Text>
                    </View>
                    <View style={styles.share_row}>
                      <Text
                        style={[
                          styles.share_title,
                          { textAlign: index % 2 == 0 ? 'left' : 'right' },
                        ]}>
                        {e.title[Config.LANG]}
                      </Text>
                      <Text
                        style={[
                          styles.share_desc,
                          { textAlign: index % 2 == 0 ? 'left' : 'right' },
                        ]}>
                        {e.content[Config.LANG]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
            <GradientFooter
              button_title={translate('share_now')}
              main_title={''}
              sub_title={translate('share_gr_sub_title')}
              image={AppImages.gr_share_img}
              buttonClick={() => this.props.navigation.navigate('Login')}
            />
            <Text style={styles.title}>{translate('terms')}</Text>
            <HTMLView
              style={styles.terms_content}
              value={
                share_n_earn_info['procash/custom-list']?.terms?.markup[
                  Config.LANG
                ]
              }
              stylesheet={StyleSheet.create({
                ...Theme.fontStyles.html_view_txtStyles,
              })}
            />
          </ScrollContent>
        )}
        <BottomModal
          ref={bottom_modal}
          bottomModalShow={this.state.show_bottom_modal}
          setBottomModalVisibleFalse={() =>
            this.setState({ show_bottom_modal: false })
          }>
          <>
            <View style={styles.modal_top_notch} />

            {modal_type === 'terms' ? (
              <Text style={styles.modal_title}>
                {translate('terms_n_condition')}
              </Text>
            ) : (
              <Text style={styles.modal_title}>
                {translate('how_it_works')}
              </Text>
            )}
            <ScrollView showsVerticalScrollIndicator={false}>
              {modal_type === 'terms' ? (
                <>
                  <HTMLView
                    style={styles.terms_content}
                    value={
                      share_n_earn_info['procash/custom-list']?.terms?.markup[
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
                  {share_n_earn_list.map((e, index) => {
                    return (
                      <View
                        style={[
                          styles.refer_tab,
                          {
                            flexDirection:
                              index % 2 == 0 ? 'row' : 'row-reverse',
                          },
                        ]}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.share_title_number}>
                            0{index + 1}
                          </Text>
                        </View>
                        <View style={styles.share_row}>
                          <Text
                            style={[
                              styles.share_title,
                              { textAlign: index % 2 == 0 ? 'left' : 'right' },
                            ]}>
                            {e.title[Config.LANG]}
                          </Text>
                          <Text
                            numberOfLines={2}
                            style={[
                              styles.share_desc,
                              { textAlign: index % 2 == 0 ? 'left' : 'right' },
                            ]}>
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
                onPress={() => bottom_modal.current.props.onRequestClose()}
              />
            </View>
          </>
        </BottomModal>
        <Loader show={this.props.loading} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareNEarn);
