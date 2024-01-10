import React from 'react';
import { Easing } from 'react-native';
import { SimpleAnimation } from 'react-native-simple-animations';

const ComponentAnimation = props => {
  return (
    <SimpleAnimation
      delay={props.delay ? props.delay : props.index * 200}
      duration={1000}
      distance={50}
      direction={props.direction ? props.direction : 'up'}
      easing={Easing.out(Easing.ease)}
      movementType={'slide'}
      fade
      key={props.key}
      style={props.style}>
      {props.children}
    </SimpleAnimation>
  );
};

export default ComponentAnimation;
