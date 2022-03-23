import { useState } from 'react';
import { AuthTypes } from '../Interfaces/Auth/Auth';

export default function useAuth() {
    const getAuth = () => {
        const authString = sessionStorage.getItem('auth');
        const userAuth = JSON.parse(authString ? authString : 'null');
        return userAuth;
    };

    const [auth, setAuth] = useState(getAuth());

    const saveAuth = (userAuth: AuthTypes) => {
        sessionStorage.setItem('auth', JSON.stringify(userAuth));
        setAuth(userAuth);
    };

    return {
        setAuth: saveAuth,
        auth
    }
}