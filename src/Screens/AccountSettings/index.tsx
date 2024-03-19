import { get_user_internal_nav_list } from '@/Assets/RouterList';
import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import BottomModal from '@/Components/Core/BottomModal';
import CloseButton from '@/Components/Core/CloseButton';
import Container from '@/Components/Core/Container';
import FormBottomModal from '@/Components/Core/FormBottomModal';
import LBButton from '@/Components/Core/LBButton';
import LangSupportTxtInput from '@/Components/Core/LangSupportTxtInput';
import Loader from '@/Components/Core/Loader';
import NavigationList from '@/Components/User/NavigationList';
import UserHeader from '@/Components/User/UserHeader';
import {
  request_update_profile_info,
  request_user_change_password,
  request_user_profile_details,
} from '@/Redux/USER_REDUX/Actions/userAccountSettings';
import { translate } from '@/translations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ErrorMessage, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { object, ref, string } from 'yup';
import styles from './style';

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

const AccountSettings = props => {
  const [showBottomModal, setShowBottomModal] = useState(false);
  const [showFormBottomModal, setShowFormBottomModal] = useState(false);
  const [route, setRoute] = useState('');

  const bottomModal = useRef();
  const formBottomModal = useRef();
  const { user_info, user_profile_info } = props;

  useEffect(() => {
    props.request_user_profile_details();
  }, []);

  const handle_list_tab_click = item => {
    if (route === 'personal_information' || route === 'change_password') {
      setShowFormBottomModal(true);
      setRoute(item.route);
    } else {
      setShowBottomModal(true);
      setRoute(item.route);
    }
  };

  const handle_change_password = async values => {
    if (values.new_password === values.confirm_password && values.password) {
      let UserTokenAsyncData = await AsyncStorage.getItem('USER_AUTH');
      let parsedUserToken = JSON.parse(UserTokenAsyncData || '{}');
      props.request_user_change_password(
        values.password,
        values.new_password,
        values.confirm_password,
        parsedUserToken.token,
      );
      setShowFormBottomModal(false);
    }
  };

  const handle_profile_update = values => {
    if (values.first_name && values.last_name) {
      props.request_update_profile_info(
        props.user_info.user_id,
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
      setShowFormBottomModal(false);
    }
  };

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
    bio: string().trim(),
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
        headerOnPress={() => props.navigation.goBack()}
        title={translate('account_settings')}
        show_back
      />
      {/* </Header> */}
      <View style={styles.content}>
        <NavigationList
          list={NAV_LIST_1}
          navigation={props.navigation}
          onPress={item => {
            handle_list_tab_click(item);
          }}
        />
      </View>
      <BottomModal
        style={styles.modalStyle}
        ref={bottomModal}
        bottomModalShow={showBottomModal}
        setBottomModalVisibleFalse={() => setShowBottomModal(false)}>
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
                    setShowBottomModal(false);
                    props.navigation.navigate('ContactUs');
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
                    setShowBottomModal(false);

                    props.navigation.navigate('ContactUs');
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
            onPress={() => setShowBottomModal(false)}
          />
        </View>
      </BottomModal>
      <FormBottomModal
        ref={formBottomModal}
        bottomModalShow={showFormBottomModal}
        setBottomModalVisibleFalse={() => setShowFormBottomModal(false)}>
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
                onSubmit={values => handle_profile_update(values)}>
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
                        {msg => <Text style={styles.errorMessage}>{msg}</Text>}
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
                        {msg => <Text style={styles.errorMessage}>{msg}</Text>}
                      </ErrorMessage>
                      <Text style={styles.input_title}>{translate('bio')}</Text>
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
                        {msg => <Text style={styles.errorMessage}>{msg}</Text>}
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
                onSubmit={values => handle_change_password(values)}>
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
                        {msg => <Text style={styles.errorMessage}>{msg}</Text>}
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
                        {msg => <Text style={styles.errorMessage}>{msg}</Text>}
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
                        {msg => <Text style={styles.errorMessage}>{msg}</Text>}
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
            onPress={() => setShowFormBottomModal(false)}
          />
        </View>
      </FormBottomModal>
      <Loader show={props.loading} />
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
