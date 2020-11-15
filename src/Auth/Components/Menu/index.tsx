import React, { useState, useEffect, ComponentFactory, Component } from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  Text,
  ImageStyle,
  ImageProps
} from 'react-native';
import styles from './styles'
import { useNavigation } from '@react-navigation/native';
import Info from '../Info'
import CheckIn from '../CheckIn';
import Routes from '../../../Routes';

const menu1 = require('../../../assets/menu/1.png')
const menu2 = require('../../../assets/menu/2.png')
const menu3 = require('../../../assets/menu/3.png')
const menux = require('../../../assets/menu/x.png')


interface Props {
  token: string,
  Valido:React.Dispatch<React.SetStateAction<boolean>>,
  pagina: string
}

const Menu = (props: Props) => {
  const { token, Valido, pagina } = props
  const [ImgMenu, setImgMenu] = useState<ImageProps>(menu2)
  const [info, setInfo] = useState(false);
  const [checkin, setCheckin] = useState(false);
  const navigation = useNavigation();
  const [menu,setMenu] = useState(pagina)

  useEffect(()=>{
    Limpiar()
    if(menu == "Inicio"){
      setImgMenu(menu2)
    }
    else{
      setImgMenu(menux)
    }
  },[pagina])

  const NavigateToPrincipal = () => {
    Limpiar()
    setMenu(pagina)
    setImgMenu(menu2)
    navigation.navigate('Inicio',{ initial: false})
  }
  const NavigateToInfo = () => {
    Limpiar()
    if (!info) {
      setInfo(true)
      setImgMenu(menu3)
    } else {
      if(pagina != "Inicio")
      {
        setImgMenu(menux)
      }
      else{
        setImgMenu(menu2)
      }
    }
  }
  const NavigateToCheck = () => {
    Limpiar()
    if (!checkin) {
      setCheckin(true)
      setImgMenu(menu1)
    }
    else {
      if(pagina != "Inicio")
      {
        setImgMenu(menux)
      }
      else{
        setImgMenu(menu2)
      }
    }
  }

  const Limpiar = () => {
    setCheckin(false)
    setInfo(false)
  }

  useEffect(()=>{
    console.log(pagina);
    Limpiar()
  },[])
  return (
    <>
      <Info token={token} isVisible={info} Valido={Valido}></Info> 
      <CheckIn token={token}  isVisible={checkin} Valido={Valido}></CheckIn> 
          
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
    </>
  )
}

export default Menu