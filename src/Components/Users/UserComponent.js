import React, { } from 'react';
import { Dropdown, Tooltip, OverlayTrigger } from 'react-bootstrap';
import * as Api from '../../Api'
import makeToast from '../Functions/Toast';
function UserComponent({ user }) {
    const CustomToggle = React.forwardRef(({ onClick }, ref) => (
        <span ref={ref} onClick={(e) => { e.preventDefault(); onClick(e); }}>
            <OverlayTrigger key={user._id} placement="top"
                overlay={
                    <Tooltip id={`tooltip-${user._id}`}>
                        Ver opciones de cuenta
                    </Tooltip>
                }>
                <svg style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
            </OverlayTrigger>
        </span>
    ));
    const restablecerContraseña = async () => {
        try {
            await Api.restablecerContraseña({ email: user.email });            
        } catch (error) {
            makeToast(6000, "error", error.response.data.message || error.message)
        }
    }

    return (
        <tr >
            <td>{user.companyId}</td>
            <td>{user.nombre} {user.apellido}</td>
            <td>{user.email}</td>
            <td>{user.rol}</td>
            <td className="user-actions">
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="1" onClick={restablecerContraseña}>Restablecer contraseña</Dropdown.Item>
                        <Dropdown.Item eventKey="2" onClick={() => { console.log(user._id) }}>Obtener ID</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="3" style={{ backgroundColor: "#830000", color: "#ffffff" }}>Borrar cuenta</Dropdown.Item>
                        {/* <Dropdown.Item eventKey="4">Red-Orange</Dropdown.Item> */}
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    )
}

export default UserComponent
