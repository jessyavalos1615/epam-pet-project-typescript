import Button from '../../UI/Button';
import './index.css';
import ProfilePetItem from './ProfilePetItem';
import { useState } from 'react';
import AddPetForm from '../../Forms/AddPetForm';

const ProfilePetList = ({ id }: { id: string }) => {

    const [action, setAction] = useState(false);

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
                    <ProfilePetItem />
                    <ProfilePetItem />
                </div>}
        </div>
    );
}

export default ProfilePetList;