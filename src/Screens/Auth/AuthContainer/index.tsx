import { Theme } from '@/Assets/Theme';
import Icons from '@/Assets/icons';
import Container from '@/Components/Core/Container';
import Loader from '@/Components/Core/Loader';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AuthContainer = props => {
  return (
    <>
      <Container style={[styles.containerStyle]}>
        <ScrollView contentContainerStyle={{ alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={props.close_click}>
            <Icons.AntDesign
              style={{ marginRight: 10 }}
              name={'closecircleo'}
              color={Theme.COLORS.primary}
              size={20}
            />
          </TouchableOpacity>
          <KeyboardAwareScrollView
            style={{ marginTop: 0 }}
            contentContainerStyle={[styles.bottom_container, props.style]}
            bounces={false}>
            <View style={styles.img_box}>
              <Image style={styles.imgView} source={props.bg_img} />
            </View>
            {props.children}
          </KeyboardAwareScrollView>
        </ScrollView>
      </Container>
      <Loader show={props.loading_show} />
    </>
  );
};
export default AuthContainer;

const styles = StyleSheet.create({
  bgImage: {
    width: windowWidth,
    height: windowHeight,
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: windowWidth,
    height: windowHeight,
  },
  close_icon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  bottom_container: {
    alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
  },
  appIcon: {
    width: 160,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  iconBg: {
    paddingHorizontal: 15,
    width: 200,
    height: 60,
    alignSelf: 'center',
    backgroundColor: Theme.COLORS.white,
    justifyContent: 'center',
    borderRadius: 15,
  },
  imgView: {
    height: 170,
    width: 200,
    marginTop: 10,
    // backgroundColor: 'red',
  },
  containerStyle: {
    backgroundColor: Theme.COLORS.white,
    paddingTop: 0,
  },
  titleText: {
    ...Theme.fontStyles.h1Bold,
    // fontSize: 23,
    color: Theme.COLORS.primary,
    marginTop: 40,
    // textTransform: 'capitalize',
  },
  img_box: {
    height: 200,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
