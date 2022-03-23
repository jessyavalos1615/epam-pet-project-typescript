import { PetCardTypes } from '../../../Interfaces/PetCard/PetCard';
import './index.css';

const PetCard = (props: PetCardTypes) => {
    return (
        <div className="card">
            <h2 className="card-title">{props.name}</h2>
            <img src={props.image} alt={props.name} />
            <div className="card-desc">
                <p><b>Origin</b>: {props.origin ? props.origin : '????'},</p>
                <p><b>Life span</b>: {props.life},</p>
                <p><b>Breed Group</b>: {props.group},</p>
                <p><b>Temperament</b>: {props.temperament}.</p>
            </div>
        </div>
    );
}

export default PetCard;