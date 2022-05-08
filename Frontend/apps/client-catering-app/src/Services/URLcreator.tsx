const apiUrl = "https://localhost:5001";

export const getRegisterClientURL = (): string => apiUrl + "/Client/register";

export const getLoginClientURL = (): string => apiUrl + "/Client/login";

export const getDietsURL = (query: string): string => apiUrl + "/Diets" + query;

export const getDietDetailsURL = (dietId: string): string =>
  apiUrl + "/Diets/" + dietId;

export const getMealDetailsURL = (mealId: string): string =>
  apiUrl + "/Meals/" + mealId;

export const getClientProfileURL = (): string => apiUrl + "/Client/account";
