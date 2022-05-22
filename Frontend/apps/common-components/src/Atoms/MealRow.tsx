import React from 'react'
import { MealShort } from '../models/MealModel'

interface MealRowProps {
  meal: MealShort
  setMealToQuery: (res: any) => void
  size?: string
  onEditClick?: (meal: MealShort) => any
  onDeleteClick?: (meal: MealShort) => any
}

const MealRow = (props: MealRowProps) => {
  const onEditClick = props.onEditClick;
  const onDeleteClick = props.onDeleteClick;

  const editable = props.onEditClick != null && props.onDeleteClick != null;

  return (
    <button
      className='meal-row'
      style={{ cursor: editable ? 'default' : 'pointer' }}
      onClick={() => props.setMealToQuery(props.meal.id)}
    >
      <p style={{ fontSize: props.size }}>{props.meal.name}</p>
      <p style={{ fontSize: props.size }}>Calories: {props.meal.calories} kcal</p>
      <div></div>
      <div style={{ width: '100%' }}>
        {onEditClick != undefined && (<p style={{ textDecoration: 'underline', fontSize: props.size, cursor: 'pointer' }} onClick={() => onEditClick(props.meal)}>Edit</p>)}
        <div style={{ width: '10px', display: 'inline-block' }}></div>
        {onDeleteClick != undefined && (<p style={{ textDecoration: 'underline', fontSize: props.size, cursor: 'pointer' }} onClick={() => onDeleteClick(props.meal)}>Delete</p>)}
      </div>
    </button>
  )
}

export default MealRow
