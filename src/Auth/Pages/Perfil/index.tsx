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
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView
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
import {CommonActions} from '@react-navigation/native'
import api from '../../../Services/api';
import Loading from '../../../Component/Loading'

const menu1 = require('../../../assets/menu/1.png')
const menu3 = require('../../../assets/menu/3.png')
const menux = require('../../../assets/menu/x.png')
interface User{
    nombre: string
    apellido: string
    rut:string
    telefono: number
    email: string
    fecha_registro: Date
}
const Perfil = ({ navigation,route }: HomeNavigationProps<"Contacto">)=> {
  const navi = useNavigation();
  
  const [Barra, setBarra] = useState<string>("Principal");
  const [ImgMenu,setImgMenu] = useState<ImageProps>(menux)
  const [info, setInfo] = useState(false);
  const [checkin, setCheckin] = useState(false);
  const [valido, setValido] = useState(true)
  const [token,setToken] = useState("")
  const [loading,setLoading] = useState(false)
  const [user,setUser] = useState<User>()
  const [disable,setDisable] = useState(false)

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
      await api.get('/user',{
        headers: 
        { 
          Authorization: "Bearer "+token
        }
      }).then((response)=>{
         console.log(response.data);
         setUser(response.data)
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
      console.log(user);
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
          <View style={styles.PerfilContainer}>
            <Text style={styles.Titulo}>Hola!, {user?.nombre} {user?.apellido}</Text>
            <KeyboardAvoidingView
              style={{ flex: 2, }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              >
             <ScrollView contentContainerStyle={{ justifyContent: 'center' }} keyboardShouldPersistTaps="handled" >
              <View style={styles.ContainerInput}>
              <Text style={styles.TextInput}>Email:</Text>
              <TextInput 
              placeholder={'Correo Electronico'}
              placeholderTextColor={'#FC8EED'}
              returnKeyType="next"
              style={[styles.Input,{color:disable? "red" : "#FC8EED"}]}
              keyboardType="email-address"
              maxLength={60}
              spellCheck={false}
              editable={disable}
              >{user?.email}</TextInput>
            </View>
            <View style={styles.ContainerInput}>
              <Text style={styles.TextInput}>Telefono:</Text>
              <TextInput 
              placeholder={'Correo Electronico'}
              placeholderTextColor={'#FC8EED'}
              returnKeyType="send"
              style={[styles.Input,{color:disable? "red" : "#FC8EED"}]}
              keyboardType="number-pad"
              maxLength={60}
              spellCheck={false}
              editable={disable}
              >{user?.telefono}</TextInput>
            </View>
            </ScrollView>
            </KeyboardAvoidingView>
          </View>
          <Button title={"Modificar"} onPress={()=>{setDisable(!disable)}}>Modificar</Button>
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

export default Perfil;