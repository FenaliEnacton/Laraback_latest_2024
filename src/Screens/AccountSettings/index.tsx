import AsyncStorage from '@react-native-async-storage/async-storage';
import { ErrorMessage, Formik } from 'formik';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { object, ref, string } from 'yup';
import styles from './style';
import { get_user_internal_nav_list } from '@/Assets/RouterList';
import {
  request_update_profile_info,
  request_user_change_password,
  request_user_profile_details,
} from '@/Redux/USER_REDUX/Actions/userAccountSettings';
import { translate } from '@/translations';
import Container from '@/Components/Core/Container';
import UserHeader from '@/Components/User/UserHeader';
import NavigationList from '@/Components/User/NavigationList';
import BottomModal from '@/Components/Core/BottomModal';
import Icons from '@/Assets/icons';
import { Theme } from '@/Assets/Theme';
import CloseButton from '@/Components/Core/CloseButton';
import FormBottomModal from '@/Components/Core/FormBottomModal';
import LangSupportTxtInput from '@/Components/Core/LangSupportTxtInput';
import LBButton from '@/Components/Core/LBButton';
import Loader from '@/Components/Core/Loader';

const bottomModal = React.createRef();
const formBottomModal = React.createRef();
const NAV_LIST_1 = get_user_internal_nav_list([8888, 9999, 10000, 10001]);

const mapDispatchToProps = {
  request_user_change_password,
  request_user_profile_details,
  request_update_profile_info,
};

const mapStateToProps = ({ params }) => {
  return {
    user_info: params.user_info || {},
    user_profile_info: params.user_profile_info?.meta || {},
  };
};

class AccountSettings extends Component<any> {
  state = {
    showBottomModal: false,
    showFormBottomModal: false,
    route: '',
  };
  componentDidMount() {
    this.props.request_user_profile_details();
  }

  handle_list_tab_click = item => {
    if (
      item.route === 'personal_information' ||
      item.route === 'change_password'
    ) {
      this.setState({ showFormBottomModal: true, route: item.route });
    } else {
      this.setState({ showBottomModal: true, route: item.route });
    }
  };

  handle_change_password = async values => {
    if (values.new_password === values.confirm_password && values.password) {
      let UserTokenAsyncData = await AsyncStorage.getItem('USER_AUTH');
      let parsedUserToken = JSON.parse(UserTokenAsyncData || '{}');
      this.props.request_user_change_password(
        values.password,
        values.new_password,
        values.confirm_password,
        parsedUserToken.token,
      );
      this.setState({ showFormBottomModal: false });
    }
  };

  handle_profile_update = values => {
    if (values.first_name && values.last_name) {
      this.props.request_update_profile_info(
        this.props.user_info.user_id,
        values.bio,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        values.first_name + ' ' + values.last_name,
        values.first_name,
        values.last_name,
      );
      this.setState({ showFormBottomModal: false });
    }
  };

