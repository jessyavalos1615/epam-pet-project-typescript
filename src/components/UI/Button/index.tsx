import './index.css';
import { ButtonTypes } from '../../../Interfaces/UI/Button';

const Button = ({ text, type, classText, click, style, children }: ButtonTypes) => {
    return (
        <button type={type} style={style} className={`btn btn-${classText}`} onClick={click}>
            {text}
            {children}
        </button>
    );
}

export default Button;