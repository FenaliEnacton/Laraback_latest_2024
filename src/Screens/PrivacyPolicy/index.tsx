import { Theme } from '@/Assets/Theme';
import Container from '@/Components/Core/Container';
import ScrollContent from '@/Components/Core/Content/scrollContent';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import Loader from '@/Components/Core/Loader';
import usePublicData from '@/Hooks/Api/use-public-data';
import { translate } from '@/translations';
import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import HTMLView from 'react-native-htmlview';
import styles from './style';

const PrivacyPolicy = props => {
  const { request_privacy_terms, privacyTerms, loadingPrivacyTerms }: any =
    usePublicData();
  useEffect(() => {
    if (Object.keys(privacyTerms).length === 0) request_privacy_terms();
  }, []);
  return (
    <Container>
      <Header>
        <Header.Left>
          <HeaderBackButton onPress={() => props.navigation.goBack()} />
        </Header.Left>
        <Header.Title>
          <Text style={[styles.headerTitle]}>
            {translate('privacy_policy')}
          </Text>
        </Header.Title>
        <Header.Right />
      </Header>
      <ScrollContent>
        {privacyTerms?.privacy?.footer_content && (
          <HTMLView
            style={styles.terms_content}
            value={privacyTerms?.privacy?.footer_content}
            textComponentProps={{
              style: { color: Theme.COLORS.black },
            }}
            stylesheet={StyleSheet.create({
              ...Theme.fontStyles.html_view_txtStyles,
              color: Theme.COLORS.black,
            })}
          />
        )}
      </ScrollContent>
      <Loader show={loadingPrivacyTerms} />
    </Container>
  );
};

export default PrivacyPolicy;
