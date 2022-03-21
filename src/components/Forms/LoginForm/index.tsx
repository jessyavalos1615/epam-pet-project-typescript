import axios from "axios";
import { useState } from "react";
import Button from "../../UI/Button";
import InputText from "../../UI/Input/Text";
import Label from "../../UI/Label";

import './index.css';

const LoginForm = (props: any) => {
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
        axios.post(url, inputs).then(res => {
            const { _id, username, email } = res.data.data;
            props.setAuth({
                _id,
                username,
                email
            });
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className="main">
            <input type="checkbox" checked={action} onChange={handleChangeChk} id="chk" aria-hidden="true" />

            <div className="signup">
                <form onSubmit={handleSubmit}>
                    <Label forId="chk" text="Sign up" style={{margin: '60px'}} />
                    <InputText
                        type="text"
                        name="username"
                        placeholder='User Name'
                        value={inputs.username || ''}
                        required={true}
                        onChange={handleChange} />
                    <InputText
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={inputs.email || ''}
                        required={true}
                        onChange={handleChange} />
                    <InputText
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={inputs.password || ''}
                        required={true}
                        onChange={handleChange} />
                    <Button classText='primary'
                        text="Sign Up"
                        type="submit"
                        style={{ width: '100px', margin: '0 auto' }} />
                </form>
            </div>

            <div className="login">
                <form onSubmit={handleSubmit}>
                    <Label forId="chk" text="Login"style={{margin: '60px'}} />
                    <InputText
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={inputs.email || ''}
                        required={true}
                        onChange={handleChange} />
                    <InputText
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={inputs.password || ''}
                        required={true}
                        onChange={handleChange} />
                    <Button classText='primary'
                        text="Login"
                        type="submit"
                        style={{ width: '100px', margin: '0 auto' }} />
                </form>
            </div>
        </div>
    );
}

export default LoginForm;