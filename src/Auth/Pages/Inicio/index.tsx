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
import {CommonActions} from '@react-navigation/native'
import styles from './styles';
import Mapa from '../../Components/Maps'
import Info from '../../Components/Info'
import { HomeNavigationProps } from "../../../Component/Navigation";
const header = require('../../../assets/Header-Background.png')
const menu1 = require('../../../assets/menu/1.png')


   
 

const Inicio = ({ navigation }: HomeNavigationProps<"Inicio">)=> {
  

 const NavigateToPrincipal =() =>{
  navigation.dispatch(CommonActions.reset({
    index: 0,
    routes: [{ name: 'Home' }]
  }))
  }
  const NavigateToRegistro = () => {
  } 

    return (
      

      <View style={styles.PrincipalContainer}> 

          <View style={styles.BackgroundView}>
            <Image source={header} style={styles.BackgroundContainer as ImageStyle}  ></Image>  
          </View>
          
          <View style={styles.MapsContainer}>
            
            <Mapa></Mapa>
              
          </View>
          <Info></Info> 
          <View style={styles.MenuContainer}>
            <Image source={menu1} style={styles.MenuImage as ImageStyle} ></Image>
            <View style={styles.MenuBottom}>
              <TouchableHighlight style={{backgroundColor:"#466584", width:80, marginRight:45}} onPress={NavigateToPrincipal}>
                  <Text >Cerrar Sesion</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{backgroundColor:"red", width:80}}onPress={NavigateToRegistro}>
                <Text >menu</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{backgroundColor:"#88858445",width:80,marginLeft:45}} onPress={NavigateToRegistro}>
                  <Text >menu</Text>
              </TouchableHighlight>
            </View>
            
          </View>
      </View>
      
    );
};

export default Inicio;