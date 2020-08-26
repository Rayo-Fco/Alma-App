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
  Modal
} from 'react-native';

import { CheckBox } from "native-base"
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { TextInput } from 'react-native-gesture-handler';

const fondo = require('../../assets/App-Background.png')



const Registro = () => {
  const name = useRef<RNTextInput>(null);
  const lastname = useRef<RNTextInput>(null);
  const email = useRef<RNTextInput>(null);
  const dni = useRef<RNTextInput>(null);
  const phone = useRef<RNTextInput>(null);
  const password = useRef<RNTextInput>(null);
  const confirmPassword = useRef<RNTextInput>(null);
  const politicas = useRef(null)

  const [modalVisible, setModalVisible] = useState(false);
  const [isSelected, setSelection] = useState(false);


  const registro = () => {
    if (isSelected) {
      Alert.alert('ingreso')
    } else {
      Alert.alert('Para Registrarse', 'Hola, tienes que aceptar las politicas de privacidad de alma')
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

            <Text style={styles.TextoTitulo}>Registro de Usuario</Text>
            <View style={styles.InputContainer}>
              <TextInput
                placeholder={'Nombres'}
                placeholderTextColor={'#FC8EED'}
                style={styles.Input}
                returnKeyType={"next"}
                onSubmitEditing={() => lastname.current?.focus()}
                autoCompleteType="name"
              />
              <TextInput
                placeholder={'Apellidos'}
                placeholderTextColor={'#FC8EED'}
                style={styles.Input}
                returnKeyType={"next"}
                onSubmitEditing={() => dni.current?.focus()}
                ref={lastname}
              />
              <TextInput
                placeholder={'Rut'}
                placeholderTextColor={'#FC8EED'}
                style={styles.Input}
                returnKeyType={"next"}
                onSubmitEditing={() => phone.current?.focus()}
                ref={dni}
              />
              <TextInput
                placeholder={'Telefono'}
                placeholderTextColor={'#FC8EED'}
                style={styles.Input}
                returnKeyType={"next"}
                onSubmitEditing={() => email.current?.focus()}
                ref={phone}
                autoCompleteType="tel"
              />
              <TextInput
                placeholder={'Correo Electronico'}
                placeholderTextColor={'#FC8EED'}
                style={styles.Input}
                returnKeyType={"next"}
                onSubmitEditing={() => password.current?.focus()}
                ref={email}
                autoCompleteType="email"
              />
              <TextInput
                placeholder={'Contraseña'}
                placeholderTextColor={'#FC8EED'}
                style={styles.Input}
                returnKeyType={"next"}
                onSubmitEditing={() => confirmPassword.current?.focus()}
                ref={password}
              />
              <TextInput
                placeholder={'Repita la Contraseña'}
                placeholderTextColor={'#FC8EED'}
                style={styles.Input}
                returnKeyType={"done"}
                onSubmitEditing={() => registro()}
                ref={confirmPassword}

              />
              <View style={styles.politicaContainer}>
              <CheckBox
                  checked={isSelected}
                  onPress={() => setSelection(isSelected ? false : true)}
                  style={styles.checkbox}
                  color={"#FC6EE9"}
                />
                <Text style={styles.TextPolitica}> Acepta los <Text onPress={() => { setModalVisible(true); }} style={styles.TextPolitica2}>Terminos de Alma </Text></Text>
              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <ScrollView>
                      <Text style={styles.TextoTituloPolitica}>Politicas de Privacidad de Alma </Text>
                      <Text style={styles.modalText}>jakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudaheuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudahasdajsdhaskjsakjaskjadskasjkdjakasjkdasjkasjkasjdkasjkasjkdaskjdkasjkdsjkasjdkjaskjdakjaskdjaskjaskdajskasjdkdasjkadsjkasjaskjsadkjsaksjadksaksajdkajdsakjkajkasjeuhfjdshudaheuhfjdshudah</Text>
                    </ScrollView>
                    <TouchableHighlight
                      style={styles.openButton}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <Text style={styles.textStyle}>Cerrar Politicas de Privacidad</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            </View>
            <TouchableHighlight style={styles.BtnIngresar} onPress={registro}>
              <Text style={styles.TextBtnIngresar}>Registrarse</Text>
            </TouchableHighlight>

          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Registro;