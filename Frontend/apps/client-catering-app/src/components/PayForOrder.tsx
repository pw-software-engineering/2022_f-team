import {
  ErrorToastComponent,
  LoadingComponent,
  ServiceState,
  UserContext,
} from "common-components";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIservice } from "../Services/APIservice";
import { postPayForOrderConfig } from "../Services/configCreator";

interface PayForOrderProps {
  orderID: string;
}

const PayForOrder = (props: PayForOrderProps) => {
  const service = APIservice();
  const userContext = useContext(UserContext);
  const [showError, setShowError] = useState<boolean>(false);
  const [payed, setPayed] = useState<boolean>(false);

  const payForOrder = (e: any) => {
    e.preventDefault();
    service.execute!(
      postPayForOrderConfig(userContext!.authApiKey, props.orderID),
      ""
    );
  };

  useEffect(() => {
    if (service.state === ServiceState.Error) {
      setShowError(true);
    }
    if (service.state === ServiceState.Fetched) {
      setPayed(true);
    }
  }, [service.state]);

  return (
    <div className="payForOrderDiv">
      {!payed && (
        <div>
          <h1>You have ordered!</h1>
          <p>Your order id: {props.orderID}</p>
          <div>
            <button onClick={(e: any) => payForOrder(e)}>Pay for order</button>
          </div>
          <div>
            <Link to="/">
              <button>Back to main page</button>
            </Link>
          </div>
        </div>
      )}
      {service.state === ServiceState.InProgress && <LoadingComponent />}
      {service.state === ServiceState.Error && showError && (
        <ErrorToastComponent
          message={service.error?.message!}
          closeToast={setShowError}
        />
      )}
      {payed && (
        <div>
          <h1>You have payed!</h1>
          <div>
            <Link to="/">
              <button>Back to main page</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayForOrder;
