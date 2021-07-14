import axios from 'axios';
import { Config } from '../Config';

const API = axios.create({
    baseURL: `${Config.API_URL}`
});
export const login = async ({ email, password, set }) => {
    const response = await API.post(`/auth/login`, {
        email,
        password
    });
    set({
        accessToken: (response.data.accessToken),
        refreshToken: (response.data.refreshToken),
        ATExpire: (response.data.ATExpiresIn),
        RTExpire: (response.data.RTExpiresIn),
        LoggedIn: (true)
    })
    return response;
}

export const getForms = async ({accessToken}) => {
    const response = await API.get(`/admin/formulario/all`, {
        headers: {
            "x-access-token": accessToken
        }
    })
    return response;
}

export const cerrarSesion = async ({accessToken, refreshToken}) => {
    await API.delete(`/auth/token`, {
        headers: {
            "x-refresh-token": refreshToken,
            "x-access-token": accessToken
        }
    })
}