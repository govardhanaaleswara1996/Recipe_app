import React, { createContext,  useState, useEffect, act } from "react";
import { addRecipeApiCall, getRecipe, searchRecipe } from '../API/DashboardAPI';
import { useNavigate } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_RECIPES_BY_USER } from '../graphql/recipeMutation';
import { useReducer, useContext } from 'react';

export const APIContext = createContext();

/* export const RecipeContextProvider = ({ children }) => {
  const userId = localStorage.getItem("userId");
  const { loading, error, data } = useQuery(GET_RECIPES_BY_USER, {
    variables: { userId },
  });
  console.log("GetResponse: ",data);
    // create context
    const [recipes, setRecipes] = useState([]);     
    const navigate = useNavigate();
    const addRecipes = async (params) => {
      const response = await addRecipeApiCall(params);
      console.log("Response: ",response);
      if (response?.status) {
          // setAddRecipe(response?.data?.data);
          console.log("AddRecipe: ", response);
          navigate('/dashboard');
      }
    } 
    
    
    const getRecipesList = async () => {
      // const response = await getRecipe();
      console.log("Response: ", data.recipesByUser);
      if (data.recipesByUser) {
        setRecipes(data.recipesByUser);
      }
    }
      
  
      const searchRecipes = async (searchText) => {
        const response = await searchRecipe(searchText);
        console.log("Response: ",response);
        if (response?.status) {
            setRecipes(response?.data?.data);
        }
      } 

     


    useEffect(() => {
      if (data && data.recipesByUser) {
        getRecipesList();      
      }
    }, [data]);
  

    return (
        <APIContext.Provider value={{ recipes, searchRecipes, addRecipes }}>
            {children}
        </APIContext.Provider>
    );
}; */




// Define actions
const ACTIONS = {
  SET_RECIPES: 'SET_RECIPES',
  ADD_RECIPE: 'ADD_RECIPE',
  EDIT_RECIPE: 'EDIT_RECIPE',
};

// Initial state
const initialState = {
  recipes: [],
};

// Reducer function
const recipeReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_RECIPES:      
      return { ...state, recipes: action.payload };
    case ACTIONS.ADD_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };
    case ACTIONS.EDIT_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map(recipe =>
          recipe.id === action.payload.id ? action.payload : recipe
        ),
      };
    default:
      return state;
  }
};

// Create context
const RecipeContext = createContext();

// Context provider component
export const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  return (
    <RecipeContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
};

// Custom hook to use context
export const useRecipes = () => useContext(RecipeContext);
