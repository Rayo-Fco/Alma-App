import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  Image,
  ImageStyle,
  Text,
  TouchableHighlight,
  Alert,
} from 'react-native';


import { useNavigation } from '@react-navigation/native';

import styles from './styles';

const bgimagen = require('../../assets/Principal-Background.png')
const logo = require('../../assets/Logo.png') 


const Principal = () => {
  const navigation = useNavigation();
  
  const NavigateToLogin = () => {
    navigation.navigate('Login');
  }
  const NavigateToRegistro = () => {
    navigation.navigate('Registro');
  }

  return (
   <ImageBackground source={bgimagen} style={styles.BackgroundContainer} >
     <View style={styles.LogoContainer}> 
       <Image source={logo} style={styles.Logo as ImageStyle} ></Image> 
     </View>
     <View style={styles.PrincipalContainer}> 
       <Text style={styles.TextoBienvenida}>¡Hola! Bienvenida</Text>
     
     <TouchableHighlight style={styles.BtnRegistrar} onPress={NavigateToRegistro}>
        <Text style={styles.TextBtnRegistrar}>Registrarse</Text>
     </TouchableHighlight>
     
      <TouchableHighlight style={styles.BtnIniciar} onPress={NavigateToLogin}>
          <Text style={styles.TextBtnIniciar}>Iniciar Sesión</Text>
      </TouchableHighlight>
     </View>
   </ImageBackground>
  );
};

export default Principal;