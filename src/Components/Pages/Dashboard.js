import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../Context/AuthContext';
import FormsContainer from '../Forms/FormsContainer';
import AdminContainer from '../Admin/AdminContainer';
import Chart from '../Chart/Chart.js';
import Navbar from '../Navbar';

import { Container, Tabs, Tab } from 'react-bootstrap';
import UserContainer from '../Users/UserContainer';
import SettingsContainers from '../Settings/SettingsContainer';

function Dashboard() {
  const { saveLocalStorage } = useContext(AuthContext);
  // const [key, setKey] = useState('forms');
  const [key, setKey] = useState('forms');

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
              <AdminContainer AuthContext={AuthContext} />
            </div>
          </Tab>
          <Tab eventKey="usuarios" title="Usuarios">
            <div>
              <UserContainer AuthContext={AuthContext} />
            </div>
          </Tab>
          <Tab eventKey="settings" title="Configuracion">
            <div>
              <SettingsContainers AuthContext={AuthContext} />
            </div>
          </Tab>
          <Tab eventKey="chart" title="Chart">
            <div>
              <Chart />
            </div>
          </Tab>
        </Tabs>
      </Container>
    </>
  )
}

export default Dashboard
