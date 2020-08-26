import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Principal from '../pages/Principal';
import Login from '../pages/Login'
import Registro from '../pages/Registro'

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#f0f0f5',
          },
        }} 
      >
        <AppStack.Screen name="Principal" component={Principal} />
        <AppStack.Screen name="Login" component={Login} />
        <AppStack.Screen name="Registro" component={Registro}/>
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;