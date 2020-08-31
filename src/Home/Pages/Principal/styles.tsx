import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  BackgroundContainer:{
    flex: 1,
    //@ts-ignore
    width:null,
    //@ts-ignore
    height:null,
    justifyContent:"center",
    alignItems:"center",
    flexDirection: 'column'
  },
  LogoContainer:{
    flex: 1,
  },
  PrincipalContainer:{
    flex: 1,
    alignItems:"center",
  }, 
  Logo:{
    marginTop:180,
    width:341,
    height:130
  },
  TextoBienvenida:{
    color:'#FC5CE7',
    fontFamily: 'Roboto_500Medium',
    fontSize: 40,
    marginTop:35
  },
  BtnRegistrar:{
    height: 54,
    width:314,
    borderRadius:22,
    marginTop:30,
    backgroundColor : "#FC7EEB",
    alignItems:'center',
    paddingTop:12
  },
  TextBtnRegistrar:{
    fontFamily: 'Roboto_500Medium',
    fontSize:25,
    color:'white'
  },
  BtnIniciar:{
    height: 54,
    width:314,
    borderRadius:22,
    marginTop:40,
    backgroundColor : "#FEDEFA",
    alignItems:'center',
    paddingTop:12 

  },
  TextBtnIniciar:{
    fontFamily: 'Roboto_500Medium',
    fontSize:25,
    color:'#FDAEF2'
  }

});

export default styles;