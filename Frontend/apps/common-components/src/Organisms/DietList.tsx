import { useEffect, useState } from 'react'
import DietComponentWrapper from '../Molecules/DietComponentWrapper'
import { APIservice } from '../Services/APIservice'
import { getDietsConfig } from '../Services/configCreator'
import React from 'react'
import { UserContextInterface } from '../Context/UserContext'
import { DietModel, GetDietsQuery } from '../models/DietModel'
import { ServiceState } from '../Services/APIutilities'
import FiltersWrapper from '../Molecules/FiltersWrapper'
import SearchComponent from '../Molecules/SearchComponent'
import {
  FiltersComponent,
  RangeFilter,
  RangeFilterOnChangeProps
} from '../Molecules/AdvancedFilters'
import FilterCheckbox from '../Atoms/FilterCheckbox'
import Select from '../Atoms/Select'
import { LoadingComponent } from '../Atoms/LoadingComponent'
import Pagination from '../Molecules/Pagination'
import { ErrorToastComponent } from '../Atoms/ErrorToastComponent'

interface DietListProps {
  onDietButtonClick: (item: string, diet: DietModel) => any
  userContext: UserContextInterface | null
  dietButtonLabel?: string
}

const DietList = (props: DietListProps) => {
  const maxItemsPerPage = 5

  const service = APIservice()
  const userContext = props.userContext
  const [showError, setShowError] = useState<boolean>(false)
  const [dietsList, setDietsList] = useState<Array<DietModel>>([])
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0)
  const [maxListLength, setMaxListLength] = useState<number>(0)
  const [dietsQuery, setDietsQuery] = useState<GetDietsQuery>({
    Name: '',
    Name_with: '',
    Vegan: undefined,
    Calories: undefined,
    Calories_ht: undefined,
    Calories_lt: undefined,
    Price: undefined,
    Price_ht: undefined,
    Price_lt: undefined,
    Sort: 'title(asc)',
    Limit: undefined
  })

  const parseFunction = (res: Array<JSON>) => {
    const resultArray: Array<JSON> = []
    res.forEach((item: JSON) => resultArray.push(item))
    return resultArray
  }

  const addParameterIfDefined = (query: GetDietsQuery, key: string) => {
    const value = query[key as keyof GetDietsQuery]
    return value != undefined ? `&${key}=${value}` : ''
  }

  const getParametersFromQuery = (query: GetDietsQuery) => {
    const parameters =
      `Name=${query.Name}` +
      addParameterIfDefined(query, 'Name_with') +
      addParameterIfDefined(query, 'Vegan') +
      addParameterIfDefined(query, 'Calories') +
      addParameterIfDefined(query, 'Calories_ht') +
      addParameterIfDefined(query, 'Calories_lt') +
      addParameterIfDefined(query, 'Price') +
      addParameterIfDefined(query, 'Price_ht') +
      addParameterIfDefined(query, 'Price_lt') +
      addParameterIfDefined(query, 'Sort') +
      '&Offset=' +
      currentPageIndex * maxItemsPerPage +
      addParameterIfDefined(query, 'Limit')

    return parameters
  }

  const loadDiets = (query: GetDietsQuery) => {
    const parameters = getParametersFromQuery(query)
    const url = getDietsConfig(userContext?.authApiKey!, parameters)
    service.execute!(url, query, parseFunction)
  }

  useEffect(() => {
    loadDiets(dietsQuery)
  }, [currentPageIndex])

  useEffect(() => {
    if (service.state === ServiceState.Fetched) {
      if (maxListLength === 0) {
        setMaxListLength(service.result.length)
        setFields({ Limit: maxItemsPerPage })
      } else setDietsList(service.result)
    }
    if (service.state === ServiceState.Error) setShowError(true)
  }, [service.state])

  useEffect(() => {
    if (dietsQuery.Limit !== undefined) loadDiets(dietsQuery);
  }, [dietsQuery.Limit]);

  const getPageCount = () => Math.ceil(maxListLength / maxItemsPerPage)

  const onPreviousPageClick = () => {
    setCurrentPageIndex(currentPageIndex - 1)
  }

  const onNextPageClick = () => {
    setCurrentPageIndex(currentPageIndex + 1)
  }

  const onNumberPageClick = (index: number) => {
    setCurrentPageIndex(index)
  }

  const setFields = (fields: any) => {
    setDietsQuery({ ...dietsQuery, ...fields })
  }

  const [searchExact, setSearchExact] = useState<boolean>(false)
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')

  return (
    <div className='page-wrapper'>
      <div>
        <FiltersWrapper
          onClick={() => setShowFilters(!showFilters)}
          search={
            <SearchComponent
              value={searchValue}
              label={'Diets catalogue'}
              onChange={(value: string) => {
                if (dietsQuery != undefined) {
                  if (searchExact) {
                    setFields({ Name: value, Name_with: '' })
                  } else {
                    setFields({ Name: '', Name_with: value })
                  }
                }

                setSearchValue(value)
              }}
              onSubmitClick={() => {
                setCurrentPageIndex(0);
                loadDiets(dietsQuery)
              }}
            />
          }
          filters={
            showFilters && (
              <FiltersComponent>
                <div
                  style={{
                    display: 'flex',
                    paddingBottom: '20px'
                  }}
                >
                  <div
                    style={{
                      flexGrow: 1
                    }}
                  >
                    <span
                      style={{
                        fontSize: '18px',
                        width: '100%'
                      }}
                    >
                      Filters
                    </span>
                    <div
                      style={{
                        width: '100%',
                        paddingTop: '10px',
                        display: 'flex',
                        flexWrap: 'nowrap'
                      }}
                    >
                      <FilterCheckbox
                        label={'Vegan'}
                        checked={dietsQuery.Vegan ?? false}
                        onClick={() => {
                          setFields({
                            Vegan:
                              dietsQuery.Vegan === undefined ? true : undefined
                          })
                        }}
                      />

                      <FilterCheckbox
                        checked={searchExact}
                        onClick={() => {
                          setSearchExact(!searchExact)
                        }}
                        label={'Search exact'}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      flexGrow: 1,
                      paddingLeft: '20px'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '18px',
                        width: '100%'
                      }}
                    >
                      Sort by
                    </span>
                    <div
                      style={{
                        display: 'inline-block',
                        width: '100%',
                        paddingTop: '10px'
                      }}
                    >
                      <Select
                        value={dietsQuery.Sort}
                        onChange={(value: string) => setFields({ Sort: value })}
                      >
                        <option value='title(asc)'>Title A-Z</option>
                        <option value='title(desc)'>Title Z-A</option>
                        <option value='calories(asc)'>Calories low-high</option>
                        <option value='calories(desc)'>
                          Calories high-low
                        </option>
                        <option value='price(asc)'>Price low-high</option>
                        <option value='price(desc)'>Price high-low</option>
                      </Select>
                    </div>
                  </div>
                </div>

                <RangeFilter
                  from={dietsQuery.Price_ht}
                  to={dietsQuery.Price_lt}
                  label={'Price'}
                  onChange={(filterProps: RangeFilterOnChangeProps) => {
                    setFields({
                      Price_ht: filterProps.from,
                      Price_lt: filterProps.to
                    })
                  }}
                />
                <RangeFilter
                  from={dietsQuery.Calories_ht}
                  to={dietsQuery.Calories_lt}
                  label={'Calories'}
                  onChange={(filterProps: RangeFilterOnChangeProps) => {
                    setFields({
                      Calories_ht: filterProps.from,
                      Calories_lt: filterProps.to
                    })
                  }}
                />
              </FiltersComponent>
            )
          }
        ></FiltersWrapper>

        {service.state === ServiceState.Fetched &&
          dietsList.map((item, index) => (
            <DietComponentWrapper
              key={`item-${item.id}${index}`}
              userContext={props.userContext}
              diet={item}
              onButtonClick={(value: string) => {
                props.onDietButtonClick(value, item)
              }}
              buttonLabel={props.dietButtonLabel}
            />
          ))}
        <Pagination
          index={currentPageIndex}
          pageCount={getPageCount()}
          onPreviousClick={onPreviousPageClick}
          onNextClick={onNextPageClick}
          onNumberClick={onNumberPageClick}
        />
      </div>
      {(dietsQuery.Limit === undefined ||
        service.state === ServiceState.InProgress) && <LoadingComponent />}
      {showError && (
        <ErrorToastComponent
          message={service.error?.message!}
          closeToast={setShowError}
        />
      )}
    </div>
  )
}

export default DietList
