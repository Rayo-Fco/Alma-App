import axios from 'axios';
import { ToastAndroid } from 'react-native';
export default function login(email: any , password: any ) {

    const user = {
        email: email,
        password: password
    }

    return  axios.post(`https://api.zarapito.xyz/login/`, user)
        .then(res => {
            const { token } = res.data
            
            return token
        })
        .catch(err => {
         //   ToastAndroid.show(err.response.data.error, ToastAndroid.SHORT);
            console.log(err.response.data.error)
            return null
        })



}