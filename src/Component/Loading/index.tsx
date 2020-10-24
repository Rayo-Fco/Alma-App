import React, { useState, useEffect, ComponentFactory,Component, useReducer } from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import { Overlay } from "react-native-elements";
import styles from './styles';

interface Props{
    isVisible: boolean,
    text: string
}

const Loading = (props:Props) => {
    const { isVisible, text } = props;

  return (
    <Overlay
    isVisible={isVisible}
    overlayStyle={styles.overlay}
  >
    <View style={styles.view}>
      <ActivityIndicator size="large" color="#FC5CE7" />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  </Overlay>
  )
}

export default Loading


