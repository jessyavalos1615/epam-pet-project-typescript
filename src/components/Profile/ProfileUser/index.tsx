import './index.css';

import { useState, useEffect } from 'react';

import Logo from '../../Logo';
import FavoritePet from '../FavoritePet';
import Label from '../../UI/Label';
import { SocketConnection } from '../../../SocketConnection';


const ProfileUser = ({ auth }: any) => {
    const [favorites, setFavorites] = useState([]);

    useEffect((): any => {
        SocketConnection.emit('getFavorites', { user: auth._id })

        SocketConnection.on('favorites', (favorites) => {
            setFavorites(favorites);
        });

        return () => SocketConnection.disconnect();
    }, [auth._id]);

    return (
        <div className="profile-user">
            <div className="profile-user-data">
                <Logo />
                <p>{auth.username}</p>
                <p>{auth.email}</p>
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