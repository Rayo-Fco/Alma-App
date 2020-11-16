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
  PerfilContainer:{
    flex: 1,
    paddingTop:230,
    width:"100%",
    height:"100%",
    paddingRight:20

  },
  mapStyle: {
    width: "100%",
    height: "130%",
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
  ContainerInput:{
    flexDirection:"row",
    alignItems:"center",
    alignSelf:'flex-end'
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
  Titulo:{
    fontFamily: 'Roboto_500Medium',
    fontSize: 25,
    color:'#FC6EE9',
    marginLeft:30,
    textTransform:'capitalize',
    marginBottom:20,
    marginTop:20
  },
  textTituloPass:{
    marginLeft:50,
    fontFamily: 'Roboto_500Medium',
    fontSize: 23,
    color:'#FC6EE9',
  },
  Password2Container: {
    width:"100%",
    alignContent:"center",
    paddingLeft:20,
    marginTop:20
  },
  passwordContainer: {
    flexDirection: 'row',
  },
  IcoPassword:{
    color: "#FC8EED",
    marginTop:25,
    marginLeft:5
  },
  Inputpassword:{
    marginTop:20,
    fontFamily: 'Roboto_300Light_Italic',
    fontSize: 20,
    borderBottomColor:'#FC6EE9',
    borderBottomWidth:3,
    width:290,
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
  overlay: {
    height: "auto",
    width: "95%",
    backgroundColor: "#FFF",
    borderColor: "#FC5CE7",
    borderWidth: 1,
    alignItems:"center"
  },


});

export default styles;