import './index.css';

import { useState, useEffect } from 'react';

import Logo from '../../Logo';
import Label from '../../UI/Label';
import Button from '../../UI/Button';
import FavoritePet from '../FavoritePet';
import { SocketConnection } from '../../../SocketConnection';
import Alerts from '../../Alerts';


const ProfileUser = ({ auth }: any) => {
    const [favorites, setFavorites] = useState([]);

    useEffect((): any => {
        SocketConnection.emit('getFavorites', { user: auth._id })

        SocketConnection.on('favorites', (favorites) => {
            setFavorites(favorites);
        });

        return () => SocketConnection.disconnect();
    }, [auth._id]);

    const handleClick = () => {
        sessionStorage.removeItem('auth');
        window.location.reload();
        Alerts.info('Session closed.');
    }

    return (
        <div className="profile-user">
            <div className="profile-user-data">
                <Logo />
                <p>{auth.username}</p>
                <p>{auth.email}</p>

                <Button text="Log out"
                    type="button"
                    classText="danger"
                    click={handleClick}
                    style={{ width: '100px', marginTop: '10px' }} />
            </div>
            <div className="profile-favorite-pets">
                {favorites.length > 0 ?
                    <>
                        <Label text="Favorite pets" />
                        {favorites.map((favorite: any, index: number) => (
                            <FavoritePet
                                key={index}
                                petname={favorite.petname}
                                age={favorite.age}
                                type={favorite.type} breed={favorite.breed} />
                        ))}
                    </>
                    : <Label text="There not favorites yet!" />
                }
            </div>
        </div>
    );
}

export default ProfileUser;