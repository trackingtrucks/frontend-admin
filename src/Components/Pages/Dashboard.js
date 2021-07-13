import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../Context/AuthContext'
import Navbar from '../Navbar'
import { Config } from '../../Config'
import axios from 'axios';
function Dashboard() {
  const { accessToken, saveLocalStorage } = useContext(AuthContext);
  const [Forms, setForms] = useState([]);
  const getForms = async () => {
    const { data } = await axios.get(Config.API_URL + "/admin/formulario/all", {
      headers: {
        'x-access-token': accessToken
      }
    })
    console.log(data);
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
      <div>
        {Forms.map((form) => {
          return (
            <div key={form._id}>
              <p>{form.nombreEmpresa}</p>
              <p>{form.email}</p>
              <p>{form._id}</p>
              <hr />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Dashboard
