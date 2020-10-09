import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  MapsContainer:{
    flex: 1,
    backgroundColor:"red",
    width:"100%",
    height:"100%",

  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },
  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },

});

export default styles;