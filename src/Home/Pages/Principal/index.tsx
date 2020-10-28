import React, { useEffect, useState } from 'react';
import {
  View,
  ImageBackground,
  Image,
  ImageStyle,
  Text,
  TouchableHighlight,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProps } from "../../../Component/Navigation";
import { CommonActions } from "@react-navigation/native";
import styles from './styles';
import SafeAreaView from 'react-native-safe-area-view';

const bgimagen = require('../../../assets/Principal-Background.png')
const logo = require('../../../assets/Logo.png') 


const Principal = ({ navigation }: AuthNavigationProps<"Principal">) => {
  const storeData = async () => {
      await AsyncStorage.getItem('@storage_Alma').then(async (response)=>{
          let data = response
          if(data){
            console.log(JSON.parse(data))
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Auth" }],
                
              })
            )
          }
          else
          {
            try {
              await AsyncStorage.removeItem('@storage_Alma')
            } 
            catch(e) 
            {
              console.log("Error remover");
            }
          }
      }).catch(async()=>{
        await AsyncStorage.setItem('@storage_Alma', 'Prueba')
      })
    
  }
  useEffect(()=>{
    storeData()
  },[])
  
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
        <Text style={styles.TextoBienvenida} maxFontSizeMultiplier={1}>¡Hola! Bienvenida</Text>
      
      <TouchableHighlight style={styles.BtnRegistrar} onPress={NavigateToRegistro}>
          <Text style={styles.TextBtnRegistrar} maxFontSizeMultiplier={1}>Registrarse</Text>
      </TouchableHighlight>
      
        <TouchableHighlight style={styles.BtnIniciar} onPress={NavigateToLogin}>
            <Text style={styles.TextBtnIniciar} maxFontSizeMultiplier={1}>Iniciar Sesión</Text>
        </TouchableHighlight>
      </View>
      
    </ImageBackground>
  );
};

export default Principal;