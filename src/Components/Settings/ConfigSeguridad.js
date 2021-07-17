import React from 'react'
import CerrarSesionAllDevices from './Seguridad/CerrarSesionAllDevices';
import {Form, Row} from 'react-bootstrap'
function ConfigSeguridad({AuthContext, perfil}) {
    return (
        <div>
            Tienes <b>{perfil.sesionesActivas}</b> sesiones abiertas
            <Form.Group as={Row} className="settings-item-logout-all" controlId="logout-all">
                <CerrarSesionAllDevices AuthContext={AuthContext} />
            </Form.Group>
        </div>
    )
}

export default ConfigSeguridad
