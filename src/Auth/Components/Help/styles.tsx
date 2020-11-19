import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
      container: {
        flex: 1,
        width:"100%",
        height:570,
        position:"absolute",
        zIndex:6,
        bottom:0,
        backgroundColor:"#FC9FEF",
        borderTopRightRadius:60,
        alignContent:"center",
        alignItems:"center"
      },
      txtSOS:{
          marginLeft:2,
          marginTop:20,
          color:"#FFF",
          fontSize:55,
          fontFamily:"Roboto_700Bold"
      },
      btnSOS: {
        flex: 1,
        width:110,
        height:103,
        position:"absolute",
        left:0,
        top:245,
        zIndex:5,
        bottom:100,
        backgroundColor:"#FE5858",
        borderTopRightRadius:50,
        borderBottomRightRadius:50,
      },
      btnAyuda: {
        marginTop:70,
        width:316,
        height:175,
        backgroundColor:"#FE5858",
        borderTopRightRadius:40,
        borderBottomRightRadius:40,
        borderTopLeftRadius:40,
        borderBottomLeftRadius:40,
        borderColor:"#FFF",
        borderWidth:3,
        alignItems:"center",
        paddingTop:30
      },
      txtTitulo:{
        marginTop:40,
        color:"#FFF",
        fontSize:57,
        fontFamily:"Roboto_700Bold"
      },
      txtSalir:{
        marginTop:40,
        color:"#FFF",
        fontSize:38,
        fontFamily:"Roboto_700Bold",
        textDecorationLine:'underline'
      }

});

export default styles;