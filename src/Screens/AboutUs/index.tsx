import React from 'react';
import { StyleSheet, Text } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { useRecoilValue } from 'recoil';
import { objectAtomFamily } from '../../Recoil/atom';
import { atomKeys } from '../../Recoil/atom-keys';
import styles from './style';
import Container from '@/Components/Core/Container';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import { translate } from '@/translations';
import ScrollContent from '@/Components/Core/Content/scrollContent';
import { Theme } from '@/Assets/Theme';
import Loader from '@/Components/Core/Loader';

const AboutUs = props => {
  const privacyTerms = useRecoilValue<any>(
    objectAtomFamily(atomKeys.publicData.privacy_terms),
  );

  return (
    <Container>
      <Header>
        <Header.Left>
          <HeaderBackButton onPress={() => props.navigation.goBack()} />
        </Header.Left>
        <Header.Title>
          <Text style={styles.headerTitle}>{translate('about_company')}</Text>
        </Header.Title>
        <Header.Right></Header.Right>
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
