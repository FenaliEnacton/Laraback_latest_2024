import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import styles from './style';
import { request_faqs } from '@/Redux/Actions/publicDataActions';
import Container from '@/Components/Core/Container';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import { translate } from '@/translations';
import ScrollContent from '@/Components/Core/Content/scrollContent';
import Icons from '@/Assets/icons';
import { Theme } from '@/Assets/Theme';
import GradientFooter from '@/Components/Generic/GradientFooter';
import { AppImages } from '@/Assets/Images';

const mapDispatchToProps = {
  request_faqs: request_faqs,
};

const mapStateToProps = ({ params }) => {
  return {
    faqs_info: params.faqs_info || [],
  };
};

const FAQs = props => {
  const [parIndex, setParIndex] = useState(null);
  const [queIndex, setQueIndex] = useState(null);

  useEffect(() => {
    props.request_faqs();
  }, []);

  const toggle = (par_index, child_index) => {
    if (parIndex === par_index && queIndex === child_index) {
      setQueIndex(null);
      setParIndex(null);
    } else {
      setQueIndex(child_index);
      setParIndex(par_index);
    }
  };

  const { faqs_info } = props;

  return (
    <Container>
      <Header>
        <Header.Left>
          <HeaderBackButton onPress={() => props.navigation.goBack()} />
        </Header.Left>
        <Header.Title>
          <Text style={styles.headerTitle}>{translate('faqs')}</Text>
        </Header.Title>
        <Header.Right />
      </Header>
      <ScrollContent>
        {faqs_info.map((e, index) => {
          return (
            <View style={styles.screen_content}>
              <Text style={styles.sectionTitle}>{e.name}</Text>
              {e.faq.map((q, i) => {
                return (
                  <View style={styles.faq_card}>
                    <TouchableOpacity
                      style={styles.faq_card_head}
                      onPress={() => toggle(index, i)}>
                      <Text style={styles.faq_title}>{q.title}</Text>
                      <Icons.AntDesign
                        name={
                          parIndex === index && queIndex === i ? 'up' : 'down'
                        }
                        color={Theme.COLORS.primary}
                        size={14}
                      />
                    </TouchableOpacity>
                    {parIndex === index && queIndex === i ? (
                      <HTMLView
                        style={styles.faq_content}
                        value={q.content}
                        stylesheet={StyleSheet.create({
                          ...Theme.fontStyles.html_view_txtStyles,
                        })}
                      />
                    ) : null}
                  </View>
                );
              })}
            </View>
          );
        })}
        <GradientFooter
          button_title={translate('contact_us')}
          main_title={''}
          sub_title={translate('faq_gr_sub_title')}
          image={AppImages.gr_faq_img}
          buttonClick={() => props.navigation.navigate('ContactUs')}
        />
      </ScrollContent>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FAQs);
