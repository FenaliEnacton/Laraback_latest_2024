import { ErrorMessage, Formik } from 'formik';
import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { AppImages } from '@/Assets/Images';
import { Theme } from '@/Assets/Theme';
import BottomModal from '@/Components/Core/BottomModal';
import CloseButton from '@/Components/Core/CloseButton';
import LBButton from '@/Components/Core/LBButton';
import InputText from '@/Components/Core/TextBox';
import {
  request_social_login,
  request_user_register_verification,
} from '@/Redux/Actions/userAuthActions';
import { translate } from '@/translations';
import FastImage from 'react-native-fast-image';
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux';
import { object, string } from 'yup';
import AuthContainer from '../AuthContainer';
import SocialSignIns from '../SocialSignIns';
import styles from '../style';

const privacy_policy_modal: any = React.createRef();

const mapDispatchToProps = {
  request_user_register_verification,
  request_social_login,
};

const mapStateToProps = ({ params }) => {
  return {
    privacy_policy_data: params.app_info_data?.privacy || {},
    terms: params.app_info_data?.terms || {},
    loading: params.loading,
    app_settings: params.app_settings || {},
  };
};

const Signup = props => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [showReferInput, setShowReferInput] = useState(
    props.route?.params?.referrer_code ? true : false,
  );
  const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);
  const [popupType, setPopupType] = useState('privacy');
  const [showDialPicker, setShowDialPicker] = useState(false);
  const [countryCode, setCountryCode] = useState(
    props.route.params?.country_code,
  );
  const [referrerCode, setReferrerCode] = useState(
    props.route.params?.referrer_code,
  );
  const [loading, setLoading] = useState(false);

  const loginSchema = object().shape({
    mobile: string()
      .trim()
      .max(10, translate('max_10_war'))
      .required(translate('required_field')),
    email: string()
      .trim()
      .email(translate('email_is_not_valid'))
      .required(translate('required_field')),
    password: string().trim().required(translate('required_field')),
  });

  const handleLogin = values => {
    if (values.mobile && values.password && values.email) {
      //mobile check removed
      // props.navigation.navigate('ConfirmRegistration', {
      //   email: values.email,
      //   password: values.password,
      //   mobile: values.mobile,
      //   referrer_code: state.referrer_code,
      //   is_social: false,
      //   country_code: state.country_code,
      // });
      //mobile check removed
      let min = Math.ceil(1000);
      let max = Math.floor(9999);
      let otp = Math.floor(Math.random() * (max - min + 1)) + min;
      let mobile_otp = Math.floor(Math.random() * (max - min + 1)) + min;
      props.request_user_register_verification(
        values.email,
        otp,
        `+${countryCode} ${values.mobile}`,
        mobile_otp,
        values.password,
        referrerCode,
        false,
        '',
        '',
      );
    }
  };

  const social_login = data => {
    props.request_social_login(
      data.email,
      data.social_id,
      data.social_type,
      '',
      '',
      referrerCode,
    );
  };

  const renderDialCode = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          styles.monthTab,
          {
            backgroundColor:
              countryCode === props.app_settings.countries.all[item].dial_code
                ? Theme.COLORS.primary
                : Theme.COLORS.white,
          },
        ]}
        onPress={() => {
          setCountryCode(props.app_settings.countries.all[item].dial_code);
          setShowDialPicker(false);
        }}>
        <Text
          style={[
            styles.monthText,
            {
              color:
                countryCode === props.app_settings.countries.all[item].dial_code
                  ? Theme.COLORS.white
                  : Theme.COLORS.blackText,
            },
          ]}>
          + {props.app_settings.countries.all[item].dial_code}
        </Text>
      </TouchableOpacity>
    );
  };

  const DialCard = ({ value }) => {
    return (
      <View
        style={[
          {
            justifyContent: 'center',
            marginTop: 2,
            // backgroundColor: 'red',
          },
          value.mobile
            ? { height: '50%', alignSelf: 'flex-end' }
            : { height: '100%' },
        ]}>
        <Text
          style={styles.mobile_text}
          onPress={() => setShowDialPicker(true)}>
          + {countryCode ? countryCode : translate('select')}
        </Text>
      </View>
    );
  };

  const { privacy_policy_data, terms, app_settings } = props;
  return (
    <AuthContainer
      close_click={() => props.navigation.goBack()}
      loading_show={props.loading || loading}
      bg_img={AppImages.sign_up_bg}>
      <Text style={styles.welcome_to_title}>{translate('welcome_to')}</Text>
      <Text style={styles.app_name}>{translate('app_name')}</Text>

      <Formik
        initialValues={{
          mobile: '',
          email: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={values => handleLogin(values)}>
        {({
          handleBlur,
          handleChange,
          values,
          handleSubmit,
          setFieldValue,
        }) => {
          return (
            <>
              <InputText
                placeholder={translate('mobile_no')}
                keyboardType={'number-pad'}
                value={values.mobile}
                onChangeText={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                containerStyle={{ marginBottom: 10 }}
                preFixContent={<DialCard value={values} />}
                style={values.mobile ? { height: '55%' } : { height: '100%' }}
                content={
                  values.mobile ? (
                    <>
                      <Text style={styles.inputHeaderText}>
                        {' '}
                        {translate('mobile_no')}
                      </Text>
                    </>
                  ) : null
                }></InputText>
              <ErrorMessage name="mobile">
                {msg => <Text style={styles.errorMessage}>{msg}</Text>}
              </ErrorMessage>
              <InputText
                placeholder={translate('email')}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                containerStyle={{ marginBottom: 10 }}
                style={values.email ? { height: '40%' } : { height: '100%' }}
                content={
                  values.email ? (
                    <Text style={styles.inputHeaderText}>
                      {' '}
                      {translate('email')}
                    </Text>
                  ) : null
                }></InputText>
              <ErrorMessage name="email">
                {msg => <Text style={styles.errorMessage}>{msg}</Text>}
              </ErrorMessage>
              <InputText
                placeholder={translate('password')}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry={secureTextEntry}
                style={values.password ? { height: '40%' } : { height: '100%' }}
                content={
                  values.password ? (
                    <Text style={styles.inputHeaderText}>
                      {' '}
                      {translate('password')}
                    </Text>
                  ) : null
                }>
                <TouchableOpacity
                  onPress={() => setSecureTextEntry(!secureTextEntry)}>
                  <FastImage
                    source={AppImages.show_pass_icon}
                    style={styles.show_pass_img}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </TouchableOpacity>
              </InputText>
              <ErrorMessage name="password">
                {msg => <Text style={styles.errorMessage}>{msg}</Text>}
              </ErrorMessage>
              {!showReferInput ? (
                <Text
                  style={[
                    styles.reset_pass_text,
                    { color: Theme.COLORS.secondary },
                  ]}
                  onPress={() => setShowReferInput(true)}>
                  {translate('did_someone_refer')}
                </Text>
              ) : (
                <>
                  <InputText
                    placeholder={translate('refer_placeholder')}
                    value={referrerCode}
                    onChangeText={value => setReferrerCode(value)}
                    containerStyle={{ marginBottom: 10 }}
                    style={
                      referrerCode ? { height: '40%' } : { height: '100%' }
                    }
                    content={
                      referrerCode ? (
                        <Text style={styles.inputHeaderText}>
                          {' '}
                          {translate('refer_placeholder')}
                        </Text>
                      ) : null
                    }></InputText>
                </>
              )}
              <LBButton
                label={translate('join_now')}
                onPress={() => handleSubmit()}
                btnStyle={styles.btnStyle}
                labelStyle={styles.btn_labelStyle}
              />
            </>
          );
        }}
      </Formik>
      <SocialSignIns
        title={translate('join_with')}
        set_loading={value => setLoading(value)}
        social_login={data => social_login(data)}
      />
      <Text style={[styles.footer_text, { fontSize: 12 }]}>
        {translate('agree_text')}{' '}
        <Text
          style={{ color: Theme.COLORS.secondary }}
          onPress={() => {
            setShowPrivacyPolicyModal(true);
            setPopupType('privacy');
          }}>
          {translate('privacy_policy')}
        </Text>
        {translate('and')}
        <Text
          style={{ color: Theme.COLORS.secondary }}
          onPress={() => {
            setShowPrivacyPolicyModal(true);
            setPopupType('terms');
          }}>
          {translate('terms_of_use')}.
        </Text>
      </Text>
      <Text style={styles.footer_text}>
        {translate('already_have_an_account')}{' '}
        <Text
          style={{ color: Theme.COLORS.secondary }}
          onPress={() => props.navigation.navigate('Login')}>
          {translate('sign_in')}
        </Text>
      </Text>
      <BottomModal
        ref={privacy_policy_modal}
        bottomModalShow={showPrivacyPolicyModal}
        setBottomModalVisibleFalse={() => setShowPrivacyPolicyModal(false)}>
        <>
          <View style={styles.modal_top_notch} />

          {/* <Text style={styles.title}>{translate('privacy_policy')}</Text> */}
          <ScrollView
            style={styles.popup_scroll}
            showsVerticalScrollIndicator={false}>
            <HTMLView
              // style={styles.terms_content}
              value={
                popupType === 'privacy'
                  ? privacy_policy_data.footer_content
                  : terms.footer_content
              }
              stylesheet={StyleSheet.create({
                ...Theme.fontStyles.html_view_txtStyles,
              })}
            />
          </ScrollView>
          <View style={styles.btnBar}>
            <CloseButton
              btnStyle={styles.closeBtn}
              onPress={() =>
                privacy_policy_modal.current.props.onRequestClose()
              }
            />
          </View>
        </>
      </BottomModal>
      <BottomModal
        bottomModalShow={showDialPicker}
        setBottomModalVisibleFalse={() => setShowDialPicker(false)}>
        <>
          <View style={styles.modal_top_notch} />

          <Text style={styles.title}>{translate('select_dial_code')}</Text>
          <FlatList
            style={styles.modalList}
            data={app_settings?.countries?.keys}
            keyExtractor={(item, index) => index.toString()}
            extraData={props}
            renderItem={renderDialCode}
          />
          <View style={styles.btnBar}>
            <CloseButton
              btnStyle={styles.closeBtn}
              onPress={() => setShowDialPicker(false)}
            />
          </View>
        </>
      </BottomModal>
    </AuthContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
