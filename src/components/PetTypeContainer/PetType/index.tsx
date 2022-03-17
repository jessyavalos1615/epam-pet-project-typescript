import './index.css';

import dogIcon from '../../../icons/dog-icon.svg';
import catIcon from '../../../icons/cat-icon.svg';

const PetType = ({ type, click}: { type: number, click: any }) => {
    return (
        <button className='btn btn-primary circle type' onClick={click} data-pet={type} >
            <img className="pet-type-image" data-pet={type} src={type === 1 ? dogIcon : catIcon} alt={type === 1 ? 'dog' : 'cat'} />
        </button>
    )
}

export default PetType;