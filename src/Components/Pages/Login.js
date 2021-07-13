import React, { useContext, useState } from 'react';
import { Form, Button, Container, Card } from "react-bootstrap";
import axios from 'axios';
import { Config } from '../../Config'
import AuthContext from '../../Context/AuthContext'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setAccessToken, setRefreshToken, setLoggedIn, setATExpire, setRTExpire} = useContext(AuthContext);

    async function submit(e) {
        e.preventDefault();
        try {
            const {data} = await axios.post(Config.API_URL + '/auth/login', {
                email,
                password
            });
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            setATExpire(data.ATExpiresIn);
            setRTExpire(data.RTExpiresIn);
            setLoggedIn(true);
        } catch (error) {
            console.error(error?.response?.data?.message || error.message);
        }

    }
    return (
        <Container>
            <Card className="p-5 ">
                <h1>Entrar a tu cuenta! </h1>
                <Form onSubmit={submit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Ingresar direccion de Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Ingresar Contraseña" onChange={(e) => setPassword(e.target.value)} value={password} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Entrar
                    </Button>
                </Form>
            </Card>

        </Container>
    )
}

export default Login
