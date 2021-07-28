import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import queryString from 'query-string';
import AuthContext from '../../Context/AuthContext';

const SetToken = ({ location }) => {
    const [message, setMessage] = useState('Cargando...');
    const [variant, setVariant] = useState('info');
    const { getAccessToken } = useContext(AuthContext);
    const getToken = async () => {
        const { token, expires } = queryString.parse(location.search);
        if (!token || !expires) {
            setVariant('danger');
            setMessage('No se especificó un token');
            return;
        }
        localStorage.setItem("refreshToken", token)
        setVariant('success');
        setMessage('Logueado! Redirigiendo');
        getAccessToken();
        window.location = "/";
    }
    useEffect(() => {
        getToken();
        // eslint-disable-next-line
    }, [])
    return (

        <Alert variant={variant}>
            <p style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {message}
            </p>
        </Alert>
    )
}

export default SetToken
