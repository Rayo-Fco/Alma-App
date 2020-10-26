import { Textarea } from 'native-base';
import React, { useState, useEffect, ComponentFactory,Component } from 'react';
import {
  View,
  Alert,
  Image,
  Text,
  TouchableHighlight,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ScrollViewComponent,
} from 'react-native';
//import { TextInput } from 'react-native-gesture-handler';

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
      <KeyboardAvoidingView
    style={{ bottom:100,position:"absolute",width:"100%" }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined }
    >
       <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled" >
          <View style={styles.container}>
            <Text style={styles.titulo}>Check in de Seguridad</Text>
            <Text style={styles.subtitulo}>Datos Adicionales(No son obligacion)</Text>
            <TextInput 
            style={styles.input}
            placeholder={'  Numero del depto. o de la casa'}
            placeholderTextColor={'#FC8EED'}
            />
            <TextInput 
            style={styles.input}
            placeholder={'  Numero de piso del Depto'}
            placeholderTextColor={'#FC8EED'}
            />
            <TextInput 
            style={styles.inputArea}
            placeholder={'  Informacion extra '}
            placeholderTextColor={'#FC8EED'}
            multiline={true}
            numberOfLines={2}
            returnKeyType="send"
            />
            <TouchableHighlight style={styles.Btn} >
              <Text style={styles.TextBtn}>Check In</Text>
            </TouchableHighlight>
          </View>
          
          </ScrollView>
        </KeyboardAvoidingView>
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
