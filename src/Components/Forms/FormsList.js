import React from 'react'

function FormsList({form}) {
    return (
        <div>
            <p>{form._id}</p>
            <p>{form.email}</p>
            <p>{form.nombreEmpresa}</p>
            <hr/>
        </div>
    )
}

export default FormsList
