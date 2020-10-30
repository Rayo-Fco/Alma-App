import React, { useState, useEffect, ComponentFactory,Component } from 'react';
import {
  View,
  Alert,
  Image,
  Text
} from 'react-native';

import MapView, { Marker, Polygon} from 'react-native-maps';

import styles from './styles';
import api from '../../../Services/api'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const comisaria = require('../../../assets/point/point_carabinero.png')
const pdi = require('../../../assets/point/point_pdi.png')

interface Location {
    latitude:number, 
    longitude:number,
    latitudeDelta:number,
    longitudeDelta:number
}

interface Point {
  id: number;
  title: string;
  latitude: number;
  longitude:number;
}
interface Puntos{
  carabineros:Point[];
  pdi:Point[];
}
 
let region = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.015,
  longitudeDelta: 0.015
}
  interface Props{
    Valido:React.Dispatch<React.SetStateAction<boolean>>
    token:string
    puntos:Puntos,
  }
 const Maps = (props:Props) =>{
   const { Valido,token, puntos} = props
    const [markerPDI, setMarkerPDI] = useState<Point[]>([]);
    const [markerCarabinero, setMarkerCarabinero] = useState<Point[]>([]);
    const [location, setLocation] = useState<Location>(region);
  useEffect(() => {

    
    async function getLocation(){
      const loc = await Location.getCurrentPositionAsync({});
        setLocation({ 
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015
        })
      }
    
      async function Permisos() {
        const resultPermissions = await Permissions.askAsync(
          Permissions.LOCATION
        );
        const statusPermissions = resultPermissions.permissions.location.status;
        
        if (statusPermissions !== "granted") {
          Alert.alert('Necesitar Los Permisos',  'Hola, Necesitas obtener los permisos del gps para ocupar ALMA')
        } 
        else {
           getLocation() 
        }
      }
      Permisos()
  },[])

  useEffect(() => {

    const getPDI=() =>{
      api.get('/markers/pdi',{
        headers: 
        { 
          Authorization: "Bearer "+token
        }
      }).then((response) => {
        setMarkerPDI(response.data);
      }).catch(err => {
        console.log(err.response);
        if(err.response.data == "Unauthorized") {
          Valido(true)
       }
      }); 
    }
    const getCarabinero =() =>{
      api.get('/markers/comisaria',{
        headers: 
        { 
          Authorization: "Bearer "+token
        }
      }).then((response) => {
        setMarkerCarabinero(response.data);
      }).catch(err => {
        if(err.response.data == "Unauthorized") {
          Valido(true)
       }
      }); 
    }
    
    setMarkerPDI(puntos.pdi)
    setMarkerCarabinero(puntos.carabineros)

  }, []);

  
    return (
        <MapView 
            style={styles.mapStyle}
            showsUserLocation={true}
            userLocationAnnotationTitle={"Estoy Aqui"}
            /*  followsUserLocation={true} */
            loadingEnabled={true}
            region={location}
        >
          
          { puntos.pdi.map((point,index)=> (
            <Marker
              key={String(index)}
              coordinate={{
                latitude: point.latitude,
                longitude: point.longitude,
              }}
              title={point.title}
              image={pdi}
            />
            
            ))}
            {
             puntos.carabineros.map((point,index)=> (
            <Marker
              key={String(index)}
              coordinate={{
                latitude: point.latitude,
                longitude: point.longitude,
              }}
              title={point.title}
              image={comisaria}
            />
            
            ))}

           {/*  <Polygon 
                coordinates={[
                  { longitude: -70.678607,  latitude: -33.526683 },   
                  { longitude:  -70.68161000000001,  latitude: -33.532125 },   
                  { longitude:  -70.685378,  latitude: -33.539133 },   
                  { longitude:  -70.680134,  latitude: -33.541046 },   
                  { longitude:  -70.676188,  latitude: -33.542501 },   
                  { longitude:  -70.668256,  latitude: -33.545388 },   
                  { longitude:  -70.66807300000001,  latitude: -33.545656 },   
                  { longitude:  -70.666753,  latitude: -33.546292 },   
                  { longitude:  -70.663538,  latitude: -33.54687 },   
                  { longitude:  -70.660911,  latitude: -33.54731 },   
                  { longitude:  -70.65678200000001,  latitude: -33.548053 },   
                  { longitude:  -70.65683799999999,  latitude: -33.548208 },   
                  { longitude:  -70.65348,  latitude: -33.548781 },   
                  { longitude:  -70.65239099999999,  latitude: -33.54484 },   
                  { longitude:  -70.651921,  latitude: -33.542711 },   
                  { longitude:  -70.65154699999999,  latitude: -33.541482 },   
                  { longitude:  -70.651038,  latitude: -33.539821 },   
                  { longitude:  -70.64968399999999,  latitude: -33.534791 },   
                  { longitude:  -70.648449,  latitude: -33.530525 },   
                  { longitude:  -70.647938,  latitude: -33.528538 },   
                  { longitude:  -70.647724,  latitude: -33.528254 },   
                  { longitude:  -70.647094,  latitude: -33.526149 },   
                  { longitude:  -70.646518,  latitude: -33.523896 },   
                  { longitude:  -70.646241,  latitude: -33.523292 },   
                  { longitude:  -70.644553,  latitude: -33.517329 },   
                  { longitude:  -70.646226,  latitude: -33.516994 },   
                  { longitude:  -70.651855,  latitude: -33.515906 },   
                  { longitude:  -70.65812,  latitude: -33.514688 },   
                  { longitude:  -70.661705,  latitude: -33.513559 },   
                  { longitude:  -70.665334,  latitude: -33.512432 },   
                  { longitude:  -70.670911,  latitude: -33.510734 },   
                  { longitude:  -70.678607,  latitude: -33.526683 }
                ]}
                strokeColor="#238C23" 
                fillColor="#rgba(545,325,55,0.5)"
                strokeWidth={6}
              />  */}
           
           
        </MapView> 
    );
  
};

export default Maps
