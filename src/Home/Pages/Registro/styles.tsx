import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  BackgroundContainer:{
    flex: 1,
    //@ts-ignore
    width:null,
    //@ts-ignore
    height:null,
    justifyContent:"center",
    alignItems:"center",
    flexDirection: 'column'
  },
  PrincipalContainer:{
    flex: 1,
    alignItems:"center",
    marginTop:250,
    minHeight:530
 //  backgroundColor:"green"
  }, 
  TextoTitulo:{
    color:'#FC5CE7',
    fontFamily: 'Roboto_500Medium',
    fontSize: 25,
    marginTop:10
  },
  InputContainer:{
    width:'100%',
    //backgroundColor:'red',
    marginLeft:0
  },
  Input:{
    marginTop:20,
    fontFamily: 'Roboto_300Light_Italic',
    fontSize: 23,
    borderBottomColor:'#FC6EE9',
    borderBottomWidth:3,
    width:330,
  },
  BtnIngresar:{
    height: 54,
    width:314,
    borderRadius:22,
    marginTop:20,
    backgroundColor : "#FC7EEB",
    alignItems:'center',
    justifyContent: "center",
  },
  TextBtnIngresar:{
    fontFamily: 'Roboto_500Medium',
    fontSize:25,
    color:'white'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    marginBottom:30
  },
  modalView: {
    margin: 20,
    backgroundColor: "#FDCFF7",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    marginTop:30
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  TextoTituloPolitica:{
    textAlign:"center",
    fontWeight:"bold",
    fontSize:18,
    marginBottom:10
  },
  checkbox:{
    borderColor: '#FC6EE9',
  },
  politicaContainer:{
    flex:1,
    flexDirection:"row",
    marginTop:15,
    alignItems:"center"
  },
  TextPolitica:{
    fontFamily: 'Roboto_400Regular',
    fontSize:21,
    color:'#FC8EED',
    marginLeft:15
  },
  TextPolitica2:{
    fontFamily: 'Roboto_700Bold',
    textDecorationLine:"underline",
    color:"blue"
  },
  phoneContainer: {
    flexDirection: 'row',
    borderBottomColor:'#FC6EE9',
    borderBottomWidth:3,
  },
  textphone:{
    marginTop:20,
    marginRight:10,
    fontFamily: 'Roboto_500Medium',
    fontSize: 23,
  },
  Inputphone:{
    marginTop:20,
    fontFamily: 'Roboto_300Light_Italic',
    fontSize: 23,
    width:280,
  },
  passwordContainer: {
    flexDirection: 'row',
  },
  IcoPassword:{
    color: "#FC8EED",
    marginTop:25,
    marginLeft:5
  },
  Inputpassword:{
    marginTop:20,
    fontFamily: 'Roboto_300Light_Italic',
    fontSize: 23,
    borderBottomColor:'#FC6EE9',
    borderBottomWidth:3,
    width:300,
  },


  

});

export default styles;