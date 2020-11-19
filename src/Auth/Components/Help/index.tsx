import React, { useState, useEffect, ComponentFactory, Component, useReducer } from 'react';
import {
    View,
    Text,
    Button,
    Modal,
    ActivityIndicator,
    TouchableHighlight,
    Platform,
} from 'react-native';
import { Overlay, Image } from "react-native-elements";
import styles from './styles';

const Help = () => {

    const [activo, setActivo] = useState(false)


    const Ayudame = ()=>{
        console.log("Ayuda!");
    }



    const Container = () => {
        if (activo) {
            return (
                <View style={styles.container}>
                    <Text style={styles.txtTitulo}>¡Ayudame!</Text>
                    <TouchableHighlight underlayColor='#F00' style={styles.btnAyuda} onPress={Ayudame}>
                        <Text style={styles.txtSOS}>Pedir Ayuda</Text>
                    </TouchableHighlight>
                    <Text style={styles.txtSalir} onPress={() => setActivo(!activo)} >Salir</Text>
                </View>)
        }
        else {
            return (<></>)
        }
    }

    return (
        <>
            <TouchableHighlight underlayColor='#F00' style={styles.btnSOS} onPress={() => setActivo(!activo)}>
                <Text style={styles.txtSOS}>SOS</Text>
            </TouchableHighlight>
            <Container />
        </>
    )
}

export default Help