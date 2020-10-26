import React, { useState, useEffect, ComponentFactory,Component } from 'react';
import {
  View,
  Alert,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

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
interface Props{
  isVisible: boolean,
}
 const CheckIn = (props:Props) =>{
  const { isVisible } = props;


  const Container = ()=>{
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Check in de Seguridad</Text>
        <Text style={styles.subtitulo}>Datos Adicionales(No son obligacion)</Text>
        <TextInput style={styles.input}></TextInput>
      </View>
    );
  }

  if(isVisible)
  {
   return  (<Container></Container>)
  }else{
    return (<View></View> )
  }
  
}



export default CheckIn
