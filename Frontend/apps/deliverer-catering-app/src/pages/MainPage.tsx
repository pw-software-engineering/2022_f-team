import "../style/Pagination.css";
import "../style/NavbarStyle.css";
import "../style/MyOrdersStyles.css";
import "../style/DietComponentStyle.css";
import "../style/Filter.css";
import { APIservice } from "../Services/APIservice";
import { useContext, useEffect, useState } from "react";
import {
  ErrorToastComponent,
  LoadingComponent,
  OrderDelivererComponent,
  OrderDelivererModel,
  Pagination,
  ServiceState,
  UserContext,
} from "common-components";
import { getDelivererOrdersConfig, postOrderDeliverConfig } from "../Services/configCreator";

const MainPage = () => {
  const userContext = useContext(UserContext);
  const [showError, setShowError] = useState<boolean>(false);
  const service = APIservice();
  const countService = APIservice();
  const completeService = APIservice();

  const maxItemsPerPage = 5;
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [maxOrdersLength, setMaxOrdersLength] = useState<number>(0);

  const [ordersList, setOrdersList] = useState<Array<OrderDelivererModel>>([]);

  const pageOrdersList = ordersList.slice(currentPageIndex * maxItemsPerPage, (currentPageIndex + 1) * maxItemsPerPage);


  const parseFunction = (res: Array<JSON>) => {
    const resultArray: Array<JSON> = [];
    res.forEach((item: JSON) => resultArray.push(item));
    return resultArray;
  };

  const loadOrders = () =>
    service.execute!(
      getDelivererOrdersConfig(
        userContext?.authApiKey!,
        ''
      ),
      {},
      parseFunction
    );

  const getElementsCount = () => {

    countService.execute!(
      getDelivererOrdersConfig(
        userContext?.authApiKey!,
        '',
      ),
      {},
      parseFunction
    );
  };

  useEffect(() => {
    if (maxOrdersLength === 0) getElementsCount();
    else loadOrders();
  }, [currentPageIndex]);

  useEffect(() => {
    if (service.state === ServiceState.Fetched) {
      setOrdersList(service.result);
    }
    if (service.state === ServiceState.Error) setShowError(true);
  }, [service.state]);

  useEffect(() => {
    if (countService.state === ServiceState.Fetched) {
      setMaxOrdersLength(countService.result.length);
      loadOrders();
    }
    if (countService.state === ServiceState.Error) setShowError(true);
  }, [countService.state]);

  useEffect(() => {
    if (completeService.state === ServiceState.Fetched) {
      loadOrders();
    }
    if (completeService.state === ServiceState.Error) setShowError(true);
  }, [completeService.state]);

  const getPageCount = () => Math.ceil(ordersList.length / maxItemsPerPage);

  const onPreviousPageClick = () => {
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const onNextPageClick = () => {
    setCurrentPageIndex(currentPageIndex + 1);
  };

  const onNumberPageClick = (index: number) => {
    setCurrentPageIndex(index);
  };

  const completeOrder = (orderId: string) => {
    completeService.execute!(postOrderDeliverConfig(userContext!.authApiKey, orderId))
  }

  return (
    <div className="page-wrapper">
      <div className="ordersFilterDiv">
        <h1 style={{ textAlign: 'left' }}>Orders to deliver</h1>
      </div>
      {service.state == ServiceState.Fetched && (
        <div>
          {pageOrdersList.map((order: OrderDelivererModel) => (
            <OrderDelivererComponent
              order={order}
              handleOnClick={(e: any, value: string) =>
                completeOrder(value)}
            />
          ))}
        </div>
      )}
      <Pagination
        index={currentPageIndex}
        pageCount={getPageCount()}
        onPreviousClick={onPreviousPageClick}
        onNextClick={onNextPageClick}
        onNumberClick={onNumberPageClick}
      />
      {(countService.state === ServiceState.InProgress ||
        service.state === ServiceState.InProgress) && <LoadingComponent />}
      {showError && service.state === ServiceState.Error && (
        <ErrorToastComponent
          message={service.error?.message!}
          closeToast={setShowError}
        />
      )}
      {showError && countService.state === ServiceState.Error && (
        <ErrorToastComponent
          message={countService.error?.message!}
          closeToast={setShowError}
        />
      )}
      {showError && completeService.state === ServiceState.Error && (
        <ErrorToastComponent
          message={completeService.error?.message!}
          closeToast={setShowError}
        />
      )}
    </div>
  );
};

export default MainPage;
