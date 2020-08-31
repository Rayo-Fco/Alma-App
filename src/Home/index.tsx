import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { AuthRoutes } from '../Component/Navigation';

import Login from './Pages/Login';
import Principal from './Pages/Principal'
import Registro from './Pages/Registro'



const HomeStack = createStackNavigator<AuthRoutes>();
export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator headerMode="none" initialRouteName="Principal">
      <HomeStack.Screen name="Principal" component={Principal} />
      <HomeStack.Screen name="Login" component={Login} />
      <HomeStack.Screen name="Registro" component={Registro} />
    </HomeStack.Navigator>
  )
}