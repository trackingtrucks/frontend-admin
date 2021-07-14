import React, { useContext, useState } from 'react';
import { Form, Button, Container, Card } from "react-bootstrap";
import AuthContext from '../../Context/AuthContext'
import makeToast from '../Functions/Toast'
import * as api from '../../Api/index'
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const {set} = useContext(AuthContext);

    async function submit(e) {
        e.preventDefault();
        try {
            setDisabled(true);
            const {data} = await api.login({email, password, set})
            if (data.perfil.rol !== "admin") return makeToast(6000, 'error', "Aplicacion solo disponible para Administradores!")
            setDisabled(false);
        } catch (error) {
            setDisabled(false);
            makeToast(6000, 'error', error?.response?.data?.message || error.message)
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
                    <Button variant="primary" type="submit" disabled={disabled}>
                        Entrar
                    </Button>
                </Form>
            </Card>

        </Container>
    )
}

export default Login
