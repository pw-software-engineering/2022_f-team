import React, { useEffect, useState } from "react";
import { ErrorToastComponent } from "../Atoms/ErrorToastComponent";
import FormInputComponent from "../Atoms/FormInputComponents";
import { LoadingComponent } from "../Atoms/LoadingComponent";
import MealRow from "../Atoms/MealRow";
import { UserContextInterface } from "../Context/UserContext";
import { DietModel, EditDietModel } from "../models/DietModel";
import { MealModel, MealShort } from "../models/MealModel";
import { APIservice } from "../Services/APIservice";
import { ServiceState } from "../Services/APIutilities";
import { getDietDetailsConfig, getMealDetailsConfig } from "../Services/configCreator";
import Dialog from "./Dialog";
import EditMealDialog from "./EditMealDialog";

interface EditDietProps {
    userContext: UserContextInterface | null
    diet: DietModel
    closeModal: (res: any) => void
}

const EditDiet = (props: EditDietProps) => {
    const service = APIservice();
    const mealService = APIservice();

    const [editDietData, setEditDietData] = useState<EditDietModel>({
        id: props.diet.id,
        name: props.diet.name,
        price: props.diet.price,
        mealIds: [],
    });
    const [showError, setShowError] = useState<boolean>(false);
    const [meals, setMeals] = useState<Array<MealShort>>([]);
    const [subDialogOpened, setSubDialogOpened] = useState<boolean>(false);
    const [mealToEdit, setMealToEdit] = useState<MealModel>();

    const changeDietParamterValue = (label: string, value: string) => {
        setEditDietData({
            ...editDietData,
            [label]: value,
        });
    };

    const mealsParseFunction = (res: any) => {
        const resultArray: Array<JSON> = [];

        res.meals.forEach((item: any) => {
            resultArray.push(item);
        });

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

    useEffect(() => {
        const mealIds = Array<string>();
        meals.forEach((meal) => mealIds.push(meal.id));
        setEditDietData({ ...editDietData, 'mealIds': mealIds });
        console.log(mealIds);
    }, [meals]);


    useEffect(() => {
        if (mealService.state === ServiceState.Fetched) {
            setMealToEdit(mealService.result);
            setSubDialogOpened(true);
        }
        if (mealService.state === ServiceState.Error) {
            setShowError(true);
            setSubDialogOpened(true);
        }
    }, [mealService.state]);

    const closeModal = () => {
        props.closeModal(false)
    }

    const onMealEditClick = (meal: MealShort) => {
        mealService.execute!(
            getMealDetailsConfig(props.userContext?.authApiKey!, meal.id),
            {}
        );
    }

    const onMealDeleteClick = (meal: MealShort) => {
        const mealIds = editDietData.mealIds.filter((mealId) => mealId != meal.id)
        setEditDietData({ ...editDietData, 'mealIds': mealIds });
    }

    return (
        <div>{subDialogOpened && mealToEdit != undefined &&
            (<EditMealDialog
                userContext={props.userContext}
                meal={mealToEdit}
                closeModal={setSubDialogOpened} />)}
            <Dialog title={`Edit diet “${props.diet.name}”`}
                backdrop={!subDialogOpened}
                onClose={() => closeModal()}
                onSubmit={() => { }}
                style={{ visibility: subDialogOpened ? 'hidden' : 'visible' }}
                content={
                    <div>
                        <FormInputComponent
                            value={editDietData.name}
                            label='name'
                            name='Name'
                            onValueChange={changeDietParamterValue}
                            type='text'
                            validationText='Diet must have a name.'
                            validationFunc={(x: string) => x.length >= 0}
                        />
                        <FormInputComponent
                            value={`${editDietData.price}`}
                            label='price'
                            name='Price'
                            onValueChange={changeDietParamterValue}
                            type='number'
                            validationText='Provide valid price.'
                            validationFunc={(x: string) => x.length >= 0}
                        />
                        {
                            showError && service.state === ServiceState.Error && (
                                <ErrorToastComponent
                                    message={service.error?.message!}
                                    closeToast={setShowError}
                                />
                            )
                        }
                        <span style={{ fontSize: '25px' }}>Meals:</span>
                        {meals.length === 0 && <LoadingComponent />}
                        {meals.filter((meal) => editDietData.mealIds.includes(meal.id)).map((meal: MealShort) => (
                            <MealRow size="15px" meal={meal}
                                setMealToQuery={() => { }}
                                onEditClick={onMealEditClick}
                                onDeleteClick={onMealDeleteClick} />

                        ))}
                        <button
                            className='meal-row'
                            style={{ cursor: 'pointer', textAlign: 'center', display: 'block' }}
                            onClick={() => { }}
                        >
                            <span style={{ fontSize: '20px' }}>Add meal to diet</span>
                        </button>
                    </div>
                }
            />
        </div>
    );
}



export default EditDiet;