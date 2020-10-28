import React ,{ useContext, createContext, useState}from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeRoutes } from '../Component/Navigation';

import Check from './Pages/Check';
import Inicio from './Pages/Inicio'
import Contacto from './Pages/Contacto'
import Perfil from './Pages/Perfil'
import { useWindowDimensions } from 'react-native';
import DrawerContainer from './Components/Drawer'


const Drawer = createDrawerNavigator<HomeRoutes>();
export const AuthNavigator = () => {
  const dimensions = useWindowDimensions();
  let prueba = "hola"
 
  return (
          <Drawer.Navigator drawerType={dimensions.width >= 768 ? 'permanent' : 'front'} drawerPosition="right" drawerContent={()=> <DrawerContainer/>}>
            <Drawer.Screen name="Inicio" component={Inicio}/>
            <Drawer.Screen name="Check" component={Check}  />
            <Drawer.Screen name="Contacto" component={Contacto} />
            <Drawer.Screen name="Perfil" component={Perfil} />
          
        </Drawer.Navigator>
      
    
  )
} 