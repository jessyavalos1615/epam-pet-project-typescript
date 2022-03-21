import './index.css';

import axios from 'axios';
import { useEffect, useState } from 'react';

import editIcon from '../../../../icons/edit.svg';
import deleteIcon from '../../../../icons/delete.svg';
import dogIcon from '../../../../icons/pets/dog-icon.svg';
import catIcon from '../../../../icons/pets/cat-icon.svg';
import { SocketConnection } from '../../../../SocketConnection';
import favoriteBlank from '../../../../icons/favorite/favorite.svg';
import favoriteSolid from '../../../../icons/favorite/favorite-solid.svg';
import { ProfilePetItemTypes } from '../../../../Interfaces/ProfilePetItem/ProfilePetItem';

const ProfilePetItem = ({ id, petname, age, breed, type, favorite, user, edit }: ProfilePetItemTypes) => {

    const [breedName, setBreedName] = useState('');
    const [favoritePet, setFavoritePet] = useState(false);

    useEffect((): any => {
        let isSubscribed = true;

        let urlApi;

        setFavoritePet(favorite);

        switch (type) {
            case 1:
                urlApi = `${process.env.REACT_APP_DOG_URL}/v1/breeds/${breed}`;
                break;
            case 2:
                urlApi = `${process.env.REACT_APP_CAT_URL}/v1/breeds`;
                break;
            default:
                urlApi = `${process.env.REACT_APP_DOG_URL}/v1/breeds/${breed}`;
                break;
        }

        axios.get(urlApi)
            .then((res: any) => {
                if (isSubscribed) {
                    switch (type) {
                        case 1:
                            setBreedName(res.data.name)
                            break;
                        case 2:
                            const cat = res.data.find((cat: any, index: number) => (index + 1) === breed);
                            setBreedName(cat.name);
                            break;
                        default:
                            break;
                    }
                }
            })
            .catch(err => isSubscribed ? console.error(err) : null);

        return () => (isSubscribed = false);
    }, [breed, favorite, type]);

    const handleAddFavorite = async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}/pet/favorites/add`, {
            id,
            favorite: !favoritePet
        }).then((res) => {
            if (res.status === 200) {
                setFavoritePet(!favoritePet);
                SocketConnection.emit('getFavorites', { user });
            }
        }).catch(err => {
            console.error(err);
        })
    }

    const handleEditPet = () => {
        edit({
            id,
            petname,
            age,
            breed,
            type,
        });
    }

    const handleDeletePet = async () => {
        await axios.delete(`${process.env.REACT_APP_API_URL}/pet/delete`, {
            params: {
                id
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    SocketConnection.emit('getPets', { user, page: 1 });
                    SocketConnection.emit('getFavorites', { user });
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="item">
            <div>
                <p className='item-text'>Name: {petname}</p>
                <p className='item-text'>Age (years): {age}</p>
                <p className='item-text'>Breed: {breedName}</p>
            </div>
            <div className='item-images'>
                <img className='item-pet-image'
                    src={type === 1 ? dogIcon : catIcon}
                    alt={type === 1 ? 'dog' : 'cat'} />
                <img className='item-favorite-image'
                    onClick={handleAddFavorite}
                    src={favoritePet ? favoriteSolid : favoriteBlank}
                    alt={favoritePet ? 'favoriteSolid' : 'favoriteBlank'} />
                <img className='item-edit-image'
                    onClick={handleEditPet}
                    src={editIcon}
                    alt='editIcon' />
                <img className='item-delete-image'
                    onClick={handleDeletePet}
                    src={deleteIcon}
                    alt='deleteIcon' />
            </div>
        </div>
    )
}

export default ProfilePetItem;