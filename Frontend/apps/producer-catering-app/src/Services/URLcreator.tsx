const apiUrl = "https://localhost:5001/api";

export const getLoginProducerURL = (): string => apiUrl + "/Producer/login";

export const getDietsURL = (): string => apiUrl + "/Diets";

export const getDietDetailsURL = (dietId: string): string =>
  apiUrl + "/Diets/" + dietId;

export const getMealDetailsURL = (mealId: string): string =>
  apiUrl + "/Meals/" + mealId;

export const putDietDetailsURL = (dietId: string): string =>
  apiUrl + "/Diets/" + dietId;

export const putMealDetailsURL = (mealId: string): string =>
  apiUrl + "/Meals/" + mealId;

export const getProducerOrdersURL = (): string => apiUrl + "/Producer/orders";

export const postCompleteOrderURL = (orderId: string) =>
  apiUrl + "/Producer/orders/" + orderId + "/complete";
