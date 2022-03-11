import { useState } from 'react';

export default function useAuth() {
    const getAuth = () => {
        const authString = sessionStorage.getItem('auth');
        const userAuth = JSON.parse(authString ? authString : 'null');
        return userAuth;
    };

    const [auth, setAuth] = useState(getAuth());

    const saveAuth = (userAuth: { _id: string; username: string; email: string }) => {
        sessionStorage.setItem('auth', JSON.stringify(userAuth));
        setAuth(userAuth);
    };

    return {
        setAuth: saveAuth,
        auth
    }
}