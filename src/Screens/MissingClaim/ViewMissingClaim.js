import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  KeyboardAwareContent,
  HeaderBackButton,
  LangSupportTxtInput,
  LBButton,
} from '@components/core';
import Icon from '@assets/icons';
import {get_user_internal_nav_list} from '@assets/RouterList';
import {ActivityNavigationList} from '@components/user';
import {Formik, ErrorMessage} from 'formik';
import {string, object} from 'yup';
import {
  request_user_claim_post_comment,
  request_user_claim_close,
} from '@user_redux/Actions';
import {Theme} from '@assets/Theme';
import {ClaimInfo} from '@components/user';
import {translate} from '@translations';
import styles from './style';
const NAV_LIST = get_user_internal_nav_list([10008]);

const mapDispatchToProps = {
  request_user_claim_post_comment,
  request_user_claim_close,
};

const mapStateToProps = ({params}) => {
  return {
    user_claim_info: params.user_claim_info || {},
  };
};

class ViewMissingClaim extends Component {
  state = {
    comment: '',
  };

  send_message = (values) => {
    if (values.comment) {
      this.props.request_user_claim_post_comment(
        this.props.user_claim_info.id,
        values.comment,
      );
    }
  };

  render() {
    const {user_claim_info} = this.props;

    const commentSchema = object().shape({
      comment: string().trim().required('required_field'),
    });

    return (
      <Container>
        <Header>
          <HeaderLeft>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </HeaderLeft>
          <HeaderTitle>
            <Text style={styles.headerTitle}>
              {translate('view_missing_claim')}
            </Text>
          </HeaderTitle>
          <HeaderRight />
        </Header>
        <KeyboardAwareContent>
          <ClaimInfo />
          <ActivityNavigationList
            list={NAV_LIST}
            navigation={this.props.navigation}
          />
          <Text style={styles.title}>
            {translate('messages_relating_to_your_claim')}
          </Text>
          {user_claim_info.status === 'open' ? (
            <>
              <Formik
                initialValues={{
                  comment: '',
                }}
                validationSchema={commentSchema}
                onSubmit={(values) => this.send_message(values)}>
                {({
                  handleBlur,
                  handleChange,
                  values,
                  handleSubmit,
                  setFieldValue,
                }) => {
                  return (
                    <>
                      <View>
                        <LangSupportTxtInput
                          style={styles.textInput}
                          multiline={true}
                          placeholder={translate('enter_comment')}
                          value={values.comment}
                          onBlur={handleBlur('comment')}
                          onChangeText={handleChange('comment')}
                          name="comment"
                        />
                        <ErrorMessage name="comment">
                          {(msg) => (
                            <Text style={styles.errorMessage}>
                              {translate(msg)}
                            </Text>
                          )}
                        </ErrorMessage>
                        <TouchableOpacity
                          style={styles.send_btn}
                          onPress={handleSubmit}>
                          <Icon.Feather
                            name={'send'}
                            color={Theme.COLORS.secondary}
                            size={18}
                          />
                        </TouchableOpacity>
                      </View>
                    </>
                  );
                }}
              </Formik>
              <LBButton
                label={translate('close_this_claim')}
                btnStyle={[
                  styles.btnStyle,
                  {backgroundColor: Theme.COLORS.secondary},
                ]}
                labelStyle={styles.btn_labelStyle}
                onPress={() => {
                  this.props.request_user_claim_close(
                    this.props.user_claim_info.id,
                  );
                }}
              />
            </>
          ) : null}
        </KeyboardAwareContent>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMissingClaim);
