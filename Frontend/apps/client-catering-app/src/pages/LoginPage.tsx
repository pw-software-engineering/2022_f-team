import {
    LoginForm,
    LoginData,
    LoginFormResponse
} from "common-components";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const onSubmitClick = (loginData: LoginData) => {
        return LoginFormResponse.BadRequest;
    }

    const bottom =
        <p>
            {"Don't have an account? "}
            <Link to="/register" style={{ color: "#539091" }}>
                Register today!
            </Link>
        </p>;

    return (
        <div className="page-wrapper">
            <LoginForm onSubmitClick={onSubmitClick}
                bottom={bottom} />
        </div>
    );
};

export default LoginPage;
