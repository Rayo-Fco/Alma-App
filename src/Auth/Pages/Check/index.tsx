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

const header = require('../../../assets/Header-Background.png')
import { HomeNavigationProps } from "../../../Component/Navigation";
import { useNavigation } from '@react-navigation/native';

const CheckIn = ({navigation}:HomeNavigationProps<'Check'>)=> {
  const navi = useNavigation();
  const NavigateToPrincipal =() =>{
   }
  
   

    return (
      
      <View style={styles.PrincipalContainer}> 
      
          <Image source={header} style={styles.BackgroundContainer as ImageStyle}  ></Image>
          <View style={styles.MapsContainer}>
            <Text>Check InNNNNNNNNNNNN</Text>
          </View>
          <View style={styles.MenuContainer}>
            <TouchableHighlight onPress={NavigateToPrincipal}>
                <Text >Cerrar Sesion</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=>{navi.navigate('Inicio') }} >
                <Text >Inicio</Text>
            </TouchableHighlight>
          </View>
      </View>
      
      
    );
};

export default CheckIn