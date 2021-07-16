import React, { useContext } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import '../../Styles/settings.css'
import CerrarSesionAllDevices from './CerrarSesionAllDevices';
function SettingsContainers({ AuthContext }) {
    const { perfil } = useContext(AuthContext);
    return (
        <Form className="settings-container ">
            <Form.Group as={Row} className="mb-3 settings-item-email" controlId="email">
                <Form.Label column sm="2" style={{ verticalAlign: "middle" }}>
                    Email
                </Form.Label>
                <Col sm="10" className="settings-item">
                    <Form.Control plaintext readOnly defaultValue={perfil.email} />
                </Col>
            </Form.Group>
            <hr />
            <Form.Group as={Row} className="settings-item-logout-all" controlId="logout-all">
                <CerrarSesionAllDevices AuthContext={AuthContext}/>
            </Form.Group>
        </Form>
    )
}

export default SettingsContainers
