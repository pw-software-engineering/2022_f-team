import {
  findDayDifference,
  FormInputComponent,
  SubmitButton,
} from "common-components";
import { useEffect, useState } from "react";
import { APIservice } from "../Services/APIservice";
import "../style/OrderPageStyle.css";

interface OrderPageProps {
  cartItems: Array<string>;
}
const OrderPage = (props: OrderPageProps) => {
  const [dietNames, setDietNames] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const service = APIservice();

  const [orderData, setOrderData] = useState({
    From: "",
    To: "",
    Comment: "",
    paymentMethod: "card",
  });

  const changeOrderDataValue = (label: string, value: string) => {
    setOrderData({
      ...orderData,
      [label]: value,
    });
    if (label === "From" || label === "To") recalculatePrice(label, value);
  };

  const recalculatePrice = (label:string, value:string) => {
    if (!validateForm()) return;
    let temp = 0;
    props.cartItems.forEach((element) => {
      temp += Number(element.split(":")[2]);
    });
    if(label === "From") setPrice(temp * findDayDifference(value, orderData.To));
    else setPrice(temp * findDayDifference(orderData.From, value));
  };

  const GetDietNames = () => {
    let temp = "";
    props.cartItems.forEach((element) => {
      if (temp.length != 0) temp += ", ";
      temp += element.split(":")[1];
    });
    setDietNames(temp);
  };

  useEffect(() => GetDietNames(), []);

  const validateForm = (): boolean => {
    if (orderData.From.length == 0 || orderData.To.length == 0) return false;
    if (findDayDifference(orderData.From) >= 0) return false;
    if (findDayDifference(orderData.To, orderData.From) > 0) return false;
    return true;
  };

  const handleOrder = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="page-wrapper">
      <form>
        <h1>Make Order</h1>
        <p>
          <strong>Diets:</strong> {dietNames}
        </p>
        <div className="dateWrapper">
          <FormInputComponent
            label={"From"}
            type={"date"}
            validationText={"Provide valid date."}
            validationFunc={(x: string) =>
              findDayDifference(x) < 0 &&
              findDayDifference(x, orderData.To) >= 0
            }
            onValueChange={changeOrderDataValue}
          />
          <FormInputComponent
            label={"To"}
            type={"date"}
            validationText={"Provide valid date."}
            validationFunc={(x: string) =>
              findDayDifference(x) < 0 &&
              findDayDifference(x, orderData.From) <= 0
            }
            onValueChange={changeOrderDataValue}
          />
        </div>

        <label>Payment method:</label>
        <select
          onChange={(e) =>
            changeOrderDataValue("paymentMethod", e.target.value)
          }
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
      </form>
    </div>
  );
};

export default OrderPage;
