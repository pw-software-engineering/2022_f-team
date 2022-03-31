import {
  FormInputComponent,
  EmailValidator,
  PhoneValidator,
  PostalCodeValidator,
} from "common-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/RegisterFormStyle.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");
  const [flat, setFlat] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleRegister = (e: any) => {
    e.preventDefault();
  };

  const validateForm = () => {
    if (!EmailValidator(email)) return false;
    if (!PhoneValidator(phone)) return false;
    if (confirmPassword !== password) return false;
    if (password.length < 8) return false;
    if (!PostalCodeValidator(postalCode)) return false;
    if (
      name.length == 0 ||
      surname.length == 0 ||
      street.length == 0 ||
      city.length == 0 ||
      number.length == 0
    )
      return false;
    return true;
  };
  return (
    <div className="page-wrapper">
      <form>
        <h1>Register</h1>
        <div className="normal-input-wrapper">
          <FormInputComponent
            label="Email"
            onValueChange={setEmail}
            type="email"
            validationText="Provide valid email format."
            validationFunc={(x: string) => EmailValidator(x)}
          />
          <FormInputComponent
            label="Name"
            onValueChange={setName}
            type="text"
            validationText="This field is required."
            validationFunc={(x: string) => x.length >= 0}
          />
          <FormInputComponent
            label="Surname"
            onValueChange={setSurname}
            type="text"
            validationText="This field is required."
            validationFunc={(x: string) => x.length >= 0}
          />
          <FormInputComponent
            label="Phone"
            onValueChange={setPhone}
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
              onValueChange={setStreet}
              type="text"
              validationText="This field is required."
              validationFunc={(x: string) => x.length >= 0}
            />
          </div>
          <div className="address-input-wrapper">
            <FormInputComponent
              label="Number"
              onValueChange={setNumber}
              type="text"
              validationText="This field is required."
              validationFunc={(x: string) => x.length >= 0}
            />
          </div>
          <div className="address-input-wrapper">
            <FormInputComponent
              label="Flat"
              onValueChange={setFlat}
              type="text"
              optional={true}
              validationText=""
              validationFunc={(x: string) => true}
            />
          </div>
          <div className="address-input-wrapper">
            <FormInputComponent
              label="City"
              onValueChange={setCity}
              type="text"
              validationText="This field is required."
              validationFunc={(x: string) => x.length >= 0}
            />
          </div>
          <div className="address-input-wrapper">
            <FormInputComponent
              label="Postal code"
              onValueChange={setPostalCode}
              type="text"
              validationText="Provide valid postal code."
              validationFunc={(x: string) => PostalCodeValidator(x)}
            />
          </div>
        </div>
        <div className="normal-input-wrapper">
          <FormInputComponent
            label="Password"
            onValueChange={setPassword}
            type="password"
            validationText="Your password has to be at least 8 characters long."
            validationFunc={(x: string) => x.length >= 8}
          />
          <FormInputComponent
            label="Confirm password"
            onValueChange={setConfirmPassword}
            type="password"
            validationText="Your passwords have to match."
            validationFunc={(x: string) => x === password}
          />
        </div>
        <div className="button-div">
          <button
            disabled={!validateForm()}
            onClick={(e: any) => handleRegister(e)}
          >
            Register
          </button>
          <p>
            Do you already have an account?
            <Link to='/' style={{ color: "#539091" }}>
              Log in!
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
