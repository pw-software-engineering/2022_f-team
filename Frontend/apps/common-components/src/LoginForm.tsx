import React, { useState } from 'react'
import FormInputComponent from './FormInputComponents';
import SubmitButton from './SubmitButton';
import { EmailValidator, PasswordValidator } from './utilities';
import "./style/RegisterFormStyle.css";

export interface LoginData {
    Email: string,
    Password: string,
}

export enum LoginFormResponse {
    OK,
    BadRequest,
}

interface LoginFormProps {
    onSubmitClick: (loginData: LoginData) => LoginFormResponse
    bottom?: React.ReactNode
}

const LoginForm = (props: LoginFormProps) => {
    const [loginData, setloginData] = useState({
        Email: "",
        Password: "",
    });

    const changeloginDataValue = (label: string, value: string) => {
        setloginData({
            ...loginData,
            [label]: value,
        });
    };

    const handleLogin = (e: any) => {
        e.preventDefault();

        props.onSubmitClick(loginData);
    };

    const validateForm = () => {
        if (!EmailValidator(loginData.Email)) return false;
        if (!PasswordValidator(loginData.Password)) return false;
        return true;
    };

    return (
        <form>
            <h1>Login</h1>
            <div className="normal-input-wrapper">
                <FormInputComponent
                    label="Email"
                    onValueChange={changeloginDataValue}
                    type="email"
                    validationText="Provide valid email format."
                    validationFunc={(x: string) => EmailValidator(x)}
                />
                <FormInputComponent
                    label="Password"
                    onValueChange={changeloginDataValue}
                    type="password"
                    validationText="Provide account password."
                    validationFunc={(x: string) => PasswordValidator(x)}
                />

            </div>
            <div className="button-div">
                <SubmitButton
                    action={handleLogin}
                    validateForm={validateForm}
                    text="Login"
                />
                {props.bottom}
            </div>
        </form>
    );
}

export default LoginForm
