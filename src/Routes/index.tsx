import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppRoutes } from '../Component/Navigation';
import { NavigationContainer } from "@react-navigation/native";

import { AuthNavigator } from '../Auth'
import { HomeNavigator } from '../Home'


const AppStack = createStackNavigator<AppRoutes>();

const Routes = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
          <AppStack.Navigator headerMode="none">
              <AppStack.Screen name="Home" component={HomeNavigator} />
              <AppStack.Screen name="Auth" component={AuthNavigator} />
            </AppStack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
    
  );
};

export default Routes;