import axios from "axios";
import { useState } from "react";

import './index.css';

const LoginForm = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [action, setAction] = useState(false);

    const handleChangeChk = (event: any) => {
        setAction(!action)
    }

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({
            ...values,
            [name]: value
        }));
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        let url = `${process.env.REACT_APP_API_URL}/user/${action ? 'signin' : 'signup'}`;
        axios.post(url, inputs).then(data => {
            console.log(data);
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className="main">
            <input type="checkbox" checked={action} onChange={handleChangeChk} id="chk" aria-hidden="true" />

            <div className="signup">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="chk" aria-hidden="true">Sign up</label>
                    <input type="text" name="username" placeholder="User name" value={inputs.username || ''} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" value={inputs.email || ''} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={inputs.password || ''} onChange={handleChange} required />
                    <button>Sign up</button>
                </form>
            </div>

            <div className="login">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="chk" aria-hidden="true">Login</label>
                    <input type="email" name="email" placeholder="Email" value={inputs.email || ''} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={inputs.password || ''} onChange={handleChange} required />
                    <button>Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;