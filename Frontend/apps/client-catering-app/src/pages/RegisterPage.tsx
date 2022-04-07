import {
  FormInputComponent,
  EmailValidator,
  PhoneValidator,
  PostalCodeValidator,
  SubmitButton,
} from "common-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ServiceState } from "../APIservices/APIutilities";
import { APIservice } from "../APIservices/APIservice";
import "../style/ComponentsStyle.css";
import { getRegisterConfig } from "../APIservices/configCreator";

const RegisterPage = () => {
  const service = APIservice();
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
      service.execute!(
        getRegisterConfig(),
        {
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
        }
      );
    }
  };

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
          <form>
            <h1>Register</h1>
            <div className="normal-input-wrapper">
              <FormInputComponent
                label="Email"
                onValueChange={changeRegisterDataValue}
                type="email"
                validationText="Provide valid email format."
                validationFunc={(x: string) => EmailValidator(x)}
              />
              <FormInputComponent
                label="Name"
                onValueChange={changeRegisterDataValue}
                type="text"
                validationText="This field is required."
                validationFunc={(x: string) => x.length >= 0}
              />
              <FormInputComponent
                label="Surname"
                onValueChange={changeRegisterDataValue}
                type="text"
                validationText="This field is required."
                validationFunc={(x: string) => x.length >= 0}
              />
              <FormInputComponent
                label="Phone"
                onValueChange={changeRegisterDataValue}
                type="phone"
                validationText="Provide a valid phone number."
                validationFunc={(x: string) => PhoneValidator(x)}
              />
            </div>

            <div className="address-div">
              <h3>Address</h3>
              <div className="address-input-wrapper">
                <FormInputComponent
                  label="Street"
                  onValueChange={changeRegisterDataValue}
                  type="text"
                  validationText="This field is required."
                  validationFunc={(x: string) => x.length >= 0}
                />
              </div>
              <div className="address-input-wrapper">
                <FormInputComponent
                  label="Number"
                  onValueChange={changeRegisterDataValue}
                  type="text"
                  validationText="This field is required."
                  validationFunc={(x: string) => x.length >= 0}
                />
              </div>
              <div className="address-input-wrapper">
                <FormInputComponent
                  label="Flat"
                  onValueChange={changeRegisterDataValue}
                  type="text"
                  optional={true}
                  validationText=""
                  validationFunc={(x: string) => true}
                />
              </div>
              <div className="address-input-wrapper">
                <FormInputComponent
                  label="City"
                  onValueChange={changeRegisterDataValue}
                  type="text"
                  validationText="This field is required."
                  validationFunc={(x: string) => x.length >= 0}
                />
              </div>
              <div className="address-input-wrapper">
                <FormInputComponent
                  label="Postal code"
                  onValueChange={changeRegisterDataValue}
                  type="text"
                  validationText="Provide valid postal code."
                  validationFunc={(x: string) => PostalCodeValidator(x)}
                />
              </div>
            </div>
            <div className="normal-input-wrapper">
              <FormInputComponent
                label="Password"
                onValueChange={changeRegisterDataValue}
                type="password"
                validationText="Your password has to be at least 8 characters long."
                validationFunc={(x: string) => x.length >= 8}
              />
              <FormInputComponent
                label="Confirm password"
                onValueChange={changeRegisterDataValue}
                type="password"
                validationText="Your passwords have to match."
                validationFunc={(x: string) => x === registerData.Password}
              />
            </div>
            <div className="button-div">
              <SubmitButton
                action={handleRegister}
                validateForm={validateForm}
                text="Register"
              />
              <p>
                Do you already have an account?
                <Link to="/" style={{ color: "#539091" }}>
                  Log in!
                </Link>
              </p>
            </div>
          </form>
        )}

      {service.state === ServiceState.InProgress && (
        <h1>Loading</h1>
      )}

      {service.state === ServiceState.Error && (
        <div>
          <h1>Error</h1>
          <p>{service.error!.message}</p>
        </div>
      )}

      {service.state === ServiceState.Fetched && (
        <div className="afterRegisterDiv">
          <p>Your account have been created.</p>
          <Link to="/">
            <button>Go to main page</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
