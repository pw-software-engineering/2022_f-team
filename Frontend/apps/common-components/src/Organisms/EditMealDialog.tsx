import React, { useState } from "react";
import FormInputComponent from "../Atoms/FormInputComponents";
import { UserContextInterface } from "../Context/UserContext";
import { MealModel } from "../models/MealModel";
import Dialog from "./Dialog";

interface EditMealProps {
    userContext: UserContextInterface | null
    meal: MealModel
    closeModal: (res: any) => void
}

const EditMealDialog = (props: EditMealProps) => {
    // const service = APIservice();

    const [editMealData, setEditMealData] = useState<MealModel>(props.meal);

    const closeModal = () => {
        props.closeModal(false);
    }

    const changeMealParamterValue = (label: string, value: any) => {
        console.log({
            ...editMealData,
            [label]: value,
        });
        setEditMealData({
            ...editMealData,
            [label]: value,
        });
    };


    console.log(props.meal);

    return (
        <Dialog title={`Edit meal “${props.meal.name}”`}
            onClose={() => closeModal()}
            onSubmit={() => { }}
            content={
                <div><FormInputComponent
                    value={editMealData.name}
                    label='name'
                    name='Name'
                    onValueChange={changeMealParamterValue}
                    type='text'
                    validationText='Meal must have a name.'
                    validationFunc={(x: string) => x.length >= 0}
                />
                    <FormInputComponent
                        value={`${editMealData.calories}`}
                        label='calories'
                        name='Calories'
                        onValueChange={changeMealParamterValue}
                        type='number'
                        validationText='Provide valid calories.'
                        validationFunc={(x: string) => x.length >= 0}
                    />
                    <div className={'formInputWrapper'} style={{ cursor: 'pointer' }}>
                        <span style={{ textDecoration: editMealData.vegan ? 'underline' : 'default' }}
                            onClick={() => {
                                changeMealParamterValue('vegan', !editMealData.vegan);
                            }}
                        >{editMealData.vegan ? 'Vegan 🌱' : 'Not Vegan'}</span>
                    </div>
                    <div className={'formInputWrapper'} style={{ columnCount: 2, gridTemplateColumns: '50% 50%' }}>
                        <div >
                            <IngedientList
                                onAddItem={(item) => {
                                    const ingredientList = [...editMealData.ingredientList, item];
                                    changeMealParamterValue('ingredientList', ingredientList);
                                }}
                                onDelete={(item) => {
                                    const ingredientList = editMealData.ingredientList.filter((present) => present != item);
                                    changeMealParamterValue('ingredientList', ingredientList);
                                }}
                                items={editMealData.ingredientList}
                            />
                        </div>
                        <div >
                            <IngedientList
                                onAddItem={(item) => {
                                    const allergenList = [...editMealData.allergenList, item];
                                    changeMealParamterValue('allergenList', allergenList);
                                }}
                                onDelete={(item) => {
                                    const allergenList = editMealData.allergenList.filter((present) => present != item);
                                    changeMealParamterValue('allergenList', allergenList);
                                }}
                                items={editMealData.allergenList}
                            />
                        </div>
                    </div>
                </div>
            }
        />
    )

}

interface IngedientListProps {
    items: Array<string>,
    onDelete: (item: string) => any,
    onAddItem: (item: string) => any,
}

const IngedientList = (props: IngedientListProps) => {

    const [itemName, setItemName] = useState<string>('');

    return (<div>
        {props.items.map((item) => (
            <div style={{ display: 'grid', gridTemplateColumns: '50% 50%', padding: '5px' }}>
                <span style={{ wordWrap: 'break-word', textAlign: 'left', }}>{item}</span>
                <span style={{ textAlign: 'center', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => props.onDelete(item)}>Delete</span>
            </div>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: '50% 50%', padding: '5px' }}>
            <div >
                <input style={{ width: '100%' }} value={itemName} onChange={(e) => setItemName(e.target.value)}>
                </input>
            </div>
            <span style={{ textAlign: 'center', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => {
                    if (itemName.length > 0) {
                        props.onAddItem(itemName);
                        setItemName('');
                    }
                }}
            >Add</span>
        </div>
    </div>
    )
}


export default EditMealDialog;