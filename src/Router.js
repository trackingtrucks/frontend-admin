import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
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
                    {/* <SetToken />
                </Route> */}
                {loggedIn === false && (
                    <Route exact path="/" component={Login}/>
                    //     <Login />
                    // </Route>
                )}
                {loggedIn === true && (
                    <Route exact path="/" component={Dashboard}/>
                    //     <Dashboard />
                    // </Route>
                )}
            </Switch>
        </BrowserRouter>
    )
}
