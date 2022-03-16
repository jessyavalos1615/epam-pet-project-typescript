import './index.css';
import { ButtonTypes } from '../../../Interfaces/UI/Button';

const Button = ({ text, type, click, width, margin }: ButtonTypes) => {
    return (
        <button style={{ width: width, margin: margin }} className={`btn btn-${type}`} onClick={click}>
            {text}
        </button>
    );
}

export default Button;