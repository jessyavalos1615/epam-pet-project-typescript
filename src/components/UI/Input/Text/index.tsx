import './index.css';

import { InputTextType } from '../../../../Interfaces/UI/Input/Text';

const InputText = ({ id, name, type, value, placeholder, required = false, onChange, width, style }: InputTextType) => {
    return (
        <input
            className="input-text"
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            style={style} />
    );
}

export default InputText;