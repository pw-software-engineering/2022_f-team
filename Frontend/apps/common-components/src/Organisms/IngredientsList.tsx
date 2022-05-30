import { useEffect, useState } from 'react'
import DietComponentWrapper from '../Molecules/DietComponentWrapper'
import { APIservice } from '../Services/APIservice'
import { getDietsConfig } from '../Services/configCreator'
import React from 'react'
import { UserContextInterface } from '../Context/UserContext'
import { DietModel, GetDietsQuery } from '../models/DietModel'
import { ServiceState } from '../Services/APIutilities'
import { LoadingComponent } from '../Atoms/LoadingComponent'
import { ErrorToastComponent } from '../Atoms/ErrorToastComponent'

interface IngredientsListProps {
    onDietButtonClick: (item: string, diet: DietModel) => any
    userContext: UserContextInterface | null
    dietButtonLabel?: string
}

const IngredientsList = (props: IngredientsListProps) => {
    const maxItemsPerPage = 5

    const service = APIservice()
    const countService = APIservice();
    const userContext = props.userContext
    const [showError, setShowError] = useState<boolean>(false)
    const [dietsList, setDietsList] = useState<Array<DietModel>>([])
    const dietsQuery = {
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
        Limit: maxItemsPerPage
    };

    const parseFunction = (res: Array<JSON>) => {
        const resultArray: Array<JSON> = []
        res.forEach((item: JSON) => resultArray.push(item))
        return resultArray
    }

    const getParametersFromQuery = (query: GetDietsQuery) => {
        const parameters = `Name=${query.Name}`

        return parameters
    }

    const loadDiets = () => {
        const parameters = getParametersFromQuery(dietsQuery)
        const url = getDietsConfig(userContext?.authApiKey!, parameters)
        service.execute!(url, dietsQuery, parseFunction)
    }

    useEffect(() => {
        if (service.state === ServiceState.Fetched) {
            setDietsList(service.result);
            console.log(dietsList);
        }
        if (service.state === ServiceState.Error) setShowError(true);
    }, [service.state]);

    useEffect(() => {
        loadDiets();
    }, []);


    return (
        <div className='page-wrapper'>
            <div>
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
            </div>
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
        </div>
    )
}

export default IngredientsList
