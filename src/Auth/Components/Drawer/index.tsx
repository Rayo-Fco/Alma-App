import React from 'react';
import { TouchableHighlight,Text,View} from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
 
const Drawer = () => {
    const navigation = useNavigation();
  
    return (
        <View>
            <TouchableHighlight style={{
                height: 54,
                width:314,
                borderRadius:22,
                marginTop:150,
                backgroundColor : "#FC7EEB",
                }}  onPress ={() => navigation.dispatch(DrawerActions.closeDrawer())} >
                <Text>Cerrar Menu</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{
                height: 54,
                width:314,
                borderRadius:22,
                marginTop:150,
                backgroundColor : "#FC7EEB",
                }}  onPress ={() => navigation.navigate('Check')} >
                <Text>Check</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{
                height: 54,
                width:314,
                borderRadius:22,
                marginTop:150,
                backgroundColor : "#FC7EEB",
                }}  onPress ={() => navigation.navigate('Contacto')} >
                <Text>Contacto de Seguridad</Text>
            </TouchableHighlight>
        </View>
    )
  }
  
  export default Drawer;