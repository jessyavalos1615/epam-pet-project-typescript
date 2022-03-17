import Button from '../../UI/Button';
import './index.css';
import ProfilePetItem from './ProfilePetItem';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PetTypeContainer from '../../PetTypeContainer';

const ProfilePetList = ({ user }: { user: string }) => {

    const [action, setAction] = useState(false);
    const [pets, setPets] = useState([]);

    useEffect((): any => {
        let isSubscribed = true;

        axios.post(`${process.env.REACT_APP_API_URL}/pet/all`, { user })
            .then(response => isSubscribed ? setPets(response.data.pets) : null)
            .catch(err => isSubscribed ? console.error(err) : null);

        return () => (isSubscribed = false);
    }, [action, user]);

    const handleAddPet = () => {
        setAction(!action);
    }

    return (
        <div className="list">
            <div className="list-header">
                <h1 className="list-header-title">Pet List</h1>
                <Button
                    classText={action ? 'danger' : 'primary'}
                    text={action ? 'Cancel' : 'Add'}
                    type='button'
                    click={handleAddPet} width={100} />
            </div>
            <hr />

            {action ?
                <PetTypeContainer setAction={setAction} /> :
                <div className="list-items">
                    {pets.map((pet: any, index) => <ProfilePetItem key={index} petname={pet.petname} age={pet.age} breed={pet.breed} type={ pet.type }/>)}
                </div>}
        </div>
    );
}

export default ProfilePetList;