import { findDayDifference, FormInputComponent } from "common-components";
import { useEffect, useState } from "react";
import "../style/OrderPageStyle.css";

interface OrderPageProps {
  cartItems: Array<string>;
}
const OrderPage = (props: OrderPageProps) => {
  const [dietNames, setDietNames] = useState<string>("");

  const [orderData, setOrderData] = useState({
    From: "",
    To: ""
  });

  const changeOrderDataValue = (label: string, value: string) => {
    setOrderData({
      ...orderData,
      [label]: value,
    });
  };

  const GetDietNames = () => {
    let temp = "";
    props.cartItems.forEach((element) => {
      if (temp.length != 0) temp += ", ";
      temp += element;
    });
    setDietNames(temp);
  };
  useEffect(() => GetDietNames(), []);
  return (
    <div className="page-wrapper">
      <form>
        <h1>Make Order</h1>
        <p>
          <strong>Diets:</strong> {dietNames}
        </p>
        <FormInputComponent
          label={"From"}
          type={"date"}
          validationText={"Provide valid date."}
          validationFunc={(x: string) => findDayDifference(x) < 0 && findDayDifference(x,orderData["From"]) >= 0}
          onValueChange={changeOrderDataValue}
        />
        <FormInputComponent
          label={"To"}
          type={"date"}
          validationText={"Provide valid date."}
          validationFunc={(x: string) => findDayDifference(x) < 0 && findDayDifference(x,orderData["From"]) <= 0}
          onValueChange={changeOrderDataValue}
        />
      </form>
    </div>
  );
};

export default OrderPage;
