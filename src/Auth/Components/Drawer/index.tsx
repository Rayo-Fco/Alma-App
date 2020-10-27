import React from 'react';
import { TouchableHighlight,Text,View} from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        <View style={{backgroundColor:"#FDCFF7", height:"100%", paddingLeft:20}}> 
            <TouchableHighlight style={{
                height: 54,
                width:314,
                marginTop:200,
                backgroundColor : "#FEE7FB",
                }}  onPress ={() => navigation.dispatch(DrawerActions.closeDrawer())} >
                <Text maxFontSizeMultiplier={1}>Mi Perfil</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{
                height: 54,
                width:314,
                marginTop:40,
                backgroundColor : "#FEE7FB",
                }}  onPress ={() => navigation.navigate('Contacto',{ initial: false}) }>
                <Text maxFontSizeMultiplier={1}>Contacto de Seguridad</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{
                height: 54,
                width:314,
                marginTop:40,
                backgroundColor : "#FEE7FB",
                }}  onPress ={() => navigation.navigate('Check')} >
                <Text maxFontSizeMultiplier={1}>Check In de Seguridad</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{
                height: 54,
                width:314,
                marginTop:40,
                backgroundColor : "#FEE7FB",
                marginBottom:100
                }}  onPress ={() => navigation.navigate('Contacto')} >
                <Text maxFontSizeMultiplier={1}>Seguimiento en Vivo</Text>
            </TouchableHighlight>
            <Text onPress={CerrarSession} maxFontSizeMultiplier={1}>Cerrar Sesion</Text>
        </View>
    )
  }
  
  export default Drawer;