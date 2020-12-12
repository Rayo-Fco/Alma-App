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
    color:'#FC6EE9',
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
  BtnIngresarDisabled:{
    height: 54,
    width:314,
    borderRadius:22,
    marginTop:30,
    backgroundColor : "#FCA5F0",
    alignItems:'center',
    paddingTop:12
  },
  TextBtnIngresar:{
    fontFamily: 'Roboto_500Medium',
    fontSize:25,
    color:'white'
  },
  passwordContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  inputStyle: {
    flex: 1,
    marginTop:30,
    marginRight:10,
    fontFamily: 'Roboto_300Light_Italic',
    fontSize: 23,
    borderBottomColor:'#FC6EE9',
    color:'#FC6EE9',
    borderBottomWidth:3,
  },
  IcoPassword:{
    color: "#FC8EED",marginTop:30
  },
  TextRecuperar:{
    marginTop:60,
    fontSize:17,
    fontFamily: 'Roboto_300Light_Italic',
    color:"blue",
    textDecorationLine:"underline"
  },
  overlay: {
    height: "40%",
    width: "90%",
    backgroundColor: "#fff",
    borderColor: "#FC5CE7",
    borderWidth: 2,
    borderRadius: 5,
  },
  view: {
    borderRadius: 10,
    padding:20,
    backgroundColor:"#FFF",
    flex: 1,
    alignItems: "center",
  },

});

export default styles;