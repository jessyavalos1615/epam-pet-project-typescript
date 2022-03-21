import './index.css';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Label from '../../UI/Label';
import Button from '../../UI/Button/index';
import useAuth from '../../../auth/useAuth';
import InputSelect from '../../UI/Input/Select';
import InputText from '../../UI/Input/Text/index';
import InputNumber from '../../UI/Input/Number/index';
import { SocketConnection } from '../../../SocketConnection';

const AddPetForm = ({ selected, setSelected, setAction }: any) => {

    const [inputs, setInputs] = useState({
        petname: '',
        age: 0,
        breed: 0,
    });

    const [breeds, setBreeds] = useState([]);
    const { auth } = useAuth();

    useEffect((): any => {
        let isSubscribed = true;

        let urlApi;
        switch (selected) {
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
    }, [selected]);

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({
            ...values,
            [name]: value
        }));
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (!validateInput()) {
            console.log('something wrong happened');
            return null;
        }

        axios.post(`${process.env.REACT_APP_API_URL}/pet/add`, {
            ...inputs,
            user: auth._id,
            type: selected
        }).then(res => {
            if (res.status === 200) {
                setAction(false);
                SocketConnection.emit('getPets', { user: auth._id, page: 1 });
            }
        }).catch(error => {
            console.error(error);
        });
    }

    const validateInput = (): Boolean => {
        if (inputs.petname.trim().length === 0)
            return false;

        if (Number(inputs.age) === 0)
            return false;

        if (Number(inputs.breed) === 0)
            return false;

        return true;
    }

    return (
        <div className="add-pet">
            <form onSubmit={handleSubmit}>
                <Label text='Pet Name'
                    forId='petName'
                    style={{ textIndent: '-95px' }} />
                <InputText
                    id='petName'
                    type="text"
                    name='petname'
                    placeholder="Pet Name"
                    value={inputs.petname || ''}
                    onChange={handleChange} />
                <Label text='Age' style={{ textIndent: '-95px' }} />
                <InputNumber
                    name="age"
                    value={inputs.age || 0}
                    onChange={handleChange}
                    min={0}
                    max={14}
                    step={.1} />
                <Label text='Breed' style={{ textIndent: '-95px' }} />
                <InputSelect
                    name="breed"
                    text="Breed"
                    value={inputs.breed || ''}
                    onChange={handleChange}
                    options={breeds} />
                <div className='add-pet-buttons'>
                    <Button
                        type="button"
                        classText='secondary'
                        click={setSelected}
                        text="Back"
                        style={{ width: '100px', margin: '0 10px 0 0' }} />
                    <Button
                        type='submit'
                        classText='primary'
                        text="Add pet"
                        style={{ width: '100px' }} />
                </div>
            </form>
        </div>
    );
}

export default AddPetForm;