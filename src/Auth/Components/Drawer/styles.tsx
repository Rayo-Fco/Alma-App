import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

const styles = StyleSheet.create({
      container:{
        backgroundColor:"#FDCFF7",
         height:"100%", 
         paddingLeft:20,
         paddingTop:150,
      },
      btnMenu:{
        height: 54,
        width:260,
        marginTop:50,
        backgroundColor : "#FEE7FB",
        borderBottomWidth:5,
        borderBottomColor:"#FC9FEF",
        alignItems:"center",
        alignContent:"center",
      },
      txtMenu:{
        marginTop:9,
        fontSize:20,
        fontFamily:"Roboto_700Bold",
        color:"#FC9FEF",
      },
      txtTitulo:{
        fontSize:30,
        fontFamily:"Roboto_700Bold",
        color:"#FC9FEF",
        marginBottom:40,
      },
      btnCerrar:{
          marginTop:50,
          alignItems:"center",
      },
      txtCerrar:{
        fontSize:30,
        fontFamily:"Roboto_700Bold",
        color:"#FC9FEF",
        textDecorationLine:"underline"
      }



});

export default styles;