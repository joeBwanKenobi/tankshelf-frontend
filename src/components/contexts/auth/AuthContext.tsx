import { createContext } from 'react';

const AuthContext = createContext({
    isLoggedIn: false,
    cookie: null,
    login: () => {},
    logout: () => {}
});

export default AuthContext;