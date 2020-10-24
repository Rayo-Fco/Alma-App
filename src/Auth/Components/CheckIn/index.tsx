import React, { useState, useEffect, ComponentFactory,Component } from 'react';
import {
  View,
  Alert,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';

import styles from './styles';

interface Location {
    latitude:number, 
    longitude:number,
    latitudeDelta:number,
    longitudeDelta:number
}

 
let region = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.015,
  longitudeDelta: 0.015
}

 const CheckIn = () =>{
  const [count, setCount] = useState(0);
  const onPress = () => setCount(count + 1);

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={onPress}>
        <View style={styles.button}>
          <Text>Touch Here</Text>
        </View>
      </TouchableHighlight>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          {count ? count : null}
        </Text>
      </View>
    </View>
  );
}



export default CheckIn
