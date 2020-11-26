import React from 'react';
import { TouchableHighlight,Text,View} from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'

const Drawer = () => {
    const navigation = useNavigation();

    const CerrarSession = async() =>{
        try {
            await AsyncStorage.removeItem('@storage_Alma')
          } 
          catch(e) 
          {
            console.log("Error remover");
          }
        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Home" }],
            })
          )
    }
  
    return (
        <View style={styles.container}> 
                <Text style={styles.txtTitulo}  maxFontSizeMultiplier={1}>Hola!, Bienvenida</Text>
            <TouchableHighlight style={styles.btnMenu}  onPress ={() => navigation.navigate('Perfil',{ initial: false}) }>
                <Text style={styles.txtMenu} maxFontSizeMultiplier={1}>Mi Perfil</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.btnMenu}  onPress ={() => navigation.navigate('Contacto',{ initial: false}) }>
                <Text style={styles.txtMenu}  maxFontSizeMultiplier={1}>Contacto de Seguridad</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.btnMenu} onPress ={() => navigation.navigate('Check',{ initial: false}) }>
                <Text style={styles.txtMenu}  maxFontSizeMultiplier={1}>Mis Check In </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.btnCerrar} onPress={CerrarSession} >
            <Text maxFontSizeMultiplier={1} style={styles.txtCerrar}>Cerrar Sesion</Text>
            </TouchableHighlight>
            
        </View>
    )
  }
  
  export default Drawer;