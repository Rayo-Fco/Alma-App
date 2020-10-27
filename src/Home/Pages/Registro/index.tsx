import React, { useRef, useState } from 'react';
import {
  View,
  ImageBackground,
  Text,
  TouchableHighlight,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView, TextInput as RNTextInput,
  Modal,
  Keyboard
} from 'react-native';

import { CheckBox } from "native-base"
import { useNavigation } from '@react-navigation/native';

import { TextInputMask } from 'react-native-masked-text'

import styles from './styles';
import { TextInput } from 'react-native-gesture-handler';
import { AuthNavigationProps } from "../../../Component/Navigation";
import { Icon } from "react-native-elements";
import Loading from '../../../Component/Loading'
import { CommonActions } from "@react-navigation/native";
import api from '../../../Services/api';

const fondo = require('../../../assets/App-Background.png')



const Registro = ({ navigation }: AuthNavigationProps<"Registro">) => {
  const name2 = useRef<RNTextInput>(null);
  const lastname2 = useRef<RNTextInput>(null);
  const email2 = useRef<RNTextInput>(null);
  const phone2 = useRef<RNTextInput>(null);
  const password2= useRef<RNTextInput>(null);
  const confirmPassword2 = useRef<RNTextInput>(null);
  const politicas2 = useRef(null)
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [name,setName] = useState('')
  const [lastname,setLastname] = useState('')
  const [rut,setRut] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [phone,setPhone] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')

  



  const registro = () => {

    Keyboard.dismiss()

    if(!name.trim()|| !lastname.trim() || !rut.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() || !phone.trim() ){
      return Alert.alert('Por favor', 'Complete todos los campos')
    }
    else{
      let correo = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
      let pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
      if(correo.test(email))
      {
          if(phone.length == 9)
          {
              if(pass.test(password) && password.length > 5)
              {
                if(password === confirmPassword)
                {
                  if (isSelected)
                  {
                    let datos = { 
                      password: password, 
                      email: email, 
                      nombre:name, 
                      apellido: lastname, 
                      telefono:phone,
                      rut: rut 
                    }
                    setLoading(true)
                    api.post('/register',datos).then((response)=>{
                      console.log(response.data.token);
                      setLoading(false)
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{ name: "Auth" }],
                        })
                      )
                    }).catch((err)=>{
                      setTimeout(()=>{
                        setLoading(false)
                      },200)
                      setTimeout(()=>{
                        if(!err.response) {  
                          return Alert.alert('Error','Contactar a Soporte de Alma')
                        }
                        else{
                          let error:[{message:string}] = err.response.data.error
                          let err2 = ""
                          error.map((err)=>{
                            err2 = err2+"\n* "+ err.message
                        })
                            Alert.alert("Errores",err2)
                        }
                      }, 300)
                      
                      
                    })
                  } 
                  else 
                  {
                    return Alert.alert('Para Registrarse', 'Hola, tienes que aceptar las politicas de privacidad de alma')
                  }
              
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
            return Alert.alert('Error','Telefono invalido')
          }
         
      }
      else
      {
        return Alert.alert('Error','El email es invalido')
      }
      
      
    }
    
  }
  return (


    <KeyboardAvoidingView
      style={{ flex: 2, }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      <ImageBackground source={fondo} style={styles.BackgroundContainer}  >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled" >
          <View style={styles.PrincipalContainer} >

            <Text style={styles.TextoTitulo} maxFontSizeMultiplier={1}>Registro de Usuario</Text>
            <View style={styles.InputContainer}>
            <TextInputMask
                 type="custom"
                placeholder={'Rut'}
                placeholderTextColor={'#FC8EED'}
                style={styles.Input}
                returnKeyType={"next"}
                onSubmitEditing={() => name2.current?.focus()}
                options={
                  {
                    mask:'99.999.999-S'
                  }
                }
                value={rut}
                onChangeText={text => {setRut(text)}}
                maxFontSizeMultiplier={1}
              />
              <TextInput
                placeholder={'Nombre'}
                placeholderTextColor={'#FC8EED'}
                style={styles.Input}
                returnKeyType={"next"}
                onSubmitEditing={() => lastname2.current?.focus()}
                autoCompleteType="name"
                ref={name2}
                value={name}
                onChangeText={(text)=> setName(text)}
                maxFontSizeMultiplier={1}
              />
              <TextInput
                placeholder={'Apellidos'}
                placeholderTextColor={'#FC8EED'}
                style={styles.Input}
                returnKeyType={"next"}
                onSubmitEditing={() => phone2.current?.focus() }
                ref={lastname2}
                value={lastname}
                onChangeText={(text) => setLastname(text)}
                maxFontSizeMultiplier={1}
              />
              <View style={styles.phoneContainer}>
              <Text style={styles.textphone}>+56</Text>
              <TextInput
                placeholder={'Telefono'}
                placeholderTextColor={'#FC8EED'}
                style={styles.Inputphone}
                returnKeyType={"next"}
                onSubmitEditing={() => email2.current?.focus()}
                ref={phone2}
                autoCompleteType="tel"
                value={phone}
                onChangeText={(text) => setPhone(text)}
                keyboardType="number-pad"
                maxLength={9}
                maxFontSizeMultiplier={1}
              />
              </View>
              <TextInput
                placeholder={'Correo Electronico'}
                placeholderTextColor={'#FC8EED'}
                style={styles.Input}
                returnKeyType={"next"}
                onSubmitEditing={() => password2.current?.focus()}
                ref={email2}
                autoCompleteType="email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                maxFontSizeMultiplier={1}
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder={'Contraseña'}
                  placeholderTextColor={'#FC8EED'}
                  style={styles.Inputpassword}
                  returnKeyType={"next"}
                  onSubmitEditing={() => confirmPassword2.current?.focus()}
                  ref={password2}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
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
                placeholder={'Repita la Contraseña'}
                placeholderTextColor={'#FC8EED'}
                style={styles.Input}
                returnKeyType={"done"}
                onSubmitEditing={() => registro()}
                ref={confirmPassword2}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                spellCheck={false}
                secureTextEntry={showPassword ? false : true}
                maxFontSizeMultiplier={1}

              />
              <View style={styles.politicaContainer}>
              <CheckBox
                  checked={isSelected}
                  onPress={() => setSelection(isSelected ? false : true)}
                  style={styles.checkbox}
                  color={"#FC6EE9"}
                />
                <Text style={styles.TextPolitica} maxFontSizeMultiplier={1}> Acepta los <Text onPress={() => { setModalVisible(true); }} style={styles.TextPolitica2} maxFontSizeMultiplier={1}>Terminos de Alma </Text></Text>
              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <ScrollView>
                      <Text style={styles.TextoTituloPolitica} maxFontSizeMultiplier={1}>Politicas de Privacidad de Alma </Text>
                      <Text style={styles.modalText} maxFontSizeMultiplier={1}>jakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudaheuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudaheuhfjdshudah</Text>
                    </ScrollView>
                    <TouchableHighlight
                      style={styles.openButton}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <Text style={styles.textStyle} maxFontSizeMultiplier={1}>Cerrar Politicas de Privacidad</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            </View>
            <TouchableHighlight style={styles.BtnIngresar} onPress={registro}>
              <Text style={styles.TextBtnIngresar} maxFontSizeMultiplier={1}>Registrarse</Text>
            </TouchableHighlight>

          </View>
        </ScrollView>
        <Loading isVisible={loading} text={"Validando Datos..."}></Loading>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Registro;