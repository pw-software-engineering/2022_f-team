import { LoginForm, EmailValidator } from "common-components";
import { useState } from "react";
import { Link } from "react-router-dom";

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

    const bottom = (
        <p>
            {"Don't have an account? "}
            <Link to="/register" style={{ color: "#539091" }}>
                Register today!
            </Link>
        </p>
    );

    return (
        <div className="page-wrapper">
            <LoginForm
                onSubmitClick={onSubmitClick}
                onValueChange={changeloginDataValue}
                validateForm={validateForm}
                bottom={bottom}
            />
        </div>
    );
};

export default LoginPage;
