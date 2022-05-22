import { DeliveryDetailsModel } from './DeliveryDetailsModel'
import { DietFullModel } from './DietModel'

export interface OrderModel {
  id: string
  diets: Array<DietFullModel>
  deliveryDetails: DeliveryDetailsModel
  startDate: string
  endDate: string
  price: number
  status: string
  complaint: any
}

export interface OrderQuery {
  StartDate: string | undefined
  EndDate: string | undefined
  Price: number | undefined
  Price_lt: number | undefined
  Price_ht: number | undefined
  Offset: number
  Limit: number | undefined
  Sort: string
  Status: number | undefined
}
