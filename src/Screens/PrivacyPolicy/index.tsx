import { Theme } from '@/Assets/Theme';
import Container from '@/Components/Core/Container';
import ScrollContent from '@/Components/Core/Content/scrollContent';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import Loader from '@/Components/Core/Loader';
import { translate } from '@/translations';
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux';
import styles from './style';

const mapDispatchToProps = {};

const mapStateToProps = ({ params }) => {
  return {
    privacy_policy_data: params.app_info_data?.privacy || {},
    loading: params.loading,
  };
};

class PrivacyPolicy extends Component<any> {
  render() {
    const { privacy_policy_data, loading } = this.props;
    return (
      <Container>
        <Header>
          <Header.Left>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </Header.Left>
          <Header.Title>
            <Text style={styles.headerTitle}>
              {translate('privacy_policy')}
            </Text>
          </Header.Title>
          <Header.Right />
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
