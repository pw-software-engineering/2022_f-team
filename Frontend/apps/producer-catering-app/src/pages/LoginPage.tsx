import {
    LoginForm,
    LoginData,
    LoginFormResponse,
} from "common-components";
import { Link } from "react-router-dom";
import "../style/RegisterFormStyle.css";

const LoginPage = () => {
    const onSubmitClick = (loginData: LoginData) => {
        return LoginFormResponse.BadRequest;
    }

    return (
        <div className="page-wrapper">
            <LoginForm onSubmitClick={onSubmitClick} />
        </div>
    );
};

export default LoginPage;
