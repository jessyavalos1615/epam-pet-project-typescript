import './index.css';
import { InputNumberTypes } from '../../../../Interfaces/UI/Input/Number';

const InputNumber = ({ name, value, onChange, min, max, step, style }: InputNumberTypes) => {
    return (
        <input
            className="input-number"
            type="number"
            name={name}
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            style={style} />
    );
}

export default InputNumber;