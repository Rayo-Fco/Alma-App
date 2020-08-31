import React ,{ Component} from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import ContactoSeguridad from '../../pages/ContactoSeguridad'

interface Props {
}

interface State {
}


export default class Drawer extends  Component<Props, State> {
    constructor(props:Props) {
      super(props);
  
  }
  
  
    render() {
        const Drawer = createDrawerNavigator();
      
        return (
          <NavigationContainer>
            <Drawer.Navigator >
              <Drawer.Screen name="ContactoSeguridad" component={ContactoSeguridad} />
            </Drawer.Navigator>
          </NavigationContainer>
      );
    }
  };
  


