import { LoginForm, EmailValidator } from "common-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/LoginRegisterStyles.css";
import { APIservice } from "../APIservices/APIservice";
import { ServiceState } from "../APIservices/APIutilities";
import { getLoginConfig } from "../APIservices/configCreator";

const LoginPage = () => {
  const service = APIservice();

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

  const onSubmitClick = () => {
    service.execute!(getLoginConfig(), {
      email: loginData.Email,
      password: loginData.Password,
    });
  };

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
      {service.state !== ServiceState.InProgress &&
        service.state !== ServiceState.Fetched && (
          <LoginForm
            onSubmitClick={onSubmitClick}
            onValueChange={changeloginDataValue}
            validateForm={validateForm}
            bottom={bottom}
          />
        )}

      {service.state === ServiceState.InProgress && <h1>Loading</h1>}

      {service.state === ServiceState.Error && (
        <div>
          <h1>Error</h1>
          <p>{service.error!.message}</p>
        </div>
      )}

      {service.state === ServiceState.Fetched && (
        <div>
          <p>You have logged in successfully.</p>
          <Link to="/">
            <button>Go to main page</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
