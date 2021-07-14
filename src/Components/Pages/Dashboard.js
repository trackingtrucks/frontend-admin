import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../Context/AuthContext';
import Navbar from '../Navbar';
import * as Api from '../../Api/index';
import FormList from '../Forms/FormsList';

import { Row, Container } from 'react-bootstrap';

function Dashboard() {

  const { get, saveLocalStorage } = useContext(AuthContext);
  const [Forms, setForms] = useState([]);
  const getForms = async () => {
    const { data } = await Api.getForms({ accessToken: get('at') })
    setForms(data.forms);
  }
  useEffect(() => {
    saveLocalStorage();
    getForms();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Navbar />
      <Container>
        <Row xs={1} md={2} className="g-4">
          {Forms.length > 0 && Forms.map((form) => {
            console.log(form);
            return (
              <FormList form={form} key={form._id} api={Api} accessToken={get('at')} getForms={getForms} />)
          })}
        </Row>
      </Container>
    </>
  )
}

export default Dashboard
