import API from './index';

export const loginService = (data) => API.handleApiRequest(() => API.post(`users/login`, data));

//Logout
// export const logoutService = (data) => API.handleApiRequest(() => API.post(``, data));
