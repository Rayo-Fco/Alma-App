import { useCallback, useState } from 'react';
import loginServices from '../services/login';
import AsyncStorage from '@react-native-community/async-storage';
import { ToastAndroid } from 'react-native';

export default function useUser() {
    const [state, setState] = useState({ loading: false, error: false })

    const login = useCallback(({ email, password }) => {
        setState({ loading: true, error: false })
        loginServices(email, password)
            .then(async token => {
                if (token != null) {
                    localStorage.setItem('email', email);
                    window.sessionStorage.setItem('token', token)

                    setState({ loading: false, error: false })

                    try {
                        await AsyncStorage.setItem('token', token)
                    } catch (e) {
                        console.log("error hai", e)
                    }
                } else {
                    ToastAndroid.show("Email o contraseña invalida", ToastAndroid.LONG);
                    AsyncStorage.removeItem('email');
                    AsyncStorage.removeItem('token')
                    setState({ loading: false, error: true })
                }


            })
            .catch(err => {
                AsyncStorage.removeItem('email');
                AsyncStorage.removeItem('token')
                setState({ loading: false, error: true })

            })
    }, [])

    const logout = useCallback(async () => {
        localStorage.removeItem('email');
        window.sessionStorage.removeItem('token')
        localStorage.clear()
        window.sessionStorage.clear()

        try {
            await AsyncStorage.setItem('token', '')
        } catch (e) {
            console.log("error hai", e)
        }
    }, [])


    return {

        isLogged: Boolean(AsyncStorage.getItem('token')),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        login,
        logout
    }
}
