import React, {Component} from 'react';
import {Text, TouchableOpacity, View, FlatList} from 'react-native';
import Icon from '@assets/icons';
import {Theme} from '@assets/Theme';
import {connect} from 'react-redux';
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  ScrollContent,
  HeaderBackButton,
  BottomModal,
  CloseButton,
  LangSupportTxtInput,
  LBButton,
  TextBox,
} from '@components/core';
import {AppImages} from '@assets/Images';
import {Formik, ErrorMessage} from 'formik';
import {string, object} from 'yup';
import {request_contact_us} from '@app_redux/Actions';
import styles from './style';
import {translate} from '@translations';
import LottieView from 'lottie-react-native';

const mapDispatchToProps = {
  request_contact_us,
};

const mapStateToProps = state => {
  return {};
};

class ContactUs extends Component {
  state = {
    subjectModalShow: false,
    sel_reason_id: 0,
    sel_reason_val: '',
    subjects: [
      {id: '111', value: 'partnership'},
      {id: '112', value: 'report_an_issue'},
      {id: '113', value: 'media'},
      {id: '114', value: 'careers'},
      {id: '115', value: 'other'},
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
    const subjectModal = React.createRef();
    const {subjects, sel_reason_val} = this.state;
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
          <HeaderLeft>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </HeaderLeft>
          <HeaderTitle>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {translate('contact_us')}
            </Text>
          </HeaderTitle>
          <HeaderRight />
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
                  <TextBox
                    placeholder={translate('name')}
                    value={values.name}
                    onChangeText={handleChange('name')}
                    style={values.name ? {height: '40%'} : {height: '100%'}}
                    content={
                      values.name ? (
                        <Text style={styles.inputHeaderText}>
                          {' '}
                          {translate('name')}
                        </Text>
                      ) : null
                    }></TextBox>
                  <ErrorMessage name="name">
                    {msg => (
                      <Text style={styles.errorMessage}>{translate(msg)}</Text>
                    )}
                  </ErrorMessage>
                  <TextBox
                    placeholder={translate('email')}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
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
                    {msg => (
                      <Text style={styles.errorMessage}>{translate(msg)}</Text>
                    )}
                  </ErrorMessage>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.touchableInput]}
                    onPress={() => this.setState({subjectModalShow: true})}>
                    <View
                      style={{
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={sel_reason_val ? styles.placeholderText : null}>
                        {translate('select_subject')}
                      </Text>
                      {values.subject ? (
                        <Text style={[styles.text]}>
                          {translate(this.state.sel_reason_val)}
                        </Text>
                      ) : null}
                    </View>
                    <Icon.AntDesign
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

                  <TextBox
                    containerStyle={styles.textInputMessage}
                    placeholder={translate('message')}
                    multiline={true}
                    value={values.message}
                    onChangeText={handleChange('message')}
                    onBlur={handleBlur('message')}
                    style={values.message ? {height: '90%'} : {height: '100%'}}
                    content={
                      values.message ? (
                        <Text style={[styles.inputHeaderText, {marginTop: -7}]}>
                          {' '}
                          {translate('message')}
                        </Text>
                      ) : null
                    }></TextBox>
                  <ErrorMessage name="message">
                    {msg => (
                      <Text style={styles.errorMessage}>{translate(msg)}</Text>
                    )}
                  </ErrorMessage>
                  <LBButton
                    label={translate('submit')}
                    btnStyle={[
                      styles.btnStyle,
                      {backgroundColor: Theme.COLORS.secondary},
                    ]}
                    labelStyle={styles.btn_labelStyle}
                    onPress={handleSubmit}
                  />
                  <BottomModal
                    ref={subjectModal}
                    bottomModalShow={this.state.subjectModalShow}
                    setBottomModalVisibleFalse={() =>
                      this.setState({subjectModalShow: false})
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
                        renderItem={({item, index}) => (
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
