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
import api from '../../../Services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../../Component/Loading'
const header = require('../../../assets/Header-Background.png')


const menu1 = require('../../../assets/menu/1.png')
const menu3 = require('../../../assets/menu/3.png')
const menux = require('../../../assets/menu/x.png')




const CheckIn = ({ route, navigation }: HomeNavigationProps<"Inicio">)=> {
  const [info, setInfo] = useState(false);
  const [checkin, setCheckin] = useState(false);

  /* console.log('Provide'+StateMenu); */
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
    date: Date
  };
 
  const [ImgMenu,setImgMenu] = useState<ImageProps>(menux)

  const [isinfocheck, setInfocheck] = useState(false);
  const [datas, setDatas] = useState<Icheck[]>([{ user:"",comuna:"asd",coordinates:[{latitude:34.333,longitude:34.333}],info:[{extra:"asd",numero_depto:"233",numero_piso:"344"}],date:new Date("01-02-2020")}])
  const [data, setData] = useState<Icheck>({ user:"",comuna:"asd",coordinates:[{latitude:34.333,longitude:34.333}],info:[{extra:"asd",numero_depto:"233",numero_piso:"344"}],date:new Date("01-02-2020")})
  const [loading,setLoading] = useState(false)
  const [index,setIndex] = useState(0)

  const navig = useNavigation();

  const getStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Alma')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }
  
  const getData = async () =>{
    getStorage().then(async (response)=>{
      setLoading(true)
      await api.get('/checkin/user',{
        headers: 
        { 
          Authorization: "Bearer "+response.token
        }
      }).then((response)=>{
          setDatas(response.data)
          setLoading(false)
      })
    })
  }
  

    useEffect(()=>{
        getData()
    },[])


  
 const NavigateToPrincipal =() =>{
    Limpiar()
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
      getData()
      setCheckin(false)
      setImgMenu(menux)
    }
  }
  const Limpiar = () =>{
    setCheckin(false)
    setInfo(false)
  }



  const VerInfo = (data:Icheck,index:number)=>{
    setIndex(index)
    setData(data)
    setInfocheck(true)

  }
  
interface PropsPlantilla{
  data:Icheck,
  index:number
}
const Plantilla =(props:PropsPlantilla)=>{
  const { data, index} = props
  return(
    <>
    <View style={{display:"flex",flexDirection:'row', width:"100%",alignItems:"center",marginTop:30}}>
    <Text style={styles.tabletinfo}>{index+1}</Text><Text style={styles.tabletinfo}> { new Date(data.date).toLocaleString()}</Text>
    <Icon
            type="material-community"
            name="alert-circle-outline"
            iconStyle={styles.ico}
            onPress={()=>{VerInfo(data, index)}}
    /> 
  </View>
  </>
  )
}



interface PropsCarga{
  mapeo:Icheck[]
}
  const Carga = (props:PropsCarga)=>{
    const { mapeo } = props
    const carga = mapeo.map((check,index)=>
      <Plantilla  data={check} index={index} key={index}></Plantilla>
    )
    
    return (<>
        {carga}
      <InfoCheck isVisible={isinfocheck} prueba={()=> setInfocheck(!isinfocheck)} data={data} index={index}></InfoCheck>
      </>)
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
              <>
              <Carga mapeo={datas}></Carga>
              </>


              
          </View>



          <Loading isVisible={loading} text={"Cargando.."}></Loading>
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