import React, { useState, useContext } from 'react'
import { Card, Button, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import * as Api from '../../Api';

function TokenCard({ token, AuthContext, getTokens }) {
    const { get } = useContext(AuthContext);
    const [disabled, setDisabled] = useState(false);
    const eliminar = async () => {
        setDisabled(true);
        await Api.eliminarToken({ accessToken: get('at'), id: token._id });
        await getTokens();
        setDisabled(false);
    }
    return (
        <Col>
            <Card>
                <OverlayTrigger
                    key={token._id}
                    placement="top"
                    overlay={
                        <Tooltip id={`tooltip-${token._id}`}>
                            Enviado a <strong>{token.email}</strong>
                        </Tooltip>
                    }
                >
                    <Card.Header>{token._id}</Card.Header>
                </OverlayTrigger>
                <Button variant="danger" disabled={disabled} onClick={eliminar}>Eliminar</Button>
            </Card>
        </Col>
    )
}

export default TokenCard
