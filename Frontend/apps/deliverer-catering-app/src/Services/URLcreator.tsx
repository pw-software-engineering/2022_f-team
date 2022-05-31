const apiUrl = "https://localhost:5001";

export const getLoginDelivererURL = (): string => apiUrl + "/Deliverer/login";

export const getDelivererOrdersURL = (): string => apiUrl + "/Deliverer/orders";

export const postDeliverOrderURL = (orderId: string) =>
    apiUrl + "/Deliverer/orders/" + orderId + "/deliver";