import React, { useState } from 'react'
// import makeToast from '../Functions/Toast'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap'
function FormsList({ form, accessToken, api, getForms }) {
    const [show, setShow] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [companyId, setCompanyId] = useState('');

    const handleClose = () => { setShow(false); }
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
            console.log(error.response.data.message || error.message);
        }
    }
    const borrar = async () => {
        setDisabled(true);
        try {
            await api.eliminarFormulario({id: form._id, accessToken});
            await getForms();
            setDisabled(false);
            handleClose();
        } catch (error) {
            setDisabled(false)
            console.log(error.response.data.message || error.message);
        }
    }
    return (
        <div>
            <p>{form._id}</p>
            <p>{form.email}</p>
            <p>{form.nombreEmpresa}</p>
            <Button variant="primary" onClick={handleShow}>Aceptar</Button>
            <hr />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
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
                    <Button variant="danger" onClick={borrar} disabled={disabled}>
                        Eliminar
                    </Button>
                    <Button variant="primary" onClick={submit} disabled={disabled}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default FormsList
