import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Config } from '../Config'
const AuthContext = createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(undefined);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || '')
    const [accessToken, setAccessToken] = useState('')
    const [ATExpire, setATExpire] = useState(null)
    const [RTExpire, setRTExpire] = useState(parseInt(localStorage.getItem('rtExpires'), 10) || null)

    async function saveLocalStorage(){
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('rtExpires', parseInt(RTExpire, 10));
    }

    async function clearLocalStorage(){
        localStorage.clear();
    }

    function set({accessToken, refreshToken, ATExpire, RTExpire, LoggedIn}){
        if (accessToken) {setAccessToken(accessToken)}
        if (refreshToken) {setRefreshToken(refreshToken)}
        if (ATExpire) {setATExpire(ATExpire)}
        if (RTExpire) {setRTExpire(RTExpire)}
        if (LoggedIn) {setLoggedIn(LoggedIn)}
    }
    function get(string){
        switch (string) {
            case "at":
                return(accessToken)
            case "rt":
                return(refreshToken)            
            default:
                return "Que carajeanos"
        }
    }
    async function getAccessToken() {
        try {
            if (refreshToken) {
                const {data} = await axios.get(Config.API_URL + "/auth/token", {
                    headers: {
                        'x-refresh-token': refreshToken
                    }
                });
                setAccessToken(data.accessToken);
                setATExpire(data.ATExpiresIn)
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
                clearLocalStorage();
            }
        } catch (error) {
            console.error(error?.response?.data?.message || error.message);
            setLoggedIn(false);
            clearLocalStorage();
        }
    }
    useEffect(() => {
        const now = Date.now()
        const falta = ATExpire - now;
        if (falta < 0) return;
        setTimeout(() => {
            console.info("Pidiendo nuevo AT");
            getAccessToken();
        }, falta - 15000);
        // eslint-disable-next-line
    }, [ATExpire, RTExpire]);

    useEffect(() => {
        getAccessToken();
        // eslint-disable-next-line
    }, []);

    return <AuthContext.Provider value={{ loggedIn, setLoggedIn, accessToken, refreshToken, setAccessToken, setRefreshToken, saveLocalStorage, clearLocalStorage, setRTExpire, setATExpire, set, get}}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContext;
export { AuthContextProvider };

