import React, { useState } from "react";
import { UserContextInterface } from "../Context/UserContext";
import { MealModel, MealShort } from "../models/MealModel";
import Dialog from "./Dialog";

interface SelectMealsDialogProps {
    userContext: UserContextInterface | null,
    meals: Array<MealModel>,
    selectedMeals: Array<MealShort>,
    closeModal: (res: any) => void,
    onSubmit: (selectedMeals: Array<MealShort>) => any
}

const SelectMealsDialog = (props: SelectMealsDialogProps) => {
    const [selectedMeals, setSelectedMeals] = useState<Array<MealShort>>(props.selectedMeals);

    const closeModal = () => {
        props.closeModal(false);
    }

    const onSubmit = () => {
        props.onSubmit(selectedMeals);
    }

    return (
        <Dialog title={`Select meals for your diet`}
            onClose={() => closeModal()}
            onSubmit={() => onSubmit()}
            content={<div>
                {props.meals.length > 0 && (
                    props.meals.map((meal) => {
                        const selected = selectedMeals.find((innerMeal) => innerMeal.id == meal.mealId) != undefined;
                        const checkbox = selected ? '✔️' : '➕';
                        return (
                            <button
                                className='meal-row'
                                style={{ cursor: 'pointer', backgroundColor: selected ? '#cceae8' : '#e1e1e1' }}
                                onClick={() => {
                                    if (selected) {
                                        const newSelectedMeals = selectedMeals.filter((selectedMeal) => selectedMeal.id != meal.mealId);
                                        setSelectedMeals(newSelectedMeals);
                                    } else {
                                        const newMeal = {
                                            id: meal.mealId,
                                            name: meal.name,
                                            calories: meal.calories,
                                            isVegan: meal.vegan,
                                        }

                                        const newSelectedMeals = [...selectedMeals, newMeal];

                                        setSelectedMeals(newSelectedMeals);
                                    }
                                }}
                            >
                                <p style={{ fontSize: '15px' }}>{`${checkbox} ${meal.name}`}</p>
                                <p style={{ fontSize: '15px' }}>Calories: {meal.calories} kcal</p>
                            </button>
                        );
                    })
                )}

            </div>
            }
        />
    );
}

export default SelectMealsDialog;