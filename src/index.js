import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import { AuthContextProvider } from "./Context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/index.css'
import './Styles/login.css'
ReactDOM.render(
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>,
  document.getElementById('root')
);
