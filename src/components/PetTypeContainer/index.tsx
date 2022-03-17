import './index.css';
import { useState } from 'react';
import PetType from './PetType/index';
import AddPetForm from '../Forms/AddPetForm/index';
import Label from '../UI/Label';

const PetTypeContainer = ({ setAction }: any) => {

    const [selected, setSelected] = useState(0);

    const handleChoose = (event: any) => {
        const type = Number(event.target.getAttribute('data-pet')) || 0;
        setSelected(type);
    }

    return (
        <>
            {selected > 0 ? <AddPetForm selected={selected} setSelected={handleChoose} setAction={setAction} /> :
                <>
                    <Label text='What kind of pet are you want to add?' margin='20px 0 0' />
                    <div className='pet-type-container'>
                        <PetType type={1} click={handleChoose} />
                        <PetType type={2} click={handleChoose} />
                    </div>
                </>}
        </>
    )
}

export default PetTypeContainer;