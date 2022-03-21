import './index.css';

import axios from 'axios';
import { useState, useEffect } from 'react';
import Pagination from 'react-responsive-pagination';

import Modal from '../../Modal';
import Label from '../../UI/Label';
import Button from '../../UI/Button';
import InputText from '../../UI/Input/Text';
import ProfilePetItem from './ProfilePetItem';
import InputNumber from '../../UI/Input/Number';
import InputSelect from '../../UI/Input/Select';
import PetTypeContainer from '../../PetTypeContainer';
import { SocketConnection } from '../../../SocketConnection';

const ProfilePetList = ({ user }: { user: string }) => {

    const [action, setAction] = useState(false);
    const [pets, setPets] = useState([]);
    const [page, setPage] = useState(1);
    const [totralPages, setTotalPages] = useState(0);
    const [show, setShow] = useState(false);
    const [breeds, setBreeds] = useState([]);
    const [petEdit, setPetEdit] = useState({
        id: '',
        petname: '',
        age: 0,
        breed: 0,
        type: 0
    });

    useEffect((): any => {
        SocketConnection.emit('getPets', { user, page });

        SocketConnection.on('pets', (data) => {
            setPets(data.docs);
            setTotalPages(data.totalPages);
        });
    }, [page, user]);

    useEffect((): any => {
        let isSubscribed = true;

        let urlApi;
        switch (petEdit.type) {
            case 1:
                urlApi = process.env.REACT_APP_DOG_URL;
                break;
            case 2:
                urlApi = process.env.REACT_APP_CAT_URL;
                break;
            default:
                urlApi = process.env.REACT_APP_DOG_URL;
                break;
        }

        axios.get(`${urlApi}/v1/breeds`)
            .then((data) => {
                if (isSubscribed) {
                    const breed = data.data.map((data: any, index: number) => {
                        return {
                            text: data.name,
                            value: index + 1
                        }
                    });
                    setBreeds(breed);
                } else {
                    return null;
                }
            })
            .catch((error) => isSubscribed ? console.log(error) : null);

        return () => (isSubscribed = false);
    }, [petEdit.type]);

    const handleAddPet = () => {
        setAction(!action);
    }

    const handleShowModal = (data: any) => {
        setShow(!show);
        setPetEdit(data)
    }

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;

        setPetEdit(values => ({
            ...values,
            [name]: value
        }));
    }

    const validateInput = (): Boolean => {
        if (petEdit.petname.trim().length === 0)
            return false;

        if (Number(petEdit.age) === 0)
            return false;

        if (Number(petEdit.breed) === 0)
            return false;

        return true;
    }

    const handleSubmit = async () => {
        if (!validateInput)
            return null;

        await axios.put(`${process.env.REACT_APP_API_URL}/pet/edit`, petEdit)
            .then(res => {
                SocketConnection.emit('getPets', { user, page });
                if (res.data.pet.favorite)
                    SocketConnection.emit('getFavorites', { user });

                setShow(false);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="list">
            <div className="list-header">
                <h1 className="list-header-title">Pet List</h1>
                <Button
                    classText={action ? 'danger' : 'primary'}
                    text={action ? 'Cancel' : 'Add'}
                    type='button'
                    click={handleAddPet}
                    style={{ width: '100px' }} />
            </div>
            <hr />

            {action ?
                <PetTypeContainer setAction={setAction} /> :
                <div className="list-items">
                    {pets.map((pet: any, index) => <ProfilePetItem key={index} id={pet._id} petname={pet.petname} age={pet.age} breed={pet.breed} type={pet.type} favorite={pet.favorite} user={user} edit={handleShowModal} />)}

                    {totralPages > 1 ? <Pagination
                        current={page}
                        total={totralPages}
                        onPageChange={setPage} /> : null}

                </div>}

            <Modal show={show}
                onClose={() => setShow(false)}
                onSubmit={() => handleSubmit()}
                title='Edit pet information'>
                <Label text="Pet name"
                    style={{ color: '#000', fontSize: '1.8rem', textIndent: '-95px' }} />
                <InputText name='petname'
                    type="text"
                    style={{ backgroundColor: '#eeeeee' }}
                    value={petEdit.petname}
                    onChange={handleChange} />
                <Label text="Age (Years)"
                    style={{ color: '#000', fontSize: '1.8rem', textIndent: '-95px' }} />
                <InputNumber name='age'
                    value={petEdit.age}
                    onChange={handleChange}
                    min={0}
                    max={14}
                    step={.1}
                    style={{ backgroundColor: '#eeeeee' }} />
                <Label text="Breed"
                    style={{ color: '#000', fontSize: '1.8rem', textIndent: '-95px' }} />
                <InputSelect name='breed'
                    value={petEdit.breed}
                    options={breeds}
                    onChange={handleChange} />
            </Modal>
        </div>
    );
}

export default ProfilePetList;