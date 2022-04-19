const apiUrl = "https://localhost:5001";

export const getRegisterClientURL = (): string => apiUrl + "/Client/register";

export const getLoginClientURL = (): string => apiUrl + "/Client/login";

export const getDietsURL = (): string => apiUrl + "/Diets";