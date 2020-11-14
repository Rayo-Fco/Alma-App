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
  }

});

export default styles;