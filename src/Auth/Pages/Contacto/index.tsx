import React, { useState, useEffect, ComponentFactory, Component, useReducer } from 'react';
import {
  View,
  ImageBackground,
  Image,
  ImageStyle,
  Text,
  TouchableHighlight,
  Alert,
  Button,
  ImageProps,
  TouchableWithoutFeedback,
  TextInput,
  Modal
} from 'react-native';
import styles from './styles';

const header = require('../../../assets/Header-Background.png')
import { HomeNavigationProps } from "../../../Component/Navigation";
import { useNavigation } from '@react-navigation/native';
import { Icon } from "react-native-elements";

import Info from '../../Components/Info'
import Check from '../../Components/CheckIn';
import { Input } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../../Component/Loading'
import { CommonActions } from '@react-navigation/native'
import api from '../../../Services/api';
const menu1 = require('../../../assets/menu/1.png')
const menu3 = require('../../../assets/menu/3.png')
const menux = require('../../../assets/menu/x.png')

interface contacts {
  nombre: string,
  telefono: Number,
  date: Date
}

const Seguimiento = ({ route, navigation }: HomeNavigationProps<"Contacto">) => {
  const [ImgMenu, setImgMenu] = useState<ImageProps>(menux)
  const [info, setInfo] = useState(false);
  const [checkin, setCheckin] = useState(false);
  const [valido, setValido] = useState(true)
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<contacts[]>()
  const [activo, setActivo] = useState(false)
  const [nombre, setNombre] = useState('')
  const [index, setIndex] = useState(99)
  const [add, setAdd] = useState(false)
  const [telefono, setTelefono] = useState('')
  const [aleas, setAleas] = useState('')

  const navig = useNavigation();
  const getToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Alma')
      if (jsonValue) setToken(JSON.parse(jsonValue).token)
      return jsonValue != null ? (JSON.parse(jsonValue)) : null;
    }
    catch (e) {
      Alert.alert('Error', e)
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    }
  }

  const getData = async () => {
    setLoading(!loading)
    await api.get('/safecontact', {
      headers:
      {
        Authorization: "Bearer " + token
      }
    }).then((response) => {
      console.log("object");
      console.log(response.data)
      setLoading(false)
      setData(response.data)
    }).catch(()=>{
      console.log("Cathc");
    })
  }

  useEffect(() => {

    Limpiar()
    if (route.params) {
      setImgMenu(menux)
    }
  }, [route.params])

  useEffect(() => {
    getToken()
  }, [])

  useEffect(() => {
    if (token != "") getData()
  }, [token])


  const NavigateToPrincipal = () => {
    Limpiar()
    navig.navigate("Inicio", { PropsMenu: "Principal" })
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
    } else {
      setCheckin(false)
    }
  }

  const Limpiar = () => {
    setCheckin(false)
    setInfo(false)
    setImgMenu(menux)
  }
  const pregunta = (nombre: string, index: number) => {
    setNombre(nombre)
    setIndex(index)
    setActivo(true)
    console.log(index);
  }

  interface Props {
    data: contacts,
    index: number
  }

  const Plantilla = (props: Props) => {
    const { data, index } = props
    return (
      <>
        <TouchableHighlight style={styles.btnContacto} onPress={() => pregunta(data.nombre, index)}>
          <>
            <Text style={styles.txtNombre}> {data.nombre}</Text>
            <Text style={styles.txtTelefono}>+56 {data.telefono}</Text>
          </>
        </TouchableHighlight>
      </>
    )
  }
  const BtnAgregar = () => {
    if (data) {
      if (data.length < 3) {
        return (<Text style={styles.txtAgregar} onPress={() => setAdd(true)}>Añadir otro Contacto</Text>)
      }
      else {
        return (<View style={{ marginTop: 40, }}></View>)
      }
    }
    else {
      return <></>
    }
  }

  const Container = () => {
    if (data) {
      const carga = data.map((contacto, index) => {
        return <Plantilla key={index} data={contacto} index={index}></Plantilla>
      })
      return (
        <View style={{ alignItems: "center" }}>
          {carga}
          <BtnAgregar />
        </View>
      )
    }
    else {
      return (<></>)
    }
  }

  const cerrar = () => {
    setTelefono('')
    setAleas('')
    setActivo(false)
    setAdd(false)
  }
  const Eliminar = async()=>{
    await api.post('/safecontact/delete', {index:index.toString()},
          {
            headers:
            {
              Authorization: "Bearer " + token,
            }
          }).then(() => {
            setActivo(false)
            getData()
          }).catch((err) => {
            if (err.response.data == "Unauthorized") {
              setValido(false)
            }
            setTimeout(() => { setLoading(false) }, 200)
            setTimeout(() => {

              if (!err.response) {
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
  }

  const Guardar = async() => {

    if (telefono.length == 9) {
      if (aleas.trim()) {
        setAdd(false)
        await api.post('/safecontact/add', {nombre:aleas, telefono:telefono},
          {
            headers:
            {
              Authorization: "Bearer " + token,
            }
          }).then(() => {
            setLoading(false)
            /* 
            isVisible = false */
            setTimeout(() => {
              setAleas("")
              setTelefono("")
              setTimeout(() => { Alert.alert('Se han Agregado el Contacto') }, 500)
            }, 300)
            getData()
          }).catch((err) => {
            if (err.response.data == "Unauthorized") {
              setValido(false)
            }
            setTimeout(() => { setLoading(false) }, 200)
            setTimeout(() => {

              if (!err.response) {
                return Alert.alert('Contactar a Soporte de Alma')
              }
              else {
                console.log(err.response.data.error);
                let error: [{ message: string }] = err.response.data.error
                let err2 = ""
                error.map((err) => {
                  err2 = err2 + "\n* " + err.message
                })
                Alert.alert("Error", err2)
              }
            }, 300)


          })
      }
      else {
        Alert.alert('Faltan Campos', 'El aleas tiene que ser valido')
      }
    }
    else {
      Alert.alert('Faltan Campos', 'El numero tiene que ser valido')
    }

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
      <View style={styles.Container}>
        <Container></Container>

        <Modal
          visible={activo}
          transparent={true}
          animationType={"fade"}
          key={1}
        >
          <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }} >
            <TouchableHighlight style={{ height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }} onPress={cerrar}>
              <View style={styles.overlay}>
                <Text style={styles.txtPregunta}>¿Desea eliminar a {nombre}?</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <TouchableHighlight style={{ marginRight: 30 }} >
                    <Text style={styles.btnPregunta} onPress={Eliminar}>Si</Text>
                  </TouchableHighlight>
                  <TouchableHighlight >
                    <Text style={styles.btnPregunta} onPress={cerrar}>No</Text>
                  </TouchableHighlight>
                </View>

              </View>
            </TouchableHighlight>
          </View>
        </Modal>

        <Modal
          visible={add}
          transparent={true}
          animationType={"slide"}
          key={2}
        >
          <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }} >
            <TouchableHighlight style={{ height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }} onPress={cerrar}>

              <View style={styles.overlay2}>
                <Text style={styles.txtTitulo}>Agregar Contacto</Text>
                <View style={styles.ContainerInput}>
                  <Text style={styles.TextInput}>Aleas:</Text>
                  <TextInput
                    placeholder={'Nombre'}
                    placeholderTextColor={'#FC8EED'}
                    returnKeyType="send"
                    style={[styles.Input]}
                    keyboardType="default"
                    value={aleas}
                    onChangeText={(text) => setAleas(text)}
                    maxLength={20}
                    spellCheck={false} />
                </View>
                <View style={styles.ContainerInput}>
                  <Text style={styles.TextInput}>Telefono:</Text>
                  <TextInput
                    placeholder={'Telefono'}
                    placeholderTextColor={'#FC8EED'}
                    returnKeyType="send"
                    style={[styles.Input]}
                    keyboardType="number-pad"
                    value={telefono}
                    onChangeText={(text) => setTelefono(text)}
                    maxLength={9}
                    spellCheck={false} />
                </View>
                <TouchableHighlight style={[styles.Btn, { marginTop: 20 }]} onPress={Guardar} >
                  <Text style={styles.TextBtn} onPress={Guardar} maxFontSizeMultiplier={1}>Guardar</Text>
                </TouchableHighlight>

              </View>
            </TouchableHighlight>
          </View>
        </Modal>


      </View>





      <Loading isVisible={loading} text={"Cargando.."}></Loading>
      <Info Valido={setValido} token={token} isVisible={info}></Info>
      <Check Valido={setValido} token={token} isVisible={checkin}></Check>
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

export default Seguimiento;