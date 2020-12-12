import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ImageBackground,
  Modal,
  Button,
  Text,
  TouchableHighlight,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
} from 'react-native';
import { CommonActions } from "@react-navigation/native";
import styles from './styles';
import { TextInput } from 'react-native-gesture-handler';
import { AuthNavigationProps } from "../../../Component/Navigation";
import { Icon } from "react-native-elements";
import api from '../../../Services/api';
import Loading from '../../../Component/Loading'
import AsyncStorage from '@react-native-async-storage/async-storage';
const fondo = require('../../../assets/Login-Background.png')


const Login = ({ navigation }: AuthNavigationProps<"Login">) => {
  const password2 = useRef<RNTextInput>(null);
  const email2 = useRef<RNTextInput>(null);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false)
  const [emailRP, setEmailRP] = useState('');

  const cerrar = () => {
    setVisible(false)
    setEmailRP('')
  }

  const recuperar = () => {
    if(emailRP == '')
    {
      Alert.alert("Error","Llene el Email a recuperar contraseña")
    }
    else
    {
      let correo = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
      if(!correo.test(emailRP))
      {
        Alert.alert("Error","Email invalido")
      }
      else
      {
          api.post('/login/reset', {email: emailRP }).then(()=>{

              return  Alert.alert("Exito","Email enviado, acuerdate que tienes solo 5 min para cambiar la contraseña",[
                { text: "Aceptar", onPress:cerrar}
              ],)

          }).catch((err)=>{
            let error = { message: "Contacta a Soporte de Alma" }
            error = err.response.data.error[0]
            return Alert.alert("Error",error.message)
          })
          
      }
    }
  }

  const ingresar = () => {
    if (password == '' || email == '') {
      Alert.alert("Error","Llene todos los campos")
    } else {
      let correo = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
      let pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
      if (!correo.test(email)) {
        Alert.alert("Email invalido")
      }
      else {
        if (!pass.test(password)) {
          Alert.alert("Contraseña invalida")
        }
        else {
          setLoading(true)
          api.post('/login', { password: password, email: email }).then(async (response) => {
            let token = {
              token: response.data.token
            }
            await AsyncStorage.setItem('@storage_Alma', JSON.stringify(token)).catch((e) => {
              console.log("error" + e);
            })
            setLoading(false)
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Auth" }],

              })
            )
          }).catch((err) => {
            setTimeout(() => {
              setLoading(false)
            }, 200)
            setTimeout(() => {
              if (!err.response) {
                return Alert.alert('Contactar a Soporte de Alma')
              }
              else {
                let error = { message: "Contacta a Soporte de Alma" }
                error = err.response.data.error[0]
                return Alert.alert(error.message)
              }
            }, 300)


          })



        }
      }
    }

  }
  return (

    <KeyboardAvoidingView
      style={{ flex: 2, }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      <ImageBackground source={fondo} style={styles.BackgroundContainer}  >
        <View style={styles.LogoContainer} >

        </View>
        <View style={styles.PrincipalContainer} >

          <Text style={styles.TextoTitulo}>Iniciar Sesión</Text>
          <View style={styles.InputContainer}>
            <TextInput
              placeholder={'Correo Electronico'}
              placeholderTextColor={'#FC8EED'}
              returnKeyType="next"
              style={styles.Input}
              value={email}
              onSubmitEditing={() => password2.current?.focus()}
              onChangeText={(text) => setEmail(text)}
              ref={email2}
              keyboardType="email-address"
              maxLength={60}
              spellCheck={false}
              maxFontSizeMultiplier={1}
            ></TextInput>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder={'Ingrese su Contraseña'}
                placeholderTextColor={'#FC8EED'}
                style={styles.inputStyle}
                autoCorrect={false}
                secureTextEntry={showPassword ? false : true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                ref={password2}
                onSubmitEditing={ingresar}
                keyboardType="default"
                maxLength={30}
                spellCheck={false}
                maxFontSizeMultiplier={1}
              />
              <Icon
                type="material-community"
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                iconStyle={styles.IcoPassword}
                onPress={() => setShowPassword(!showPassword)}
              />
            </View>

          </View>
          <TouchableHighlight style={styles.BtnIngresar} onPress={ingresar}  >
            <Text style={styles.TextBtnIngresar} maxFontSizeMultiplier={1}>Ingresar</Text>
          </TouchableHighlight>

          <Text style={styles.TextRecuperar} onPress={() => setVisible(true)}>Recuperar Contraseña</Text>
          <Modal
            visible={visible}
            transparent={true}
            animationType={"fade"}
            key={1}
          >
            <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }} >
              <TouchableHighlight style={{ height: "100%", width: "100%", alignItems: "center", justifyContent: "center", }} onPress={cerrar} >
                <View style={styles.overlay}>
                  <TouchableHighlight style={{ height: "100%", width: "100%", alignItems: "center", justifyContent: "center", }} >
                    <View style={styles.view} >
                      <Text style={styles.TextoTitulo}>Recuperar Contraseña</Text>
                      <TextInput
                        placeholder={'Correo Electronico'}
                        placeholderTextColor={'#FC8EED'}
                        returnKeyType="send"
                        style={styles.Input}
                        value={emailRP}
                        onSubmitEditing={recuperar}
                        onChangeText={(text) => setEmailRP(text)}
                        keyboardType="email-address"
                        maxLength={60}
                        spellCheck={false}
                        maxFontSizeMultiplier={1}
                      ></TextInput>
                      <TouchableHighlight style={styles.BtnIngresar} onPress={recuperar}  >
                        <Text style={styles.TextBtnIngresar} maxFontSizeMultiplier={1}>Enviar</Text>
                      </TouchableHighlight>
                      <Text style={styles.TextRecuperar} onPress={cerrar}>CERRAR</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </TouchableHighlight>
            </View>
          </Modal>
          <Loading isVisible={loading} text={"Iniciando Session"}></Loading>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Login;