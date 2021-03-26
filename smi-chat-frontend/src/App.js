import React from "react";
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";
import AuthPage from "./routes/auth";
import HomePage from "./routes";
import ChatRoom from "./routes/chat-room";
import {ProvideAuth, useAuth} from "./hooks/use-auth";
import {AppBar, makeStyles, Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import logo from "./favicon.ico";
import {useHistory} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";


const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));


export default function App() {
    const classes = useStyles();

    return (
        <ProvideAuth>
            <Router>
                <ToolBar/>

                <div>
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

                        <Redirect to="/"/>
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

function ToolBar() {
    const classes = useStyles();
    const auth = useAuth();

    return <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
            <Avatar component={Link} to={'/'} width={50} height={50} src={logo} alt="Logo"/>
            <Typography component={Link} to={'/'} variant="h6" color="inherit" className={classes.toolbarTitle}
                        style={{textDecoration: 'none'}}>
                SMI Chat
            </Typography>

            <nav>
                <Link to="/" className={classes.link}>Home</Link>
                <Link to="/chat-room" className={classes.link}>How it works</Link>
            </nav>

            {auth.user ? <LogoutButton /> : <LoginButton />}

        </Toolbar>
    </AppBar>;
}

function LoginButton() {
    const classes = useStyles();

    return <Button component={Link} to={'/auth'} color="primary" variant="outlined" className={classes.link}>
        Log In
    </Button>
}

function LogoutButton() {
    const classes = useStyles();
    const auth = useAuth();

    return <Button component={Link} to={'/auth'} color="primary" variant="outlined" className={classes.link}
                   onClick={() => {
                       auth.signout(() => useHistory.push("/"));
                   }}>
        Log Out
    </Button>
}
