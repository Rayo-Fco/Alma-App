import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    position:"absolute",
    bottom:100,
    height:120, 
    backgroundColor:"#584"
  },
  button: {
    backgroundColor:"green",
    position:"absolute",
    zIndex:2,
    elevation: 2,
    alignItems: "center",
    padding: 10,
    width:"100%",
    height:120, 
    top:0,
  },
  countContainer: {
    alignItems: "center",
  },
  countText: {
    color: "#FF00FF"
  }

});

export default styles;