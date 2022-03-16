import './index.css';

import { useState, useEffect, SyntheticEvent } from 'react';
import axios from 'axios';
import InputText from '../../UI/Input/Text/index';
import InputSelect from '../../UI/Input/Select';
import Button from '../../UI/Button/index';
import InputNumber from '../../UI/Input/Number/index';
import Label from '../../UI/Label';
import useAuth from '../../../auth/useAuth';

const AddPetForm = ({ setAction }: any) => {

    const [inputs, setInputs] = useState({
        petname: '',
        age: 0,
        breed: 0,
    });

    const [breeds, setBreeds] = useState([]);
    const { auth } = useAuth();

    useEffect((): any => {
        let isSubscribed = true;
        axios.get(`${process.env.REACT_APP_DOG_URL}/v1/breeds`)
            .then((data) => {
                if (isSubscribed) {
                    const breed = data.data.map((data: any) => {
                        return {
                            text: data.name,
                            value: data.id
                        }
                    });
                    setBreeds(breed);
                } else {
                    return null;
                }
            })
            .catch((error) => isSubscribed ? console.log(error) : null);

        return () => (isSubscribed = false);
    }, []);

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
            type: 1
        }).then(res => {
            if (res.data.data)
                setAction(false);
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
                <Label text='Pet Name' forId='petName' textIndent='-95px' />
                <InputText
                    id='petName'
                    type="text"
                    name='petname'
                    placeholder="Pet Name"
                    value={inputs.petname || ''}
                    onChange={handleChange} />
                <Label text='Age' textIndent='-95px' />
                <InputNumber
                    name="age"
                    value={inputs.age || 0}
                    onChange={handleChange}
                    min={0}
                    max={14}
                    step={.1} />
                <Label text='Breed' textIndent='-95px' />
                <InputSelect
                    name="breed"
                    text="Breed"
                    value={inputs.breed || ''}
                    onChange={handleChange}
                    options={breeds} />
                <Button type='primary' text="Add pet" width={100} margin='0 auto' />
            </form>
        </div>
    );
}

export default AddPetForm;