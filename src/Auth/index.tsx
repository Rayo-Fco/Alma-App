import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeRoutes } from '../Component/Navigation';

import Check from './Pages/Check';
import Inicio from './Pages/Inicio'
import Contacto from './Pages/Contacto'
import { useWindowDimensions } from 'react-native';
import DrawerContainer from './Components/Drawer'


const Drawer = createDrawerNavigator<HomeRoutes>();
export const AuthNavigator = () => {
  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator drawerType={dimensions.width >= 768 ? 'permanent' : 'front'} drawerPosition="right" drawerContent={()=> <DrawerContainer/>}>
      <Drawer.Screen name="Inicio" component={Inicio} />
      <Drawer.Screen name="Check" component={Check} />
      <Drawer.Screen name="Contacto" component={Contacto} />
    </Drawer.Navigator>
  )
} 