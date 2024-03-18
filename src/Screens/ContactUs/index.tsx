import React, { Component } from 'react';
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

const mapDispatchToProps = {
  request_contact_us,
};

const mapStateToProps = state => {
  return {};
};

class ContactUs extends Component<any> {
  state = {
    subjectModalShow: false,
    sel_reason_id: 0,
    sel_reason_val: '',
    subjects: [
      { id: '111', value: 'partnership' },
      { id: '112', value: 'report_an_issue' },
      { id: '113', value: 'media' },
      { id: '114', value: 'careers' },
      { id: '115', value: 'other' },
    ],
  };

  request_contact_us = values => {
    if (values.name && values.email && values.subject && values.message) {
      this.props.request_contact_us(
        values.name,
        values.email,
        values.subject,
        values.message,
      );
    }
  };

  render() {
    const subjectModal: any = React.createRef();
    const { subjects, sel_reason_val } = this.state;
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
    return (
      <Container>
        <Header>
          <Header.Left>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
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
            onSubmit={values => this.request_contact_us(values)}>
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
                    }></InputText>
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
                    style={
                      values.email ? { height: '40%' } : { height: '100%' }
                    }
                    content={
                      values.email ? (
                        <Text style={styles.inputHeaderText}>
                          {' '}
                          {translate('email')}
                        </Text>
                      ) : null
                    }></InputText>
                  <ErrorMessage name="email">
                    {msg => (
                      <Text style={styles.errorMessage}>{translate(msg)}</Text>
                    )}
                  </ErrorMessage>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.touchableInput]}
                    onPress={() => this.setState({ subjectModalShow: true })}>
                    <View
                      style={{
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={sel_reason_val ? styles.placeholderText : null}>
                        {translate('select_subject')}
                      </Text>
                      {values.subject ? (
                        <Text style={[]}>
                          {translate(this.state.sel_reason_val)}
                        </Text>
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
                    style={
                      values.message ? { height: '90%' } : { height: '100%' }
                    }
                    content={
                      values.message ? (
                        <Text
                          style={[styles.inputHeaderText, { marginTop: -7 }]}>
                          {' '}
                          {translate('message')}
                        </Text>
                      ) : null
                    }></InputText>
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
                    // labelStyle={styles.btn_labelStyle}
                    onPress={handleSubmit}
                  />
                  <BottomModal
                    ref={subjectModal}
                    bottomModalShow={this.state.subjectModalShow}
                    setBottomModalVisibleFalse={() =>
                      this.setState({ subjectModalShow: false })
                    }>
                    <>
                      {/* <View style={styles.modalHeader}> */}

                      <Text style={styles.title}>
                        {translate('select_subject')}
                      </Text>
                      {/* </View> */}
                      <FlatList
                        style={styles.modalList}
                        data={subjects}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={this.state}
                        renderItem={({ item, index }: any) => (
                          <TouchableOpacity
                            style={[
                              styles.subjectTab,
                              {
                                backgroundColor:
                                  this.state.sel_reason_id == item.id
                                    ? Theme.COLORS.primary
                                    : Theme.COLORS.white,
                              },
                            ]}
                            onPress={() => {
                              setFieldValue('subject', item.value);
                              this.setState({
                                sel_reason_id: item.id,
                                sel_reason_val: item.value,
                                subjectModalShow: false,
                              });
                            }}>
                            <Text
                              style={[
                                styles.subText,
                                {
                                  color:
                                    this.state.sel_reason_id == item.id
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
                          // btnStyle={styles.closeBtn}
                          onPress={() =>
                            subjectModal.current.props.onRequestClose()
                          }
                        />
                      </View>
                    </>
                  </BottomModal>
                </>
              );
            }}
          </Formik>
        </ScrollContent>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
