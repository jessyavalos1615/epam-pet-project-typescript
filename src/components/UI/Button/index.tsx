import './index.css';
import { ButtonTypes } from '../../../Interfaces/UI/Button';

const Button = ({ text, type, classText, click, width, margin, style }: ButtonTypes) => {
    return (
        <button type={type} style={{ width: width, margin: margin }} className={`btn btn-${classText}`} onClick={click}>
            {text}
        </button>
    );
}

export default Button;