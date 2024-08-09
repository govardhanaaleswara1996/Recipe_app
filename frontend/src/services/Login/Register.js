import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../graphql/loginMutation.js';

export const useRegister = () => {
    const navigate = useNavigate();
    const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION);

    const submitRegister = async (params) => {        
        try {
            const response = await register({ variables: { input: params } });
            const { userToken, status } = response.data.register;            
            if(status) { 
                navigate('/');
            }
          } catch (err) {
            console.error('Registration failed:', err);
          }
    
    }
 
  return { submitRegister }
}
