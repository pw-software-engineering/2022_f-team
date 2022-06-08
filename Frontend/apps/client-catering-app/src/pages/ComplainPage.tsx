import {
  Complaint,
  ErrorToastComponent,
  LoadingComponent,
  OrderModel,
  ServiceState,
  SubmitButton,
  UserContext,
} from "common-components";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIservice } from "../Services/APIservice";
import { getOrdersConfig, postComplainConfig } from "../Services/configCreator";

const ComplainPage = () => {
  const { orderId } = useParams();

  const userContext = useContext(UserContext);
  const [showError, setShowError] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderModel | undefined>(undefined);
  const [complainContent, setComplainContent] = useState<string>();
  const service = APIservice();
  const orderService = APIservice();

  const getOrder = () => {
    orderService.execute!(
      getOrdersConfig(userContext?.authApiKey!, "&Offset=0"),
      {},
      (res: Array<JSON>) => {
        const resultArray: Array<JSON> = [];
        res.forEach((item: JSON) => resultArray.push(item));
        return resultArray;
      }
    );
  };

  useEffect(() => {
    getOrder();
  }, []);

  const handleComplain = () => {
    if (complainContent?.length === 0) return;
    service.execute!(postComplainConfig(userContext?.authApiKey!, orderId!), {
      complain_description: complainContent,
    });
  };

  useEffect(() => {
    if (orderService.state === ServiceState.Error) setShowError(true);
    if (orderService.state === ServiceState.Fetched) {
      setOrder(
        orderService.result.filter(
          (item: JSON) => (item as any as OrderModel).id === orderId
        )[0]
      );
    }
  }, [orderService.state]);

  useEffect(() => {
    if (service.state === ServiceState.Error) setShowError(true);
    if (service.state === ServiceState.Fetched) {
      getOrder();
    }
  }, [service.state]);

  return (
    <div className="page-wrapper">
      {order === undefined && <LoadingComponent />}
      {order !== undefined && (
        <div style={{ textAlign: "center" }}>
          <h1>Complains for order: {order.id}</h1>
          {order.complaint === null && <h3>No complains yet</h3>}
          {order.complaint !== null && order.complaint.length === 0 && (
            <div>
              <h3>No complains yet</h3>
              {order.complaint.map((c: Complaint) => (
                <div>
                  <p>{c.Description}</p>
                  <p>{c.Date}</p>
                  <p>{c.Status}</p>
                </div>
              ))}
            </div>
          )}
          <form>
            <h1>Make a complain</h1>
            <textarea
              className="complainDescription"
              onChange={(e) => setComplainContent(e.target.value)}
            />
            <div className="buttonWrapper">
              <SubmitButton
                text={"Complain"}
                validateForm={() => complainContent?.length !== 0}
                action={handleComplain}
              />
            </div>
          </form>
        </div>
      )}
      {orderService.state === ServiceState.Error && showError && (
        <ErrorToastComponent
          message={orderService.error?.message!}
          closeToast={setShowError}
        />
      )}
      {service.state === ServiceState.InProgress && <LoadingComponent />}
      {service.state === ServiceState.Error && showError && (
        <ErrorToastComponent
          message={service.error?.message!}
          closeToast={setShowError}
        />
      )}
    </div>
  );
};

export default ComplainPage;
