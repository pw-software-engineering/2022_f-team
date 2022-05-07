import {
  EmailValidator,
  FormInputComponent,
  PhoneValidator,
  PostalCodeValidator,
  SubmitButton,
} from "common-components";
import { Link } from "react-router-dom";

interface RegisetFormProps {
  isForRegister: boolean;
  changeDataValue: (label: string, value: string) => void;
  validateForm: () => boolean;
  handleAction: (e: any) => void;
  inputData: any;
}

const RegisterForm = (props: RegisetFormProps) => {
  return (
    <form>
      {props.isForRegister && <h1>Register</h1>}
      {!props.isForRegister && <h1>Edit Profile Information</h1>}
      <div className="normal-input-wrapper">
        <FormInputComponent
          value={props.inputData.Email}
          label="Email"
          onValueChange={props.changeDataValue}
          type="email"
          validationText="Provide valid email format."
          validationFunc={(x: string) => EmailValidator(x)}
        />
        <FormInputComponent
          value={props.inputData.Name}
          label="Name"
          onValueChange={props.changeDataValue}
          type="text"
          validationText="This field is required."
          validationFunc={(x: string) => x.length >= 0}
        />
        <FormInputComponent
          value={props.inputData.Surname}
          label="Surname"
          onValueChange={props.changeDataValue}
          type="text"
          validationText="This field is required."
          validationFunc={(x: string) => x.length >= 0}
        />
        <FormInputComponent
          value={props.inputData.Phone}
          label="Phone"
          onValueChange={props.changeDataValue}
          type="phone"
          validationText="Provide a valid phone number."
          validationFunc={(x: string) => PhoneValidator(x)}
        />
      </div>

      <div className="address-div">
        <h3>Address</h3>
        <div className="address-input-wrapper">
          <FormInputComponent
            value={props.inputData.Street}
            label="Street"
            onValueChange={props.changeDataValue}
            type="text"
            validationText="This field is required."
            validationFunc={(x: string) => x.length >= 0}
          />
        </div>
        <div className="address-input-wrapper">
          <FormInputComponent
            value={props.inputData.Number}
            label="Number"
            onValueChange={props.changeDataValue}
            type="text"
            validationText="This field is required."
            validationFunc={(x: string) => x.length >= 0}
          />
        </div>
        <div className="address-input-wrapper">
          <FormInputComponent
            value={props.inputData.Flat}
            label="Flat"
            onValueChange={props.changeDataValue}
            type="text"
            optional={true}
            validationText=""
            validationFunc={(x: string) => true}
          />
        </div>
        <div className="address-input-wrapper">
          <FormInputComponent
            value={props.inputData.City}
            label="City"
            onValueChange={props.changeDataValue}
            type="text"
            validationText="This field is required."
            validationFunc={(x: string) => x.length >= 0}
          />
        </div>
        <div className="address-input-wrapper">
          <FormInputComponent
            value={props.inputData.Postal}
            label="Postal code"
            onValueChange={props.changeDataValue}
            type="text"
            validationText="Provide valid postal code."
            validationFunc={(x: string) => PostalCodeValidator(x)}
          />
        </div>
      </div>
      {props.isForRegister && (
        <div className="normal-input-wrapper">
          <FormInputComponent
            value={props.inputData.Password}
            label="Password"
            onValueChange={props.changeDataValue}
            type="password"
            validationText="Your password has to be at least 8 characters long."
            validationFunc={(x: string) => x.length >= 8}
          />
          <FormInputComponent
            value={props.inputData.Confirm}
            label="Confirm password"
            onValueChange={props.changeDataValue}
            type="password"
            validationText="Your passwords have to match."
            validationFunc={(x: string) => x === props.inputData.Password}
          />
        </div>
      )}
      <div className="button-div">
        {props.isForRegister && (
          <SubmitButton
            action={props.handleAction}
            validateForm={props.validateForm}
            text="Register"
          />
        )}
        {!props.isForRegister && (
          <SubmitButton
            action={props.handleAction}
            validateForm={props.validateForm}
            text="Save"
          />
        )}
        {props.isForRegister && (
          <p>
            Do you already have an account?
            <Link to="/" style={{ color: "#539091" }}>
              Log in!
            </Link>
          </p>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;
