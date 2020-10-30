import { Textarea } from 'native-base';
import React, { useState, useEffect, ComponentFactory,Component } from 'react';
import {
  View,
  Alert,
  Text,
  TouchableHighlight,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
//import { TextInput } from 'react-native-gesture-handler';
import Loading from '../../../Component/Loading'
import styles from './styles';
import api from '../../../Services/api';
import * as Location from 'expo-location';

interface Location {
    latitude:string, 
    longitude:string
}
let LocationData ={
  latitude:"", 
  longitude:""
}
interface Props{
  isVisible: boolean,
  token:string,
  Valido:React.Dispatch<React.SetStateAction<boolean>>,
}

 const CheckIn = (props:Props) =>{
  const { isVisible,token, Valido} = props;

  
  const Container = ()=>{
    const [loading, setLoading] = useState(false);
    const [numero_depto, setNumero_depto] = useState('');
    const [numero_piso, setNumero_piso] = useState('');
    const [extra, setExtra] = useState('');
   

    const [location,setLocation] = useState<Location>(LocationData)
    const Envio = async()=>{
      setLoading(true) 
      await Location.getLastKnownPositionAsync().then(async(data)=>{
        let position = {
          latitude: data.coords.latitude.toString(),
          longitude: data.coords.longitude.toString()
        }
            await api.post('/checkin',{ numero_depto: numero_depto, numero_piso: numero_piso,extra:extra, latitude:position.latitude, longitude: position.longitude },
            {
              headers: 
              { 
                Authorization: "Bearer "+token
              }
            }).then(()=>{
              setLoading(false)
              /* 
              isVisible = false */
              setTimeout(()=>{
                setNumero_depto("")
                setNumero_piso("")
                setExtra("")
                return Alert.alert('Check In Exitoso')
              },300)
              
            }).catch((err)=>{
              if(err.response.data == "Unauthorized") {
                Valido(false)
             }
                setTimeout(()=>{setLoading(false)},200)
               setTimeout(()=>{
                
                if(!err.response || err.response.data == "Unauthorized") {  
                  return Alert.alert('Contactar a Soporte de Alma')
                }
                else{
                  let error:[{message:string}] = err.response.data.error
                  let err2 = ""
                  error.map((err)=>{
                    err2 = err2+"\n* "+ err.message
                })
                    Alert.alert("Error",err2)
                }
               }, 300)
              
              
            })
        })
          
        
      

      
      
        
        
        
    }

    return (
      <KeyboardAvoidingView
    style={{ bottom:100,position:"absolute",width:"100%",zIndex:5 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined }
    >
       <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled" >
          <View style={styles.container}>
            <Text style={styles.titulo} maxFontSizeMultiplier={1}>Check in de Seguridad</Text>
            <Text style={styles.subtitulo} maxFontSizeMultiplier={1}>Datos Adicionales(No son obligacion)</Text>
            <TextInput 
            style={styles.input}
            placeholder={'  Numero del depto. o de la casa'}
            placeholderTextColor={'#FC8EED'}
            maxFontSizeMultiplier={1}
            value={numero_depto}
            onChangeText={(text)=> setNumero_depto(text)}
            />
            <TextInput 
            style={styles.input}
            placeholder={'  Numero de piso del Depto'}
            placeholderTextColor={'#FC8EED'}
            maxFontSizeMultiplier={1}
            value={numero_piso}
            onChangeText={(text)=> setNumero_piso(text)}
            />
            <TextInput 
            style={styles.inputArea}
            placeholder={'  Informacion extra '}
            placeholderTextColor={'#FC8EED'}
            multiline={true}
            numberOfLines={2}
            maxFontSizeMultiplier={1}
            value={extra}
            onChangeText={(text)=> setExtra(text)}
            />
            <TouchableHighlight style={styles.Btn} >
              <Text style={styles.TextBtn} onPress={Envio} maxFontSizeMultiplier={1}>Check In</Text>
            </TouchableHighlight>
          </View>
          
          </ScrollView>
          <Loading isVisible={loading} text={"Cargando..."}></Loading>
        </KeyboardAvoidingView>
        
    );
  }

  if(isVisible)
  {
   return  (<Container></Container>)
  }else{
    return (<View></View> )
  }
  
}



export default CheckIn
