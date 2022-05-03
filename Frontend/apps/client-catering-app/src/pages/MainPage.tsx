import {
  ErrorToastComponent,
  LoadingComponent,
  ServiceState,
  UserContext,
  DietModel,
  Pagination,
  SearchComponent,
} from "common-components";
import { useContext, useEffect, useState } from "react";
import DietComponentWrapper from "../components/DietComponentWrapper";
import { APIservice } from "../Services/APIservice";
import { getDietsConfig } from "../Services/configCreator";
import "../style/DietComponentStyle.css";
import "../style/Pagination.css";
import "../style/Filter.css";
import "../style/NavbarStyle.css";

interface MainPageProps {
  AddToCart: (item: string) => void;
}

const MainPage = (props: MainPageProps) => {
  const maxItemsPerPage = 5;

  const service = APIservice();
  const userContext = useContext(UserContext);
  const [showError, setShowError] = useState<boolean>(false);
  const [dietsList, setDietsList] = useState<Array<DietModel>>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  const query = { Name: "", Name_with: "" };

  const parseFunction = (res: Array<JSON>) => {
    const resultArray: Array<JSON> = [];
    res.forEach((item: JSON) => resultArray.push(item));
    return resultArray;
  };

  useEffect(() => {
    service.execute!(
      getDietsConfig(userContext?.authApiKey!),
      query,
      parseFunction
    );
  }, []);

  useEffect(() => {
    if (service.state === ServiceState.Fetched) setDietsList(service.result);
    if (service.state === ServiceState.Error) setShowError(true);
  }, [service.state]);

  const getPageCount = () => Math.ceil(dietsList.length / maxItemsPerPage) + 3;

  const onPreviousPageClick = () => {
    setCurrentPageIndex(currentPageIndex - 1);
  }

  const onNextPageClick = () => {
    setCurrentPageIndex(currentPageIndex + 1);
  }

  const onNumberPageClick = (index: number) => {
    setCurrentPageIndex(index);
  }

  return (
    <div className="page-wrapper">
      {service.state === ServiceState.Fetched &&
        <div>
          <SearchComponent onFiltersChange={() => { }} onSubmitClick={() => { }} />
          {dietsList.map((item) => (
            <DietComponentWrapper key={`item-${item.id}`} diet={item} addToCartFunction={props.AddToCart} />
          ))}
          <Pagination index={currentPageIndex} pageCount={getPageCount()}
            onPreviousClick={onPreviousPageClick}
            onNextClick={onNextPageClick}
            onNumberClick={onNumberPageClick}
          />
        </div>
      }
      {service.state === ServiceState.InProgress && dietsList.length == 0 && (
        <LoadingComponent />
      )}
      {showError && (
        <ErrorToastComponent
          message={service.error?.message!}
          closeToast={setShowError}
        />
      )}
    </div>
  );
};

export default MainPage;
