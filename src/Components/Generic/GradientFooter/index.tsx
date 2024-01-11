import { Theme } from '@/Assets/Theme';
import LBButton from '@/Components/Core/LBButton';
import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
const windowWidth = Dimensions.get('window').width;

function GradientFooter(props) {
  return (
    <View style={[styles.container, props.style]}>
      <FastImage
        source={props.image}
        style={styles.image_card}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={styles.content_view}>
        <Text
          numberOfLines={2}
          style={[styles.sub_title, !props.main_title ? { fontSize: 15 } : {}]}>
          {props.sub_title}
        </Text>
        <Text style={styles.main_title}>{props.main_title}</Text>
        <LBButton
          label={props.button_title}
          onPress={props.buttonClick}
          btnStyle={[styles.btnStyle]}
          labelStyle={styles.labelStyle}
        />
      </View>
    </View>
  );
}

export default GradientFooter;
const styles = StyleSheet.create({
  container: {
    width: windowWidth - 30,
    height: 150,
    marginTop: 8,
    alignItems: 'center',
    paddingBottom: 17,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: Theme.COLORS.gradient_card_bg,
    alignSelf: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.5)',
        shadowOffset: {
          height: 0.4,
          width: 1,
        },
        shadowOpacity: 0.4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  gradientStyle: {
    width: windowWidth,
    height: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    resizeMode: 'contain',
    height: 100,
    width: 100,
    alignSelf: 'flex-end',
  },
  main_title: {
    ...Theme.fontStyles.h2Bold,
    color: Theme.COLORS.brown_text,
  },
  sub_title: {
    ...Theme.fontStyles.h4Bold,
    color: Theme.COLORS.secondary,
    textAlign: 'center',
    width: '100%',
  },
  btnStyle: {
    width: 140,
    alignSelf: 'center',
    // marginLeft: 0,
  },
  left_box: {
    marginTop: 10,
    justifyContent: 'space-between',
    height: '100%',
    width: '70%',
  },
  labelStyle: {
    ...Theme.fontStyles.h4Bold,
    color: Theme.COLORS.white,
  },
  image_card: {
    height: '80%',
    width: '40%',
  },
  content_view: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    paddingHorizontal: 5,
  },
});
