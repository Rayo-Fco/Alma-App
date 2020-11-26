import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  PrincipalContainer:{
    flex: 2,
    alignItems:"center",
  }, 
  BackgroundView:{
    position:"absolute",
    zIndex:1,
    elevation: 1,
    width:"100%",
  },
  BackgroundContainer:{
    //@ts-ignore
    width:"100%",
    //@ts-ignore
    height:230,
  },
  Container:{
    flex: 1,
   paddingTop:230,
    width:"100%",
    height:"100%",
    backgroundColor:"#FC9FEF",
    alignItems:"center"

  },
  MenuContainer:{
    backgroundColor:"#FEF9FE",
    width:"100%",
    height:100
  },
  MenuImage:{
    position:"absolute",
    width:"100%",
    height:100,
  },
  MenuBottom:{
    justifyContent:"center",
    display:"flex",
    flexDirection:"row",
    flexWrap:"nowrap",
    flexGrow:1,
    marginTop:15,
    marginBottom:22,
  },
  btnContacto:{
    marginTop:30,
    width:330,
    height:70,
    backgroundColor:"#FEF3FD",
    borderBottomWidth:3,
    borderBottomColor:"#FFF",
    alignItems:"center",
    paddingTop:10
  },
  txtNombre:{
    fontFamily:"Roboto_700Bold",
    fontSize:28
  },
  txtTelefono:{
    fontFamily:"Roboto_500Medium",
    fontSize:16,
    color:"#FC9FEF"
  },
  txtAgregar:{
    marginTop:30,
    fontFamily:"Roboto_700Bold",
    fontSize:22,
    textDecorationLine:"underline",
    color:"#FFF"
  },
  overlay: {
    height: "20%",
    width: "80%",
    backgroundColor: "#fff",
    borderColor: "#FC5CE7",
    borderWidth: 2,
    borderRadius: 10,
    alignItems:"center",
    padding:5
  },
  overlay2: {
    height: "55%",
    width: "97%",
    backgroundColor: "#fff",
    borderColor: "#FC5CE7",
    borderWidth: 2,
    borderRadius: 10,
    alignItems:"center",
    padding:5
  },
  txtPregunta:{
    marginTop:20,
    fontFamily:"Roboto_500Medium",
    fontSize:20,
    color:"#FC5CE7",
    textAlign:'center'
  },
  btnPregunta:{
    marginTop:20,
    fontFamily:"Roboto_500Medium",
    fontSize:30,
    color:"blue",
    textAlign:'center'
  },
  ContainerInput:{
    flexDirection:"row",
    alignItems:"center",
    alignSelf:'flex-end',
    marginTop:20
  },
  TextInput:{
    fontFamily: 'Roboto_500Medium',
    fontSize: 23,
    color:'#FC6EE9',
    marginRight:10
  }, 
  Input:{
    fontFamily: 'Roboto_300Light_Italic',
    fontSize: 23,
    borderBottomColor:'#FDA0F0',
    borderBottomWidth:2,
    width:230,
    marginTop:5
  },
  txtTitulo:{
    marginTop:20,
    marginBottom:20,
    fontFamily:"Roboto_500Medium",
    fontSize:30,
    color:"#FC5CE7",
    textAlign:'center'
  },
  Btn: {
    height: 54,
    width: 314,
    borderRadius: 22,
    marginTop: 5,
    backgroundColor: "#FC7EEB",
    alignItems: 'center',
    justifyContent: "center",
    borderTopColor: "#FEEDFC",
    borderTopWidth: 2,
    borderLeftColor: "#FEEDFC",
    borderLeftWidth: 2,
    borderRightColor: "#FEEDFC",
    borderRightWidth: 2,
    borderBottomColor: "#FEEDFC",
    borderBottomWidth: 2,
    marginBottom:20
  },
  TextBtn: {
    color: '#FEEDFC',
    fontSize: 30,
    fontFamily: "Roboto_700Bold",
  },

});

export default styles;