  render() {
    const { user_info, user_profile_info } = this.props;
    const { route } = this.state;
    const profileSchema = object().shape({
      first_name: string()
        .trim()
        .matches(/^[aA-zZ\s]+$/, translate('allowOnlyAlphabets'))
        .min(3, translate('min_3_war'))
        .max(10, translate('max_10_war'))
        .required(translate('required_field')),
      last_name: string()
        .trim()
        .matches(/^[aA-zZ\s]+$/, translate('allowOnlyAlphabets'))
        .min(3, translate('min_3_war'))
        .max(10, translate('max_10_war'))
        .required(translate('required_field')),
      bio: string().min(15, translate('min_15_war')),
    });
    const passwordSchema = object().shape({
      password: string().trim().required(translate('required_field')),
      new_password: string()
        .trim()
        .min(6, 'The password must be minimum 6 characters')
        .required(translate('required_field')),
      confirm_password: string()
        .min(6, 'The password must be minimum 6 characters')
        .oneOf([ref('new_password'), ''], 'Passwords must match')
        .required(translate('required_field')),
    });
    return (
      <Container>
        {/* <Header headerStyle={styles.headerStyle} headerBox={styles.headerBox}> */}
        <UserHeader
          headerOnPress={() => this.props.navigation.goBack()}
          title={translate('account_settings')}
          show_back
        />
        {/* </Header> */}
        <View style={styles.content}>
          <NavigationList
            list={NAV_LIST_1}
            navigation={this.props.navigation}
            onPress={item => {
              this.handle_list_tab_click(item);
            }}
          />
        </View>
        <BottomModal
          style={styles.modalStyle}
          ref={bottomModal}
          bottomModalShow={this.state.showBottomModal}
          setBottomModalVisibleFalse={() =>
            this.setState({ showBottomModal: false })
          }>
          <>
            <View style={styles.modal_top_notch} />

            {route === 'email' ? (
              <View style={styles.modal_container}>
                <Text style={styles.input_title}>{translate('email')}</Text>
                <View style={styles.email_input}>
                  <Text style={styles.email}>{user_info.email}</Text>
                  <Icons.AntDesign
                    name={'checksquare'}
                    color={Theme.COLORS.light_green_approved}
                    size={30}
                  />
                </View>
                <Text style={styles.sub_title}>
                  {translate('email_change_sub_title')}
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      textTransform: 'capitalize',
                    }}
                    onPress={() => {
                      this.setState({ showBottomModal: false });
                      this.props.navigation.navigate('ContactUs');
                    }}>
                    {translate('contact_us')}.
                  </Text>
                </Text>
              </View>
            ) : null}
            {route === 'mobile_number' ? (
              <View style={styles.modal_container}>
                <Text style={styles.input_title}>
                  {translate('mobile_number')}
                </Text>
                <View style={styles.email_input}>
                  <Text style={styles.email}>{user_info.phone_number}</Text>
                  <Icons.AntDesign
                    name={'checksquare'}
                    color={Theme.COLORS.light_green_approved}
                    size={30}
                  />
                </View>
                <Text style={styles.sub_title}>
                  {translate('number_change_sub_title')}
                  <Text
                    style={styles.email_bottom_sub_title}
                    onPress={() => {
                      this.setState({ showBottomModal: false });
                      this.props.navigation.navigate('ContactUs');
                    }}>
                    {translate('contact_us')}.
                  </Text>
                </Text>
              </View>
            ) : null}
          </>
          <View style={styles.btnBar}>
            <CloseButton
              btnStyle={styles.closeBtn}
              onPress={() => this.setState({ showBottomModal: false })}
            />
          </View>
        </BottomModal>
        <FormBottomModal
          ref={formBottomModal}
          bottomModalShow={this.state.showFormBottomModal}
          setBottomModalVisibleFalse={() =>
            this.setState({ showFormBottomModal: false })
          }>
          <>
            <View style={styles.modal_top_notch} />

