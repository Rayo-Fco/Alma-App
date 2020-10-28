import React, { useState, useEffect, ComponentFactory,Component, useContext, createContext} from 'react';
import {
  View,
  Image,
  ImageStyle,
  Text,
  TouchableHighlight,
  ImageProps
} from 'react-native';
import { HomeNavigationProps } from "../../../Component/Navigation"
import styles from './styles';
import Info from '../../Components/Info'
import Check from '../../Components/CheckIn'
import InfoCheck from '../../Components/InfoCheck'
import { useNavigation } from '@react-navigation/native';
import { Icon } from "react-native-elements";

const header = require('../../../assets/Header-Background.png')


const menu1 = require('../../../assets/menu/1.png')
const menu2 = require('../../../assets/menu/2.png')
const menu3 = require('../../../assets/menu/3.png')
const menux = require('../../../assets/menu/x.png')

const useToggle = (initialState:boolean) => {
  const [isToggled, setIsToggled] = React.useState(initialState);

  // put [setIsToggled] into the useCallback's dependencies array
  // this value never changes so the callback is not going to be ever re-created
  
  const toggle = React.useCallback(
    
    () => setIsToggled(state => !state),
    [setIsToggled],
  );

  return [isToggled, toggle];
}


const CheckIn = ({ route, navigation }: HomeNavigationProps<"Inicio">)=> {
  const [info, setInfo] = useState(false);
  const [checkin, setCheckin] = useState(false);

  /* console.log('Provide'+StateMenu); */
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
  let model ={
    user:"",
    comuna:"",
    info:{
        numero_depto: "",
        numero_piso: "",
        extra:""
    },
    coordinates:{
        latitude:0,
        longitude: 0
    },
    date: new Date("2020-10-25 11:42:58.507Z")
  }
  const [ImgMenu,setImgMenu] = useState<ImageProps>(menux)

  const [isinfocheck, setInfocheck] = useState(false);
  const [data, setData] = useState<Icheck>(model)
  
  

  const navig = useNavigation();

  useEffect(()=>{

    Limpiar()
    if(route.params){ 
       setImgMenu(menux)
    }
  },[route.params])
  
  
 const NavigateToPrincipal =() =>{
    Limpiar()
    setImgMenu(menu2)
    navig.navigate("Inicio",{ PropsMenu:"Principal"})
  }
  const NavigateToInfo =() =>{
    if(!info){
    Limpiar()
    setInfo(true)
    setImgMenu(menu3)
    }else
    {
      setInfo(false)
      setImgMenu(menux)
    }
  }
  const NavigateToCheck =() =>{
    if(!checkin){
      Limpiar()
      setCheckin(true)
      setImgMenu(menu1)
    }else
    {
      setCheckin(false)
      setImgMenu(menux)
    }
  }
 
  const Limpiar = () =>{
    setCheckin(false)
    setInfo(false)
  }

  const VerInfo = (data:Icheck)=>{
    console.log("entro");
    setData(data)
    setInfocheck(true)

  }
  let json ={
    user:"Prueba",
    comuna:"Maipu",
    info:{
        numero_depto: "asdasasd",
        numero_piso: "asdasdasrrrr",
        extra:"Extra extra"
    },
    coordinates:{
        latitude:-33.4465133,
        longitude: -70.6377907
    },
    date: new Date("2020-10-25 11:42:58.507Z")
  }
  let json2 ={
    user:"Prueba2",
    comuna:"xxx",
    info:{
        numero_depto: "222asdasasd",
        numero_piso: "a222sdasdasrrrr",
        extra:"E222xtra extra"
    },
    coordinates:{
        latitude:-33.4958477,
        longitude: -70.6152301
    },
    date: new Date("2020-10-25 11:42:58.507Z")
  }


    return (
      
      
      <View style={styles.PrincipalContainer}> 

          <View style={styles.BackgroundView}>
            <Image source={header} style={styles.BackgroundContainer as ImageStyle}  ></Image>  
            <View style={{width:80,height:80,position:'absolute',right:8,top:50,}}>
              <Icon
                        type="material-community"
                        name="menu"
                        iconStyle={{color: "#ffff",fontSize:50}}
                        onPress={()=>{ navigation.openDrawer()}}
                /> 
            </View>
          </View>
          <View style={styles.CheckContainer}> 
              <Text style={styles.titulo}>Mis Check In </Text>

              <View style={{display:"flex",flexDirection:'row', width:"100%", marginTop:30,marginBottom:5}}>
                <Text style={styles.tabletid} >ID </Text><Text style={styles.tabletid} >     Fecha    </Text>
              </View>
              <View style={{display:"flex",flexDirection:'row', width:"100%",backgroundColor:"red",alignItems:"center"}}>
                <Text style={styles.tabletinfo}>1</Text><Text style={styles.tabletinfo}> 20-10-2020 15:000</Text><Icon
                        type="material-community"
                        name="alert-circle-outline"
                        iconStyle={styles.ico}
                        onPress={()=>{VerInfo(json)}}
                /> 
              </View>

              <InfoCheck isVisible={isinfocheck} prueba={()=> setInfocheck(!isinfocheck)} data={data} ></InfoCheck>


              <View style={{marginTop:40,display:"flex",flexDirection:'row', width:"100%",backgroundColor:"red",alignItems:"center"}}>
                <Text style={styles.tabletinfo}>2</Text><Text style={styles.tabletinfo}> 22-10-2020 15:000</Text><Icon
                        type="material-community"
                        name="alert-circle-outline"
                        iconStyle={styles.ico}
                        onPress={()=>VerInfo(json2)}
                /> 
              </View>

          </View>
          <Info isVisible={info}></Info> 
          <Check isVisible={checkin}></Check>
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
      </View>
      
    );
};

export default CheckIn;