import React from "react";
import {BrowserRouter as Router, Link, Redirect, Route, Switch, useHistory} from "react-router-dom";
import AuthPage from "./routes/auth";
import HomePage from "./routes";
import ChatRoom from "./routes/chat-room";
import {ProvideAuth, useAuth} from "./hooks/use-auth";
import {AppBar, makeStyles, Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import logo from "./favicon.ico";
import Avatar from "@material-ui/core/Avatar";
import InfoPage from "./routes/info";
import Copyright from "./components/copyright/copyright";
import Box from "@material-ui/core/Box";


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
    logo: {
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
    }
}));


export default function App() {
    let auth = useAuth();

    return (
        <ProvideAuth>
            <Router>
                <ToolBar/>

                <div>
                    <Switch>

                        <Route exact path="/">
                            <MainApp/>
                        </Route>

                        <Route path="/auth">
                            <AuthPage/>
                        </Route>

                        <Route path="/how-it-works">
                            <InfoPage/>
                        </Route>

                        <PrivateRoute path="/chat-room">
                            <MainApp/>
                        </PrivateRoute>

                        <Redirect to="/"/>
                    </Switch>
                </div>

                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Router>
        </ProvideAuth>
    );
}


function MainApp() {
    const auth = useAuth();

    return auth && auth.user ? <ChatRoom/> : <HomePage/>
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
            <Avatar component={Link} to={'/'} width={100} height={100} src={logo} alt="Logo"/>
            <Typography variant="h6" color="inherit" className={classes.toolbarTitle}>
                SMI Chat
            </Typography>

            {!auth.user &&
            <nav>
                <Link to="/" className={classes.link}>Home</Link>
                <Link to="/how-it-works" className={classes.link}>How it works</Link>
            </nav>
            }

            {auth && auth.user ? <LogoutButton/> : <LoginButton/>}

        </Toolbar>
    </AppBar>
}

function LoginButton() {
    const classes = useStyles();

    return (
        <Button component={Link} to={'/auth'} color="primary" variant="outlined" className={classes.link}>
            Log In
        </Button>
    )
}

function LogoutButton() {
    const classes = useStyles();
    const auth = useAuth();
    const history = useHistory();

    return <Button component={Link} to={'/auth'} color="primary" variant="outlined" className={classes.link}
                   onClick={() => {
                       auth.signout(() => history.push("/"));
                   }}>
        Log Out
    </Button>
}
