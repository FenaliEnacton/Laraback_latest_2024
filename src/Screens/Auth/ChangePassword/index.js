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
import {request_forgot_change_password} from '@app_redux/Actions';
import {AppImages} from '@assets/Images';
import styles from '../style';
import FastImage from 'react-native-fast-image';
const password_input = React.createRef();
const mapDispatchToProps = {
  request_forgot_change_password,
};

const mapStateToProps = ({params}) => {
  return {
    loading: params.loading,
  };
};

class ChangePassword extends Component {
  state = {
    secureTextEntry: true,
    otp: this.props.route.params?.otp,
    email: this.props.route.params?.email,
    cpSecureTextEntry: true,
  };
  handleLogin = values => {
    if (
      values.password &&
      values.cpassword &&
      values.password === values.cpassword &&
      !this.props.loading
    ) {
      this.props.request_forgot_change_password(
        this.state.email,
        values.password,
        this.state.otp,
      );
    }
  };
  render() {
    const {secureTextEntry, cpSecureTextEntry} = this.state;
    const loginSchema = object().shape({
      cpassword: string().trim().required(translate('required_field')),
      password: string().trim().required(translate('required_field')),
    });
    return (
      <AuthContainer
        close_click={() => this.props.navigation.goBack()}
        loading_show={this.props.loading || this.state.loading}
        bg_img={AppImages.change_pwd_bg}>
        <Text style={styles.app_name}>{translate('set_new_password')}</Text>
        <Formik
          initialValues={{
            password: '',
            cpassword: '',
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
                  placeholder={translate('password')}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  // secureTextEntry={secureTextEntry}
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

                <TextBox
                  placeholder={translate('confirm_password')}
                  value={values.cpassword}
                  onChangeText={handleChange('cpassword')}
                  onBlur={handleBlur('cpassword')}
                  secureTextEntry={cpSecureTextEntry}
                  style={values.cpassword ? {height: '40%'} : {height: '100%'}}
                  content={
                    values.cpassword ? (
                      <Text style={styles.inputHeaderText}>
                        {' '}
                        {translate('confirm_password')}
                      </Text>
                    ) : null
                  }>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({cpSecureTextEntry: !cpSecureTextEntry})
                    }>
                    <FastImage
                      source={AppImages.show_pass_icon}
                      style={styles.show_pass_img}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </TouchableOpacity>
                </TextBox>
                <ErrorMessage name="cpassword">
                  {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                </ErrorMessage>
                <LBButton
                  label={translate('set_password')}
                  onPress={() => handleSubmit()}
                  btnStyle={[styles.btnStyle, {marginTop: 50}]}
                  labelStyle={styles.btn_labelStyle}
                />
              </>
            );
          }}
        </Formik>
        <Text style={styles.footer_text}>
          {translate('remember_password')}{' '}
          <Text
            style={{color: Theme.COLORS.secondary}}
            onPress={() => this.props.navigation.navigate('Login')}>
            {translate('sign_in')}
          </Text>
        </Text>
      </AuthContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);