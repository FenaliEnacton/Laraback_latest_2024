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
} from '@components/core';
import {translate} from '@translations';
import HTMLView from 'react-native-htmlview';
import {Theme} from '@assets/Theme';
import styles from './style';

const mapDispatchToProps = {};

const mapStateToProps = ({params}) => {
  return {
    terms: params.app_info_data?.terms || {},
  };
};

class TermsOfUse extends Component {
  render() {
    const {terms} = this.props;
    return (
      <Container>
        <Header>
          <HeaderLeft>
            <HeaderBackButton onPress={() => this.props.navigation.goBack()} />
          </HeaderLeft>
          <HeaderTitle>
            <Text style={styles.headerTitle}>{translate('terms_of_use')}</Text>
          </HeaderTitle>
          <HeaderRight />
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
