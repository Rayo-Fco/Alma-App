import React, { useState, useEffect, ComponentFactory,Component } from 'react';
import {
  View,
  Alert,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import styles from './styles';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

interface Props {
}

interface State {
  region: {
    latitude:number, 
    longitude:number,
    latitudeDelta:number,
    longitudeDelta:number
  }
}


export default class Mapa extends  Component<Props, State> {
  constructor(props:Props) {
    super(props);

    this.state = ({region:{
      latitude:0,
      longitude:0,
      latitudeDelta: 0.03,
      longitudeDelta: 0.01}})
}

  async getLocation(){
    const loc = await Location.getCurrentPositionAsync({});
      this.setState({region:{
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.01}})
  }

  async componentDidMount(){
    
    const resultPermissions = await Permissions.askAsync(
      Permissions.LOCATION
    );
    const statusPermissions = resultPermissions.permissions.location.status;

    if (statusPermissions !== "granted") {
      Alert.alert('Necesitar Los Permisos',  'Hola, Necesitas obtener los permisos del gps para ocupar ALMA')
    } else {
      this.getLocation()
    }

  }

  
  render() {
    console.log(this.state.region);
    return (
        <MapView 
            style={styles.mapStyle}
            showsUserLocation={true}
            userLocationAnnotationTitle={"Estoy Aqui"}
            /*  followsUserLocation={true} */
            loadingEnabled={true}
            region={this.state.region}
        ></MapView> 
    );
  }
};
