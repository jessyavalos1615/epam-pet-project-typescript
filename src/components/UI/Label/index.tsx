import './index.css';

const Label = ({ text, forId, style }: { text: string, forId?: string, style?: {}}) => {
    return (
        <label className="label" htmlFor={forId} style={style}>
            {text}
        </label>
    )
}

export default Label;