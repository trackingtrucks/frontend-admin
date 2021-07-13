import React, {useContext} from 'react'
import { Nav, Navbar, Button } from 'react-bootstrap'
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
import {Config} from '../Config';

function NavbarComponent() {
    const { accessToken, refreshToken, clearLocalStorage } = useContext(AuthContext);
    const cerrarSesion = async() => {
        await axios.delete(Config.API_URL + '/auth/token', {
            headers: {
                "x-refresh-token": refreshToken,
                "x-access-token": accessToken
            }
        })
        clearLocalStorage();
        window.location.reload();
    }
    return (
            <Navbar bg="light" variant="light" expand="lg" className="p-3">
                <Navbar.Brand href="/">Tracking Trucks</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                    <Button variant="outline-primary" onClick={()=>cerrarSesion()}>Cerrar sesión</Button>
                </Nav>
            </Navbar>
    )
}

export default NavbarComponent
