import './index.css';

import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

const Navigation = () => {

    const [classText, setClassText] = useState('home');
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/user') {
            setClassText('account')
        }
    }, [location.pathname])

    return (
        <nav className="nav">
            <NavLink to="/"
                className="nav-item"
                onClick={() => setClassText('home')}>
                Breeds
            </NavLink>
            <NavLink to="/user"
                className='nav-item'
                onClick={() => setClassText('account')}>
                Account
            </NavLink>
            <div className={`animation start-${classText}`}></div>
        </nav>
    )
};

export default Navigation;