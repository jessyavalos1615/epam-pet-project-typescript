import './index.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

import dogIcon from '../../../../icons/dog-icon.svg';
import catIcon from '../../../../icons/cat-icon.svg';

const ProfilePetItem = ({ petname, age, breed, type }: { petname: string, age: number, breed: number, type: number }) => {

    const [breedName, setBreedName] = useState('');

    useEffect((): any => {
        let isSubscribed = true;

        axios.get(`${process.env.REACT_APP_DOG_URL}/v1/breeds/${breed}`)
            .then((response: any) => isSubscribed ? setBreedName(response.data.name) : null)
            .catch(err => isSubscribed ? console.error(err) : null);

        return () => (isSubscribed = false);
    }, [breed]);
    return (
        <div className="item">
            <div>
                <p className='item-text'>{petname}</p>
                <p className='item-text'>{age}</p>
                <p className='item-text'>{breedName}</p>
            </div>
            <img className='item-image'
                src={type === 1 ? dogIcon: catIcon }
                alt={type === 1 ? 'dog' : 'cat'} />
        </div>
    )
}

export default ProfilePetItem;