import { LoginForm, EmailValidator, UserContextInterface, UserContext } from "common-components";
import { useState, useContext } from "react";
import {
  Link,
  Navigate
} from "react-router-dom";
import "../style/LoginRegisterStyles.css";
import { APIservice } from "../APIservices/APIservice";
import { ServiceState } from "../APIservices/APIutilities";
import { getLoginConfig } from "../APIservices/configCreator";

const LoginPage = () => {
  const service = APIservice();

  const userContext = useContext(UserContext);

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
    if (loginData.Email.length > 32 || loginData.Email.length == 0) return false;
    if (loginData.Password.length > 32 || loginData.Password.length == 0) return false;
    return true;
  };

  const onSubmitClick = () => {
    service.execute!(getLoginConfig(), {
      email: loginData.Email,
      password: loginData.Password,
    },
      (result: string | undefined) => {
        console.log(userContext);
        userContext?.login(loginData.Email, loginData.Password, result!);
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
        <Navigate to="/diet" />
      )}
    </div>
  );
};

export default LoginPage;
