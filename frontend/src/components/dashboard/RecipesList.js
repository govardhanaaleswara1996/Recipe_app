import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import '../../assets/styles/recipesList.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useRecipes } from '../../services/context/RecipeContext';
import { TextField } from '@mui/material';
import Button from "@mui/material/Button";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_RECIPE, GET_RECIPES_BY_USER } from '../../services/graphql/recipeMutation';

const RecipesList = () => {
  const { state, dispatch } = useRecipes();
  const userId = localStorage.getItem("userId");
  const { loading, error, data } = useQuery(GET_RECIPES_BY_USER, {
    variables: { userId },
    fetchPolicy: 'cache-and-network', // Ensures it always gets updated data
  });

  const [addRecipe] = useMutation(ADD_RECIPE, {
    update: (cache, { data: { addRecipe } }) => {
      // Read existing recipes from the cache
      const { recipesByUser } = cache.readQuery({
        query: GET_RECIPES_BY_USER,
        variables: { userId },
      });

      // Write back to the cache with the new recipe added
      cache.writeQuery({
        query: GET_RECIPES_BY_USER,
        variables: { userId },
        data: { recipesByUser: [...recipesByUser, addRecipe] },
      });
    },
  });

  const [category, setCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      console.log("Fetched Recipes: ", data.recipesByUser);
      dispatch({ type: 'SET_RECIPES', payload: data.recipesByUser });
    }
  }, [data, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filterByCategory = (recipes) => {
    return recipes.filter((recipe) => {
      return category ? recipe.category.toLowerCase() === category.toLowerCase() : true;
    });
  };

  const filterBySearchText = (recipes) => {
    return recipes.filter((recipe) => {
      const searchLower = searchText.toLowerCase();
      return recipe.title.toLowerCase().includes(searchLower) ||
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchLower)
        );
    });
  };

  const filteredRecipes = filterBySearchText(filterByCategory(state.recipes || []));

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const addRecipeButtonClicked = () => {
    navigate('/dashboard/addRecipe');
  };

  return (
    <div className="outerListContainer">
      <div className='listTitleContainer'>
        <h1>Recent Recipes</h1>
        <Button variant="text" className="addRecipeButton" startIcon={<ControlPointIcon />} onClick={addRecipeButtonClicked}>
          Add Recipe
        </Button>
        <div className='searchContainer'>
          <div className='searchBar'>
            <TextField
              className='searchTextField'
              id="outlined-basic"
              variant="outlined"
              placeholder="Search recipes..."
              onChange={handleSearchInputChange}
              value={searchText}
            />
          </div>
          <Select
            className='selectCategory'
            value={category}
            onChange={handleCategoryChange}
            displayEmpty
          >
            <MenuItem value="">All Recipes</MenuItem>
            <MenuItem value="breakfast">Breakfast</MenuItem>
            <MenuItem value="lunch">Lunch</MenuItem>
            <MenuItem value="dinner">Dinner</MenuItem>
            <MenuItem value="dessert">Dessert</MenuItem>
            <MenuItem value="beverage">Beverage</MenuItem>
          </Select>
        </div>
      </div>
      <div className='innerListContainer'>
        {
          filteredRecipes?.map((item) => (
            <RecipeCard key={item.id} recipeDetails={item} />
          ))
        }
      </div>
    </div>
  );
};

export default RecipesList;
