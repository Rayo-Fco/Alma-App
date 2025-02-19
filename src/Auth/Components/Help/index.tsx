import React, { useState, useEffect, ComponentFactory, Component, useReducer } from 'react';
import {
    View,
    Text,
    Button,
    Modal,
    ActivityIndicator,
    TouchableHighlight,
    Platform,
    Alert
} from 'react-native';
import { Overlay, Image } from "react-native-elements";
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../../Component/Loading'
import api from '../../../Services/api';
import * as Location from 'expo-location';
interface Props{
    TokenHelp: boolean,
    token:string,
    setTokenHelp: React.Dispatch<React.SetStateAction<boolean>>,
    Valido: React.Dispatch<React.SetStateAction<boolean>>,
}

const Help = (props:Props) => {
    const { TokenHelp, setTokenHelp, token, Valido} = props
    const [loading, setLoading] = useState(false);
    const [activo,setActivo] = useState(false)
    
    const Salir = async() =>{
        setActivo(!activo)
        console.log(TokenHelp);
    }

    const Ayudame = async()=>{
        console.log("Ayuda!");
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Alma_help')
            console.log(jsonValue);
            if (!jsonValue) {
                let help={
                    alerta:true,
                    time:new Date(Date.now()).getTime()
                  }
                  await AsyncStorage.setItem('@storage_Alma_help', JSON.stringify(help)).catch((e)=>{
                    console.log("error"+e);
                  })
                  await Location.getLastKnownPositionAsync().then(async (data) => {
                    let position = {
                      latitude: '0',
                      longitude: ''
                    }
                    if(data){
                      position = {
                      latitude: data.coords.latitude.toString(),
                      longitude: data.coords.longitude.toString()
                    }}
                   
                    await api.post('/helpSOS', position,
                      {
                        headers:
                        {
                          Authorization: "Bearer " + token,
                        }
                      }).then(() => {
                        setLoading(false)
                        setTokenHelp(true)
                       
                
                      }).catch((err) => {
                        if (err.response.data == "Unauthorized") {
                          Valido(false)
                        }
                        setTimeout(() => { setLoading(false) }, 200)
                        setTimeout(() => {
                
                          if (!err.response || err.response.data == "Unauthorized") {
                            return Alert.alert('Contactar a Soporte de Alma')
                          }
                          else {
                            let error: [{ message: string }] = err.response.data.error
                            let err2 = ""
                            error.map((err) => {
                              err2 = err2 + "\n* " + err.message
                            })
                            Alert.alert("Error", err2)
                          }
                        }, 300)
                
                
                      })
                  })
                  
              }
              else
              {
            setTokenHelp(true)
            await Location.getLastKnownPositionAsync().then(async (data) => {
              let position = {
                latitude: '0',
                longitude: ''
              }
              if (data) {
                position = {
                  latitude: data.coords.latitude.toString(),
                  longitude: data.coords.longitude.toString()
                }
              }


              let bearer = "Bearer " + token

              await api.post('/helpSOS', position,
                {
                  headers:
                  {
                    Authorization: bearer,
                  }
                })
            }).catch((err) => {
              console.log("ERROR:");
              console.log(err);
            })
              }
          }
          catch (e) {
            
          }
          console.log(TokenHelp);
        
    }

    const Ayudame2 = async()=>{
          await Location.getLastKnownPositionAsync().then(async (data) => {
            let position = {
              latitude: '0',
              longitude: ''
            }
            if (data) {
              position = {
                latitude: data.coords.latitude.toString(),
                longitude: data.coords.longitude.toString()
              }
            }


            let bearer = "Bearer " + token

            await api.post('/helpSOS', position,
              {
                headers:
                {
                  Authorization: bearer,
                }
              })
          }).then(()=>{
            setTokenHelp(true)
          }).catch((err) => {
            if (err.response.data == "Unauthorized") {
              Valido(false)
            }
              if (!err.response || err.response.data == "Unauthorized") {
                return Alert.alert('Contactar a Soporte de Alma')
              }
              else {
                let error: [{ message: string }] = err.response.data.error
                let err2 = ""
                error.map((err) => {
                  err2 = err2 + "\n* " + err.message
                })
                Alert.alert("Error", err2)
              }
          })
    }



    const Container = () => {
        if (activo) {
            return ( <Valid_Alert/>)
        }
        else {
            return (<></>)
        }
    }

    const Valid_Alert = ()=>{
        if(TokenHelp){
            return(
                <View style={styles.container}>
                    <Text style={styles.txtTitulo}>¡Ayudame!</Text>
                        <Text style={styles.txtSOSActivo}>Alerta Generada!!</Text>
                    <Text style={styles.txtSalir} onPress={Salir} >Salir</Text>
                </View>
            )
        }else{
            return(
                <View style={styles.container}>
                    <Text style={styles.txtTitulo}>¡Ayudame!</Text>
                    <TouchableHighlight underlayColor='#F00' style={styles.btnAyuda} onPress={Ayudame2}>
                        <Text style={styles.txtSOS}>Pedir Ayuda</Text>
                    </TouchableHighlight>
                    <Text style={styles.txtSalir} onPress={Salir} >Salir</Text>
                </View>
            )
        }
    }

    return (
        <>
            <View style={styles.constainerbtnSOS}>
            <TouchableHighlight underlayColor='#F00' style={TokenHelp? styles.btnSOSActivo: styles.btnSOS} onPress={() => { console.log("Entro"); ;setActivo(!activo)}}>
                <Text style={styles.txtSOS} onPress={() => { console.log("Entro"); ;setActivo(!activo)}}>SOS</Text>
            </TouchableHighlight>
            </View>
            
            <Container />
            <Loading isVisible={loading} text={"Cargando..."}></Loading>
        </>
    )
}

export default Help