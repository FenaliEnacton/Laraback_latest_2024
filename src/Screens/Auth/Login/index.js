import React, {Component} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {LangSupportTxtInput, TextBox} from '@components/core';
import AuthContainer from '../AuthContainer';
import SocialSignIns from '../SocialSignIns';
import {LBButton} from '@components/core';
import {Formik, ErrorMessage} from 'formik';
import {Theme} from '@assets/Theme';
import {string, object} from 'yup';
import {translate} from '@translations';
import {request_user_login, request_social_login} from '@app_redux/Actions';
import {AppImages} from '@assets/Images';
import styles from '../style';
import FastImage from 'react-native-fast-image';
const password_input = React.createRef();
const mapDispatchToProps = {
  request_user_login,
  request_social_login,
};

const mapStateToProps = ({params}) => {
  return {
    loading: params.loading,
  };
};

class Login extends Component {
  state = {
    secureTextEntry: true,
    out_page_info: this.props.route?.params?.out_page_info || null,
  };

  handleLogin = values => {
    if (values.email && values.password && !this.props.loading) {
      this.props.request_user_login(
        values.email,
        values.password,
        this.state.out_page_info,
      );
    }
  };

  social_login = data => {
    this.props.request_social_login(
      data.email,
      data.social_id,
      data.social_type,
      '',
      '',
      '',
      this.state.out_page_info,
    );
  };

  render() {
    const {secureTextEntry} = this.state;
    const loginSchema = object().shape({
      email: string()
        .trim()
        .email(translate('email_is_not_valid'))
        .required(translate('required_field')),
      password: string().trim().required(translate('required_field')),
    });
    return (
      <AuthContainer
        close_click={() => this.props.navigation.goBack()}
        loading_show={this.props.loading || this.state.loading}
        bg_img={AppImages.login_bg}>
        <Text style={styles.welcome_title}>{translate('welcome_back')}</Text>

        <Formik
          initialValues={{
            email: 'ltoy@example.org',
            password: 'password',
          }}
          validationSchema={loginSchema}
          onSubmit={values => this.handleLogin(values)}>
          {({
            handleBlur,
            handleChange,
            values,
            handleSubmit,
            setFieldValue,
          }) => {
            return (
              <>
                <TextBox
                  placeholder={translate('email')}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  containerStyle={{marginBottom: 10}}
                  style={values.email ? {height: '40%'} : {height: '100%'}}
                  content={
                    values.email ? (
                      <Text style={styles.inputHeaderText}>
                        {' '}
                        {translate('email')}
                      </Text>
                    ) : null
                  }></TextBox>
                <ErrorMessage name="email">
                  {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                </ErrorMessage>
                <TextBox
                  placeholder={translate('password')}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={secureTextEntry}
                  style={values.password ? {height: '40%'} : {height: '100%'}}
                  content={
                    values.password ? (
                      <Text style={styles.inputHeaderText}>
                        {' '}
                        {translate('password')}
                      </Text>
                    ) : null
                  }>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({secureTextEntry: !secureTextEntry})
                    }>
                    <FastImage
                      source={AppImages.show_pass_icon}
                      style={styles.show_pass_img}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </TouchableOpacity>
                </TextBox>
                <ErrorMessage name="password">
                  {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                </ErrorMessage>
                <Text
                  style={styles.reset_pass_text}
                  onPress={() => this.props.navigation.navigate('ForgotPass')}>
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
          set_loading={value => this.setState({loading: value})}
          social_login={data => this.social_login(data)}
        />
        <Text style={styles.footer_text}>
          {translate('dont_have_account')}{' '}
          <Text
            style={{color: Theme.COLORS.secondary}}
            onPress={() => this.props.navigation.navigate('Signup')}>
            {translate('sign_up')}
          </Text>
        </Text>
      </AuthContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
