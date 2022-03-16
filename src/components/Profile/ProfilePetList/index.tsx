import Button from '../../UI/Button';
import './index.css';
import ProfilePetItem from './ProfilePetItem';
import { useState, useEffect } from 'react';
import AddPetForm from '../../Forms/AddPetForm';
import axios from 'axios';

const ProfilePetList = ({ user }: { user: string }) => {

    const [action, setAction] = useState(false);
    const [pets, setPets] = useState([]);

    useEffect((): any => {
        let isSubscribed = true;

        axios.post(`${process.env.REACT_APP_API_URL}/pet/all`, { user })
            .then(response => isSubscribed ? setPets(response.data.pets) : null)
            .catch(err => isSubscribed ? console.error(err) : null);

        return () => (isSubscribed = false);
    }, [user]);

    const handleAddPet = () => {
        setAction(!action);
    }

    return (
        <div className="list">
            <div className="list-header">
                <h1 className="list-header-title">Pet List</h1>
                <Button
                    text={action ? 'Cancel' : 'Add'}
                    type={action ? 'danger' : 'primary'}
                    click={handleAddPet} width={100} />
            </div>
            <hr />

            {action ?
                <AddPetForm setAction={setAction} /> :
                <div className="list-items">
                    {pets.map((pet: any, index) => <ProfilePetItem key={index} petname={pet.petname} age={pet.age} breed={pet.breed} type={ pet.type }/>)}
                </div>}
        </div>
    );
}

export default ProfilePetList;