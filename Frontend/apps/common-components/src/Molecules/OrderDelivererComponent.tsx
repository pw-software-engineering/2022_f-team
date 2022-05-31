import React from 'react'
import SubmitButton from '../Atoms/SubmitButton'
import { OrderDelivererModel } from '../models/OrderModel'

interface OrderDelivererComponentProps {
  order: OrderDelivererModel
  handleOnClick: (e: any, id: string) => void
}

const OrderDelivererComponent = (props: OrderDelivererComponentProps) => {
  return (
    <div className='orderComponentWrapper'>
      <h5>Order id: {props.order.orderId}</h5>
      <div className='ordersDeliveryDetails'>
        <p>Phone: {props.order.phoneNumber}</p>
        <p>
          Address: {props.order.address.buildingNumber}
          {props.order.address.apartmentNumber.length > 0 && (
            <p>/{props.order.address.apartmentNumber}</p>
          )}{' '}
          {props.order.address.street}
          {', '}
          {props.order.address.city}
        </p>
      </div>
      <div className='orderPayButton'>
        <SubmitButton
          text={'Deliver'}
          validateForm={() => true}
          action={(e: any) => {
            props.handleOnClick(e, props.order.orderId)
          }}
        />
      </div>
    </div>
  )
}

export default OrderDelivererComponent
