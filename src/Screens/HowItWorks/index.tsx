import Container from '@/Components/Core/Container';
import ScrollContent from '@/Components/Core/Content/scrollContent';
import Header from '@/Components/Core/Header/Header';
import HeaderBackButton from '@/Components/Core/HeaderBackButton';
import Loader from '@/Components/Core/Loader';
import usePublicData from '@/Hooks/Api/use-public-data';
import { Config } from '@/react-native-config';
import { translate } from '@/translations';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import styles from './style';

const HowItWorks = props => {
  const [index, setIndex] = useState();
  const onIndexChanged = index => {
    setIndex(index);
  };

  const {
    welcomeScreenData,
    request_welcome_screen_data,
    loadingWelcomeScreenData,
  }: any = usePublicData();

  useEffect(() => {
    if (welcomeScreenData?.length <= 0) {
      onIndexChanged(0);
      request_welcome_screen_data();
    }
  }, []);

  const renderPagination = () => {
    if (welcomeScreenData?.length <= 1) return null;

    let dots: any = [];
    const ActiveDot = props.activeDot || <View style={styles.activeDotStyle} />;
    const Dot = props.dot || <View style={styles.dotStyle} />;
    for (let i = 0; i < welcomeScreenData.length; i++) {
      dots.push(
        i === index
          ? React.cloneElement(ActiveDot, { key: i })
          : React.cloneElement(Dot, { key: i }),
      );
    }
    return dots;
  };
  return (
    <Container>
      <Header>
        <Header.Left>
          <HeaderBackButton onPress={() => props.navigation.goBack()} />
        </Header.Left>
        <Header.Title>
          <Text style={styles.headerTitle}>{translate('how_it_works')}</Text>
        </Header.Title>
        <Header.Right />
      </Header>
      <ScrollContent style={{ backgroundColor: 'transparent' }}>
        <Swiper
          loop={false}
          showsPagination={false}
          onIndexChanged={index => onIndexChanged(index)}>
          {welcomeScreenData.length > 0 ? (
            welcomeScreenData?.map((introSlide, index) => {
              return (
                <View style={styles.swiper_content} key={index}>
                  <FastImage
                    source={{
                      uri: introSlide.image
                        ? introSlide.image
                        : Config.EMPTY_IMAGE_URL,
                    }}
                    style={styles.swiper_image}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <Text style={styles.welcome_title}>
                    {introSlide.title[Config.LANG]}
                  </Text>
                  <Text style={styles.welcome_desc}>
                    {introSlide.content[Config.LANG]}
                  </Text>
                </View>
              );
            })
          ) : (
            <View />
          )}
        </Swiper>
        <Loader show={loadingWelcomeScreenData} />
      </ScrollContent>
      <View style={styles.footer}>{renderPagination()}</View>
    </Container>
  );
};

export default HowItWorks;
