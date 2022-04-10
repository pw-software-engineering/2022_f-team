import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import DietComponent from '../Molecules/DietComponent'
import React from 'react'
import MealComponent from '../Molecules/MealComponent'

const MockedMealsArr = [
  {
    mealId: '1',
    name: 'meal1',
    ingredientList: ['ingr1', 'ing2'],
    allergenList: ['all1', 'all2'],
    calories: 123,
    vegan: true
  },
  {
    mealId: '2',
    name: 'meal2',
    ingredientList: ['ingr1', 'ing2'],
    allergenList: ['all1', 'all2'],
    calories: 321,
    vegan: true
  }
]
const mockedDiet = {
  dietId: '1',
  title: 'diet1',
  description: 'Description Lorem ipsum dolor sit amet.',
  calories: 1234,
  vegan: true,
  price: 12345,
  meals: MockedMealsArr
}

test('buttons are enabled after render', async () => {
  render(
    <BrowserRouter>
      <DietComponent diet={mockedDiet} />
    </BrowserRouter>
  )
  await screen
    .getAllByRole('button')
    .forEach((elem) => expect(elem).toBeEnabled())
})

test('calories have correct value', async () => {
  render(
    <BrowserRouter>
      <DietComponent diet={mockedDiet} />
    </BrowserRouter>
  )
  expect(await screen.getByText('Calories: 1234 kcal')).toBeTruthy()
})

test('all ingredients and allergens are present', async () => {
  render(
    <BrowserRouter>
      <MealComponent
        meal={MockedMealsArr[0]}
        closeModal={function (): void {
          return
        }}
      />
    </BrowserRouter>
  )
  let count = 0
  await screen.getAllByRole('listitem').forEach(() => count++)
  expect(count).toBe(4)
})
