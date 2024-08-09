import React from 'react'
import '../../assets/styles/recipeCard.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ButtonBase, CardActionArea } from '@mui/material';
import recipeImg from '../../assets/images/recipe1.jpg';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Button as DialogButton } from '@mui/material';
import { DELETE_RECIPE } from '../../services/graphql/recipeMutation'; 
import { useMutation } from '@apollo/client';
import breakfastImage from '../../assets/images/breakfastImage.jpg';
import lunchImage from '../../assets/images/lunchImage.jpg';
import dinnerImage from '../../assets/images/dinnerImage.jpg';
import dessertImage from '../../assets/images/dessertImage.jpg';
import beverageImage from '../../assets/images/beverageImage.jpg';
import defaultImage from '../../assets/images/defaultImage.png';



const RecipeCard = ({ recipeDetails, refetch }) => {
    const navigate = useNavigate();
    const [deleteRecipe] = useMutation(DELETE_RECIPE);
    const [openDialog, setOpenDialog] = React.useState(false);
    
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
    const handleClick = (e) => {
        console.log("Link: ", recipeDetails);
        navigate("/dashboard/viewRecipe", { state: recipeDetails });
    }
    const handleEdit = (e) => {
        e.stopPropagation(); // Prevent the card click event from firing
        navigate("/dashboard/editRecipe", { state: recipeDetails.id});
    }

    const handleDelete = async () => {
        try {
            await deleteRecipe({ variables: { id: recipeDetails.id } });
            // Optionally refetch or update the list of recipes
            if (refetch) {
                refetch();
            }
        } catch (error) {
            console.error('Error deleting recipe:', error);
        } finally {
            setOpenDialog(false);
        }
    };

    return (
        <div className='cardContainer'>
            <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
                <CardActionArea>
                    <CardMedia
                        className='cardImage'
                        component="img"
                        height="200px"
                        image={categoryImage}
                        alt="green iguana"
                    />
                    <p className='categoryName' style={{background:'red',color:'white'}}> {recipeDetails?.category}</p>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            {recipeDetails?.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div >
    )
}

export default RecipeCard;