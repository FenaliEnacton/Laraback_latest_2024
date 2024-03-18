import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import styles from './style';
import Container from '@/Components/Core/Container';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import ScrollContent from '@/Components/Core/Content/scrollContent';
import { translate } from '@/translations';
import { Theme } from '@/Assets/Theme';

const mapDispatchToProps = {};

const mapStateToProps = ({ params }) => {
  return {
    terms: params.app_info_data?.terms || {},
  };
};

class TermsOfUse extends Component<any> {
  render() {
    const { terms } = this.props;
    return (
      <Container>
        <Header>
          <Header.Left>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </Header.Left>
          <Header.Title>
            <Text style={styles.headerTitle}>{translate('terms_of_use')}</Text>
          </Header.Title>
          <Header.Right />
        </Header>
        <ScrollContent>
          <HTMLView
            style={styles.terms_content}
            value={terms.footer_content}
            stylesheet={StyleSheet.create({
              ...Theme.fontStyles.html_view_txtStyles,
            })}
          />
        </ScrollContent>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsOfUse);
