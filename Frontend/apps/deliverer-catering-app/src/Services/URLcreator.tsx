const apiUrl = process.env.REACT_APP_API_URL;

export const getLoginDelivererURL = (): string => apiUrl + "/Deliverer/login";

export const getDelivererOrdersURL = (): string => apiUrl + "/Deliverer/orders";

export const postDeliverOrderURL = (orderId: string) =>
  apiUrl + "/Deliverer/orders/" + orderId + "/deliver";
