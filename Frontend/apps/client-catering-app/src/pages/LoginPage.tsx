import {
  LoginForm,
  EmailValidator,
  UserContext,
  ServiceState,
  LoadingComponent,
  ErrorToastComponent,
} from "common-components";
import { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "../style/LoginRegisterStyles.css";
import { APIservice } from "../Services/APIservice";
import { getLoginConfig } from "../Services/configCreator";

const LoginPage = () => {
  const service = APIservice();

  const userContext = useContext(UserContext);
  const [showError, setShowError] = useState<boolean>(false);

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

  useEffect(() => {
    if (service.state === ServiceState.Fetched)
      userContext?.login(service.result);
    if (service.state === ServiceState.Error) setShowError(true);
  }, [service.state]);

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

      {service.state === ServiceState.InProgress && <LoadingComponent />}

      {showError && (
        <ErrorToastComponent
          message={service.error?.message!}
          closeToast={setShowError}
        />
      )}

      {service.state === ServiceState.Fetched && <Navigate to="/" />}
    </div>
  );
};

export default LoginPage;
