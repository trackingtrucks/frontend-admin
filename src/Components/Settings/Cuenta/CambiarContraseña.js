import React, {useState} from 'react'
import {Modal, Form, Row, Col, Button} from 'react-bootstrap'
function CambiarContraseña({ perfil, mostrar, setMostrar }) {
    const [contraseñaActual, setContraseñaActual] = useState('');
    const [contraseñaNueva, setContraseñaNueva] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [disabled, setDisabled] = useState(false);
    const submit = (e) => {
        e.preventDefault();
        setDisabled(true);
        setTimeout(() => {
            setDisabled(false);
        }, 1000);
    }
    return (
        <Modal show={mostrar} onHide={()=>setMostrar(false)}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Cambiar contraseña</Modal.Title>
            </Modal.Header>
            <Form onSubmit={submit} autoComplete="chrome-off">
                <Form.Group as={Row} className="m-3" controlId="oldPassword">
                    <Form.Label column sm="4">
                        Contraseña actual
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control name="contraseña-vieja" type="password" placeholder="**********" onChange={(e) => setContraseñaActual(e.target.value)} value={contraseñaActual} required autoComplete='chrome-off'/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="m-3" controlId="nuevaPassword">
                    <Form.Label column sm="4">
                        Contraseña nueva
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control name="contraseña-nueva" type="password" placeholder="**********" onChange={(e) => setContraseñaNueva(e.target.value)} value={contraseñaNueva} required autoComplete='chrome-off'/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="m-3" controlId="">
                    <Form.Label column sm="4">
                        Confirmar contraseña
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control name="contraseña-confirmar" type="password" placeholder="**********" onChange={(e) => setConfirmarContraseña(e.target.value)} value={confirmarContraseña} autoComplete='chrome-off'/>
                    </Col>
                </Form.Group>
            </Form>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>setMostrar(false)}>
                    Cerrar
                </Button>
                <Button variant="danger" type="submit" onClick={(e) => { submit(e) }} disabled={disabled}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CambiarContraseña
