import {
  AddressModel,
  DeliveryDetailsModel,
  ErrorToastComponent,
  findDayDifference,
  FormInputComponent,
  LoadingComponent,
  ServiceState,
  SubmitButton,
  UserContext,
} from "common-components";
import { useContext, useEffect, useState } from "react";
import { APIservice } from "../Services/APIservice";
import {
  getClientProfileDataConfig,
  postClientOrderConfig,
} from "../Services/configCreator";

interface OrderFormProps {
  cartItems: Array<string>;
  setOrderID: React.Dispatch<React.SetStateAction<string>>;
  clearCartItems: () => void;
}
const OrderForm = (props: OrderFormProps) => {
  const clientDetailsService = APIservice();
  const userContext = useContext(UserContext);
  const [dietNames, setDietNames] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const orderService = APIservice();

  const [orderData, setOrderData] = useState({
    From: "",
    To: "",
    Comment: "",
    paymentMethod: "card",
  });

  const [clientAddressData, setClientAddressData] = useState({
    Phone: "",
    Street: "",
    City: "",
    Number: "",
    Flat: "",
    Postal: "",
  });

  const changeOrderDataValue = (label: string, value: string) => {
    setOrderData({
      ...orderData,
      [label]: value,
    });
  };

  useEffect(() => {
    GetDietNames();
    GetClientDetails();
  }, []);

  const validateForm = (): boolean => {
    if (orderData.From.length == 0 || orderData.To.length == 0) return false;
    if (findDayDifference(orderData.From) >= 0) return false;
    if (findDayDifference(orderData.To, orderData.From) >= 0) return false;
    return true;
  };

  const handleOrder = (e: any) => {
    e.preventDefault();
    orderService.execute!(
      postClientOrderConfig(userContext!.authApiKey),
      getOrderQuery()
    );
  };

  const getOrderQuery = () => {
    const address: AddressModel = {
      street: clientAddressData.Street,
      postCode: clientAddressData.Postal,
      buildingNumber: clientAddressData.Number,
      apartmentNumber: clientAddressData.Flat,
      city: clientAddressData.City,
    } as AddressModel;
    const delivery: DeliveryDetailsModel = {
      address: address,
      phoneNumber: clientAddressData.Phone,
      commentForDeliverer: orderData.Comment,
    } as DeliveryDetailsModel;
    return {
      startDate: orderData.From,
      endDate: orderData.To,
      deliveryDetails: delivery,
      dietIDs: getDietIDs(),
    };
  };

  useEffect(() => {
    if (clientDetailsService.state === ServiceState.Fetched) {
      setClientAddressData(clientDetailsService.result);
    }
    if (clientDetailsService.state === ServiceState.Error) {
      setShowError(true);
    }
  }, [clientDetailsService.state]);

  useEffect(() => {
    if (orderService.state === ServiceState.Fetched) {
      props.setOrderID(orderService.result);
      props.clearCartItems();
    }
    if (orderService.state === ServiceState.Error) {
      setShowError(true);
    }
  }, [orderService.state]);

  const recalculatePrice = () => {
    if (!validateForm()) return 0;
    let temp = 0;
    props.cartItems.forEach((element) => {
      temp += Number(element.split(":")[2]);
    });
    if (findDayDifference(orderData.From, orderData.To) <= 0) return 0;
      else return temp * findDayDifference(orderData.From, orderData.To);
  };

  const price = recalculatePrice();

  const GetDietNames = () => {
    let temp = "";
    props.cartItems.forEach((element) => {
      if (temp.length != 0) temp += ", ";
      temp += element.split(":")[1];
    });
    setDietNames(temp);
  };

  const getDietIDs = () => {
    var temp: string[] = [];
    props.cartItems.forEach((element) => {
      temp = [...temp, element.split(":")[0]];
    });
    return temp;
  };

  const GetClientDetails = () => {
    clientDetailsService.execute!(
      getClientProfileDataConfig(userContext!.authApiKey),
      "",
      (res: any) => {
        return {
          Phone: res.phoneNumber,
          Street: res.address.street,
          City: res.address.city,
          Number: res.address.buildingNumber,
          Flat: res.address.apartmentNumber,
          Postal: res.address.postCode,
        };
      }
    );
  };

  return (
    <form>
      <h1>Make Order</h1>
      <p>
        <strong>Diets:</strong> {dietNames}
      </p>
      <div className="dateWrapper">
        <FormInputComponent
          label={"From"}
          type={"date"}
          validationText={""}
          validationFunc={(x: string) =>
            findDayDifference(x) < 0 && findDayDifference(x, orderData.To) > 0
          }
          value={orderData.From}
          onValueChange={changeOrderDataValue}
        />
        <FormInputComponent
          label={"To"}
          type={"date"}
          validationText={""}
          validationFunc={(x: string) =>
            findDayDifference(x) < 0 && findDayDifference(x, orderData.From) < 0
          }
          value={orderData.To}
          onValueChange={changeOrderDataValue}
        />
      </div>
      {(findDayDifference(orderData.From) >= 0 ||
        findDayDifference(orderData.From, orderData.To) <= 0) && (
        <p
          className="validationMessage"
          style={{ marginTop: "-2vh", marginBottom: "2vh" }}
        >
          Provide valid dates.
        </p>
      )}

      <label>Payment method:</label>
      <select
        onChange={(e) => changeOrderDataValue("paymentMethod", e.target.value)}
        value={orderData.paymentMethod}
      >
        <option value="card">Card</option>
        <option value="paypal">PayPal</option>
        <option value="cash">Cash</option>
      </select>

      <div className="orderCommentInput">
        <label>Delivery comment:</label>
        <textarea
          onChange={(e) => changeOrderDataValue("Comment", e.target.value)}
        />
      </div>

      <p className="price">Price: {price}</p>
      <div className="buttonWrapper">
        <SubmitButton
          text={"Order"}
          validateForm={validateForm}
          action={handleOrder}
        />
      </div>

      {clientDetailsService.state === ServiceState.InProgress && (
        <LoadingComponent />
      )}
      {orderService.state === ServiceState.InProgress && <LoadingComponent />}
      {clientDetailsService.state === ServiceState.Error && showError && (
        <ErrorToastComponent
          message={clientDetailsService.error?.message!}
          closeToast={setShowError}
        />
      )}
      {orderService.state === ServiceState.Error && showError && (
        <ErrorToastComponent
          message={orderService.error?.message!}
          closeToast={setShowError}
        />
      )}
    </form>
  );
};

export default OrderForm;
