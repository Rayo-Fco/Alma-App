import React, { useState, useEffect, ComponentFactory,Component } from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  Text,
  ImageStyle,
  ImageProps
} from 'react-native';
import styles from './styles'


const menu1 = require('../../../assets/menu/1.png')
const menu2 = require('../../../assets/menu/2.png')
const menu3 = require('../../../assets/menu/3.png')
const menux = require('../../../assets/menu/x.png')


interface Props{
    isInfo:React.Dispatch<React.SetStateAction<boolean>>,
    info:Boolean,
    check:Boolean,
    isCheck:React.Dispatch<React.SetStateAction<boolean>>,
}

const Menu = (props:Props) =>{
    const {isInfo,isCheck , info, check} = props
    const [ImgMenu,setImgMenu] = useState<ImageProps>(menu2)
    const NavigateToPrincipal =() =>{
        Limpiar()
        setImgMenu(menu2)
      }
      const NavigateToInfo =() =>{
        if(!info){
          Limpiar()
          isInfo(true)
          setImgMenu(menu3)
          }else
          {
            isInfo(false)
            setImgMenu(menu2)
          }
      }
      const NavigateToCheck =() =>{
        if(!check){
          Limpiar()
          isCheck(true)
          setImgMenu(menu1)
        }
        else
        {
          isCheck(false)
          setImgMenu(menu2)
        }
      }
     
      const Limpiar = () =>{
        isCheck(false)
        isInfo(false)
      }

    return(
        <View style={styles.MenuContainer}>
        <Image source={ImgMenu} style={styles.MenuImage as ImageStyle} ></Image>
        <View style={styles.MenuBottom}>
          <TouchableHighlight underlayColor={"transparent"} style={{backgroundColor:"transparent", width:80, marginRight:45}} onPress={NavigateToCheck}>
              <Text ></Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor={"transparent"} style={{backgroundColor:"transparent",  width:80}}onPress={NavigateToPrincipal}>
            <Text ></Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor={"transparent"} style={{backgroundColor:"transparent", width:80,marginLeft:45}} onPress={NavigateToInfo}>
              <Text ></Text>
          </TouchableHighlight>
        </View>
        
     </View>
    )
}

export default Menu