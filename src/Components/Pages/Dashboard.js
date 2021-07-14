import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../Context/AuthContext';
import Navbar from '../Navbar';
import * as Api from '../../Api/index'
function Dashboard() {
  
  const { get, saveLocalStorage } = useContext(AuthContext);
  const [Forms, setForms] = useState([]);
  const getForms = async () => {
    const { data } = await Api.getForms({get})
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
