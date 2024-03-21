import { AppImages } from '@/Assets/Images';
import { Theme } from '@/Assets/Theme';
import BottomModal from '@/Components/Core/BottomModal';
import CloseButton from '@/Components/Core/CloseButton';
import LBButton from '@/Components/Core/LBButton';
import InputText from '@/Components/Core/TextBox';
import { request_user_register_verification } from '@/Redux/Actions/userAuthActions';
import { translate } from '@/translations';
import { ErrorMessage, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux';
import { object, string } from 'yup';
import AuthContainer from '../AuthContainer';
import styles from '../style';

const mapDispatchToProps = {
  request_user_register_verification,
};

const mapStateToProps = ({ params }) => {
  return {
    privacy_policy_data: params.app_info_data?.privacy || {},
    terms: params.app_info_data?.terms || {},
    loading: params.loading,
    app_settings: params.app_settings || {},
  };
};

const ConfirmRegistration = props => {
  const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);
  const [popupType, setPopupType] = useState('privacy');
  const [showDialPicker, setShowDialPicker] = useState(false);
  const [countryCode, setCountryCode] = useState(
    props.route.params?.country_code,
  );

  const privacy_policy_modal = useRef() as any;

  const handleLogin = values => {
    if (values.mobile && values.email) {
      let min = Math.ceil(1000);
      let max = Math.floor(9999);
      let otp = Math.floor(Math.random() * (max - min + 1)) + min;
      let mobile_otp = Math.floor(Math.random() * (max - min + 1)) + min;
      props.request_user_register_verification(
        values.email,
        otp,
        `+${countryCode} ${values.mobile}`,
        mobile_otp,
        props.route.params?.password,
        props.route.params?.referrer_code,
        props.route.params?.is_social,
        props.route.params?.social_id,
        props.route.params?.social_type,
      );
    }
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
  const loginSchema = object().shape({
    mobile: string()
      .trim()
      .max(10, translate('max_10_war'))
      .required(translate('required_field')),
    email: string()
      .trim()
      .email(translate('email_is_not_valid'))
      .max(255, translate('max_255_war'))
      .required(translate('required_field')),
  });
  const { privacy_policy_data, terms, app_settings } = props;

  return (
    <AuthContainer
      close_click={() => props.navigation.goBack()}
      loading_show={props.loading}
      bg_img={AppImages.sign_up_bg}>
      <Text style={styles.welcome_to_title}>{translate('welcome_to')}</Text>
      <Text style={styles.app_name}>{translate('app_name')}</Text>
      <Formik
        initialValues={{
          mobile: props.route.params?.mobile ? props.route.params?.mobile : '',
          email: props.route.params?.email ? props.route.params?.email : '',
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
                placeholder={translate('confirm_email')}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType={'email-address'}
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
              <LBButton
                label={translate('verify_now')}
                onPress={() => handleSubmit()}
                btnStyle={styles.btnStyle}
                labelStyle={styles.btn_labelStyle}
              />
            </>
          );
        }}
      </Formik>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmRegistration);
