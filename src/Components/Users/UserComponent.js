import React from 'react'

function UserComponent({user}) {
    return (
        <tr onClick={()=>{console.log(user)}} style={{cursor: "pointer"}}>
            <td>{user.companyId}</td>
            <td>{user.nombre} {user.apellido}</td>
            <td>{user.email}</td>
            <td>{user.rol}</td>
        </tr>
    )
}

export default UserComponent
