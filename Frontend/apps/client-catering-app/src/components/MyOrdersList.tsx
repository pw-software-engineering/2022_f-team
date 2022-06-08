import {
  ErrorToastComponent,
  FormInputComponent,
  LoadingComponent,
  Pagination,
  ServiceState,
  SubmitButton,
  UserContext,
} from "common-components";
import { useContext, useEffect, useState } from "react";
import { APIservice } from "../Services/APIservice";
import { OrderModel, OrderQuery, OrderComponent } from "common-components";
import { getOrdersConfig } from "../Services/configCreator";
import "../style/MyOrdersStyles.css";
import PayForOrder from "./PayForOrder";
import { Link } from "react-router-dom";

const MyOrdersList = () => {
  const userContext = useContext(UserContext);
  const [showError, setShowError] = useState<boolean>(false);
  const service = APIservice();
  const countService = APIservice();

  const maxItemsPerPage = 5;
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [maxOrdersLength, setMaxOrdersLength] = useState<number>(0);
  const [goToPayment, setGoToPayment] = useState<string | undefined>(undefined);

  const [ordersList, setOrdersList] = useState<Array<OrderModel>>([]);
  const [ordersQuery, setOrdersQuery] = useState<OrderQuery>({
    StartDate: undefined,
    EndDate: undefined,
    Price: undefined,
    Price_lt: undefined,
    Price_ht: undefined,
    Offset: currentPageIndex * maxItemsPerPage,
    Limit: maxItemsPerPage,
    Sort: "startDate(asc)",
    Status: undefined,
  });

  const addParameterIfDefined = (query: OrderQuery, key: string) => {
    const value = query[key as keyof OrderQuery];
    return value != undefined ? `&${key}=${value}` : "";
  };

  const getParametersFromQuery = (query: OrderQuery) => {
    const parameters =
      addParameterIfDefined(query, "StartDate") +
      addParameterIfDefined(query, "EndDate") +
      addParameterIfDefined(query, "Price") +
      addParameterIfDefined(query, "Price_ht") +
      addParameterIfDefined(query, "Price_lt") +
      addParameterIfDefined(query, "Sort") +
      "&Offset=" +
      currentPageIndex * maxItemsPerPage +
      addParameterIfDefined(query, "Status") +
      addParameterIfDefined(query, "Limit");

    return parameters;
  };

  const payForOrder = (value: string) => {
    setGoToPayment(value);
  };

  const parseFunction = (res: Array<JSON>) => {
    const resultArray: Array<JSON> = [];
    res.forEach((item: JSON) => resultArray.push(item));
    return resultArray;
  };

  const loadOrders = () =>
    service.execute!(
      getOrdersConfig(
        userContext?.authApiKey!,
        getParametersFromQuery(ordersQuery)
      ),
      ordersQuery,
      parseFunction
    );

  const getElementsCount = () =>{
    const query:OrderQuery={
      StartDate: ordersQuery.StartDate,
      EndDate: ordersQuery.EndDate,
      Price: ordersQuery.Price,
      Price_lt: ordersQuery.Price_lt,
      Price_ht: ordersQuery.Price_ht,
      Offset: 0,
      Limit: undefined,
      Sort: ordersQuery.Sort,
      Status: ordersQuery.Status,
    }
    countService.execute!(
      getOrdersConfig(
        userContext?.authApiKey!,
        getParametersFromQuery(query)
      ),
      query,
      parseFunction
    );
      }

  useEffect(() => {
    if(maxOrdersLength === 0) getElementsCount();
    else loadOrders();
  }, [currentPageIndex]);


  useEffect(() => {
    if (service.state === ServiceState.Fetched) {
      setOrdersList(service.result);
    }
    if (service.state === ServiceState.Error) setShowError(true);
  }, [service.state]);

  useEffect(()=>{
    if (countService.state === ServiceState.Fetched) {
      setMaxOrdersLength(countService.result.length);
      loadOrders();
    }
    if (countService.state === ServiceState.Error) setShowError(true);
  }, [countService.state]);

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

  const resetAll = () =>{
    setMaxOrdersLength(0);
    setCurrentPageIndex(0);
    getElementsCount();
  }

  return (
    <div>
      {goToPayment === undefined && (
        <div>
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
            <FormInputComponent
              label={"Price from"}
              type={"number"}
              validationText={""}
              validationFunc={() => true}
              value={String(ordersQuery.Price_ht)}
              onValueChange={(label: string, value: string) =>
                setFields({ Price_ht: value })
              }
            />
            <FormInputComponent
              label={"Price to"}
              type={"number"}
              validationText={""}
              validationFunc={(x: string) => true}
              value={String(ordersQuery.Price_lt)}
              onValueChange={(label: string, value: string) =>
                setFields({ Price_lt: value })
              }
            />
            <div className="selectInOrder">
              <label>Status:</label>
              <select
                onChange={(e) => setFields({ Status: e.target.value })}
                value={ordersQuery.Status}
              >
                <option value="0">Created</option>
                <option value="1">Waiting For Payment</option>
                <option value="2">To Be Realized</option>
                <option value="3">Paid</option>
                <option value="4">Prepared</option>
                <option value="5">Delivered</option>
                <option value="6">Finished</option>
                <option value="7">Canceled</option>
              </select>
            </div>
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
                <option value="price(asc)">price(asc)</option>
                <option value="price(desc)">price(desc)</option>
              </select>
            </div>
            <SubmitButton
              text={"Search"}
              validateForm={() => true}
              action={(e: any) => {
                resetAll()
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
                {ordersList.map((order: OrderModel) => (
                  <div>
                  <OrderComponent
                    order={order}
                    handleOnClick={(e: any, value: string) =>
                      payForOrder(value)
                    }
                  />
                  <Link to={`/complains/${order.id}`} style={{textDecoration:'none'}}><button className="complainRedirect">Complains for the above order</button></Link>
                  </div>
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
          {(countService.state === ServiceState.InProgress||
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
        </div>
      )}
      {goToPayment !== undefined && <PayForOrder orderID={goToPayment} />}
    </div>
  );
};

export default MyOrdersList;
