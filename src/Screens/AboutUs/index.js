import {Theme} from '@assets/Theme';
import {
  Container,
  Header,
  HeaderBackButton,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  Loader,
  ScrollContent,
} from '@components/core';
import {translate} from '@translations';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {useRecoilValue} from 'recoil';
import {objectAtomFamily} from '../../Recoil/atom';
import {atomKeys} from '../../Recoil/atom-keys';
import styles from './style';

const AboutUs = props => {
  const privacyTerms = useRecoilValue(objectAtomFamily(atomKeys.publicData.privacy_terms));

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <HeaderBackButton onPress={() => props.navigation.goBack()} />
        </HeaderLeft>
        <HeaderTitle>
          <Text style={styles.headerTitle}>{translate('about_company')}</Text>
        </HeaderTitle>
        <HeaderRight />
      </Header>
      <ScrollContent>
        <HTMLView
          style={styles.terms_content}
          value={privacyTerms?.about_us?.footer_content}
          stylesheet={StyleSheet.create({
            ...Theme.fontStyles.html_view_txtStyles,
          })}
        />
      </ScrollContent>
      <Loader show={props.loading} />
    </Container>
  );
};

export default AboutUs;
