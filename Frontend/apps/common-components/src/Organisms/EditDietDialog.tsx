import React, { useEffect, useState } from "react";
import { ErrorToastComponent } from "../Atoms/ErrorToastComponent";
import FormInputComponent from "../Atoms/FormInputComponents";
import { LoadingComponent } from "../Atoms/LoadingComponent";
import MealRow from "../Atoms/MealRow";
import { UserContextInterface } from "../Context/UserContext";
import { DietModel } from "../models/DietModel";
import { MealShort } from "../models/MealModel";
import { APIservice } from "../Services/APIservice";
import { ServiceState } from "../Services/APIutilities";
import { getDietDetailsConfig } from "../Services/configCreator";

interface EditDietProps {
    userContext: UserContextInterface | null
    diet: DietModel
    closeModal: (res: any) => void
}

const EditDiet = (props: EditDietProps) => {
    const service = APIservice();

    useEffect(() => {

    }, []);

    // let mealService = APIservice();

    const [dietParamters, setDietParameters] = useState<DietModel>(props.diet);

    const [showError, setShowError] = useState<boolean>(false);
    const [meals, setMeals] = useState<Array<MealShort>>([]);

    // const [mealToDisplay, setMealToDisplay] = useState<MealModel | undefined>(
    //     undefined
    // );

    const changeDietParamterValue = (label: string, value: string) => {
        setDietParameters({
            ...dietParamters,
            [label]: value,
        });

        console.log({
            ...dietParamters,
            [label]: value,
        })
    };

    const mealsParseFunction = (res: any) => {
        const resultArray: Array<JSON> = [];
        res.meals.forEach((item: any) => resultArray.push(item));
        return resultArray;
    };

    const getMeals = (dietId: string) => {
        service.execute!(
            getDietDetailsConfig(props.userContext?.authApiKey!, dietId),
            {},
            mealsParseFunction
        );
    };

    useEffect(() => {
        getMeals(props.diet.id);
    }, []);

    useEffect(() => {
        if (service.state === ServiceState.Fetched) setMeals(service.result);
        if (service.state === ServiceState.Error) setShowError(true);
    }, [service.state]);

    // const queryForMeal = (mealId: string) => {
    //     mealService.execute!(
    //         getMealDetailsConfig(props.userContext?.authApiKey!, mealId),
    //         {}
    //     );
    // };

    // useEffect(() => {
    //     if (mealService.state === ServiceState.Fetched)
    //         setMealToDisplay(mealService.result);
    //     if (mealService.state === ServiceState.Error) setShowError(true);
    // }, [mealService.state]);

    const closeModal = () => {
        props.closeModal(false)
    }

    return (
        <div>
            <div className='shadowPanel' style={{ position: 'fixed', zIndex: 99 }} />
            <div style={{
                position: 'fixed',
                zIndex: 100,
                backgroundColor: '#ffffff',
                border: 'solid 2px #539091',
                borderRadius: '15px',
                width: '50%',
                left: '25%',
                top: '20%',
                padding: '3vh 4vw',
                boxSizing: 'border-box'
            }}>
                <div className='meal-header-div'>
                    <span style={{ fontSize: '30px' }}>Edit diet “{props.diet.name}”</span>
                    <button onClick={() => closeModal()}>X</button>
                </div>
                <FormInputComponent
                    value={dietParamters.name}
                    label='name'
                    name='Name'
                    onValueChange={changeDietParamterValue}
                    type='text'
                    validationText='Diet must have a name.'
                    validationFunc={(x: string) => x.length >= 0}
                />
                <FormInputComponent
                    // value={dietParamters.vegan}
                    label='vegan'
                    name='Vegan'
                    onValueChange={changeDietParamterValue}
                    type='checkbox'
                    validationText='Is it vegan?'
                    validationFunc={(_: string) => true}
                />
                <FormInputComponent
                    value={`${dietParamters.price}`}
                    label='price'
                    name='Price'
                    onValueChange={changeDietParamterValue}
                    type='number'
                    validationText='Provide valid price.'
                    validationFunc={(x: string) => x.length >= 0}
                />
                <div className="orderCommentInput">
                    <label>Description:</label>
                    <textarea
                        style={{
                            width: '100%',
                            marginTop: '20px',
                        }}
                        value={dietParamters.description}
                        onChange={(e) => changeDietParamterValue("description", e.target.value)}
                    />
                </div>
                {showError && service.state === ServiceState.Error && (
                    <ErrorToastComponent
                        message={service.error?.message!}
                        closeToast={setShowError}
                    />
                )}
                <div className='mealsDiv'>
                    <h2>Meals:</h2>
                    {meals.length === 0 && <LoadingComponent />}
                    {meals.map((meal: MealShort) => (
                        <MealRow meal={meal} setMealToQuery={() => { }} />
                    ))}
                </div>
            </div>
        </div >
    );
}

export default EditDiet;