import '../../assets/styles/App.css';
import instance from '../../axios';
import Routes from '../../routes/Routes';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from '../../services/context/AuthContext';
 
instance.interceptors.request.use(request => {
  return request;
}, error => Promise.reject(error));
 
function App() {
  const token = localStorage.getItem('token')
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return (
    
    <AuthProvider>
      <RouterProvider router={Routes} />
    </AuthProvider>
 
  );
}
 
export default App;