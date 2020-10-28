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
import { Icon } from "react-native-elements";
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

  const [ImgMenu,setImgMenu] = useState<ImageProps>(menu2)
  


  
  
 const NavigateToPrincipal =() =>{
    Limpiar()
    setImgMenu(menu2)
  }
  const NavigateToInfo =() =>{
    if(!info){
      Limpiar()
      setInfo(true)
      setImgMenu(menu3)
      }else
      {
        setInfo(false)
        setImgMenu(menu2)
      }
  }
  const NavigateToCheck =() =>{
    if(!checkin){
      Limpiar()
      setCheckin(true)
      setImgMenu(menu1)
    }
    else
    {
      setCheckin(false)
      setImgMenu(menu2)
    }
  }
 
  const Limpiar = () =>{
    setCheckin(false)
    setInfo(false)
  }


    return (
      
      
      <View style={styles.PrincipalContainer}> 

          <View style={styles.BackgroundView}>

            <Image source={header} style={styles.BackgroundContainer as ImageStyle}  ></Image>  
            <View style={{width:80,height:80,position:'absolute',right:8,top:50}}>
            <Icon
                      type="material-community"
                      name="menu"
                      iconStyle={{color: "#ffff",fontSize:50}}
                      onPress={()=>{ navigation.openDrawer()}}
              /> 
            </View>
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