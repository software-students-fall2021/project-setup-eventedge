import React from "react"
import {authService} from "../../../lib/services/auth-service"
import {Redirect} from "react-router";

export const PrivateComponent = ({children}) => authService().isUserLoggedIn() ? children : <Redirect to='/login' />;
