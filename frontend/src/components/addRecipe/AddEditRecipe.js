import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, CircularProgress } from '@mui/material';
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useMutation, useQuery } from '@apollo/client';
import { useLocation, useNavigate } from "react-router-dom";
import { ADD_RECIPE, EDIT_RECIPE, GET_RECIPE, GET_RECIPES_BY_USER } from '../../services/graphql/recipeMutation';
import '../../assets/styles/addRecipe.css';

const AddEditRecipe = () => {
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  const { state: recipeId } = location;  // Use `recipeId` for clarity

  const [initialValues, setInitialValues] = useState({
    title: '',
    category: '',
    ingredients: [''],
    instructions: [''],
    date: '',
  });

  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Beverage'];
  const navigate = useNavigate();

 
  // GraphQL mutation for adding a new recipe
  const [addRecipe] = useMutation(ADD_RECIPE, {
    refetchQueries: [{ query: GET_RECIPES_BY_USER, variables: { userId } }],
  });

  // GraphQL mutation for editing an existing recipe
  const [editRecipe] = useMutation(EDIT_RECIPE, {
    refetchQueries: [{ query: GET_RECIPES_BY_USER, variables: { userId } }],
  });

  console.log("recipeId",recipeId);
  // GraphQL query to get a specific recipe by its ID
  const { loading, error, data } = useQuery(GET_RECIPE, {
    variables: { id: recipeId?.id },
    skip: !recipeId?.id, // Skip query if recipeId is not available (add mode)
  });

  // Update initial form values with fetched recipe data when in edit mode
  useEffect(() => {
    if (data && data.recipe) {
      setInitialValues({
        title: data.recipe.title,
        category: data.recipe.category,
        ingredients: data.recipe.ingredients,
        instructions: data.recipe.instructions,
        date: data.recipe.date,
      });
    }
  }, [data]);

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    category: Yup.string().required('Category is required'),
    ingredients: Yup.array()
      .of(Yup.string().required('Ingredient is required'))
      .required('At least one ingredient is required'),
    instructions: Yup.array()
      .of(Yup.string().required('Instruction is required'))
      .required('At least one instruction is required'),
    date: Yup.string().required('Date is required'),
  });

  if (loading) return <CircularProgress />;
  if (error) return <p>Error loading recipe data</p>;

  return (
    <div className="addRecipeContainer">
      <div className="addRecipeFormContainer">
        <h2 style={{ fontSize: "30px", fontWeight: 'bold' }}>{recipeId ? 'Edit Recipe' : 'Add Recipe'}</h2><br />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values, { setSubmitting }) => {
            try {
              if (recipeId) {
                // Edit existing recipe
                await editRecipe({
                  variables: { id: recipeId?.id, input: values },
                });
              } else {
                // Add new recipe
                await addRecipe({
                  variables: { input: values },
                });
              }
              navigate('/dashboard');
            } catch (error) {
              console.error('Error saving recipe:', error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form>
              <div>
                <label>Title</label>
                <Field
                  as={TextField}
                  name="title"
                  placeholder="Title"
                  fullWidth
                  variant="outlined"
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
              </div>
              <label>Category</label>
              <div>
                <FormControl fullWidth variant="outlined" error={touched.category && Boolean(errors.category)}>
                  <Field
                    as={Select}
                    name="category"
                    placeholder="Category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {categories.map((category, index) => (
                      <MenuItem key={index} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Field>
                  <ErrorMessage name="category" component="div" />
                </FormControl>
              </div>

              <div>
                <FieldArray name="ingredients">
                  {({ push, remove }) => (
                    <div>
                      {values.ingredients.map((ingredient, index) => (
                        <div className="ingredientContainer" key={index}>
                          <TextField
                            name={`ingredients.${index}`}
                            placeholder={`Ingredient ${index + 1}`}
                            fullWidth
                            variant="outlined"
                            value={ingredient}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.ingredients && Boolean(errors.ingredients && errors.ingredients[index])}
                            helperText={touched.ingredients && errors.ingredients && errors.ingredients[index]}
                          />
                          <Button type="button" startIcon={<RemoveCircleOutlineIcon />} onClick={() => remove(index)}></Button>
                        </div>
                      ))}
                      <Button type="button" onClick={() => push('')} startIcon={<ControlPointIcon />}>Add Ingredient</Button>
                    </div>
                  )}
                </FieldArray>
              </div>

              <div>
                <FieldArray name="instructions">
                  {({ push, remove }) => (
                    <div>
                      {values.instructions.map((instruction, index) => (
                        <div className="ingredientContainer" key={index}>
                          <TextField
                            name={`instructions.${index}`}
                            placeholder={`Instruction ${index + 1}`}
                            fullWidth
                            variant="outlined"
                            value={instruction}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.instructions && Boolean(errors.instructions && errors.instructions[index])}
                            helperText={touched.instructions && errors.instructions && errors.instructions[index]}
                          />
                          <Button type="button" startIcon={<RemoveCircleOutlineIcon />} onClick={() => remove(index)}></Button>
                        </div>
                      ))}
                      <Button type="button" onClick={() => push('')} startIcon={<ControlPointIcon />}>Add Instruction</Button>
                    </div>
                  )}
                </FieldArray>
              </div>

              <div>
                <Field
                  as={TextField}
                  name="date"
                  placeholder="Date: dd/mm/yyyy"
                  fullWidth
                  variant="outlined"
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                />
              </div>

              <Button type="submit" variant="contained" color="primary" className="addRecipeBtn">
                {recipeId ? 'Save Changes' : 'Add Recipe'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddEditRecipe;
