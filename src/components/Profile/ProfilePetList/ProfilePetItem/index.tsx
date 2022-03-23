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
import Alerts from '../../../Alerts';

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
            .catch(err => isSubscribed ? Alerts.error(err.message) : null);

        return () => (isSubscribed = false);
    }, [breed, favorite, type]);

    const handleAddFavorite = async () => {
        const addFavoriteAlert = Alerts.loading('Adding Favorite...')
        await axios.post(`${process.env.REACT_APP_API_URL}/pet/favorites/add`, {
            id,
            favorite: !favoritePet
        }).then((res) => {
            if (res.status === 200) {
                let text:string = 'Favorite pet added';
                if (favoritePet) {
                    text = 'Favorite pet removed.'
                }
                Alerts.update(addFavoriteAlert, {
                    render: text,
                    theme: 'colored',
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000,
                });
                setFavoritePet(!favoritePet);
                SocketConnection.emit('getFavorites', { user });
            }
        }).catch(err => {
            Alerts.update(addFavoriteAlert, {
                render: err.message,
                isLoading: false,
                autoClose: 3000,
                type: 'error',
                theme: 'colored'
            });
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
        const deletePetAlert = Alerts.loading('Deleting pet information...')
        await axios.delete(`${process.env.REACT_APP_API_URL}/pet/delete`, {
            params: {
                id
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    Alerts.update(deletePetAlert, {
                        position: 'bottom-right',
                        theme: 'colored',
                        type: 'success',
                        render: 'Pet delete Successfully',
                        isLoading: false,
                        autoClose: 3000
                    });
                    SocketConnection.emit('getPets', { user, page: 1 });
                    SocketConnection.emit('getFavorites', { user });
                }
            })
            .catch(err => {
                Alerts.update(deletePetAlert, {
                    position: 'bottom-right',
                    theme: 'colored',
                    type: 'error',
                    render: 'Something went wrong, please try again.',
                    isLoading: false,
                    autoClose: 3000
                });
            });
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