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
    backgroundColor:'red'
  },
  PrincipalContainer:{
    flex: 1,
    alignItems:"center",
 //  backgroundColor:"green"
  }, 
  TextoTitulo:{
    color:'#FC5CE7',
    fontFamily: 'Roboto_500Medium',
    fontSize: 25,
    marginTop:10
  },
  InputContainer:{
    width:'100%',
    //backgroundColor:'red',
    marginLeft:0
  },
  Input:{
    marginTop:30,
    fontFamily: 'Roboto_300Light_Italic',
    fontSize: 23,
    borderBottomColor:'#FC6EE9',
    borderBottomWidth:3,
    width:330,
  },
  BtnIngresar:{
    height: 54,
    width:314,
    borderRadius:22,
    marginTop:30,
    backgroundColor : "#FC7EEB",
    alignItems:'center',
    paddingTop:12
  },
  TextBtnIngresar:{
    fontFamily: 'Roboto_500Medium',
    fontSize:25,
    color:'white'
  },
  

});

export default styles;