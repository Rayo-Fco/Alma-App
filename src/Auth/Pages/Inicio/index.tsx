import React, { useState, useEffect, ComponentFactory,Component, useContext, createContext} from 'react';
import {
  View,
  Image,
  ImageStyle,
  Text,
  TouchableHighlight,
  Alert,
  ImageProps
} from 'react-native';
import {CommonActions} from '@react-navigation/native'
import { HomeNavigationProps } from "../../../Component/Navigation"
import styles from './styles';
import { Icon } from "react-native-elements";
import Mapa from '../../Components/Maps'
import Info from '../../Components/Info'
import CheckIn from '../../Components/CheckIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../Services/api'
import Menu from '../../Components/Menu'
const header = require('../../../assets/Header-Background.png')


const menu1 = require('../../../assets/menu/1.png')
const menu2 = require('../../../assets/menu/2.png')
const menu3 = require('../../../assets/menu/3.png')

interface Point {
  id: number;
  title: string;
  latitude: number;
  longitude:number;
}


const Inicio = ({ route, navigation }: HomeNavigationProps<"Inicio">)=> {
  const [info, setInfo] = useState(false);
  const [checkin, setCheckin] = useState(false);
  const [valido, setValido] = useState(true)
  const [token,setToken] = useState("")

  const [ImgMenu,setImgMenu] = useState<ImageProps>(menu2)
  
  const [markerPDI, setMarkerPDI] = useState<Point[]>([]);
  const [markerCarabinero, setMarkerCarabinero] = useState<Point[]>([]);

  const getToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Alma')
      if(jsonValue) setToken(JSON.parse(jsonValue).token)
      return jsonValue != null ? (JSON.parse(jsonValue)): null;
    } 
    catch(e) 
    {
      CerrarSession(e,true)
    }
  }
  const CerrarSession = (error:string,mensaje:boolean)=>{
    EliminarToken()
    if(mensaje) Alert.alert('Error!',error)
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [{ name: "Home" }],
    }))
  }

  const getPDI= async() =>{
    console.log("TOKEEENNN"+token);
    await api.get('/markers/pdi',{
      headers: 
      { 
        Authorization: "Bearer "+token
      }
    }).then((response) => {
      setMarkerPDI(response.data);
    }).catch((err)=>{
      console.log(err.response);
      return CerrarSession("Lo sentimos, vuelve a ingresar",true)
    })
  }
  const getCarabinero = async() =>{
    await api.get('/markers/comisaria',{
      headers: 
      { 
        Authorization: "Bearer "+token
      }
    }).then((response) => {
      setMarkerCarabinero(response.data);
    }).catch((err)=>{
      return CerrarSession("Lo sentimos, vuelve a ingresar",false)
    })
  }
  useEffect(()=>{
    console.log(route.params);
    Limpiar()
    if(route.params){ 
       setImgMenu(menu2)
    }
  },[route.params])

  useEffect(()=>{
    getToken()
  },[])
  useEffect(()=>{
    if(token !=""){
      getCarabinero()
      getPDI()
    }
  
  },[token])

  const EliminarToken = async()=>{
    try {
      await AsyncStorage.removeItem('@storage_Alma')
    } 
    catch(e) 
    {
      Alert.alert('Error',e)
    }
  }

  useEffect(()=>{
    if(!valido)
    {
      CerrarSession('Session Caducada, Inicia Nuevamente',true)
      
    }
  },[valido])
  
  
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
              <Mapa puntos={{carabineros:markerCarabinero,pdi:markerPDI}}></Mapa>
          </View>
          <Info token={token} isVisible={info} Valido={setValido}></Info> 
          <CheckIn token={token}  isVisible={checkin} Valido={setValido}></CheckIn> 
          
         {/*  <Menu isInfo={setInfo} isCheck={setCheckin} check={checkin} info={info}></Menu> */}
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