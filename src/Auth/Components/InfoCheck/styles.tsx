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
    view: {
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
