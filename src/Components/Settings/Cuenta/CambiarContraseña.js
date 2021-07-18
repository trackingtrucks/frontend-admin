import React, { useState, useEffect, useContext } from 'react'
import { Modal, Form, Row, Col, Button, InputGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
import * as Api from '../../../Api';
import makeToast from '../../Functions/Toast'
function CambiarContraseña({ perfil, AuthContext }) {
    const [contraseñaActual, setContraseñaActual] = useState('');
    const [contraseñaNueva, setContraseñaNueva] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [mensajeError, setMensajeError] = useState('');
    const [show, setShow] = useState(false);
    const { get, clearLocalStorage } = useContext(AuthContext)
    const submit = async (e) => {
        e.preventDefault();
        if (disabled || contraseñaNueva !== confirmarContraseña) return;
        setDisabled(true);
        try {
            const { data } = await Api.cambiarContraseña({
                accessToken: get('at'),
                password: contraseñaNueva,
                passwordActual: contraseñaActual
            })
            makeToast(5000, "success", data.message)
            setTimeout(() => {
                clearLocalStorage();
                window.location.reload();
            }, 5000);
            setDisabled(false);
        } catch (error) {
            makeToast(5000, "error", error.response.data.message)
            setDisabled(false);
        }
    }
    useEffect(() => {
        if (contraseñaNueva !== confirmarContraseña && contraseñaNueva.length > 1 && confirmarContraseña.length > 1) {
            setIsInvalid(true);
            setIsValid(false);
            setDisabled(true);
            setMensajeError("Las contraseñas deben ser iguales")
        }
        if (contraseñaNueva.length <= 6 && contraseñaNueva.length > 1 && contraseñaNueva === confirmarContraseña) {
            setIsInvalid(true);
            setIsValid(false);
            setDisabled(true);
            setMensajeError("La contraseña debe ser mayor a 6 caracteres");
        }
        if (contraseñaNueva === confirmarContraseña && contraseñaNueva.length > 6) {
            setIsInvalid(false);
            setIsValid(true);
            setDisabled(false);
        }
    }, [contraseñaNueva, confirmarContraseña]);
    const showPassIcon = !showPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
    </svg>
    const formType = showPassword ? 'text' : 'password';
    return (
        <>
            <Button variant="outline-primary" id="button-addon2" onClick={() => setShow(true)}>
                Cambiar
            </Button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton closeLabel="">
                    <Modal.Title>Cambiar contraseña</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submit} autoComplete="chrome-off" >
                    <Form.Group as={Row} className="m-3" controlId="email">
                        <Form.Label column sm="4">
                            Email
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control name="email" type="email" placeholder="**********" readOnly value={perfil.email} required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="m-3" controlId="oldPassword">
                        <Form.Label column sm="4">
                            Contraseña actual
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control name="contraseña-vieja" type="password" placeholder="**********" onChange={(e) => setContraseñaActual(e.target.value)} value={contraseñaActual} required autoComplete='chrome-off' />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="m-3" controlId="nuevaPassword">
                        <Form.Label column sm="4">
                            Contraseña nueva
                        </Form.Label>
                        <Col sm="8">
                            <InputGroup hasValidation>
                                <Form.Control isInvalid={isInvalid} isValid={isValid} name="contraseña-nueva" type={formType} placeholder="**********" onChange={(e) => setContraseñaNueva(e.target.value)} value={contraseñaNueva} required autoComplete='chrome-off' />
                                <OverlayTrigger
                                    key={perfil.nombre}
                                    placement="top"
                                    overlay={
                                        <Tooltip id={`tooltip-${perfil.nombre}`}>
                                            {showPassword ? 'Ocultar' : 'Mostrar'} contraseña
                                        </Tooltip>
                                    }
                                >
                                    <Button variant="outline-secondary" id="button-addon1" tabIndex="-1" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassIcon}
                                    </Button>
                                </OverlayTrigger>
                                {/* <Button variant="outline-primary" id="button-addon1" onClick={() => setShowPassword(!showPassword)}>
                                {showPassIcon}
                            </Button> */}
                                <Form.Control.Feedback type="invalid">
                                    {mensajeError}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="m-3" controlId="">
                        <Form.Label column sm="4">
                            Confirmar contraseña
                        </Form.Label>
                        <Col sm="8">
                            <InputGroup hasValidation>

                                <Form.Control isInvalid={isInvalid} isValid={isValid} name="contraseña-confirmar" type={formType} placeholder="**********" onChange={(e) => setConfirmarContraseña(e.target.value)} value={confirmarContraseña} autoComplete='chrome-off' />
                                <Form.Control.Feedback type="invalid">
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Cerrar
                        </Button>
                        <Button variant="danger" type="submit" onClick={(e) => { submit(e) }} disabled={disabled}>
                            Confirmar
                        </Button>
                    </Modal.Footer>
                </Form>

            </Modal>
        </>
    )
}

export default CambiarContraseña
