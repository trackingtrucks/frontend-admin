import React, { useContext } from 'react'
import { Row, Col, Container, Tab, Nav, } from 'react-bootstrap'
import '../../Styles/settings.css'
import ConfigCuenta from './ConfigCuenta'
import ConfigSeguridad from './ConfigSeguridad'
function SettingsContainers({ AuthContext }) {
    const { perfil } = useContext(AuthContext);
    return (
        <Container className="settings-container">

            <Tab.Container id="left-tabs-example" defaultActiveKey="account">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item >
                                <Nav.Link eventKey="account">Cuenta</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="security">Seguridad</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="account">
                                <ConfigCuenta perfil={perfil} AuthContext={AuthContext} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="security">
                                <ConfigSeguridad perfil={perfil} AuthContext={AuthContext}/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
        // </Form>
    )
}

export default SettingsContainers
