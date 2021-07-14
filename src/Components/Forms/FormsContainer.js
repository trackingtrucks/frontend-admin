import React, { useState, useEffect, useContext } from 'react'
import FormCard from '../Forms/FormCard';
import { Row } from 'react-bootstrap';
import * as Api from '../../Api/index';

function FormsContainer({ AuthContext }) {
    const [Forms, setForms] = useState([]);
    const { get } = useContext(AuthContext);
    const getForms = async () => {
        const { data } = await Api.getForms({ accessToken: get('at') })
        setForms(data.forms);
    }
    useEffect(() => {
        getForms();
        // eslint-disable-next-line
    }, [])
    return (
        <Row xs={1} md={2} className="g-4">
            {Forms.length > 0 && Forms.map((form) => {
                return (
                    <FormCard form={form} key={form._id} api={Api} accessToken={get('at')} getForms={getForms} />)
            })}
        </Row>
    )
}

export default FormsContainer
