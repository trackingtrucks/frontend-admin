import React, { useState, useContext } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import makeToast from '../Functions/Toast'
import * as Api from '../../Api'
function UserDelete({ AuthContext, users, getUsers }) {
    const { get } = useContext(AuthContext);
    const [id, setId] = useState('');
    const submit = async (e) => {
        e.preventDefault();
        const está = users.filter((user) => user._id === id).length;
        if (está === 0) { return makeToast(5000, "error", "Usuario no encontrado") }
        const { data } = await Api.eliminarAdmin({ accessToken: get('at'), id });
        getUsers();
        setId("");        
        makeToast(6000, "info", data.message)
    }
    return (
        <Form onSubmit={submit}>
            <h3>Eliminar usuario</h3>
            <Form.Group as={Row} className="mb-3" controlId="eliminarUsuario">
                <Form.Label column sm="2">
                    ID de usuario
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Identificador unico de cuenta ('60a976a00aeb200015c515eb')" value={id} onChange={(e) => setId(e.target.value)} />
                </Col>
            </Form.Group>
        </Form>
    )
}

export default UserDelete
