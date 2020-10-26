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
   // backgroundColor:"red",
   paddingTop:230,
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