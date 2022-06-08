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
  complaint: Complaint[]
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

export interface OrderProducerQuery {
  StartDate: string | undefined
  EndDate: string | undefined
  Offset: number
  Limit: number | undefined
  Sort: string
}

export interface OrderProducerModel {
  id: string
  diets: DietFullModel[]
  deliveryDetails: DeliveryDetailsModel
  startDate: string
  endDate: string
  price: number
  status: string
  complaint: Complaint[]
}

export interface OrderDelivererModel {
  orderId: string;
  deliveryDetails: DeliveryDetailsModel;
}

export interface Complaint{
  complaintId: string;
  orderId: string
  description: string;
  date: string;
  status: number;
  answer: string;
}
