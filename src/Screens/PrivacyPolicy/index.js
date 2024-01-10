import React, {Component} from 'react';
import {View, Text, I18nManager, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  ScrollContent,
  HeaderBackButton,
  Loader,
} from '@components/core';
import {translate} from '@translations';
import HTMLView from 'react-native-htmlview';
import styles from './style';
import {Theme} from '@assets/Theme';

const mapDispatchToProps = {};

const mapStateToProps = ({params}) => {
  return {
    privacy_policy_data: params.app_info_data?.privacy || {},
    loading: params.loading,
  };
};

class PrivacyPolicy extends Component {
  render() {
    const {privacy_policy_data, loading} = this.props;
    return (
      <Container>
        <Header>
          <HeaderLeft>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </HeaderLeft>
          <HeaderTitle>
            <Text style={styles.headerTitle}>
              {translate('privacy_policy')}
            </Text>
          </HeaderTitle>
          <HeaderRight />
        </Header>
        <ScrollContent>
          <HTMLView
            style={styles.terms_content}
            value={privacy_policy_data.footer_content}
            stylesheet={StyleSheet.create({
              ...Theme.fontStyles.html_view_txtStyles,
            })}
          />
        </ScrollContent>
        <Loader show={loading} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
