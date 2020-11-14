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
import Check from '../../Components/CheckIn';
import { Input } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../../Component/Loading'
import {CommonActions} from '@react-navigation/native'
import api from '../../../Services/api';
const menu1 = require('../../../assets/menu/1.png')
const menu3 = require('../../../assets/menu/3.png')
const menux = require('../../../assets/menu/x.png')



const Seguimiento = ({route,navigation }: HomeNavigationProps<"Contacto">)=> {
  const [Barra, setBarra] = useState<string>("Principal");
  const [ImgMenu,setImgMenu] = useState<ImageProps>(menux)
  const [info, setInfo] = useState(false);
  const [checkin, setCheckin] = useState(false);
  const [valido, setValido] = useState(true)
  const [token,setToken] = useState("")
  const [loading,setLoading] = useState(false)

  const navig = useNavigation();
  const getToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Alma')
      if(jsonValue) setToken(JSON.parse(jsonValue).token)
      return jsonValue != null ? (JSON.parse(jsonValue)): null;
    } 
    catch(e) 
    {
      Alert.alert('Error',e)
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    }
  }
  
  const getData = async () =>{
      setLoading(true)
      await api.get('/checkin/user',{
        headers: 
        { 
          Authorization: "Bearer "+token
        }
      }).then((response)=>{
       //   setDatas(response.data)
          setLoading(false)
      })
  }
  
  useEffect(()=>{

    Limpiar()
    if(route.params){ 
       setImgMenu(menux)
    }
  },[route.params])
  
  useEffect(()=>{
    getToken()
  },[])

  useEffect(()=>{
    if(token != "") getData()
  },[token])
  
  
 const NavigateToPrincipal =() =>{
    Limpiar()
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
            <Text style={{color:"red",fontSize:50,}}>Prontamente Contacto de Seguridad</Text>
          </View>
          
          <Loading isVisible={loading} text={"Cargando.."}></Loading>
          <Info Valido={setValido} token={token} isVisible={info}></Info> 
          <Check Valido={setValido} token={token} isVisible={checkin}></Check>




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