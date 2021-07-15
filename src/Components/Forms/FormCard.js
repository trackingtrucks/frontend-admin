import React, { useState } from 'react'
import makeToast from '../Functions/Toast'
import { Button, Modal, Form, Row, Col, Card } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/es'
function FormsList({ form, accessToken, api, getForms }) {
    const [show, setShow] = useState(false);
    const [showBorrar, setShowBorrar] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [companyId, setCompanyId] = useState('');

    const handleClose = () => { setShow(false); setShowBorrar(false); }
    const handleShow = () => { setShow(true); }
    const submit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        try {
            await api.aceptarFormulario({ companyId, id: form._id, accessToken })
            await getForms();
            setDisabled(false)
            handleClose();
        } catch (error) {
            setDisabled(false)
            makeToast(6000, "error", error.response.data.message || error.message)
            console.error(error.response.data.message || error.message);
        }
    }
    const borrar = async () => {
        setDisabled(true);
        try {
            await api.eliminarFormulario({ id: form._id, accessToken });
            await getForms();
            setDisabled(false);
            handleClose();
        } catch (error) {
            setDisabled(false)
            makeToast(6000, "error", error.response.data.message || error.message)
            console.error(error.response.data.message || error.message);
        }
    }
    const confirmBorrar = () => {
        setShowBorrar(true);
    }
    return (
        <div>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>{form.nombreEmpresa}</Card.Title>
                        <Card.Text>
                            {form.descripcionUso}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <div>
                            <small className="text-muted">Enviado {moment(form.enviado).fromNow()}</small>
                        </div>
                        <div>
                            <small className="text-muted">Enviado por: {form.email}</small>
                        </div>
                        <div>
                            <Button variant="primary" style={{ marginRight: '15px', marginTop: '5px', marginBottom: '5px' }} onClick={handleShow}>Aceptar</Button>
                            <Button variant="danger" style={{ marginRight: '15px', marginTop: '5px', marginBottom: '5px' }} onClick={confirmBorrar}>Eliminar</Button>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton closeLabel="">
                    <Modal.Title>Aceptar formulario de {form.nombreEmpresa}?</Modal.Title>
                </Modal.Header>
                {/* <Modal.Body>Ingresa un companyId para esta empresa</Modal.Body> */}
                <Form onSubmit={submit}>
                    <Form.Group as={Row} className="m-3" controlId="companyId">
                        <Form.Label column sm="8">
                            Ingresa un companyId para esta empresa
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" placeholder="companyId" onChange={(e) => setCompanyId(e.target.value)} value={companyId} />
                        </Col>
                    </Form.Group>
                </Form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="danger" onClick={() => { handleClose(); confirmBorrar(); }} disabled={disabled}>
                        Eliminar
                    </Button>
                    <Button variant="primary" onClick={submit} disabled={disabled}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showBorrar} onHide={handleClose}>
                <Modal.Header closeButton closeLabel="">
                    <Modal.Title>Eliminar formulario de {form.nombreEmpresa}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Esta accion es irreversible y la persona deberá contactarnos devuelta!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="danger" onClick={borrar}>
                        Si
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default FormsList
