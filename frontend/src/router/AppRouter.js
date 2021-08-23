import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginScreen } from "../componentes/auth/LoginScreen";
import { CalendarScreen } from "../componentes/calendar/CalendarScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {

    // verificamos si esta logueado
    const dispatch = useDispatch();
    const {checking, uid} = useSelector(state => state.auth);
    console.log(checking);
    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if (checking) {
        return (<h5>Espere...</h5>)
    }
    // al colocarle los dos !! a la variable, hacemos que si la variable uid tiene dato tome un true, sino un false
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute exact path="/login" component={LoginScreen} isAuthenticated={!!uid}  />
                    <PrivateRoute exact path="/" component={CalendarScreen} isAuthenticated={!!uid} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
