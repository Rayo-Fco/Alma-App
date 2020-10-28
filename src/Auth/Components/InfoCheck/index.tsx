import React, { useState, useEffect, ComponentFactory,Component, useReducer } from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator
} from 'react-native';
import { Overlay } from "react-native-elements";
import styles from './styles';
import MapView, { Marker, Polygon} from 'react-native-maps';

interface Icheck{
      user:string,
      comuna: string,
      coordinates:[{ 
          latitude:number,
          longitude: number
      }],
      info:[{
          numero_depto:string,
          numero_piso:string,
          extra:string
      }],
      date: Date
};
  
interface Props{
    isVisible: boolean;
    prueba: ()=>void
    data:Icheck
    index:number
}

const InfoCheck = (props:Props) =>{
    const { isVisible, prueba, data, index} = props;

    const Mostrar = ()=>{
      if(!data){
          return(<View></View>)
      }
      else
      {
        let a = 0,b = 0
        data.coordinates.map((s)=>{
            a= s.latitude,
            b=s.longitude
        })
        let region = {
          latitude: a,
          longitude: b,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015
        }
        return (
          <Overlay
            isVisible={isVisible}
            overlayStyle={styles.overlay}
            onBackdropPress={prueba}
          >
            <View style={styles.view}>
               <Text style={styles.text}>{data.comuna == "xxx" ? "Comuna fuera del alcance ": "Comuna "+data.comuna}</Text>
              <MapView 
              style={styles.mapStyle}
              userLocationAnnotationTitle={"Estoy Aqui"}
              /*  followsUserLocation={true} */
              loadingEnabled={true}
              region={region}
              >
                  <Marker
                key={index}
                coordinate={data.coordinates[0]}
                title={"data.date.toString()"}
                description={"asdas"}
              />
  
              </MapView>
              <Text>Informacion</Text>
                  <Text>{data.info[0].extra? "Depto o Casa: "+data.info[0].extra: ""}</Text>
                  <Text>{data.info[0].numero_piso? "Piso: "+data.info[0].extra: ""}</Text>
                  <Text>{data.info[0].extra? "Extra: "+data.info[0].extra: ""}</Text>
              <Button title="Cerrar" onPress={prueba} />
            </View>
          </Overlay>
          )
      }
    }
    
   return <Mostrar></Mostrar>
}

export default InfoCheck