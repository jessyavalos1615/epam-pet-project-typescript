import './index.css';
import { useState, useEffect } from 'react';

const InputSelect = ({ name, text, value = 0, onChange, options }: any) => {
    const [showList, setShowList] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(():any => {
        let isSubscribed = true;

        if (isSubscribed) {
            document.addEventListener('mousedown', handleClickOutside);

            if (value > 0) {
                const selected = options.find((option: any) => option.value === value);
                setSelectedOption(selected.text);
            }
        }

        return () => (isSubscribed = false)
    }, [options, value]);

    const handleClickOutside = (event: any) => {
        if (
            !event.target.classList.contains("custom-select-option") &&
            !event.target.classList.contains("selected-text")
        ) {
            setShowList(false);
        }
    };

    const handleListDisplay = () => {
        setShowList(!showList);
    };

    const handleOptionClick = (event: any) => {
        event.target.value = event.target.getAttribute("data-value");
        event.target.name = event.target.getAttribute("data-name");
        setShowList(!showList);
        setSelectedOption(event.target.getAttribute("data-text"))
        onChange(event);
    };

    return (
        <div className="custom-select-container">
            <div
                className={`selected-text ${showList ? 'active' : ''}`}
                onClick={handleListDisplay}>
                {selectedOption.length ? selectedOption : `Select the ${text}`}
            </div>
            {showList && (
                <ul className="select-options">
                    <li
                        className="custom-select-option"
                        data-value=""
                        data-name={name}
                        data-text=""
                        key={-1}
                        onClick={handleOptionClick}
                    >
                        Select the {text}
                    </li>
                    {options.map((option: any, index: number) => {
                        return (
                            <li
                                className="custom-select-option"
                                data-value={option.value}
                                data-name={name}
                                data-text={option.text}
                                key={index}
                                onClick={handleOptionClick}
                            >
                                {option.text}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default InputSelect;