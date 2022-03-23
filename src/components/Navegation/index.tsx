import './index.css';

import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

import menuIcon from '../../icons/menu.svg';
import Button from '../UI/Button';

const Navigation = () => {

    const [classText, setClassText] = useState('home');
    const [toggleMenu, setToggleMenu] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/user')
            setClassText('account')

        window.addEventListener('resize', changeWidth);

        return () => {
            window.removeEventListener('resize', changeWidth)
        }
    }, [location.pathname]);

    const changeWidth = () => {
        setScreenWidth(window.innerWidth);
    }

    const toggleNav = () => {
        setToggleMenu(!toggleMenu);
    }

    return (
        <nav className="nav">
            <Button type='button'
                classText='secondary nav-menu'
                text=''
                click={toggleNav}
                style={{ boxSizing: 'border-box', padding: '10px', height: '50px', width: '50px' }}>
                <img style={{ width: '30px', height: '30px' }} src={menuIcon} alt='menuIcon' />
            </Button>
            {(toggleMenu || screenWidth > 600) && (
                <>
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
                </>
            )}
            <div className={`animation start-${classText}`}></div>
        </nav>
    )
};

export default Navigation;