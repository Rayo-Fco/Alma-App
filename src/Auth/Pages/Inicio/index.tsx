import React, { useState, useEffect, ComponentFactory,Component, useContext, createContext} from 'react';
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
import {CommonActions} from '@react-navigation/native'
import { HomeNavigationProps } from "../../../Component/Navigation"
import styles from './styles';

import Mapa from '../../Components/Maps'
import Info from '../../Components/Info'
import CheckIn from '../../Components/CheckIn';

const header = require('../../../assets/Header-Background.png')


const menu1 = require('../../../assets/menu/1.png')
const menu2 = require('../../../assets/menu/2.png')
const menu3 = require('../../../assets/menu/3.png')



const Inicio = ({ route, navigation }: HomeNavigationProps<"Inicio">)=> {
  const [info, setInfo] = useState(false);
  const [checkin, setCheckin] = useState(false);
  

  /* console.log('Provide'+StateMenu); */
  const [Barra, setBarra] = useState<string>("Principal");

  const [ImgMenu,setImgMenu] = useState<ImageProps>(menu2)

  useEffect(()=>{
    if(route.params){ 
      Limpiar()
       setBarra("Principal")
       setImgMenu(menu2)
    }
  },[route.params])
  
  
 const NavigateToPrincipal =() =>{
    Limpiar()
    setImgMenu(menu2)
    setBarra("Principal")
  }
  const NavigateToInfo =() =>{
    Limpiar()
    setInfo(true)
    setImgMenu(menu3)
    setBarra("Info")
  }
  const NavigateToCheck =() =>{
    Limpiar()
    setCheckin(true)
    setImgMenu(menu1)
    setBarra("Check")
  }
 
  const Limpiar = () =>{
    setCheckin(false)
    setInfo(false)
  }


    return (
      
      
      <View style={styles.PrincipalContainer}> 

          <View style={styles.BackgroundView}>
            <Image source={header} style={styles.BackgroundContainer as ImageStyle}  ></Image>  
          </View>
          
          <View style={styles.MapsContainer}>
            
           <Mapa></Mapa>
           
          </View>
          <Info isVisible={info}></Info> 
          <CheckIn isVisible={checkin}></CheckIn> 

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

export default Inicio;