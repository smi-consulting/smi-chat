/**
 * Used https://usehooks.com/useAuth/ for reference
 * TODO: USE JWT FOR AUTH
 */
import React, {createContext, useContext, useEffect, useState} from "react";

const authContext = createContext();

// Provider component that wraps your app and makes auth object available to any child component that calls useAuth().
export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object  and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(localStorage.getItem('token'));

    // TODO: implement
    const signin = (email, password) => {
        localStorage.setItem('token', Math.random().toString());
        setUser("MockUser");
        return "MockUser";
    };

    // TODO: implement
    const signup = (email, password) => {
        return true;
    };

    // TODO: implement
    const signout = () => {
        setUser(null);
        localStorage.removeItem('token');
        return false;
    };

    // TODO: implement
    const sendPasswordResetEmail = email => {
        return true;
    };

    // TODO: implement
    const confirmPasswordReset = (code, password) => {
        return true;
    };

    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any  component that utilizes
    // this hook to re-render with the latest auth object.
    useEffect(() => {
        return () => (user => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        });
    }, []);



    // Return the user object and auth methods
    return {
        user,
        signin,
        signup,
        signout,
        sendPasswordResetEmail,
        confirmPasswordReset
    };
}
