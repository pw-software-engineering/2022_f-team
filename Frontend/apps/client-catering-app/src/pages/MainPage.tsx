import {
  ErrorToastComponent,
  LoadingComponent,
  ServiceState,
  UserContext,
  DietModel,
  Pagination,
  SearchComponent,
  FiltersWrapper,
  FiltersComponent,
  RangeFilter,
  RangeFilterOnChangeProps,
  FilterCheckbox,
  GetDietsQuery,
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

  const [dietsQuery, setDietsQuery] = useState<GetDietsQuery>({ Name: '', Name_with: '', Vegan: false, });

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

  interface FromTo {
    from?: number,
    to?: number,
  }

  const setFields = (filed: any) => {
    setDietsQuery({ ...dietsQuery, ...filed });
    console.log(dietsQuery);
  }

  return (
    <div className="page-wrapper">
      {service.state === ServiceState.Fetched &&
        <div>
          <FiltersWrapper
            search={
              <SearchComponent label={'Diets catalogue' + dietsQuery.Name} onChange={(value: string, exact: boolean) => {
                if (dietsQuery != undefined) {
                  if (exact) {
                    setFields({ 'Name': value, 'Name_with': '' });
                  }
                  else {
                    setFields({ 'Name': '', 'Name_with': value });
                  }
                }
              }} onSubmitClick={() =>
                setDietsQuery(dietsQuery)
              } />
            }
            filters={
              <FiltersComponent>
                <div style={{
                  display: 'flex',
                  paddingBottom: '20px'
                }}>
                  <div style={{
                    flexGrow: 1,
                  }}>
                    <span style={{
                      fontSize: '30px',
                      width: '100%',
                    }}>
                      Filters
                    </span>
                    <div style={{
                      display: 'inline-block',
                      width: '100%',
                      paddingTop: '10px'
                    }}>
                      <FilterCheckbox label={'Vegan'} checked={dietsQuery.Vegan ?? false} onClick={() => {
                        setFields({ 'Vegan': !dietsQuery.Vegan });
                      }} />
                    </div>
                  </div>
                  <div style={{ width: '26px' }}></div>
                  <div style={{
                    flexGrow: 1,
                  }}>
                    <span style={{
                      fontSize: '30px',
                      width: '100%',
                    }}>
                      Sort by
                    </span>
                    <div style={{
                      display: 'inline-block',
                      width: '100%',
                      paddingTop: '10px'
                    }}>
                      <FilterCheckbox label={'Vegan'} checked={dietsQuery.Vegan ?? false} onClick={() => {
                        setFields({ 'Vegan': !dietsQuery.Vegan });
                      }} />
                    </div>
                  </div>
                </div>

                <RangeFilter from={dietsQuery.Price_ht} to={dietsQuery.Price_lt} label={'Price'} onChange={(filterProps: RangeFilterOnChangeProps) => {
                  setFields({ 'Price_ht': filterProps.from, 'Price_lt': filterProps.to });
                }} />
                <RangeFilter from={dietsQuery.Calories_ht} to={dietsQuery.Calories_lt} label={'Calories'} onChange={(filterProps: RangeFilterOnChangeProps) => {
                  setFields({ 'Calories_ht': filterProps.from, 'Calories_lt': filterProps.to });
                }} />
              </FiltersComponent>
            }
          ></FiltersWrapper>

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
      {
        service.state === ServiceState.InProgress && dietsList.length == 0 && (
          <LoadingComponent />
        )
      }
      {
        showError && (
          <ErrorToastComponent
            message={service.error?.message!}
            closeToast={setShowError}
          />
        )
      }
    </div >
  );
};

export default MainPage;
