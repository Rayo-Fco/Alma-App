import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    height:400, 
    backgroundColor:"#FDCFF7",
    borderTopColor:"#FEEDFC",
    borderTopWidth:5,
    borderLeftColor:"#FEEDFC",
    borderLeftWidth:5,
    borderRightColor:"#FEEDFC",
    borderRightWidth:5,
    borderTopRightRadius:40,
    borderTopLeftRadius:40,
    alignItems: "center",
    
  },
  titulo:{
    paddingTop:10,
    fontSize:30,
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
    fontFamily:"Roboto_700Bold",

  }
});

export default styles;