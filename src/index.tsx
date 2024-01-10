import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { RecoilRoot } from 'recoil';
import AppNavigator from './Navigation/appNavigator';

function App() {
  return (
    <RecoilRoot>
      <View style={styles.container}>
        <MenuProvider>
          <SafeAreaProvider>
            <AppNavigator />
            <Toast />
          </SafeAreaProvider>
        </MenuProvider>
      </View>
    </RecoilRoot>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
