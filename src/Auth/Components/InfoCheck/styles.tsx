import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    overlay: {
      height: "80%",
      width: "90%",
      backgroundColor: "#fff",
      borderColor: "#FC5CE7",
      borderWidth: 2,
      borderRadius: 10,
    },
    overlay2: {
      padding:4,
      marginTop:0,
      height: "80%",
      width: "95%",
      backgroundColor: "#FFF",
      borderColor: "#FC5CE7",
      borderWidth: 1,
    },
    view: {
        borderRadius: 10,
        padding:10,
        backgroundColor:"#FFF",
        flex: 1,
        alignItems: "center",
      },
      text: {
        color: "#FC5CE7",
        textTransform: "uppercase",
        fontSize:20,
        fontFamily:"Roboto_700Bold",
        marginTop: 10,
        marginBottom:20
      },
      mapStyle: {
        width: "100%",
        height: "60%",
      },
      txtTituloInfo:{
        marginTop:5,
        fontSize:20,
        fontFamily:"Roboto_500Medium"
      },
      txtInfo:{
        marginTop:5,
        fontSize:15,
        fontFamily:"Roboto_400Regular"
      },
      txtFoto:{
        marginTop:40,
        fontSize:20,
        fontFamily:"Roboto_400Regular",
        color:"#FC9FEF",
        backgroundColor:"#9FEAFC",
        borderWidth:1,
        borderColor:"#9FC6FC",
        borderRadius:5,
        paddingLeft:6,
        paddingRight:6,
      },
      btnCerrar:{
          marginTop:20,
          height: 30,
          width:200,
          borderRadius:4,
          backgroundColor : "#FEDEFA",
          alignItems:'center',
          borderColor:"#FC9FEF",
          borderWidth:1
      },
      txtCerrar:{
        marginTop:2,
        fontSize:20,
        fontFamily:"Roboto_400Regular",
        color:"#FC9FEF",
      }
  });

  export default styles
