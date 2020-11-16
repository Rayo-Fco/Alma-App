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
  MapsContainer:{
    flex: 1,
    paddingTop:180,
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
  }



});

export default styles;