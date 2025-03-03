import { AppImages } from '@/Assets/Images';
import { Theme } from '@/Assets/Theme';
import LBButton from '@/Components/Core/LBButton';
import InputText from '@/Components/Core/TextBox';
import {
  request_social_login,
  request_user_login,
} from '@/Redux/Actions/userAuthActions';
import { translate } from '@/translations';
import { ErrorMessage, Formik } from 'formik';
import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { object, string } from 'yup';
import AuthContainer from '../AuthContainer';
import SocialSignIns from '../SocialSignIns';
import styles from '../style';

const mapDispatchToProps = {
  request_user_login,
  request_social_login,
};

const mapStateToProps = ({ params }) => {
  return {
    loading: params.loading,
  };
};

const Login = props => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const loginSchema = object().shape({
    email: string()
      .trim()
      .email(translate('email_is_not_valid'))
      .required(translate('required_field')),
    password: string().trim().required(translate('required_field')),
  });

  const handleLogin = values => {
    if (values.email && values.password && !props.loading) {
      props.request_user_login(
        values.email,
        values.password,
        props.route?.params?.out_page_info,
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
      '',
      props.route?.params?.out_page_info,
    );
  };

  return (
    <AuthContainer
      close_click={() => props.navigation.goBack()}
      loading_show={props.loading || loading}
      bg_img={AppImages.login_bg}>
      <Text style={styles.welcome_title}>{translate('welcome_back')}</Text>

      <Formik
        initialValues={{
          email: 'ltoy@example.org',
          password: 'password',
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
                  onPress={() => {
                    setSecureTextEntry(!secureTextEntry);
                  }}>
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
              <Text
                style={styles.reset_pass_text}
                onPress={() => props.navigation.navigate('ForgotPass')}>
                {translate('forgot_password')}
              </Text>
              <LBButton
                label={translate('sign_in')}
                onPress={() => handleSubmit()}
                btnStyle={styles.btnStyle}
                labelStyle={styles.btn_labelStyle}
              />
            </>
          );
        }}
      </Formik>

      <SocialSignIns
        title={translate('login_with')}
        set_loading={value => setLoading(value)}
        social_login={data => social_login(data)}
      />
      <Text style={styles.footer_text}>
        {translate('dont_have_account')}{' '}
        <Text
          style={{ color: Theme.COLORS.secondary }}
          onPress={() => props.navigation.navigate('Signup')}>
          {translate('sign_up')}
        </Text>
      </Text>
    </AuthContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
