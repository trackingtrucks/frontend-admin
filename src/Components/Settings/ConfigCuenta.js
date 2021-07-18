import React from 'react'
import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import CambiarContraseña from './Cuenta/CambiarContraseña'
function SettingsCuenta({ perfil, AuthContext }) {
    return (
        <Form>
            <Form.Group as={Row} className="mb-3 settings-item-email" controlId="email">
                <Form.Label column sm="12" lg="2" style={{ verticalAlign: "middle" }}>
                    Email
                </Form.Label>
                <Col sm="12" lg="6" className="settings-item">
                    <Form.Control plaintext readOnly defaultValue={perfil.email} className="not-allowed" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 settings-item-password" controlId="password">
                <Form.Label column sm="12" lg="2" style={{ verticalAlign: "middle" }}>
                    Contraseña
                </Form.Label>
                <Col sm="12" lg="6" className="settings-item">
                    <InputGroup className="settings-item">
                        <FormControl defaultValue={"jaja que miras"} readOnly={true} type="password" />
                        <CambiarContraseña AuthContext={AuthContext} perfil={perfil} />
                    </InputGroup>
                </Col>
            </Form.Group>
        </Form>
    )
}

export default SettingsCuenta
