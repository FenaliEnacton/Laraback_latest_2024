import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../FocusAwareStatusBar';

const Container = props => {
  // const {request_user_claim_list, userClaimList} = useUserClaim();
  // useEffect(() => {
  //   request_user_claim_list(1).then(data => {
  //     console.log({data});
  //   });
  //   console.log('called', userClaimList);
  //   return () => {};
  // }, []);

  return (
    <SafeAreaView style={[styles.container, props.style]}>
      <>
        <FocusAwareStatusBar
          translucent
          backgroundColor={
            props.statusBarColor ? props.statusBarColor : 'transparent'
          }
          barStyle={props.barStyle ? props.barStyle : 'light-content'}
        />
        {props.children}
      </>
    </SafeAreaView>
  );
};
export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
