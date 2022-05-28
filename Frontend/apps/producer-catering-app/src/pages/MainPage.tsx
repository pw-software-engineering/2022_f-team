import "../style/Pagination.css";
import "../style/NavbarStyle.css";
import "../style/MyOrdersStyles.css";
import { APIservice } from "../Services/APIservice";
import { useContext, useEffect, useState } from "react";
import {
  ErrorToastComponent,
  FormInputComponent,
  LoadingComponent,
  OrderProducerComponent,
  OrderProducerModel,
  OrderProducerQuery,
  Pagination,
  ServiceState,
  SubmitButton,
  UserContext,
} from "common-components";
import { getProducerOrdersConfig, postOrderCompleteConfig } from "../Services/configCreator";

const MainPage = () => {
  const userContext = useContext(UserContext);
  const [showError, setShowError] = useState<boolean>(false);
  const service = APIservice();
  const countService = APIservice();
  const completeService = APIservice();

  const maxItemsPerPage = 5;
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [maxOrdersLength, setMaxOrdersLength] = useState<number>(0);

  const [ordersList, setOrdersList] = useState<Array<OrderProducerModel>>([]);
  const [ordersQuery, setOrdersQuery] = useState<OrderProducerQuery>({
    StartDate: undefined,
    EndDate: undefined,
    Offset: currentPageIndex * maxItemsPerPage,
    Limit: maxItemsPerPage,
    Sort: "startDate(asc)",
  });

  const addParameterIfDefined = (query: OrderProducerQuery, key: string) => {
    const value = query[key as keyof OrderProducerQuery];
    return value != undefined ? `&${key}=${value}` : "";
  };

  const getParametersFromQuery = (query: OrderProducerQuery) => {
    const parameters =
      addParameterIfDefined(query, "StartDate") +
      addParameterIfDefined(query, "EndDate") +
      addParameterIfDefined(query, "Sort") +
      "&Offset=" +
      currentPageIndex * maxItemsPerPage +
      addParameterIfDefined(query, "Limit");
    return parameters;
  };

  const parseFunction = (res: Array<JSON>) => {
    const resultArray: Array<JSON> = [];
    res.forEach((item: JSON) => resultArray.push(item));
    return resultArray;
  };

  const loadOrders = () =>
    service.execute!(
      getProducerOrdersConfig(
        userContext?.authApiKey!,
        getParametersFromQuery(ordersQuery)
      ),
      ordersQuery,
      parseFunction
    );

  const getElementsCount = () => {
    const query: OrderProducerQuery = {
      StartDate: ordersQuery.StartDate,
      EndDate: ordersQuery.EndDate,
      Offset: 0,
      Limit: undefined,
      Sort: ordersQuery.Sort,
    };
    countService.execute!(
      getProducerOrdersConfig(
        userContext?.authApiKey!,
        getParametersFromQuery(query)
      ),
      query,
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

  const getPageCount = () => Math.ceil(maxOrdersLength / maxItemsPerPage);

  const onPreviousPageClick = () => {
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const onNextPageClick = () => {
    setCurrentPageIndex(currentPageIndex + 1);
  };

  const onNumberPageClick = (index: number) => {
    setCurrentPageIndex(index);
  };

  const setFields = (fields: any) => {
    setOrdersQuery({ ...ordersQuery, ...fields });
  };

  const resetAll = () => {
    setMaxOrdersLength(0);
    setCurrentPageIndex(0);
    getElementsCount();
  };

  const completeOrder=(orderId:string)=>{
    completeService.execute!(postOrderCompleteConfig(userContext!.authApiKey,orderId))
  }

  return (
    <div className="page-wrapper">
        <div className="ordersFilterDiv">
          <FormInputComponent
            label={"Start date"}
            type={"date"}
            validationText={""}
            validationFunc={(x: string) => true}
            value={ordersQuery.StartDate}
            onValueChange={(label: string, value: string) =>
              setFields({ StartDate: value })
            }
          />
          <FormInputComponent
            label={"End date"}
            type={"date"}
            validationText={""}
            validationFunc={() => true}
            value={ordersQuery.EndDate}
            onValueChange={(label: string, value: string) =>
              setFields({ EndDate: value })
            }
          />
          <div className="selectInOrder">
            <label>Sort:</label>
            <select
              onChange={(e) => setFields({ Sort: e.target.value })}
              value={ordersQuery.Sort}
            >
              <option value="startDate(asc)">startDate(asc)</option>
              <option value="startDate(desc)">startDate(desc)</option>
              <option value="endDate(asc)">endDate(asc)</option>
              <option value="endDate(asc)">endDate(desc)</option>
              <option value="orderId(asc)">orderId(asc)</option>
              <option value="orderId(desc)">orderId(desc)</option>
            </select>
          </div>
          <SubmitButton
            text={"Search"}
            validateForm={() => true}
            action={(e: any) => {
              resetAll();
            }}
            style={{
              height: "auto",
              padding: "1vh 2vw",
              fontSize: "1.8vh",
              color: "white",
              fontWeight: "600",
              marginBottom: "0.5vh",
              marginTop: "3vh",
              gridColumn: "1/3",
            }}
          />
        </div>

        {ordersQuery.Limit !== undefined &&
          service.state == ServiceState.Fetched && (
            <div>
              {ordersList.map((order: OrderProducerModel) => (
                <OrderProducerComponent
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
