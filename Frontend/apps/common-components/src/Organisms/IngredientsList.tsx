import { useEffect, useState } from 'react'
import { APIservice } from '../Services/APIservice'
import { getProducerOrdersConfig } from '../Services/configCreator'
import React from 'react'
import { UserContextInterface } from '../Context/UserContext'
import { ServiceState } from '../Services/APIutilities'
import { LoadingComponent } from '../Atoms/LoadingComponent'
import { ErrorToastComponent } from '../Atoms/ErrorToastComponent'
import { OrderProducerModel } from '../models/OrderModel'
import Pagination from '../Molecules/Pagination'

interface IngredientWithCount {
    name: string,
    count: number,
}

interface IngredientsListProps {
    userContext: UserContextInterface | null
}

const IngredientsList = (props: IngredientsListProps) => {
    const userContext = props.userContext
    const [showError, setShowError] = useState<boolean>(false);
    const service = APIservice();
    const countService = APIservice();
    const completeService = APIservice();

    const maxItemsPerPage = 20;
    const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
    const [maxOrdersLength, setMaxOrdersLength] = useState<number>(0);

    const [ordersList, setOrdersList] = useState<Array<OrderProducerModel>>([]);
    const [totalIngredientsList, setTotalIngredientsList] = useState<Array<IngredientWithCount>>([]);

    const parseFunction = (res: Array<JSON>) => {
        const resultArray: Array<JSON> = [];
        res.forEach((item: JSON) => resultArray.push(item));
        return resultArray;
    };

    const loadOrders = () =>
        service.execute!(
            getProducerOrdersConfig(
                userContext?.authApiKey!,
                ''
            ),
            {},
            parseFunction
        );

    const getElementsCount = () => {
        countService.execute!(
            getProducerOrdersConfig(
                userContext?.authApiKey!,
                ''
            ),
            {},
            parseFunction
        );
    };

    const extractIngredients = () => {
        const ingredients = new Array<string>();

        for (var i = 0; i < ordersList.length; i++) {
            const { diets } = ordersList[i];

            for (var j = 0; j < diets.length; j++) {

                console.log({ diet: diets[j] })
                const { meals } = diets[j];

                for (var k = 0; k < meals.length; k++) {
                    const { ingredientList, allergenList } = meals[k];

                    ingredients.push(...ingredientList);
                    ingredients.push(...allergenList);
                }
            }
        }

        const grouped = ingredients.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), {});

        const ingredientCounts = [];

        for (var ingredient in grouped) {
            ingredientCounts.push({
                name: ingredient,
                count: grouped[ingredient],
            });
        }

        const result = ingredientCounts.sort(function (a, b) {
            return b.count - a.count || a.name.localeCompare(b.name);
        });

        console.log({ result });
        setTotalIngredientsList(result);
    }

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

    useEffect(() => {
        if (ordersList.length > 0) {
            extractIngredients();
        }
    }, [ordersList]);

    const getPageCount = () => Math.ceil(totalIngredientsList.length / maxItemsPerPage);

    const onPreviousPageClick = () => {
        setCurrentPageIndex(currentPageIndex - 1);
    };

    const onNextPageClick = () => {
        setCurrentPageIndex(currentPageIndex + 1);
    };

    const onNumberPageClick = (index: number) => {
        setCurrentPageIndex(index);
    };

    return (
        <div className="page-wrapper">
            <div className="ordersFilterDiv" style={{
                padding: '2vh 4vw',
            }}>
                <h1 style={{ textAlign: 'left' }}>List of all required ingredients</h1>
            </div>

            {service.state == ServiceState.Fetched && (
                <div >
                    {totalIngredientsList.slice(currentPageIndex * maxItemsPerPage, (currentPageIndex + 1) * maxItemsPerPage).map((ingredient: IngredientWithCount) => (
                        <div style={{
                            width: '60%',
                            backgroundColor: 'white',
                            border: 'solid 3px #539091',
                            borderRadius: '15px',
                            margin: '3vh auto',
                            padding: '2vh 4vw',
                            boxSizing: 'border-box',
                            fontSize: '22px',
                            display: 'flex',
                        }}>
                            <div style={{ flexGrow: 5 }}>{ingredient.name}</div>
                            <div style={{ flexGrow: 2, textAlign: 'right', }}>{`x${ingredient.count}`}</div>

                        </div>
                    ))}
                    <Pagination
                        index={currentPageIndex}
                        pageCount={getPageCount()}
                        onPreviousClick={onPreviousPageClick}
                        onNextClick={onNextPageClick}
                        onNumberClick={onNumberPageClick}
                    />
                </div>
            )
            }
            {
                (countService.state === ServiceState.InProgress ||
                    service.state === ServiceState.InProgress) && <LoadingComponent />
            }
            {
                showError && service.state === ServiceState.Error && (
                    <ErrorToastComponent
                        message={service.error?.message!}
                        closeToast={setShowError}
                    />
                )
            }
            {
                showError && countService.state === ServiceState.Error && (
                    <ErrorToastComponent
                        message={countService.error?.message!}
                        closeToast={setShowError}
                    />
                )
            }
            {
                showError && completeService.state === ServiceState.Error && (
                    <ErrorToastComponent
                        message={completeService.error?.message!}
                        closeToast={setShowError}
                    />
                )
            }
        </div >
    );
}

export default IngredientsList;