import React, { useEffect, useContext, useState } from 'react'
import * as Api from '../../Api'
// import makeToast from '../Functions/Toast';
import { Table } from 'react-bootstrap';
import UserComponent from './UserComponent';

function UserContainer({ AuthContext }) {
    const { get } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        const { data } = await Api.getAllUsers({ accessToken: get('at') });
        setUsers(data.usuarios.sort(function compare(a, b) {
            return a.companyId.localeCompare(b.companyId) || b.rol.localeCompare(a.rol) || a.nombre.localeCompare(b.nombre);
        }))
    }
    useEffect(() => {
        getUsers();
        // eslint-disable-next-line
    }, [])
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>CID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <UserComponent user={user} key={user._id}/>
                ))}
            </tbody>
        </Table>
    )
}

export default UserContainer
