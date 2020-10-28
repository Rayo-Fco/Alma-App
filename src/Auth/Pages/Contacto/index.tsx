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
  ImageProps,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';
import styles from './styles';

const header = require('../../../assets/Header-Background.png')
import { HomeNavigationProps } from "../../../Component/Navigation";
import { useNavigation } from '@react-navigation/native';
import { Icon } from "react-native-elements";

import Info from '../../Components/Info'
import CheckIn from '../../Components/CheckIn';
import { Input } from 'native-base';

const menu1 = require('../../../assets/menu/1.png')
const menu2 = require('../../../assets/menu/2.png')
const menu3 = require('../../../assets/menu/3.png')
const menux = require('../../../assets/menu/x.png')



const Seguimiento = ({route,navigation }: HomeNavigationProps<"Contacto">)=> {
  const [Barra, setBarra] = useState<string>("Principal");
  const [ImgMenu,setImgMenu] = useState<ImageProps>(menu2)
  const [info, setInfo] = useState(false);
  const [checkin, setCheckin] = useState(false);
  

  const navig = useNavigation();
  
  useEffect(()=>{

    Limpiar()
    if(route.params){ 
       setImgMenu(menux)
    }
  },[route.params])
  
  
 const NavigateToPrincipal =() =>{
    Limpiar()
    setImgMenu(menu2)
    navig.navigate("Inicio",{ PropsMenu:"Principal"})
  }
  const NavigateToInfo =() =>{
    if(!info){
    Limpiar()
    setInfo(true)
    setImgMenu(menu3)
    }else
    {
      setInfo(false)
      setImgMenu(menux)
    }
  }
  const NavigateToCheck =() =>{
    if(!checkin){
      Limpiar()
      setCheckin(true)
      setImgMenu(menu1)
    }else
    {
      setCheckin(false)
      setImgMenu(menux)
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
            <View style={{width:80,height:80,position:'absolute',right:8,top:50,}}>
              <Icon
                        type="material-community"
                        name="menu"
                        iconStyle={{color: "#ffff",fontSize:50}}
                        onPress={()=>{ navigation.openDrawer()}}
                /> 
            </View>
          </View>
          <View style={styles.MapsContainer}>
            <Text>Contacto seguridad</Text>
            <Text>Contacto seguridad</Text>
            <Text>Contacto seguridad</Text>
            <TextInput 
            placeholder={'Correo Electronico'}
            placeholderTextColor={'#FC8EED'}
            returnKeyType="next"
            style={{marginTop:30,
              fontFamily: 'Roboto_300Light_Italic',
              fontSize: 23,
              borderBottomColor:'#FC6EE9',
              color:'#FC6EE9',
              borderBottomWidth:3,
              width:330,}}
            keyboardType="email-address"
            maxLength={60}
            spellCheck={false}
          ></TextInput>
            <View style={{backgroundColor:"red",width:150,height:80}}></View>
            <Text style={{color:"red",fontSize:50,}}>Contacto seguridad</Text>
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

export default Seguimiento;