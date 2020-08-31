import React, { useState, useEffect, ComponentFactory,Component } from 'react';
import {
  View,
  ImageBackground,
  Image,
  ImageStyle,
  Text,
  TouchableHighlight,
  Alert,
  Button
} from 'react-native';
import styles from './styles';
import Mapa from '../../Components/Maps'
import { HomeNavigationProps } from "../../../Component/Navigation";
const header = require('../../../assets/Header-Background.png')


   
 

const Inicio = ({ navigation }: HomeNavigationProps<"Inicio">)=> {
  

 const NavigateToPrincipal =() =>{
  }
  const NavigateToRegistro = () => {
  } 

    return (
      

      <View style={styles.PrincipalContainer}> 
      
          <Image source={header} style={styles.BackgroundContainer as ImageStyle}  ></Image>
          <View style={styles.MapsContainer}>
              <Mapa></Mapa>
          </View>
          <View style={styles.MenuContainer}>
            <TouchableHighlight onPress={NavigateToPrincipal}>
                <Text >Cerrar Sesion</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={NavigateToRegistro}>
                <Text >menu</Text>
            </TouchableHighlight>
          </View>
      </View>
      
    );
};

export default Inicio;