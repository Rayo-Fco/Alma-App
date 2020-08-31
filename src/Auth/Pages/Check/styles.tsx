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
    position:"absolute",
    zIndex:1
  },
  MapsContainer:{
    flex: 1,
    backgroundColor:"green",
    width:"100%",
    height:"100%",

  },
  mapStyle: {
    width: "100%",
    height: "130%",
  },
  MenuContainer:{
    backgroundColor:"#FEF9FE",
    width:"100%",
    height:100
  }

});

export default styles;