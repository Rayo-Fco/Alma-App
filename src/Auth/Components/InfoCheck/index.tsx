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
    user:string;
    comuna: string;
    coordinates:{ 
        latitude:number,
        longitude: number
    };
    info:{
        numero_depto:string,
        numero_piso:string,
        extra:string
    }
    date: Date
  };
  
interface Props{
    isVisible: boolean;
    prueba: ()=>void
    data:Icheck
}

const InfoCheck = (props:Props) =>{
    console.log("object");
    const { isVisible, prueba, data} = props;

    let region = {
        latitude: data.coordinates.latitude,
        longitude: data.coordinates.longitude,
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
              key={1}
              coordinate={data.coordinates}
              title={data.date.toString()}
              description={"asdas"}
            />

            </MapView>
            <Text>Informacion</Text>
                <Text>{data.info.numero_depto? "Depto o Casa: "+data.info.extra: ""}</Text>
                <Text>{data.info.numero_piso? "Piso: "+data.info.extra: ""}</Text>
                <Text>{data.info.extra? "Extra: "+data.info.extra: ""}</Text>
            <Button title="Cerrar" onPress={prueba} />
          </View>
        </Overlay>
        )
}

export default InfoCheck