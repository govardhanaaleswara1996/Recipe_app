import API from './index';


export const addRecipeApiCall = (data) => API.handleApiRequest(() => API.post(`recipe`,data));
export const recdetailService = (id) => API.handleApiRequest(() => API.get(`recipes/${id}`));

export const searchRecipe = (data) => API.handleApiRequest(() => API.post(`recipe/search`,data));



export const getRecipe = () => API.handleApiRequest(() => API.get(`recipe`));
