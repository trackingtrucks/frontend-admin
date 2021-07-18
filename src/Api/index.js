import axios from 'axios';
import { Config } from '../Config';
import makeToast from '../Components/Functions/Toast'

const API = axios.create({
    baseURL: `${Config.API_URL}`
});
export const login = async ({ email, password, set }) => {
    const response = await API.post(`/auth/login`, {
        email,
        password
    });
    if (response.data.perfil.rol !== "admin"){cerrarSesion({accessToken: response.data.accessToken, refreshToken: response.data.refreshToken}); return makeToast(6000, 'error', "Aplicacion solo disponible para Administradores!")};
    set({
        profile: (response.data.perfil),
        accessToken: (response.data.accessToken),
        refreshToken: (response.data.refreshToken),
        ATExpire: (response.data.ATExpiresIn),
        RTExpire: (response.data.RTExpiresIn),
        LoggedIn: (true)
    })
    return response;
}

export const getForms = async ({ accessToken }) => {
    const response = await API.get(`/admin/formulario/all`, {
        headers: {
            "x-access-token": accessToken
        }
    })
    return response;
}

export const cerrarSesion = async ({ accessToken, refreshToken }) => {
    await API.delete(`/auth/token`, {
        headers: {
            "x-refresh-token": refreshToken,
            "x-access-token": accessToken
        }
    })
}

export const aceptarFormulario = async ({ companyId, id, accessToken }) => {
    const response = await API.post(`/admin/formulario/aceptar`, {
        id,
        companyId
    }, {
        headers: {
            "x-access-token": accessToken
        }
    })
    makeToast(5000, "success", response.data.message)
    return response;
}

export const eliminarFormulario = async ({ id, accessToken }) => {
    const response = await API.delete(`/admin/formulario/${id}`, {
        headers: {
            "x-access-token": accessToken
        }
    })
    makeToast(5000, "success", response.data.message)
    return response;
}
export const agregarAdmin = async ({ email, accessToken }) => {
    const response = await API.post('/admin/codigo', {
        email: email
    }, {
        headers: {
            "x-access-token": accessToken,
            "Content-Type": "application/json"
        }
    })
    makeToast(5000, "success", response.data.message)
    return response;
}

export const getTokens = async ({ accessToken }) => {
    const response = await API.get(`/admin/codigos/admin`, {
        headers: {
            "x-access-token": accessToken
        }
    })
    return response;
}
export const getAdmins = async ({ accessToken }) => {
    const response = await API.get(`/admin/cuentas/admins`, {
        headers: {
            "x-access-token": accessToken
        }
    })
    return response;
}

export const eliminarToken = async ({ accessToken, id }) => {
    const response = await API.delete(`/admin/codigo`, {
        headers: {
            "x-access-token": accessToken,
        },
        data: {
            id: id
        }
    });
    return response;
}
export const eliminarAdmin = async ({ accessToken, id }) => {
    const response = await API.delete(`/admin/cuenta`, {
        headers: {
            "x-access-token": accessToken,
        },
        data: {
            id: id
        }
    });
    return response;
}

export const getAllUsers = async ({ accessToken }) => {
    const response = await API.get(`/admin/cuentas`, {
        headers: {
            "x-access-token": accessToken
        }
    })
    return response;
}

export const restablecerContraseña = async ({ email }) => {
    console.log(email);
    const response = await API.post(`/user/restablecer`, {
        email
    });
    return response;
}

export const cambiarContraseña = async ({ accessToken, password, passwordActual }) => {
    const response = await API.patch(`/user/cambiar/contrasena/logueado`, {
        password, passwordActual
    }, {
        headers: {
            'x-access-token': accessToken
        }
    })
    return response;
}

export const cerrarTodasSesiones = async ({ accessToken, password }) => {
    const response = await API.delete(`/auth/tokens`, {
        headers: {
            "x-access-token": accessToken,
        },
        data: {
            password
        }
    });
    return response;
}