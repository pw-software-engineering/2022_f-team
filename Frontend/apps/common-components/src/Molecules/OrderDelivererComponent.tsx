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
        <br />
        <p>Additional delivery information:</p>
        <br />
        <p>
          {props.order.deliveryDetails.commentForDeliverer}
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
    </div >
  )
}

export default OrderDelivererComponent
