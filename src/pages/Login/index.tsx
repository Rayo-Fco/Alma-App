import React, { useState,useRef } from 'react';
import {
  View,
  ImageBackground,
  Image,
  ImageStyle,
  Text,
  TouchableHighlight,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput  
} from 'react-native';


import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { TextInput } from 'react-native-gesture-handler';

const fondo = require('../../assets/Login-Background.png')


const Login = () => {
  const password = useRef<RNTextInput>(null);

  const ingresar = () =>{
    Alert.alert('Simple Button pressed')
  }
  return (
    
    <KeyboardAvoidingView
    style={{ flex: 2, }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
    
       <ImageBackground source={fondo} style={styles.BackgroundContainer}  >
      <View style={styles.LogoContainer} > 
        
      </View>
      <View style={styles.PrincipalContainer} > 
        
        <Text style={styles.TextoTitulo}>Iniciar Sesión</Text>
      <View style={styles.InputContainer}>
          <TextInput 
            placeholder={'Correo Electronico'}
            placeholderTextColor={'#FC8EED'}
            returnKeyType="next"
            style={styles.Input}
            onSubmitEditing={() => password.current?.focus()}
          ></TextInput>
          <TextInput 
            placeholder={'Contraseña'}
            placeholderTextColor={'#FC8EED'}
            style={styles.Input}
            ref={password} 
            returnKeyType="done"
            onSubmitEditing={() => ingresar()}
            secureTextEntry
          ></TextInput>
      </View>
      <TouchableHighlight style={styles.BtnIngresar} onPress={ingresar}>
          <Text style={styles.TextBtnIngresar}>Ingresar</Text>
      </TouchableHighlight>
      
      </View>
   </ImageBackground>
   </KeyboardAvoidingView>
  );
};

export default Login;