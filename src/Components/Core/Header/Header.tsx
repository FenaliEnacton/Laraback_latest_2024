import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '@/Assets/Theme';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import HeaderTitle from './HeaderTitle';

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
        style={[
          styles.headerBox,
          { marginTop: insets.top + 5 },
          props.headerBox,
        ]}
      />
    </View>
  );
};

export default Header;

Header.Left = ({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: any;
}) => {
  return <HeaderLeft style={style}>{children}</HeaderLeft>;
};

Header.Right = ({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: any;
}) => {
  return <HeaderRight style={style}>{children}</HeaderRight>;
};

Header.Title = ({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: any;
}) => {
  return <HeaderTitle style={style}>{children}</HeaderTitle>;
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
