import {
  FormInputComponent,
  EmailValidator,
  PhoneValidator,
  PostalCodeValidator,
  SubmitButton,
  ServiceState,
  UserContext,
  LoadingComponent,
  ErrorToastComponent,
} from "common-components";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { APIservice } from "../Services/APIservice";
import "../style/LoginRegisterStyles.css";
import { getRegisterConfig } from "../Services/configCreator";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  const service = APIservice();

  const userContext = useContext(UserContext);
  const [showError, setShowError] = useState<boolean>(false);

  const [registerData, setRegisterData] = useState({
    Email: "",
    Name: "",
    Surname: "",
    Password: "",
    Confirm: "",
    Phone: "",
    Street: "",
    City: "",
    Number: "",
    Flat: "",
    Postal: "",
  });

  const changeRegisterDataValue = (label: string, value: string) => {
    setRegisterData({
      ...registerData,
      [label]: value,
    });
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      service.execute!(getRegisterConfig(), {
        name: registerData.Name,
        lastName: registerData.Surname,
        email: registerData.Email,
        password: registerData.Password,
        phoneNumber: registerData.Phone,
        address: {
          street: registerData.Street,
          buildingNumber: registerData.Number,
          apartmentNumber: registerData.Flat,
          postCode: registerData.Postal,
          city: registerData.City,
        },
      });
    }
  };

  useEffect(() => {
    if (service.state === ServiceState.Fetched)
      userContext?.login(service.result);
    if (service.state === ServiceState.Error) setShowError(true);
  }, [service.state]);

  const validateForm = () => {
    if (!EmailValidator(registerData.Email)) return false;
    if (!PhoneValidator(registerData.Phone)) return false;
    if (registerData.Confirm !== registerData.Password) return false;
    if (registerData.Password.length < 8) return false;
    if (!PostalCodeValidator(registerData.Postal)) return false;
    if (
      registerData.Name.length == 0 ||
      registerData.Surname.length == 0 ||
      registerData.Street.length == 0 ||
      registerData.City.length == 0 ||
      registerData.Number.length == 0
    )
      return false;
    return true;
  };

  return (
    <div className="page-wrapper">
      {service.state !== ServiceState.InProgress &&
        service.state !== ServiceState.Fetched && (
          <RegisterForm
            isForRegister={true}
            changeDataValue={changeRegisterDataValue}
            validateForm={validateForm}
            handleAction={handleRegister}
            inputData={registerData}
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

export default RegisterPage;
