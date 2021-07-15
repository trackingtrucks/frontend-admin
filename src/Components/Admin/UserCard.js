import React from 'react'
import { Card, Col, Tooltip, OverlayTrigger } from 'react-bootstrap'
import moment from 'moment'
import 'moment/locale/es'
function UserCard({ user }) {
    return (
        <Col style={{ marginBottom: '12px', marginTop: '12px' }}>
            <Card>
                <Card.Header>{user.email}</Card.Header>
                <Card.Body>
                    <Card.Title>{user.nombre} {user.apellido}</Card.Title>
                    <Card.Text>
                        <OverlayTrigger key={user._id} placement="bottom" 
                            overlay={
                                <Tooltip id={`tooltip-${user._id}` }>
                                    {/* {moment(user.createdAt).format('dddd, D MMMM YYYY, h:mm:ss a')} / */}
                                    {moment(user.createdAt).format('LLLL')}
                                </Tooltip>
                            }>
                            <small className="text-muted">{moment(user.createdAt).fromNow()}</small>
                        </OverlayTrigger>
                    </Card.Text>
                    {/* <Card.Text>
                        <small className="text-muted">{moment(user.createdAt).fromNow()}</small>
                    </Card.Text> */}
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">{user._id}</small>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default UserCard
