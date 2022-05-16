import { useState } from "react";
import OrderForm from "../components/OrderForm";
import PayForOrder from "../components/PayForOrder";
import "../style/OrderPageStyle.css";

interface OrderPageProps {
  cartItems: Array<string>;
  clearCartItems: () => void;
}
const OrderPage = (props: OrderPageProps) => {
  const [orderID, setOrderID] = useState<string>("");

  return (
    <div className="page-wrapper">
      {orderID.length === 0 && (
        <OrderForm
          cartItems={props.cartItems}
          setOrderID={setOrderID}
          clearCartItems={props.clearCartItems}
        />
      )}
      {orderID.length > 0 && <PayForOrder orderID={orderID} />}
    </div>
  );
};

export default OrderPage;
