import create from 'zustand'
import React, {createContext, useContext, useState} from "react";

const useAuthStore = create(set => ({
    isAuthenticated: true,
    signin: (cb) => set( state => ({
        isAuthenticated: true
    })),
    signout: (cb) => set( state => ({
        isAuthenticated: false
    })),
}))

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
export const authContext = createContext();

export function useAuth() {
    return useContext(authContext);
}

// TODO: refactor this, state handling seems clunky
export function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signIn = useAuthStore(state => state.signin)
    const signin = cb => {
        return signIn(() => {
            setUser("user");
            cb();
        });
    };

    const signOut = useAuthStore(state => state.signout)
    const signout = cb => {
        return signOut(() => {
            setUser(null);
            cb();
        });
    };

    return {
        user,
        signin,
        signout
    };
}

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}
