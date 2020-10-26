import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    position:"absolute",
    bottom:100,
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
});

export default styles;