import React, { useState, useEffect, ComponentFactory, Component, useContext, createContext } from 'react';
import {
  View,
  Image,
  ImageStyle,
  Text,
  TouchableHighlight,
  Alert,
  ImageProps
} from 'react-native';
import { CommonActions } from '@react-navigation/native'
import { HomeNavigationProps } from "../../../Component/Navigation"
import styles from './styles';
import { Icon } from "react-native-elements";
import Mapa from '../../Components/Maps'
import Info from '../../Components/Info'
import CheckIn from '../../Components/CheckIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../Services/api'
import Help from '../../Components/Help'
import * as Location from 'expo-location';
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import ContactoSeguridad from '../Seguimiento';

const header = require('../../../assets/Header-Background.png')


const menu1 = require('../../../assets/menu/1.png')
const menu2 = require('../../../assets/menu/2.png')
const menu3 = require('../../../assets/menu/3.png')

interface Point {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
}


const Inicio = ({ route, navigation }: HomeNavigationProps<"Inicio">) => {
  const [info, setInfo] = useState(false);
  const [checkin, setCheckin] = useState(false);
  const [valido, setValido] = useState(true)
  const [token, setToken] = useState("")
  const [tokenhelp, setTokenHelp] = useState(false)
  const prueba = ""
  const [ImgMenu, setImgMenu] = useState<ImageProps>(menu2)

  const [markerPDI, setMarkerPDI] = useState<Point[]>([]);
  const [markerCarabinero, setMarkerCarabinero] = useState<Point[]>([]);

  const getToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Alma')
      if (jsonValue) setToken(JSON.parse(jsonValue).token)
      return jsonValue != null ? (JSON.parse(jsonValue)) : null;
    }
    catch (e) {
      CerrarSession(e, true)
    }
  }

  const Validar = async () => {
    await AsyncStorage.getItem('@storage_Alma_help').then(async (response) => {
      if (response) {
        let data = JSON.parse(response)
        let tiempo = new Date(Date.now()).getTime()
        if (((tiempo - data.time) / 1000 / 60 / 60) < 8) {
          let token2 = ""
          const jsonValue = await AsyncStorage.getItem('@storage_Alma')
          if (jsonValue) {
            token2 = JSON.parse(jsonValue).token
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


              let bearer = "Bearer " + token2

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
        else {
          setTokenHelp(false)
        }

      }
      else {
        try {
          await AsyncStorage.removeItem('@storage_Alma_help')
        }
        catch (e) {
          console.log("Error remover");
        }
      }
    })


  }



  const CerrarSession = (error: string, mensaje: boolean) => {
    EliminarToken()
    if (mensaje) Alert.alert('Error!', error)
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [{ name: "Home" }],
    }))
  }

  const getPDI = async () => {
    await api.get('/markers/pdi', {
      headers:
      {
        Authorization: "Bearer " + token
      }
    }).then((response) => {
      setMarkerPDI(response.data);
    }).catch((err) => {
      console.log(err.response);
      return CerrarSession("Lo sentimos, vuelve a ingresar", true)
    })
  }
  const getCarabinero = async () => {
    await api.get('/markers/comisaria', {
      headers:
      {
        Authorization: "Bearer " + token
      }
    }).then((response) => {
      setMarkerCarabinero(response.data);
    }).catch((err) => {
      return CerrarSession("Lo sentimos, vuelve a ingresar", false)
    })
  }

  useEffect(() => {
    if (navigation.isFocused()) {
      setInterval(() => {
        console.log();
        Validar()
      }, 3 * 1000 * 60);
    }
  }, []);

  useEffect(() => {

    Limpiar()
    if (route.params) {
      setImgMenu(menu2)
    }
  }, [route.params])


  useEffect(() => {
    Limpiar()
    getToken()

  }, [])
  useEffect(() => {
    if (token != "") {
      getCarabinero()
      getPDI()
      Validar()
    }

  }, [token])

  useEffect(() => {
    const prueba = async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status === 'granted') {
        await Location.startLocationUpdatesAsync("PrimeraTarea", {
          accuracy: Location.Accuracy.Balanced,
        });
      }
      else {
        CerrarSession("No se puede Alma por no tener los permisos", true)
      }
    }
    prueba()
  })

  TaskManager.defineTask("PrimeraTarea", (data: any) => {
    if (data) {
      setInterval(() => {
        Validar()
        console.log("entro segundo plano");
      }, 5 * 1000 * 60);

    }
  });



  const EliminarToken = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Alma')
    }
    catch (e) {
      Alert.alert('Error', e)
    }
  }

  useEffect(() => {
    if (!valido) {
      CerrarSession('Session Caducada, Inicia Nuevamente', true)

    }
  }, [valido])


  const NavigateToPrincipal = () => {
    Limpiar()
  }
  const NavigateToInfo = () => {
    Limpiar()
    if (!info) {
      setInfo(true)
      setImgMenu(menu3)
    } else {
      setInfo(false)
    }
  }
  const NavigateToCheck = () => {
    Limpiar()
    if (!checkin) {
      setCheckin(true)
      setImgMenu(menu1)
    }
    else {
      setCheckin(false)
    }
  }

  const Limpiar = () => {
    setCheckin(false)
    setInfo(false)
    setImgMenu(menu2)
  }






  return (


    <View style={styles.PrincipalContainer}>

      <View style={styles.BackgroundView}>
        <Image source={header} style={styles.BackgroundContainer as ImageStyle}  ></Image>
        <View style={{ width: 80, height: 80, position: 'absolute', right: 8, top: 50, }}>
          <Icon
            type="material-community"
            name="menu"
            iconStyle={{ color: "#ffff", fontSize: 50 }}
            onPress={() => { Limpiar(); navigation.openDrawer() }}
          />
        </View>
      </View>
      <Help token={token} TokenHelp={tokenhelp} setTokenHelp={setTokenHelp} Valido={setValido}></Help>
      <View style={styles.MapsContainer}>
        <Mapa puntos={{ carabineros: markerCarabinero, pdi: markerPDI }}></Mapa>
      </View>
      <Info token={token} isVisible={info} Valido={setValido}></Info>
      <CheckIn token={token} isVisible={checkin} Valido={setValido}></CheckIn>

      {/*  <Menu isInfo={setInfo} isCheck={setCheckin} check={checkin} info={info}></Menu> */}
      <View style={styles.MenuContainer}>
        <Image source={ImgMenu} style={styles.MenuImage as ImageStyle} ></Image>
        <View style={styles.MenuBottom}>
          <TouchableHighlight underlayColor={"transparent"} style={{ backgroundColor: "transparent", width: 80, marginRight: 45 }} onPress={NavigateToCheck}>
            <Text ></Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor={"transparent"} style={{ backgroundColor: "transparent", width: 80 }} onPress={NavigateToPrincipal}>
            <Text ></Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor={"transparent"} style={{ backgroundColor: "transparent", width: 80, marginLeft: 45 }} onPress={NavigateToInfo}>
            <Text ></Text>
          </TouchableHighlight>
        </View>

      </View>
    </View>

  );
};

export default Inicio;