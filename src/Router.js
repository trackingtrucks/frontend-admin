import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './Components/Pages/Login';
import Dashboard from './Components/Pages/Dashboard';
import AuthContext from './Context/AuthContext'


export default function Router() {
    const { loggedIn } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Switch>

                {loggedIn === false && (
                    <>
                        <Route exact path="/">
                            <Login />
                        </Route>
                    </>
                )}
                {loggedIn === true && (
                    <>
                        <Route exact path="/">
                            <Dashboard />
                        </Route>
                    </>
                )}

            </Switch>
        </BrowserRouter>
    )
}