            <View style={styles.modal_container}>
              {route === 'personal_information' ? (
                <Formik
                  initialValues={{
                    first_name: user_info.first_name,
                    last_name: user_info.last_name,
                    bio: user_profile_info.bio ? user_profile_info.bio : '',
                  }}
                  validationSchema={profileSchema}
                  onSubmit={values => this.handle_profile_update(values)}>
                  {({
                    handleBlur,
                    handleChange,
                    values,
                    handleSubmit,
                    setFieldValue,
                  }) => {
                    return (
                      <>
                        <Text style={styles.input_title}>
                          {translate('first_name')}
                        </Text>
                        <LangSupportTxtInput
                          style={styles.textInput}
                          placeholder={translate('first_name')}
                          value={values.first_name}
                          onBlur={handleBlur('first_name')}
                          onChangeText={handleChange('first_name')}
                          name="first_name"
                        />
                        <ErrorMessage name="first_name">
                          {msg => (
                            <Text style={styles.errorMessage}>{msg}</Text>
                          )}
                        </ErrorMessage>
                        <Text style={styles.input_title}>
                          {translate('last_name')}
                        </Text>
                        <LangSupportTxtInput
                          style={styles.textInput}
                          placeholder={translate('last_name')}
                          value={values.last_name}
                          onBlur={handleBlur('last_name')}
                          onChangeText={handleChange('last_name')}
                          name="last_name"
                        />
                        <ErrorMessage name="last_name">
                          {msg => (
                            <Text style={styles.errorMessage}>{msg}</Text>
                          )}
                        </ErrorMessage>
                        <Text style={styles.input_title}>
                          {translate('bio')}
                        </Text>
                        <LangSupportTxtInput
                          style={styles.textInputMessage}
                          placeholder={translate('bio')}
                          value={values.bio}
                          onBlur={handleBlur('bio')}
                          multiline={true}
                          onChangeText={handleChange('bio')}
                          name="bio"
                        />
                        <ErrorMessage name="bio">
                          {msg => (
                            <Text style={styles.errorMessage}>{msg}</Text>
                          )}
                        </ErrorMessage>
                        <LBButton
                          label={translate('submit')}
                          btnStyle={[
                            styles.btnStyle,
                            { backgroundColor: Theme.COLORS.secondary },
                          ]}
                          // labelStyle={styles.btn_labelStyle}
                          onPress={handleSubmit}
                        />
                      </>
                    );
                  }}
                </Formik>
              ) : (
                <Formik
                  initialValues={{
                    password: '',
                    new_password: '',
                    confirm_password: '',
                  }}
                  validationSchema={passwordSchema}
                  onSubmit={values => this.handle_change_password(values)}>
                  {({
                    handleBlur,
                    handleChange,
                    values,
                    handleSubmit,
                    setFieldValue,
                  }) => {
                    return (
                      <>
                        <Text style={styles.input_title}>
                          {translate('current_password')}
                        </Text>
                        <LangSupportTxtInput
                          style={styles.textInput}
                          placeholder={translate('current_password')}
                          value={values.password}
                          onBlur={handleBlur('password')}
                          onChangeText={handleChange('password')}
                          name="password"
                          secureTextEntry
                        />
                        <ErrorMessage name="password">
                          {msg => (
                            <Text style={styles.errorMessage}>{msg}</Text>
                          )}
                        </ErrorMessage>
                        <Text style={styles.input_title}>
                          {translate('new_password')}
                        </Text>
                        <LangSupportTxtInput
                          style={styles.textInput}
                          placeholder={translate('new_password')}
                          value={values.new_password}
                          onBlur={handleBlur('new_password')}
                          onChangeText={handleChange('new_password')}
                          name="new_password"
                          secureTextEntry
                        />
                        <ErrorMessage name="new_password">
                          {msg => (
                            <Text style={styles.errorMessage}>{msg}</Text>
                          )}
                        </ErrorMessage>
                        <Text style={styles.input_title}>
                          {translate('confirm_password')}
                        </Text>
                        <LangSupportTxtInput
                          style={styles.textInput}
                          placeholder={translate('confirm_password')}
                          value={values.confirm_password}
                          onBlur={handleBlur('confirm_password')}
                          onChangeText={handleChange('confirm_password')}
                          name="confirm_password"
                          secureTextEntry
                        />
                        <ErrorMessage name="confirm_password">
                          {msg => (
                            <Text style={styles.errorMessage}>{msg}</Text>
                          )}
                        </ErrorMessage>
                        <LBButton
                          label={translate('submit')}
                          btnStyle={[
                            styles.btnStyle,
                            { backgroundColor: Theme.COLORS.secondary },
                          ]}
                          // labelStyle={styles.btn_labelStyle}
                          onPress={handleSubmit}
                        />
                      </>
                    );
                  }}
                </Formik>
              )}
            </View>
          </>
          <View style={styles.btnBar}>
            <CloseButton
              btnStyle={styles.closeBtn}
              onPress={() => this.setState({ showFormBottomModal: false })}
            />
          </View>
        </FormBottomModal>
        <Loader show={this.props.loading} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
