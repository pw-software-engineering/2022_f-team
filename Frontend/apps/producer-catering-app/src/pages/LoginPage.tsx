import { LoginForm, EmailValidator, UserContextInterface, UserContext, ServiceState } from "common-components";
import { useState, useContext, useEffect } from "react";
import {
  Link,
  Navigate
} from "react-router-dom";
import "../style/LoginRegisterStyles.css";
import { APIservice } from "../Services/APIservice";
import { getLoginConfig } from "../Services/configCreator";

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
    if (!EmailValidator(loginData.Email)) return false;
    if (loginData.Password.length < 8) return false;
    return true;
  };

  const onSubmitClick = () => {
    service.execute!(getLoginConfig(), {
      email: loginData.Email,
      password: loginData.Password,
    })
  };

  useEffect(()=>{
    if(service.state === ServiceState.Fetched)
        userContext?.login(service.result);
  },[service.state])

  return (
    <div className="page-wrapper">
      {service.state !== ServiceState.InProgress &&
        service.state !== ServiceState.Fetched && (
          <LoginForm
            onSubmitClick={onSubmitClick}
            onValueChange={changeloginDataValue}
            validateForm={validateForm}
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
        <Navigate to="/" />
      )}
    </div>
  );
};

export default LoginPage;
