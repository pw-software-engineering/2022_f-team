import { findDayDifference, FormInputComponent, SubmitButton } from "common-components";
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
  const validateForm=():boolean=>{
    if(orderData.From.length ==0 || orderData.To.length==0) return false;
    if(findDayDifference(orderData.From) >= 0) return false;
    if(findDayDifference(orderData.To,orderData.From) > 0) return false;
    return true;
  }

  const handleOrder = (e: any) => {
    e.preventDefault()
  }

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
          validationFunc={(x: string) => findDayDifference(x) < 0 && findDayDifference(x,orderData.To) >= 0}
          onValueChange={changeOrderDataValue}
        />
        <FormInputComponent
          label={"To"}
          type={"date"}
          validationText={"Provide valid date."}
          validationFunc={(x: string) => findDayDifference(x) < 0 && findDayDifference(x,orderData.From) <= 0}
          onValueChange={changeOrderDataValue}
        />
        </div>
        <SubmitButton text={"Order"} validateForm={validateForm} action={handleOrder}/>
      </form>
    </div>
  );
};

export default OrderPage;
