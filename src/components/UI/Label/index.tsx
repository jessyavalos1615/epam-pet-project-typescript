import './index.css';

const Label = ({ text, forId, textIndent, margin }: { text: string, forId?: string, textIndent?: string, margin?: string }) => {
    return (
        <label className="label" htmlFor={forId} style={{ textIndent: textIndent, margin: margin }}>
            {text}
        </label>
    )
}

export default Label;