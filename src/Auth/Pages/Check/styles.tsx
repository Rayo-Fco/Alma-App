import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  PrincipalContainer:{
    flex: 2,
    alignItems:"center",
  }, 
  BackgroundContainer:{
    //@ts-ignore
    width:"100%",
    //@ts-ignore
    height:230,
  },
  BackgroundView:{
    position:"absolute",
    zIndex:1,
    elevation: 1,
    width:"100%",
  },
  MenuContainer:{
    backgroundColor:"#FEF9FE",
    width:"100%",
    height:100
  },MenuImage:{
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
  CheckContainer:{
    flex: 1,
    width:"100%",
    height:"100%",
    alignItems:'center'
  },
  titulo:{
    marginTop:250,
    fontSize:40,
    fontFamily:"Roboto_700Bold",
    color:"#FC6EE9"
  },
  subtitulo:{
    paddingTop:30,
    fontSize:20,
    fontFamily:"Roboto_700Bold",
    color:"#FC6EE9"
  },
  input:{
    marginTop:10,
    fontFamily: 'Roboto_400Regular',
    fontSize: 23,
    borderBottomColor:'#FC6EE9',
    color:'#FC6EE9',
    borderBottomWidth:3,
    width:330,
  },
  inputArea:{
    marginTop:30,
    fontFamily: 'Roboto_400Regular',
    fontSize: 23,
    borderBottomColor:'#FC6EE9',
    backgroundColor:"#FCDDF8",
    color:'#FC6EE9',
    borderBottomWidth:3,
    width:330,
    height:90
  },
  Btn:{
    height: 54,
    width:314,
    borderRadius:22,
    marginTop:20,
    backgroundColor : "#FC7EEB",
    alignItems:'center',
    justifyContent: "center",
    borderTopColor:"#FEEDFC",
    borderTopWidth:2,
    borderLeftColor:"#FEEDFC",
    borderLeftWidth:2,
    borderRightColor:"#FEEDFC",
    borderRightWidth:2,
    borderBottomColor:"#FEEDFC",
    borderBottomWidth:2,
  },
  TextBtn:{
    color:'#FEEDFC',
    fontSize:30,
    fontFamily:"Roboto_700Bold"

  },
  tabletid:{
    fontSize:20,
    fontFamily:"Roboto_700Bold",
    color:"#FC6EE9",
    marginLeft:40
  },
  tabletinfo:{
    fontSize:18,
    fontFamily:"Roboto_400Regular",
    color:"black",
    marginLeft:45
  },
  ico:{
    color: "#FC6EE9",
    fontSize:23,
    marginLeft:40
  }

});

export default styles;