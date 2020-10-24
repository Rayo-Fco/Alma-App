import React, { useState, useEffect, ComponentFactory,Component, useReducer } from 'react';
import {
  View,
  ImageBackground,
  Image,
  ImageStyle,
  Text,
  TouchableHighlight,
  Alert,
  Button,
  ImageProps
} from 'react-native';
import styles from './styles';

const header = require('../../../assets/Header-Background.png')
import { HomeNavigationProps } from "../../../Component/Navigation";
import { useNavigation } from '@react-navigation/native';

import Info from '../../Components/Info'
import CheckIn from '../../Components/CheckIn';

const menu1 = require('../../../assets/menu/1.png')
const menu2 = require('../../../assets/menu/x.png')
const menu3 = require('../../../assets/menu/3.png')


const Seguimiento = ({route,navigation }: HomeNavigationProps<"Contacto">)=> {
  const [Barra, setBarra] = useState<string>("Principal");
  const [ImgMenu,setImgMenu] = useState<ImageProps>(menu2)
  const navig = useNavigation();
  
  

 const NavigateToPrincipal =() =>{
    setImgMenu(menu2)
    setBarra("Principal")
    navig.navigate("Inicio",{ PropsMenu:"Principal"})
  }
  const NavigateToInfo =() =>{
    setImgMenu(menu3)
    setBarra("Info")
  }
  const NavigateToCheck =() =>{
    setImgMenu(menu1)
    setBarra("Check")
  }
 


  const Container = ()=>{
    switch (Barra) {
      case "Info":
          return <Info></Info>
      break;
      case "Check":
          return <CheckIn></CheckIn>
      break;
    
      default:
          return <View></View>
      break;
    }
  }
  

    return (
      
      <View style={styles.PrincipalContainer}> 
      
          <Image source={header} style={styles.BackgroundContainer as ImageStyle}  ></Image>
          <View style={styles.MapsContainer}>
            <Text>Contacto seguridad</Text>
          </View>
          <Container/>
          <View style={styles.MenuContainer}>
            <Image source={ImgMenu} style={styles.MenuImage as ImageStyle} ></Image>
            <View style={styles.MenuBottom}>
              <TouchableHighlight underlayColor={"transparent"} style={{backgroundColor:"transparent", width:80, marginRight:45}} onPress={NavigateToCheck}>
                  <Text ></Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor={"transparent"} style={{backgroundColor:"transparent",  width:80}}onPress={NavigateToPrincipal}>
                <Text ></Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor={"transparent"} style={{backgroundColor:"transparent", width:80,marginLeft:45}} onPress={NavigateToInfo}>
                  <Text ></Text>
              </TouchableHighlight>
            </View>
            
         </View>
      </View>
       
      
    );
};

export default Seguimiento;