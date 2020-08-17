import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
export default class Login extends React.Component {
    render() {
        return (
            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Email..."
                    placeholderTextColor="#003f5c"
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={styles.inputText}
                    placeholder="Pass..."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                />
                <TouchableOpacity>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
            </View>


        );
    }
}

interface State {
    email: "",
    password: ""
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 200,
        marginTop: 300,
        marginLeft: 35,
        justifyContent: "center",
        padding: 20
    }, inputText: {
        height: 50,
        color: "white"
    }, forgot: {
        color: "green",
        fontSize: 11,
        marginBottom: -50
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    }, loginText: {
        color: "white",
        fontSize: 25,
    }
});