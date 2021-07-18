import React, { useContext, useState } from 'react';
import { Form, Button, Container, Card, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import AuthContext from '../../Context/AuthContext'
import makeToast from '../Functions/Toast'
import * as Api from '../../Api/index'
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { set } = useContext(AuthContext);

    async function submit(e) {
        e.preventDefault();
        try {
            setDisabled(true);
            const response = await Api.login({ email, password, set })
            console.log(response);
            // if (response.data.perfil.rol !== "admin") return makeToast(6000, 'error', "Aplicacion solo disponible para Administradores!")
            setDisabled(false);
        } catch (error) {
            setDisabled(false);
            makeToast(6000, 'error', error?.response?.data?.message || error.message)
            console.error(error?.response?.data?.message || error.message);
        }

    }
    const showPassIcon = !showPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
    </svg>
    const formType = showPassword ? 'text' : 'password';
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
                        <InputGroup>
                            <Form.Control name="password" type={formType} placeholder="**********" onChange={(e) => setPassword(e.target.value)} value={password} required />
                            <OverlayTrigger
                                key={"tooltip-password"}
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-password}`}>
                                        {showPassword ? 'Ocultar' : 'Mostrar'} contraseña
                                    </Tooltip>
                                }
                            >
                                <Button variant="outline-primary" id="button-addon1" tabIndex="-1" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassIcon}
                                </Button>
                            </OverlayTrigger>
                        </InputGroup>
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
