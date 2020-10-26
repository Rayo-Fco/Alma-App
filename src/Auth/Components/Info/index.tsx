import React, { useState, useEffect, ComponentFactory,Component, useReducer } from 'react';
import {
  View,
  Linking,
  Platform,
  Text,
  Alert,
  Image,
  TouchableHighlight
} from 'react-native';
import { Icon } from "react-native-elements";
import styles from './styles';
import axios from 'axios';

import * as Location from 'expo-location';
import api from '../../../Services/api';

interface Location {
  latitude:string, 
  longitude:string
}

interface Comuna {
  comuna: string,
  phone:string
}
let infocomuna = {
  comuna: '',
  phone: ''
}
let LocationData ={
  latitude:"", 
  longitude:""
}

interface Props{
  isVisible: boolean,
}


const Prueba =(props:Props) =>{
const { isVisible } = props;

const [comuna, setComuna] = useState<Comuna>(infocomuna)
const [location,setLocation] = useState<Location>(LocationData)

const llamada = (phone:string) =>{
  let numero = phone
  let phoneNumber = numero;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${numero}`;
    }
    else  {
    phoneNumber = `tel:${numero}`;
    }
    Linking.canOpenURL(phoneNumber)
    .then(supported => {
    if (!supported) {
        Alert.alert('El Telefono no es Valido ');
      } else {
        return Linking.openURL(phoneNumber);
    }
    })
    .catch(err => console.log(err));
}

const getLocation = async () =>{
  await Location.getLastKnownPositionAsync().then((data)=>{
    let position = {
      latitude: data.coords.latitude.toString(),
      longitude: data.coords.longitude.toString()
    }
    setLocation(position)
    return getComuna(position)
  })
  }

  const getComuna = async (info:Location) =>{
   await api.post('/checkpoint',{ latitude: info.latitude, longitude: info.longitude}).then((response)=>{
      setComuna(response.data)
    }).catch((err)=>{
      console.log(err.details);
      setComuna(err.details)
    })
  } 
  
  useEffect(()=>{
    
    if(isVisible){
      getLocation()
    }
  },[isVisible])


const Container = ()=>{

  if(!comuna) {
    return (
    <View style={styles.countContainer}>
        <Text style={styles.disponible}>Problemas, Contactar a Soporte</Text>
    </View>)
    }else{
      switch (comuna.comuna) {
        case "xxx":
          return (
            <View style={styles.countContainer}>
                <Text style={styles.disponible}>Disponible solo para la Region Metropolitana</Text>
            </View>)
        break;
        case "":
          return (
            <View style={styles.countContainer}> 
                <Text style={styles.cargando}>CARGANDO....</Text>
            </View>)
        break;
      
        default:
            return (
            <View style={styles.countContainer}>
              <Text style={styles.titulo}>COMUNA DE {comuna.comuna}</Text>
              <View style={styles.PhoneContainer} >
                <Icon
                      type="material-community"
                      name="phone"
                      iconStyle={styles.IcoPhone}
                      onPress={ () =>{llamada(comuna.phone)}}
                    /> 
                <Text style={styles.numero} onPress={ () =>{llamada(comuna.phone)}}> {comuna.phone}</Text>
              </View>
              
            </View>)
        break;
      }
    }
  }


  if(isVisible){
    return(
    <View style={styles.container}>
        <Container></Container>
    </View>)
    
  }
  else
  {
    return (<View></View>) 
  }
}
    
  



export default Prueba
