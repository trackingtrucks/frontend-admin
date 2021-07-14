import React, { useEffect } from 'react'
import { Card, Button, Col } from 'react-bootstrap'
import moment from 'moment'
function UserCard({ user, AuthContext, getUsers }) {

    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <Col style={{ marginBottom: '12px', marginTop: '12px' }}>
            <Card>
                <Card.Header>{user.email}</Card.Header>
                <Card.Body>
                    <Card.Title>{user.nombre} {user.apellido}</Card.Title>
                    {/* <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text> */}
                    <Card.Text>
                        <small className="text-muted">{moment(user.createdAt).fromNow()}</small>
                    </Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">{user._id}</small>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default UserCard
