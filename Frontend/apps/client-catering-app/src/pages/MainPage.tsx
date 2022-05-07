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
  Select,
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

  const [dietsQuery, setDietsQuery] = useState<GetDietsQuery>(
    {
      Name: '',
      Name_with: '',
      Vegan: undefined,
      Calories: undefined,
      Calories_ht: 700,
      Calories_lt: 1000,
      Price: undefined,
      Price_ht: undefined,
      Price_lt: undefined
    }
  );

  const parseFunction = (res: Array<JSON>) => {
    console.log(res);
    const resultArray: Array<JSON> = [];
    res.forEach((item: JSON) => resultArray.push(item));
    return resultArray;
  };

  const loadDiets = (query: any) => {
    console.log({ query });
    console.log(userContext?.authApiKey)

    service.execute!(
      getDietsConfig(userContext?.authApiKey!),
      {
        "Name": '',
        "Name_with": '',
        "Vegan": false,
        "Calories": null,
        "Calories_ht": 707,
        "Calories_lt": 1000,
        "Price": null,
        "Price_ht": null,
        "Price_lt": null
      },
      parseFunction
    );
  }

  useEffect(() => {
    loadDiets(dietsQuery);
  }, []);

  useEffect(() => {
    if (service.state === ServiceState.Fetched) setDietsList(service.result);
    if (service.state === ServiceState.Error) setShowError(true);

    if (service.state === ServiceState.Fetched) {
      // console.log(service.state);
      console.log(service.result);
    }

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

  const setFields = (fields: any) => {
    setDietsQuery({ ...dietsQuery, ...fields });
    console.log(dietsQuery);
  }

  const [searchExact, setSearchExact] = useState<boolean>(false);

  return (
    <div className="page-wrapper">
      {service.state === ServiceState.Fetched &&
        <div>
          <FiltersWrapper
            search={
              <SearchComponent label={'Diets catalogue' + dietsQuery.Name} onChange={(value: string) => {
                if (dietsQuery != undefined) {
                  if (searchExact) {
                    setFields({ 'Name': value, 'Name_with': '' });
                  }
                  else {
                    setFields({ 'Name': '', 'Name_with': value });
                  }
                }
              }} onSubmitClick={() => {
                // setDietsQuery(dietsQuery);
                loadDiets(dietsQuery);
              }
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
                      // display: 'inline-block',
                      width: '100%',
                      paddingTop: '10px',
                      display: 'flex',
                      flexWrap: 'nowrap'
                    }}>
                      <FilterCheckbox label={'Vegan'} checked={dietsQuery.Vegan ?? false} onClick={() => {
                        setFields({ 'Vegan': dietsQuery.Vegan === undefined ? true : undefined });
                      }} />

                      <FilterCheckbox
                        checked={searchExact}
                        onClick={() => {
                          setSearchExact(!searchExact)
                        }}
                        label={'Search exact'}
                      />
                    </div>
                  </div>
                  {/* <div style={{ width: '56px' }}></div> */}
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
                      <Select onChange={(value: string) => { }}>
                        <option value='title(asc)'>Title A-Z</option>
                        <option value='title(desc)'>Title Z-A</option>
                        <option value='calories(asc)'>Calories low-high</option>
                        <option value='calories(desc)'>Calories high-low</option>
                        <option value='price(asc)'>Price low-high</option>
                        <option value='price(desc)'>Price high-low</option>
                      </Select>
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
