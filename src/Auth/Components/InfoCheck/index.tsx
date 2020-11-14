import React, { useState, useEffect, ComponentFactory,Component, useReducer } from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
} from 'react-native';
import { Overlay,Image } from "react-native-elements";
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
      fotos:[],
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
    const [imagen, setImagen] = useState(false)

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
                  <Text>{data.info[0].extra? "Extra: "+data.info[0].extra: ""}</Text>
                  <Text onPress={()=> setImagen(true)}>{data.fotos.length > 0 ? "Ver foto" : ""}</Text>
                  <Overlay
                    isVisible={imagen}
                    overlayStyle={styles.overlay2}
                    onBackdropPress={()=> setImagen(!imagen)}
                  >
                    <View>
                      <Image
                          style={{width:"100%", height:"90%",}} source={{uri: data.fotos.toString()}}
                          PlaceholderContent={<ActivityIndicator color="#FFF" />}
                          transition={true}
                          containerStyle={{backgroundColor:"#fff"}}
                        />
                      <Button title="Cerrar" onPress={()=> setImagen(!imagen)}></Button>
                    </View>
                  </Overlay>
              <Button title="Cerrar" onPress={prueba} />
            </View>
          </Overlay>
          )
      }
    }
    
   return <Mostrar></Mostrar>
}

export default InfoCheck