import React, { useContext, useState } from 'react'
import { Nav, Navbar, Button, Form, Col, Row, Modal } from 'react-bootstrap'
import AuthContext from '../Context/AuthContext';
import makeToast from './Functions/Toast'
import * as Api from '../Api/index'
function NavbarComponent() {
    const [showRegistrar, setShowRegistrar] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [email, setEmail] = useState('');
    const { get, clearLocalStorage } = useContext(AuthContext);
    const cerrarSesion = async () => {
        await Api.cerrarSesion({ accessToken: get('at'), refreshToken: get('rt') })
        clearLocalStorage();
        window.location.reload();
    }
    const enviarAdmin = async (e) => {
        e.preventDefault();
        if (disabled) { return };
        if (email === "") return makeToast(5000, "error", "Se debe especificar un email!");
        try {
            setDisabled(true);
            await Api.agregarAdmin({ email, accessToken: get('at') });
            setDisabled(false);
            hideRegistrar();
        } catch (error) {
            setDisabled(false);
            makeToast(6000, "error", error.response.data.message || error.message)
            console.error(error?.response?.data?.message || error.message);
        }
    }
    const hideRegistrar = () => {
        setDisabled(false);
        setShowRegistrar(false);
    }

    return (
        <>
            <Navbar bg="light" variant="light" expand="lg" className="p-3">
                <Navbar.Brand href="/">Tracking Trucks</Navbar.Brand>
                <Nav className="mr-auto">
                    {/* <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                </Nav>
                <Nav>
                    <Button variant="outline-primary" style={{ marginRight: '10px', marginBottom: '5px' }} onClick={() => cerrarSesion()}>Cerrar sesión</Button>
                    <Button variant="outline-primary" style={{ marginBottom: '5px' }} onClick={() => setShowRegistrar(true)}>Añadir Admin</Button>
                </Nav>
            </Navbar>
            <Modal show={showRegistrar} onHide={hideRegistrar}>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir administrador al sistema</Modal.Title>
                </Modal.Header>
                {/* <Modal.Body>Ingresa un companyId para esta empresa</Modal.Body> */}
                <Form onSubmit={enviarAdmin}>
                    <Form.Group as={Row} className="m-3" controlId="email">
                        <Form.Label column sm="4">
                            Ingresa un email:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </Col>
                    </Form.Group>
                </Form>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={enviarAdmin} disabled={disabled}>
                        Enviar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default NavbarComponent
