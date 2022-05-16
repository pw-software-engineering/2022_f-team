export interface DeliveryDetailsModel {
  phoneNumber: string
  commentForDeliverer: string
  address: AddressModel
}

export interface AddressModel {
  street: string
  buildingNumber: string
  apartmentNumber: string
  postCode: string
  city: string
}
