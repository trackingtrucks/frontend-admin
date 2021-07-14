import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../Context/AuthContext';
import FormsContainer from '../Forms/FormsContainer';
import AdminContainer from '../Admin/AdminContainer';
import Navbar from '../Navbar';

import { Container, Tabs, Tab } from 'react-bootstrap';

function Dashboard() {
  const { saveLocalStorage } = useContext(AuthContext);
  // const [key, setKey] = useState('forms');
  const [key, setKey] = useState('admins');

  useEffect(() => {
    saveLocalStorage();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Navbar />
      <Container>
        <Tabs id="tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
          <Tab eventKey="forms" title="Forms de registro">
            <FormsContainer AuthContext={AuthContext} />
          </Tab>
          <Tab eventKey="admins" title="Cuentas de Administrador">
            <div>
              <AdminContainer AuthContext={AuthContext}/>
            </div>
          </Tab>
          <Tab eventKey="usuarios" title="Usuarios">
            <div>
              a
            </div>
          </Tab>
          <Tab eventKey="settings" title="Configuracion">
            <div>
              wa
            </div>
          </Tab>
        </Tabs>
      </Container>
    </>
  )
}

export default Dashboard
