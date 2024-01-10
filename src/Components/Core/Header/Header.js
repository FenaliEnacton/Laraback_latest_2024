import React from 'react';
import {View, ViewPropTypes, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Theme} from '@assets/Theme';
// import ScaleSheet from 'react-native-scalesheet';
// import {isIphoneX} from '@helpers/utils';

const Header = props => {
  const insets = useSafeAreaInsets();
  return (
    <View
      onLayout={props.onLayout}
      style={[
        styles.header,
        props.headerStyle,
        {
          height: props.headerStyle?.height
            ? props.headerStyle.height + insets.top
            : insets.top + 50,
        },
      ]}>
      <View
        {...props}
        style={[styles.headerBox, {marginTop: insets.top + 5}, props.headerBox]}
      />
    </View>
  );
};

export default Header;
Header.propTypes = {
  ...ViewPropTypes,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array,
  ]),
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: Theme.COLORS.background,
    position: 'absolute',
    top: 0,
    paddingBottom: 10,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    borderBottomRightRadius: 15,
    zIndex: 99999,
    paddingHorizontal: 10,
  },
  headerBox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});
