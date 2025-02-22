// @ts-nocheck
import React, { Component } from 'react';
import { ScrollView, Keyboard, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

export default class Content extends Component {
  static defaultProps = {
    hasHeader: true,
    showsVerticalScrollIndicator: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
  }

  componentDidMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardWillShow,
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardWillHide,
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = event => this.setState({ isVisible: false });

  keyboardWillHide = event => this.setState({ isVisible: true });

  render() {
    let _style = [styles.content];
    if (!!this.props.hasFooter && this.state.isVisible) {
      _style.push({ marginBottom: 60 });
    }
    if (!this.props.hasHeader) {
      _style.push({ marginTop: 0 });
    }

    return (
      <KeyboardAwareScrollView
        automaticallyAdjustContentInsets={false}
        resetScrollToCoords={
          this.props.disableKBDismissScroll ? null : { x: 0, y: 0 }
        }
        extraHeight={100}
        keyboardShouldPersistTaps={
          this.props.keyboardShouldPersistTaps
            ? this.props.keyboardShouldPersistTaps
            : 'handled'
        }
        ref={c => {
          this._scrollview = c;
          this._root = c;
        }}
        {...this.props}
        style={[_style, this.props.style]}
        extraScrollHeight={100}>
        {this.props.children}
      </KeyboardAwareScrollView>
    );
  }
}

Content.propTypes = {
  ...ScrollView.propTypes,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array,
  ]),
  hasHeader: PropTypes.bool,
  hasFooter: PropTypes.bool,
  padder: PropTypes.bool,
  disableKBDismissScroll: PropTypes.bool,
  enableResetScrollToCoords: PropTypes.bool,
  keyboardShouldPersistTaps: PropTypes.string,
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    width: '100%',
    marginTop: 50,
  },
});
