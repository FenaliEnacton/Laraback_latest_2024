import React, { useState, useRef } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import { string, object } from 'yup';
import { request_contact_us } from '@/Redux/Actions/publicDataActions';
import { translate } from '@/translations';
import Container from '@/Components/Core/Container';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import styles from './style';
import ScrollContent from '@/Components/Core/Content/scrollContent';
import { AppImages } from '@/Assets/Images';
import LottieView from 'lottie-react-native';
import InputText from '@/Components/Core/TextBox';
import Icons from '@/Assets/icons';
import { Theme } from '@/Assets/Theme';
import LBButton from '@/Components/Core/LBButton';
import BottomModal from '@/Components/Core/BottomModal';
import CloseButton from '@/Components/Core/CloseButton';

const ContactUs = ({ request_contact_us, navigation }) => {
  const [subjectModalShow, setSubjectModalShow] = useState(false);
  const [selReasonId, setSelReasonId] = useState('0');
  const [selReasonVal, setSelReasonVal] = useState('');
  const subjects = [
    { id: '111', value: 'partnership' },
    { id: '112', value: 'report_an_issue' },
    { id: '113', value: 'media' },
    { id: '114', value: 'careers' },
    { id: '115', value: 'other' },
  ];

  const subjectModal = useRef<any>();

  const contactUsSchema = object().shape({
    name: string()
      .trim()
      .max(10, translate('max_10_war'))
      .required('required_field'),
    email: string()
      .trim()
      .email('email_is_not_valid')
      .required('required_field'),
    subject: string().trim().required('required_field'),
    message: string()
      .min(20, 'value_must_be_more_than')
      .trim()
      .required('required_field'),
  });

  const handleContactSubmit = values => {
    if (values.name && values.email && values.subject && values.message) {
      request_contact_us(
        values.name,
        values.email,
        values.subject,
        values.message,
      );
    }
  };

  return (
    <Container>
      <Header>
        <Header.Left>
          <HeaderBackButton onPress={() => navigation.goBack()} />
        </Header.Left>
        <Header.Title>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {translate('contact_us')}
          </Text>
        </Header.Title>
        <Header.Right />
      </Header>
      <ScrollContent style={styles.content}>
        <LottieView
          source={AppImages.contact_us}
          style={styles.header_image}
          loop
          autoPlay
        />
        <Formik
          initialValues={{
            email: '',
            name: '',
            subject: '',
            message: '',
          }}
          validationSchema={contactUsSchema}
          onSubmit={values => handleContactSubmit(values)}>
          {({
            handleBlur,
            handleChange,
            values,
            handleSubmit,
            setFieldValue,
          }) => (
            <>
              <InputText
                placeholder={translate('name')}
                value={values.name}
                onChangeText={handleChange('name')}
                style={values.name ? { height: '40%' } : { height: '100%' }}
                content={
                  values.name ? (
                    <Text style={styles.inputHeaderText}>
                      {' '}
                      {translate('name')}
                    </Text>
                  ) : null
                }
              />
              <ErrorMessage name="name">
                {msg => (
                  <Text style={styles.errorMessage}>{translate(msg)}</Text>
                )}
              </ErrorMessage>

              <InputText
                placeholder={translate('email')}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                style={values.email ? { height: '40%' } : { height: '100%' }}
                content={
                  values.email ? (
                    <Text style={styles.inputHeaderText}>
                      {' '}
                      {translate('email')}
                    </Text>
                  ) : null
                }
              />
              <ErrorMessage name="email">
                {msg => (
                  <Text style={styles.errorMessage}>{translate(msg)}</Text>
                )}
              </ErrorMessage>

              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.touchableInput]}
                onPress={() => setSubjectModalShow(true)}>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={selReasonVal ? styles.placeholderText : null}>
                    {translate('select_subject')}
                  </Text>
                  {values.subject ? (
                    <Text>{translate(selReasonVal)}</Text>
                  ) : null}
                </View>
                <Icons.AntDesign
                  name="down"
                  size={15}
                  color={Theme.COLORS.black}
                />
              </TouchableOpacity>
              <ErrorMessage name="subject">
                {msg => (
                  <Text style={styles.errorMessage}>{translate(msg)}</Text>
                )}
              </ErrorMessage>

              <InputText
                containerStyle={styles.textInputMessage}
                placeholder={translate('message')}
                multiline={true}
                value={values.message}
                onChangeText={handleChange('message')}
                onBlur={handleBlur('message')}
                style={values.message ? { height: '90%' } : { height: '100%' }}
                content={
                  values.message ? (
                    <Text style={[styles.inputHeaderText, { marginTop: -7 }]}>
                      {' '}
                      {translate('message')}
                    </Text>
                  ) : null
                }
              />
              <ErrorMessage name="message">
                {msg => (
                  <Text style={styles.errorMessage}>{translate(msg)}</Text>
                )}
              </ErrorMessage>

              <LBButton
                label={translate('submit')}
                btnStyle={[
                  styles.btnStyle,
                  { backgroundColor: Theme.COLORS.secondary },
                ]}
                onPress={handleSubmit}
              />

              <BottomModal
                ref={subjectModal}
                bottomModalShow={subjectModalShow}
                setBottomModalVisibleFalse={() => setSubjectModalShow(false)}>
                <>
                  <Text style={styles.title}>
                    {translate('select_subject')}
                  </Text>
                  <FlatList
                    style={styles.modalList}
                    data={subjects}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={selReasonId}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={[
                          styles.subjectTab,
                          {
                            backgroundColor:
                              selReasonId == item.id
                                ? Theme.COLORS.primary
                                : Theme.COLORS.white,
                          },
                        ]}
                        onPress={() => {
                          setFieldValue('subject', item.value);
                          setSelReasonId(item.id);
                          setSelReasonVal(item.value);
                          setSubjectModalShow(false);
                        }}>
                        <Text
                          style={[
                            styles.subText,
                            {
                              color:
                                selReasonId === item.id
                                  ? Theme.COLORS.white
                                  : Theme.COLORS.primary,
                            },
                          ]}>
                          {translate(item.value)}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                  <View style={styles.btnBar}>
                    <CloseButton
                      onPress={() =>
                        subjectModal.current.props.onRequestClose()
                      }
                    />
                  </View>
                </>
              </BottomModal>
            </>
          )}
        </Formik>
      </ScrollContent>
    </Container>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  request_contact_us,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
