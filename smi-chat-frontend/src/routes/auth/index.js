import React from "react";
import {Button} from "@material-ui/core";
import {useHistory, useLocation} from "react-router-dom";
import {useAuth} from "../../stores/auth-store";

function Auth() {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    let { from } = location.state || { from: { pathname: "/" } };
    let login = () => {
        auth.signin(() => {
            history.replace(from);
        });
    };

    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <Button onClick={login}>Log in</Button>
        </div>
    );
}

export default Auth;
