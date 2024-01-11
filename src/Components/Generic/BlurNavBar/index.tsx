import { Theme } from '@/Assets/Theme';
import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
const windowWidth = Dimensions.get('window').width;

const BlurNavBar = props => {
  return (
    <View>
      <BlurView
        style={styles.BlurNavBar}
        overlayColor=""
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor={Theme.COLORS.white}>
        {props.children}
      </BlurView>
    </View>
  );
};

export default BlurNavBar;

const styles = StyleSheet.create({
  BlurNavBar: {
    // height: 100,
    width: windowWidth,
    backgroundColor: Theme.COLORS.blur_transparent,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    //opacity: 0.8
  },
});
