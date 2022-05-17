const apiUrl = "https://localhost:5001";

export const getRegisterClientURL = (): string => apiUrl + "/Client/register";

export const getLoginClientURL = (): string => apiUrl + "/Client/login";

export const getDietsURL = (): string => apiUrl + "/Diets";

export const getDietDetailsURL = (dietId: string): string =>
  apiUrl + "/Diets/" + dietId;

export const getMealDetailsURL = (mealId: string): string =>
  apiUrl + "/Meals/" + mealId;

export const getClientProfileURL = (): string => apiUrl + "/Client/account";

export const postClientOrderURL = (): string => apiUrl + "/Client/orders";

export const postPayForOrderURL = (orderId: string) =>
  apiUrl + "/Client/orders/" + orderId + "/pay";
