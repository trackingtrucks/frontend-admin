import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './Components/Pages/Login';
import Dashboard from './Components/Pages/Dashboard';
import SetToken from './Components/Pages/SetToken';
import AuthContext from './Context/AuthContext'


export default function Router() {
    const { loggedIn } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/token" component={SetToken} />
                {loggedIn === false && (
                    <>
                        <Route exact path="/" component={Login} />
                        <Redirect to="/" />

                    </>
                    //En el futuro agregar una pagina de 404
                )}
                {loggedIn === true && (
                    <>
                        <Route exact path="/" component={Dashboard} />
                        <Redirect to="/" />

                    </>
                    //En el futuro agregar una pagina de 404
                )}
            </Switch>
        </BrowserRouter>
    )
}
