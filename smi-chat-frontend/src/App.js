import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import AuthButton from "./components/auth/auth-button";
import AuthPage from "./routes/auth";
import HomePage from "./routes";
import ChatRoom from "./routes/chat-room";
import {ProvideAuth, useAuth} from "./stores/auth-store";

export default function AuthExample() {
    return (
        <ProvideAuth>
            <Router>
                <div>
                    {/*<AuthButton/>*/}

                    <Switch>

                        <Route exact path="/">
                            <HomePage/>
                        </Route>

                        <Route path="/auth">
                            <AuthPage/>
                        </Route>

                        <PrivateRoute path="/chat-room">
                            <MainApp/>
                        </PrivateRoute>

                        <Redirect to="/" />
                    </Switch>
                </div>
            </Router>
        </ProvideAuth>
    );
}


function MainApp() {
    return <ChatRoom/>
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({children, ...rest}) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({location}) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/auth",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}
