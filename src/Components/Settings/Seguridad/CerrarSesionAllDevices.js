import React, { useState, useContext } from 'react'
import { Button, Form, Row, Col, Modal } from 'react-bootstrap'
import * as Api from '../../../Api'
import makeToast from '../../Functions/Toast';
function CerrarSesionAllDevices({ AuthContext }) {
    const { get, clearLocalStorage } = useContext(AuthContext)
    const [show, setShow] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [password, setPassword] = useState('')
    const handleClose = () => { setShow(false); setDisabled(false); setPassword('') }
    const handleShow = () => { setShow(true); }
    const submitForm = async (e) => {
        e.preventDefault();
        setDisabled(true);
        try {
            await Api.cerrarTodasSesiones({ accessToken: get('at'), password });
            setDisabled(false);
            clearLocalStorage();
            window.location.reload();

        } catch (error) {
            setDisabled(false);
            makeToast(6000, "error", error.response.data.message)
        }

    }
    return (
        <>
            <Button variant="danger" onClick={() => handleShow()}>Cerrar sesión en todos los dispositivos</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton closeLabel="">
                    <Modal.Title>Cerrar sesion en todos los dispositivos</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitForm}>
                    <Form.Group as={Row} className="m-3" controlId="password">
                        <Form.Label column sm="4">
                            Confirma tu contraseña
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="password" placeholder="**********" onChange={(e) => setPassword(e.target.value)} value={password} required />
                        </Col>
                    </Form.Group>
                </Form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="danger" type="submit" onClick={(e) => { submitForm(e) }} disabled={disabled}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CerrarSesionAllDevices