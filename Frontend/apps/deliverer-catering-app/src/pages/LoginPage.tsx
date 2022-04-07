import { LoginForm, EmailValidator } from "common-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/ComponentsStyle.css";

const LoginPage = () => {

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

    const validateForm = (): boolean => {
        if (!EmailValidator(loginData.Email)) return false;
        if (loginData.Password.length < 8) return false;
        return true;
    };

    const onSubmitClick = () => { };

    return (
        <div className="page-wrapper">
            <LoginForm
                onSubmitClick={onSubmitClick}
                onValueChange={changeloginDataValue}
                validateForm={validateForm}
            />
        </div>
    );
};

export default LoginPage;
