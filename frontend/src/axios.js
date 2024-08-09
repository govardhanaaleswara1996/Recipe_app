import axios from 'axios';
import React, { useEffect } from "react";

const instance = axios.create({
    baseURL: process.env.baseURL
});

const AxiosInterceptor = ({ children }) => {
    const [refreshFlag, setRefreshFlag] = React.useState(false);
    useEffect(() => {

        const resInterceptor = async (response) => {            
            if(response) return response.data;
            return null;
        };

        const errInterceptor = async (error) => {
            if (error?.response?.status === 440 || error?.response?.status === 413 || (error?.response?.status === 401 ) || error?.response?.status === 405) {
                console.log("error", error);
            }
            return Promise.reject(error?.response?.data);
        };

        const interceptor = instance.interceptors.response.use(
            resInterceptor,
            errInterceptor
        );

        return () => instance.interceptors.response.eject(interceptor);
    }, []);

    return children;
};

export default instance;
export { AxiosInterceptor };
