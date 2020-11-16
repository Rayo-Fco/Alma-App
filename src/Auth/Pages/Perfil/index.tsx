import React, { useState, useEffect, useRef, Component, useReducer } from 'react';
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
  TextInput as RNTextInput,
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
import { CommonActions } from '@react-navigation/native'
import api from '../../../Services/api';
import Loading from '../../../Component/Loading'
import { Overlay } from "react-native-elements";

const menu1 = require('../../../assets/menu/1.png')
const menu3 = require('../../../assets/menu/3.png')
const menux = require('../../../assets/menu/x.png')
interface User {
  nombre: string
  apellido: string
  rut: string
  telefono: number
  email: string
  fecha_registro: Date
}
const Perfil = ({ navigation, route }: HomeNavigationProps<"Contacto">) => {
  const navi = useNavigation();

  const [Barra, setBarra] = useState<string>("Principal");
  const [ImgMenu, setImgMenu] = useState<ImageProps>(menux)
  const [info, setInfo] = useState(false);
  const [checkin, setCheckin] = useState(false);
  const [valido, setValido] = useState(true)
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User>()
  const [disable, setDisable] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const confirmPassword2 = useRef<RNTextInput>(null);
  const password2 = useRef<RNTextInput>(null);
  const [passwordA, setPasswordA] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navig = useNavigation();
  const [next, setNext] = useState(false)
  const [telefono,setTelefono] = useState('')
  const [email, setEmail] = useState('')

  const getToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Alma')
      if (jsonValue) setToken(JSON.parse(jsonValue).token)
      return jsonValue != null ? (JSON.parse(jsonValue)) : null;
    }
    catch (e) {
      Alert.alert('Error', e)
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    }
  }

  const getData = async () => {
    setLoading(true)
    await api.get('/user', {
      headers:
      {
        Authorization: "Bearer " + token
      }
    }).then((response) => {
      setUser(response.data)
      setTelefono(response.data.telefono.toString())
      setEmail(response.data.email)
      setLoading(false)

    })
  }

  useEffect(() => {
    setPasswordA('')
    setConfirmPassword('')
    setPassword('')
    Limpiar()
    if (route.params) {
      setImgMenu(menux)
    }
  }, [route.params])

  useEffect(() => {
    getToken()
  }, [])

  useEffect(() => {
    if (token != "") getData()
  }, [token])
  

  const NavigateToPrincipal = () => {
    Limpiar()
    navig.navigate("Inicio", { PropsMenu: "Principal" })
  }
  const NavigateToInfo = () => {
    Limpiar()
    if (!info) {
      setInfo(true)
      setImgMenu(menu3)
    } else {
      setInfo(false)
    }
  }
  const NavigateToCheck = () => {
    Limpiar()
    if (!checkin) {
      setCheckin(true)
      setImgMenu(menu1)
      console.log(user);
    } else {
      setCheckin(false)
    }
  }

  const Limpiar = () => {
    setCheckin(false)
    setInfo(false)
    setImgMenu(menux)
  }
  const EliminarToken = async()=>{
    try {
      await AsyncStorage.removeItem('@storage_Alma')
    } 
    catch(e) 
    {
      Alert.alert('Error',e)
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

  useEffect(()=>{
    if(!valido)
    {
      CerrarSession('Session Caducada, Inicia Nuevamente',true)
      
    }
  },[valido])

  const Update = async() => {
    let pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/

    if(!pass.test(password)) return Alert.alert("Error", "Clave invalida") 
    let datos
    if(confirmPassword.length > 5)
    {
       datos ={
        email: email,
        telefono: telefono,
        password: password,
        confirmPassword: confirmPassword
      }
    }
    else
    {
       datos ={
        email: email,
        telefono: telefono,
        password: password
      }
    }
    await api.post('/updateuser',datos ,
    {
      headers:
      {
        Authorization: "Bearer " + token,
      }
    }).then(() => {
      setLoading(false)
      /* 
      isVisible = false */
      setTimeout(() => {
        setConfirmPassword("")
        setPasswordA("")
        setPassword('')
        setNext(false)
        setTimeout(() => { Alert.alert('Se han Actualizado tus datos') }, 500)
      }, 300)
      getData()
    }).catch((err) => {
      if (err.response.data == "Unauthorized") {
        setValido(false)
      }
      setTimeout(() => { setLoading(false) }, 200)
      setTimeout(() => {

        if (!err.response) {
          return Alert.alert('Contactar a Soporte de Alma')
        }
        else {
          let error: [{ message: string }] = err.response.data.error
          let err2 = ""
          error.map((err) => {
            err2 = err2 + "\n* " + err.message
          })
          Alert.alert("Error", err2)
        }
      }, 300)


    })
  }


  const continuar = () => {
    if( user?.telefono != parseInt(telefono) || user?.email != email || (passwordA.length > 0 && confirmPassword.length >0))
    {
      if(!email.trim() || !telefono.trim() ){
        return Alert.alert('Por favor', 'Complete todos los campos')
      }
      let correo = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
      let pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
      if(correo.test(email))
      {
        if(telefono.length == 9)
        {
          if(passwordA.length > 0 )
          {
            if(pass.test(passwordA) && passwordA.length > 5)
            {
              if(passwordA === confirmPassword)
              {
                setNext(true)
              }
              else
              {
                return Alert.alert('Error','Las Contraseñas no coinciden')
              }
            }
            else
            {
              return Alert.alert('Error','La contraseña tiene que tener al menos una letra mayuscula, una letra minuscula y un numero, con 6 caracteres como minimo')
            }
          }
          else
          {
            setNext(true)
          }
          
        }
        else
        {
          return Alert.alert('Error','Telefono invalido')
        }
      }
      else
      {
        return Alert.alert('Error','El email es invalido')
      }
      
    }
    else
    {
      Alert.alert('Cuidado!','Debe modificar sus datos la continuar')
    }
  }



  return (

    <View style={styles.PrincipalContainer}>

      <View style={styles.BackgroundView}>
        <Image source={header} style={styles.BackgroundContainer as ImageStyle}  ></Image>
        <View style={{ width: 80, height: 80, position: 'absolute', right: 8, top: 50, }}>
          <Icon
            type="material-community"
            name="menu"
            iconStyle={{ color: "#ffff", fontSize: 50 }}
            onPress={() => { Limpiar(); navigation.openDrawer() }}
          />
        </View>
      </View>
      <View style={styles.PerfilContainer}>
        
        <KeyboardAvoidingView
          style={{ flex: 2, }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={{ justifyContent: 'center', }} keyboardShouldPersistTaps="handled" >
          <Text style={styles.Titulo}>Hola!, {user?.nombre} {user?.apellido}</Text>
            <View style={styles.ContainerInput}>
              <Text style={styles.TextInput}>Email:</Text>
              <TextInput
                placeholder={'Correo Electronico'}
                placeholderTextColor={'#FC8EED'}
                returnKeyType="next"
                style={[styles.Input]}
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
                maxLength={60}
                spellCheck={false} />
            </View>
            <View style={styles.ContainerInput}>
              <Text style={styles.TextInput}>Telefono:</Text>
              <TextInput
                placeholder={'Telefono'}
                placeholderTextColor={'#FC8EED'}
                returnKeyType="send"
                style={[styles.Input]}
                keyboardType="number-pad"
                value={telefono}
                onChangeText={(text) => setTelefono(text)}
                maxLength={9}
                spellCheck={false}/>
            </View>
            <View style={styles.Password2Container}>
            <Text style={styles.textTituloPass}>Cambiar Contraseña </Text>

            <View style={styles.passwordContainer}>

              <TextInput
                placeholder={'Nueva Clave'}
                placeholderTextColor={'#FC8EED'}
                style={styles.Inputpassword}
                returnKeyType={"next"}
                onSubmitEditing={() => confirmPassword2.current?.focus()}
                ref={password2}
                value={passwordA}
                onChangeText={(text) => setPasswordA(text)}
                spellCheck={false}
                secureTextEntry={showPassword ? false : true}
                maxFontSizeMultiplier={1}
              />
              <Icon
                type="material-community"
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                iconStyle={styles.IcoPassword}
                onPress={() => setShowPassword(!showPassword)}
              />

            </View>
            <TextInput
              placeholder={'Repita la Nueva Clave'}
              placeholderTextColor={'#FC8EED'}
              style={styles.Inputpassword}
              returnKeyType={"done"}
              onSubmitEditing={() => continuar()}
              ref={confirmPassword2}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              spellCheck={false}
              secureTextEntry={showPassword ? false : true}
              maxFontSizeMultiplier={1}

            />
            </View>

            <TouchableHighlight style={styles.Btn} >
              <Text style={styles.TextBtn} onPress={continuar} maxFontSizeMultiplier={1}>Continuar</Text>
            </TouchableHighlight>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <Overlay
        isVisible={next}
        overlayStyle={styles.overlay}
        onBackdropPress={() => setNext(!next)}
      >
        <View>
          <Text style={styles.TextInput}>Digite la Contraseña Actual para guardar los cambios</Text>
          <View style={[styles.passwordContainer , {marginTop:20}]}>

              <TextInput
                placeholder={'Contraseña Actual'}
                placeholderTextColor={'#FC8EED'}
                style={styles.Input}
                returnKeyType={"next"}
                ref={password2}
                value={password}
                onChangeText={(text) => setPassword(text)}
                spellCheck={false}
                secureTextEntry={showPassword2 ? false : true}
                maxFontSizeMultiplier={1}
              />
              <Icon
                type="material-community"
                name={showPassword2 ? "eye-off-outline" : "eye-outline"}
                iconStyle={styles.IcoPassword}
                onPress={() => setShowPassword2(!showPassword2)}
              />

            </View>
          <TouchableHighlight style={[styles.Btn, {marginTop:20}]} >
            <Text style={styles.TextBtn} onPress={Update} maxFontSizeMultiplier={1}>Guardar</Text>
          </TouchableHighlight>
          <Button title="Salir " onPress={() => setNext(!next)}></Button>
        </View>
      </Overlay>

      <Info Valido={setValido} token={token} isVisible={info}></Info>
      <Check Valido={setValido} token={token} isVisible={checkin}></Check>


      <View style={styles.MenuContainer}>
        <Image source={ImgMenu} style={styles.MenuImage as ImageStyle} ></Image>
        <View style={styles.MenuBottom}>
          <TouchableHighlight underlayColor={"transparent"} style={{ backgroundColor: "transparent", width: 80, marginRight: 45 }} onPress={NavigateToCheck}>
            <Text ></Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor={"transparent"} style={{ backgroundColor: "transparent", width: 80 }} onPress={NavigateToPrincipal}>
            <Text ></Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor={"transparent"} style={{ backgroundColor: "transparent", width: 80, marginLeft: 45 }} onPress={NavigateToInfo}>
            <Text ></Text>
          </TouchableHighlight>
        </View>

      </View>
    </View>


  );
};

export default Perfil;