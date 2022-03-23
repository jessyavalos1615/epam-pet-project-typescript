import './index.css';

import axios from 'axios';
import { useEffect, useState } from 'react';

import catIcon from '../../../icons/pets/cat-icon.svg';
import dogIcon from '../../../icons/pets/dog-icon.svg';
import { FavoritePetTypes } from '../../../Interfaces/FavoritePet/FavoritePet';

const FavoritePet = ({ petname, age, type, breed }: FavoritePetTypes) => {
    const [breedName, setBreedName] = useState('');

    useEffect((): any => {
        let isSubscribed = true;

        axios.get(`${process.env.REACT_APP_DOG_URL}/v1/breeds/${breed}`)
            .then((response: any) => isSubscribed ? setBreedName(response.data.name) : null)
            .catch(err => isSubscribed ? console.error(err) : null);

        return () => (isSubscribed = false);
    }, [breed]);

    return (
        <div className="favorite-pet">
            <div className='favorite-pet-data'>
                <p>Name: {petname}</p>
                <p>Age (years): {age}</p>
                <p>Breed: {breedName}</p>
            </div>
            <img className="favorite-pet-image"
                src={type === 1 ? dogIcon : catIcon}
                alt={type === 1 ? 'dog' : 'cat'} />
        </div>
    )
}

export default FavoritePet;