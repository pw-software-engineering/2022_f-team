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
import { getDietDetailsConfig, getMealDetailsConfig, getMealsConfig, putMealDetailsConfig } from "../Services/configCreator";
import Dialog from "./Dialog";
import EditMealDialog from "./EditMealDialog";
import SelectMealsDialog from "./SelectMeals";

interface EditDietProps {
    userContext: UserContextInterface | null
    diet: DietModel
    closeModal: (res: any) => void
    onSubmit: (selectedMeals: EditDietModel) => any
}

const EditDiet = (props: EditDietProps) => {
    const service = APIservice();
    const mealService = APIservice();
    const editMealService = APIservice();
    const mealsService = APIservice();

    const [editDietData, setEditDietData] = useState<EditDietModel>({
        id: props.diet.id,
        name: props.diet.name,
        price: props.diet.price,
        mealIds: [],
    });
    const [showError, setShowError] = useState<boolean>(false);
    const [meals, setMeals] = useState<Array<MealShort>>([]);
    const [allMeals, setAllMeals] = useState<Array<MealModel>>([]);
    const [editMealDialogOpened, setEditMealDialogOpened] = useState<boolean>(false);
    const [selectMealsDialogOpened, setSelectMealsDialogOpened] = useState<boolean>(false);
    const [mealToEdit, setMealToEdit] = useState<MealModel>();

    const changeDietParamterValue = (label: string, value: any) => {
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
        setSelectMealsDialogOpened(false);
    }, [editDietData.mealIds]);

    useEffect(() => {
        if (service.state === ServiceState.Fetched) setMeals(service.result);
        if (service.state === ServiceState.Error) setShowError(true);
    }, [service.state]);

    useEffect(() => {
        const mealIds = Array<string>();
        meals.forEach((meal) => mealIds.push(meal.id));
        setEditDietData({ ...editDietData, 'mealIds': mealIds });
    }, [meals]);

    useEffect(() => {
        if (mealService.state === ServiceState.Fetched) {
            setMealToEdit(mealService.result);
            setEditMealDialogOpened(true);
        }
        if (mealService.state === ServiceState.Error) {
            setShowError(true);
        }
    }, [mealService.state]);

    const closeModal = () => {
        props.closeModal(false)
    }

    const onSubmit = () => {
        props.onSubmit(editDietData);
    }

    const onMealEditClick = (meal: MealShort) => {
        mealService.execute!(
            getMealDetailsConfig(props.userContext?.authApiKey!, meal.id),
            {}
        );
    }

    const onMealDeleteClick = (meal: MealShort) => {
        const newMeals = meals.filter((innerMeal) => innerMeal.id != meal.id);
        setMeals(newMeals);
    }

    const parseFunction = (res: Array<JSON>) => {
        const resultArray: Array<JSON> = [];
        res.forEach((item: JSON) => resultArray.push(item));
        return resultArray;
    };

    const onSelectMealsClick = () => {
        mealsService.execute!(
            getMealsConfig(props.userContext?.authApiKey!, ''),
            {},
            parseFunction
        );
    }

    useEffect(() => {
        if (mealsService.state === ServiceState.Fetched) {
            setAllMeals(mealsService.result);
            setSelectMealsDialogOpened(true);
        }
        if (mealsService.state === ServiceState.Error) setShowError(true);
    }, [mealsService.state]);

    const onSelectedMealsSubmit = (selectedMeals: Array<MealShort>) => {
        changeDietParamterValue('mealIds', selectedMeals.map((meal) => meal.id));

        setMeals(selectedMeals);
    }

    const onMealEditSubmit = (editedMeal: MealModel) => {
        editMealService.execute!(putMealDetailsConfig(props.userContext?.authApiKey!, editedMeal.mealId),
            editedMeal,
        );
        setEditMealDialogOpened(false);
    }

    const subDialogOpened = editMealDialogOpened || selectMealsDialogOpened;

    return (
        <div>{editMealDialogOpened && mealToEdit != undefined &&
            (<EditMealDialog
                userContext={props.userContext}
                meal={mealToEdit}
                closeModal={setEditMealDialogOpened}
                onSubmit={onMealEditSubmit}
            />)}
            {selectMealsDialogOpened && allMeals.length > 0 &&
                (<SelectMealsDialog
                    userContext={props.userContext}
                    meals={allMeals}
                    selectedMeals={meals}
                    closeModal={setSelectMealsDialogOpened}
                    onSubmit={onSelectedMealsSubmit}
                />)}
            <Dialog title={`Edit diet “${props.diet.name}”`}
                backdrop={!subDialogOpened}
                onClose={() => closeModal()}
                onSubmit={() => onSubmit()}
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
                            onClick={() => onSelectMealsClick()}
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