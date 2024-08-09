import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_RECIPES_BY_USER } from '../graphql/recipeMutation';

function useDashboardService() {
  const userId = localStorage.getItem("userId");
  const { loading, error, data } = useQuery(GET_RECIPES_BY_USER, {
    variables: { userId },
  });

  const [recipes, setRecipes] = useState();
  const getRecipesList = async () => {
    // const response = await getRecipe();
    console.log("Response: ", data.recipesByUser);
    if (data.recipesByUser) {
      setRecipes(data.recipesByUser);
    }
  }

  const searchRecipes = async () => {
    const response = await searchRecipe();
    console.log("Response: ", response);
    if (response?.status) {
      setRecipes(response?.data?.data);
    }
  }

  useEffect(() => {
    console.log("UserId: =========>", userId);
    getRecipesList()
  }, []);
  return {
    recipes
  }
}

export default useDashboardService;