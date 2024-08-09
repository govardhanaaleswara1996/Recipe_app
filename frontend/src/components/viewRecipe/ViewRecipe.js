import React from 'react';
import '../../assets/styles/viewRecipe.css';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_RECIPE, GET_RECIPES_BY_USER } from '../../services/graphql/recipeMutation';
import breakfastImage from '../../assets/images/breakfastImage.jpg';
import lunchImage from '../../assets/images/lunchImage.jpg';
import dinnerImage from '../../assets/images/dinnerImage.jpg';
import dessertImage from '../../assets/images/dessertImage.jpg';
import beverageImage from '../../assets/images/beverageImage.jpg';
import defaultImage from '../../assets/images/defaultImage.png';

const ViewRecipe = () => {
  const location = useLocation();
  const { state: recipeDetails } = location;
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    update(cache) {
      const existingRecipes = cache.readQuery({
        query: GET_RECIPES_BY_USER,
        variables: { userId },
      });
      
      const newRecipes = existingRecipes.recipesByUser.filter(recipe => recipe.id !== recipeDetails.id);
      
      cache.writeQuery({
        query: GET_RECIPES_BY_USER,
        variables: { userId },
        data: { recipesByUser: newRecipes },
      });
    },
    onCompleted: () => {
      navigate('/dashboard');
    },
  });

  const handleEdit = () => {
    navigate('/dashboard/editRecipe', { state: recipeDetails });
  };

  const handleDelete = async () => {
    try {
      await deleteRecipe({ variables: { id: recipeDetails.id } });
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const getCategoryImage = (category) => {
    switch (category.toLowerCase()) {
      case 'breakfast':
        return breakfastImage;
      case 'lunch':
        return lunchImage;
      case 'dinner':
        return dinnerImage;
      case 'dessert':
        return dessertImage;
      case 'beverage':
        return beverageImage;
      default:
        return defaultImage;
    }
  };

  const categoryImage = getCategoryImage(recipeDetails?.category);

  return (
    <div className='viewRecipeContainer'>
      <div className='detailsLayoutContainer'>
        <div className='imageContainer'>
          <img className='recipeImg' src={categoryImage} alt={recipeDetails?.title} />
        </div>
        <div className='detailsContainer'>
          <div className='titleConatiner'>
            <h1>{recipeDetails?.title}</h1>
            <h6>{recipeDetails?.category}</h6>
            <div className='editDeleteContainer'>
              <Button variant="contained" className="editButton" startIcon={<EditIcon />} onClick={handleEdit}>
                Edit
              </Button>
              <Button variant="contained" className="deleteButton" startIcon={<DeleteIcon />} onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
          <div className='ingredientsCont'>
            <h3>Ingredients</h3>
            <hr />
            <ul>
              {recipeDetails?.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className='instructionsCont'>
            <h3>Instructions</h3>
            <hr />
            <ol>
              {recipeDetails?.instructions?.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRecipe;
