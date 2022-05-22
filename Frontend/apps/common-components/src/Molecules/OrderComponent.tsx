import React, { useState } from 'react'
import SubmitButton from '../Atoms/SubmitButton'
import { DietFullModel } from '../models/DietModel'
import { MealModel } from '../models/MealModel'
import { OrderModel } from '../models/OrderModel'

interface OrderComponentProps {
  order: OrderModel
  handleOnClick: (e: any, id: string) => void
}

interface DietRowProps {
  diet: DietFullModel
}

const OrderComponent = (props: OrderComponentProps) => {
  return (
    <div className='orderComponentWrapper'>
      <h5>Order id: {props.order.id}</h5>
      {props.order.diets.map((diet: DietFullModel) => (
        <DietRow diet={diet} />
      ))}
      <p>Price: {props.order.price}</p>
      <p>Status: {props.order.status}</p>
      <div className='ordersDateDiv'>
        <p>Start date: {props.order.startDate.split('T')[0]}</p>
        <p>End date: {props.order.endDate.split('T')[0]}</p>
      </div>
      <div className='ordersDeliveryDetails'>
        <p>Phone: {props.order.deliveryDetails.phoneNumber}</p>
        <p>
          Address: {props.order.deliveryDetails.address.buildingNumber}
          {props.order.deliveryDetails.address.apartmentNumber.length > 0 && (
            <p>/{props.order.deliveryDetails.address.apartmentNumber}</p>
          )}{' '}
          {props.order.deliveryDetails.address.street}
          {', '}
          {props.order.deliveryDetails.address.city}
        </p>
      </div>
      {props.order.status === 'WaitingForPayment' && (
        <div className='orderPayButton'>
          <SubmitButton
            text={'Pay'}
            validateForm={() => true}
            action={(e: any) => {
              props.handleOnClick(e, props.order.id)
            }}
          />
        </div>
      )}
    </div>
  )
}

const DietRow = (props: DietRowProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  return (
    <div>
      <div className='dietRowDiv' onClick={() => setOpenModal(true)}>
        <p>{props.diet.name}</p>
      </div>
      {openModal && (
        <div>
          <div className='shadowCover' />
          <div className='dietRowModal'>
            <h1>{props.diet.name}:</h1>
            <button onClick={() => setOpenModal(false)}>X</button>
            {props.diet.meals.map((meal: MealModel) => (
              <p>{meal.name}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderComponent
