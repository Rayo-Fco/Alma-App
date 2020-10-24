import React from 'react';
import { TouchableHighlight,Text,View} from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { CommonActions } from "@react-navigation/native";

const Drawer = () => {
    const navigation = useNavigation();

    const CerrarSession = () =>{
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
                marginTop:300,
                backgroundColor : "#FEE7FB",
                }}  onPress ={() => navigation.dispatch(DrawerActions.closeDrawer())} >
                <Text>Mi Perfil</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{
                height: 54,
                width:314,
                marginTop:40,
                backgroundColor : "#FEE7FB",
                }}  onPress ={() => navigation.navigate('Contacto',{ initial: false}) }>
                <Text>Contacto de Seguridad</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{
                height: 54,
                width:314,
                marginTop:40,
                backgroundColor : "#FEE7FB",
                }}  onPress ={() => navigation.navigate('Check')} >
                <Text>Check In de Seguridad</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{
                height: 54,
                width:314,
                marginTop:40,
                backgroundColor : "#FEE7FB",
                marginBottom:100
                }}  onPress ={() => navigation.navigate('Contacto')} >
                <Text>Seguimiento en Vivo</Text>
            </TouchableHighlight>
            <Text onPress={CerrarSession}>Cerrar Sesion</Text>
        </View>
    )
  }
  
  export default Drawer;