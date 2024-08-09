import React from 'react'
import { useNavigate } from 'react-router-dom';
import { loginService } from '../API/LoginAPI';
import instance from '../../axios.js';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/loginMutation.js';
import { useAuth } from '../context/AuthContext.js';
 
export const useLogin = () => {
    const navigate = useNavigate();
    const { loginAuth } = useAuth();
    const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);  
    const submitLogin = async (params) => {
        try {
            const response = await login({ variables: { input: params } });
            const { user, userToken, status } = response.data.login;  
            console.log("user",user);       
            if(status) {        
                instance.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
                localStorage.setItem('token',userToken);
                localStorage.setItem('name',`${user.firstname} ${user.lastname}`);
                localStorage.setItem('userId', user?.id);  
                loginAuth(userToken);              
                navigate('/dashboard');
            }
          } catch (err) {
            console.error('Login failed:', err);
          }
 
        // console.log(params,"params");
        // const result = await loginService(params);
        // console.log(result,"result");
       
    }  
  return { submitLogin }
}