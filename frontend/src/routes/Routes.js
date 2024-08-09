import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoginComponent from '../components/login/LoginComponent';
import RegistrationComponent from '../components/registration/RegistrationComponent';
import DashboardLayout from '../layouts/Dashboard/DashboardLayout';
import { Login } from '@mui/icons-material';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Dashboard from '../components/dashboard/Dashboard';
import { RecipeContextProvider, RecipeProvider } from '../services/context/RecipeContext';
import AddRecipe from '../components/addRecipe/AddEditRecipe';
import { ApolloProvider } from '@apollo/client';
import client from '../services/apollo/apolloClient';
import ViewRecipe from '../components/viewRecipe/ViewRecipe';
import AddEditRecipe from '../components/addRecipe/AddEditRecipe';
import ProtectedRoute from './ProtectedRoutes';
 
const Routes = createBrowserRouter([
    {
        path: '/dashboard',
        element: <MainLayout />,   
        children: [
            {
                element: <ProtectedRoute />, // Protect these routes
                children: [
                    {
                        path: '',
                        element: <ApolloProvider client={client}><RecipeProvider><Dashboard /></RecipeProvider></ApolloProvider>
                    },
                    {
                        path: '/dashboard/addRecipe',
                        element: <ApolloProvider client={client}><RecipeProvider><AddEditRecipe /></RecipeProvider></ApolloProvider>
                    },
                    {
                        path: '/dashboard/editRecipe',
                        element: <ApolloProvider client={client}><RecipeProvider><AddEditRecipe /></RecipeProvider></ApolloProvider>
                    },
                    {
                        path: '/dashboard/viewRecipe',
                        element: <ApolloProvider client={client}><RecipeProvider><ViewRecipe /></RecipeProvider></ApolloProvider>
                    }
                ]
            }
        ]    
    },
    {
        path: '/',
        element: <ApolloProvider client={client}><LoginComponent /></ApolloProvider>,   
    },
    {
        path: '/register',
        element: <ApolloProvider client={client}><RegistrationComponent /></ApolloProvider>,   
    },
]);
 
 
export default Routes;
