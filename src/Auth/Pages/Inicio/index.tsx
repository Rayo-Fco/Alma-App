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
/* import MenuContext from '../Context'
const { StateMenu, setStateMenu} = useContext(MenuContext)  */
const header = require('../../../assets/Header-Background.png')


const menu1 = require('../../../assets/menu/1.png')
const menu2 = require('../../../assets/menu/2.png')
const menu3 = require('../../../assets/menu/3.png')



const Inicio = ({ route, navigation }: HomeNavigationProps<"Inicio">)=> {

  

  /* console.log('Provide'+StateMenu); */
  const [Barra, setBarra] = useState<string>("Principal");

  const [ImgMenu,setImgMenu] = useState<ImageProps>(menu2)

  useEffect(()=>{
    if(route.params){ 
       setBarra("Principal")
       setImgMenu(menu2)
    }
  },[route.params])
  
  
 const NavigateToPrincipal =() =>{
    setImgMenu(menu2)
    setBarra("Principal")
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

          <View style={styles.BackgroundView}>
            <Image source={header} style={styles.BackgroundContainer as ImageStyle}  ></Image>  
          </View>
          
          <View style={styles.MapsContainer}>
            
           <Mapa></Mapa>
           
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

export default Inicio;