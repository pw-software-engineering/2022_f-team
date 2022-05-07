import {
  EmailValidator,
  ErrorToastComponent,
  LoadingComponent,
  PhoneValidator,
  PostalCodeValidator,
  ServiceState,
  UserContext,
} from "common-components";
import { useContext, useEffect, useState } from "react";
import { APIservice } from "../Services/APIservice";
import {
  getClientProfileDataConfig,
  putClientProfileDataConfig,
} from "../Services/configCreator";
import RegisterForm from "./RegisterForm";

const EditProfile = () => {
  const userContext = useContext(UserContext);
  const [showError, setShowError] = useState<boolean>(false);
  const serviceGet = APIservice();
  const servicePut = APIservice();

  const [editData, setEditData] = useState({
    Email: "",
    Name: "",
    Surname: "",
    Phone: "",
    Street: "",
    City: "",
    Number: "",
    Flat: "",
    Postal: "",
  });

  const changeProfileDataValue = (label: string, value: string) => {
    setEditData({
      ...editData,
      [label]: value,
    });
  };

  useEffect(() => {
    serviceGet.execute!(
      getClientProfileDataConfig(userContext!.authApiKey),
      "",
      (res: any) => {
        return {
          Email: res.email,
          Name: res.name,
          Surname: res.lastName,
          Phone: res.phoneNumber,
          Street: res.address.street,
          City: res.address.city,
          Number: res.address.buildingNumber,
          Flat: res.address.apartmentNumber,
          Postal: res.address.postCode,
        };
      }
    );
  }, []);

  useEffect(() => {
    if (serviceGet.state === ServiceState.Fetched)
      setEditData(serviceGet.result);
    if (serviceGet.state === ServiceState.Error) setShowError(true);
  }, [serviceGet.state]);

  const validateForm = () => {
    if (!EmailValidator(editData.Email)) return false;
    if (!PhoneValidator(editData.Phone)) return false;
    if (!PostalCodeValidator(editData.Postal)) return false;
    if (
      editData.Name.length == 0 ||
      editData.Surname.length == 0 ||
      editData.Street.length == 0 ||
      editData.City.length == 0 ||
      editData.Number.length == 0
    )
      return false;
    return true;
  };

  const handleEdit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      servicePut.execute!(
        putClientProfileDataConfig(userContext?.authApiKey!),
        {
          name: editData.Name,
          lastName: editData.Surname,
          email: editData.Email,
          phoneNumber: editData.Phone,
          address: {
            street: editData.Street,
            buildingNumber: editData.Number,
            apartmentNumber: editData.Flat,
            postCode: editData.Postal,
            city: editData.City,
          },
        }
      );
    }
  };

  return (
    <div>
      {serviceGet.state === ServiceState.Fetched && (
        <RegisterForm
          isForRegister={false}
          changeDataValue={changeProfileDataValue}
          validateForm={validateForm}
          handleAction={handleEdit}
          inputData={editData}
        />
      )}
      {serviceGet.state === ServiceState.InProgress && <LoadingComponent />}
      {servicePut.state === ServiceState.InProgress && <LoadingComponent />}
      {serviceGet.state === ServiceState.Error && showError && (
        <ErrorToastComponent
          message={serviceGet.error?.message!}
          closeToast={setShowError}
        />
      )}
      {servicePut.state === ServiceState.Error && showError && (
        <ErrorToastComponent
          message={servicePut.error?.message!}
          closeToast={setShowError}
        />
      )}
      {servicePut.state === ServiceState.Fetched && <div className="onSuccessEdit">Saved!</div>}
    </div>
  );
};

export default EditProfile;
