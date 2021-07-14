import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../Context/AuthContext';
import Navbar from '../Navbar';
import * as Api from '../../Api/index';
import FormList from '../Forms/FormsList';

import { Accordion } from 'react-bootstrap';

function Dashboard() {

  const { get, saveLocalStorage } = useContext(AuthContext);
  const [Forms, setForms] = useState([]);
  const getForms = async () => {
    const { data } = await Api.getForms({ accessToken: get('at') })
    console.log(data.forms);
    setForms(data.forms);

  }
  useEffect(() => {
    saveLocalStorage();
    getForms();
    // eslint-disable-next-line
  }, []);
  console.log(Forms);
  return (
    <>
      <Navbar />
      {/* <Accordion> */}
        {Forms.length > 0 && Forms.map((form) => (
          <FormList form={form} key={form._id} />)
        )}
      {/* </Accordion> */}
    </>
  )
}

export default Dashboard
