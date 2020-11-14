import { Textarea } from 'native-base';
import React, { useState, useEffect, ComponentFactory, Component } from 'react';
import {
  View,
  Alert,
  Text,
  TouchableHighlight,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Button,
  Image,
} from 'react-native';
//import { TextInput } from 'react-native-gesture-handler';
import Loading from '../../../Component/Loading'
import styles from './styles';
import api from '../../../Services/api';
import * as Location from 'expo-location';
import { Constants } from 'expo';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

interface Location {
  latitude: string,
  longitude: string
}
let LocationData = {
  latitude: "",
  longitude: ""
}
interface Props {
  isVisible: boolean,
  token: string,
  Valido: React.Dispatch<React.SetStateAction<boolean>>,
}

const CheckIn = (props: Props) => {
  const { isVisible, token, Valido } = props;


  const Container = () => {
    const [loading, setLoading] = useState(false);
    const [numero_depto, setNumero_depto] = useState('');
    const [extra, setExtra] = useState('');
    const [image, setImage] = useState<string>('');

    const [location, setLocation] = useState<Location>(LocationData)
    const Envio = async () => {
      setLoading(true)
     
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
        const data2 = new FormData()
        data2.append('latitude', position.latitude)
        data2.append('longitude', position.longitude)
        data2.append('numero_depto', numero_depto)
        data2.append('extra', extra)
        if (image) {
          data2.append('foto', {
            type: "image/jpeg",
            // @ts-ignore
            name:"imagen.png",
            uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
          })
        }
        await api.post('/checkin', data2,
          {
            headers:
            {
              Authorization: "Bearer " + token,
              'Content-Type': 'multipart/form-data'
            }
          }).then(() => {
            setLoading(false)
            /* 
            isVisible = false */
            setTimeout(() => {
              setNumero_depto("")
              setExtra("")
              setImage('')
              return Alert.alert('Check In Exitoso')
            }, 300)

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

    const TomarFoto = async () => {
      const {
        status: cameraPerm
      } = await Permissions.askAsync(Permissions.CAMERA);

      // only if user allows permission to camera AND camera roll
      if (cameraPerm === 'granted') {
        let pickerResult = await ImagePicker.launchCameraAsync({
          aspect: [4, 3],
          quality: 1,
        });
        console.log(pickerResult);
        if (!pickerResult.cancelled) {
          console.log(pickerResult)
            const manipResult = await ImageManipulator.manipulateAsync(pickerResult.uri,
              [ 
                { resize: { width: pickerResult.width * 0.3, height: pickerResult.height * 0.3 } }
              
              ],
              { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
            ); 
        
          setImage(manipResult.uri);
        }
      } else {
        Alert.alert('Necesitar Los Permisos', 'Hola, Necesitas obtener los permisos para subir una foto al hacer Check In')
      }
    };

    const Previa = () => {
      if (image) {
        return (
          <View style={styles.ContainerPrevia}>
            <Image source={{ uri: image }} style={{ width: 80, height: 80, borderRadius: 10, }} />
          </View>
        )
      }
      else {
        return <View style={{ width: 84, height: 84 }}></View>
      }

    }

    return (
      <KeyboardAvoidingView
        style={{ bottom: 100, position: "absolute", width: "100%", zIndex: 5 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
              onChangeText={(text) => setNumero_depto(text)}
            />
            <TextInput
              style={styles.inputArea}
              placeholder={'  Informacion extra '}
              placeholderTextColor={'#FC8EED'}
              multiline={true}
              numberOfLines={2}
              maxFontSizeMultiplier={1}
              value={extra}
              onChangeText={(text) => setExtra(text)}
            />
            <View style={styles.ContainerFoto}>
              <TouchableHighlight style={styles.BtnFoto}>
                <Text style={styles.TextBtnFoto} onPress={TomarFoto} maxFontSizeMultiplier={1}>{image ? "Cambiar Foto" : "Tomar Foto"}</Text>
              </TouchableHighlight>
              <Previa></Previa>
            </View>
            <TouchableHighlight style={styles.Btn} >
              <Text style={styles.TextBtn} onPress={Envio} maxFontSizeMultiplier={1}>Check In</Text>
            </TouchableHighlight>
          </View>

        </ScrollView>
        <Loading isVisible={loading} text={"Cargando..."}></Loading>
      </KeyboardAvoidingView>

    );
  }

  if (isVisible) {
    return (<Container></Container>)
  } else {
    return (<View></View>)
  }

}



export default CheckIn
