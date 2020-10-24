import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"80%",
    position:"absolute",
    bottom:100,
    height:120, 
    backgroundColor:"#FEEDFC",
    borderTopColor:"#FDCFF7",
    borderTopWidth:5,
    borderLeftColor:"#FDCFF7",
    borderLeftWidth:5,
    borderRightColor:"#FDCFF7",
    borderRightWidth:5,
    borderTopRightRadius:40,
    borderTopLeftRadius:40
  },
  countContainer: {
    alignItems: "center",
  },
  titulo:{
    paddingTop:10,
    fontSize:20,
    fontFamily:"Roboto_700Bold",
    color:"#FD9EF0"
  },
  cargando:{
    paddingTop:40,
    fontSize:30,
    fontFamily:"Roboto_700Bold",
    color:"#FD9EF0"
  },
  disponible:{
    paddingTop:30,
    fontSize:25,
    fontFamily:"Roboto_700Bold",
    color:"#FD9EF0",
    textAlign:'center'
  },
  numero:{
    fontSize:40,
    fontFamily:"Roboto_700Bold",
    color:"#FD9EF0"
  },
  IcoPhone:{
      color: "#FC8EED",
      fontSize:42,

  },
  PhoneContainer:{
    marginTop:20,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center'

  }

});

export default styles;