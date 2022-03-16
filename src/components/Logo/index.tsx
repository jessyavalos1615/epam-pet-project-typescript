import './index.css';

import PetLogo from './pet-logo/pet-logo.png';

const Logo = () => {
    return (
        <img className="logo" src={PetLogo} alt="PetLogo"/>
    );
}

export default Logo;