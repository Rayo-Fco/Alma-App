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
      }
  });

  export default styles
