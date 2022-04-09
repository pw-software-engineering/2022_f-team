import React from 'react'

interface StringListForMealProps {
  title: string
  list: string[]
}

const StringListForMeal = (props: StringListForMealProps) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <ul>
        {props.list.map((item: string) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default StringListForMeal
