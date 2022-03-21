import './index.css';

import dogIcon from '../../../icons/pets/dog-icon.svg';
import catIcon from '../../../icons/pets/cat-icon.svg';

const PetType = ({ type, click, style}: { type: number, click: any, style?: {} }) => {
    return (
        <button className='btn btn-primary circle type' onClick={click} data-pet={type} style={style} >
            <img className="pet-type-image" data-pet={type} src={type === 1 ? dogIcon : catIcon} alt={type === 1 ? 'dog' : 'cat'} />
        </button>
    )
}

export default PetType;