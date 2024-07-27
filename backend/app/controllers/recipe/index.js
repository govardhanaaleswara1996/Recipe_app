'use strict';

const User = require('../../models/user');
const Recipe = require('../../models/recipe');

const {
  InvalidRecipeError
} = require('../../constants/errors');;


const addRecipe = async (req, res, next) => {
try {
  let recipe = new Recipe(req.body);
  recipe = await recipe.save();
  const recipeObj = recipe.toObject();
  res.status(201).json({
    statusCode: 201, 
    status: true, 
    recipeObj,
    message: 'Recipe Created Successfully',
  }); 
} catch (error) {
  next(error); 
}
};
const editRecipe = async (req, res, next) => {
  try {
    const id = req.body.id;
    delete req.body.id;
    const recipe = await Recipe.findOne({ id }).exec();
    if (!recipe) {
      const error = InvalidRecipeError;
      return next(error);
    }
    await Recipe.findOneAndUpdate({ id}, req.body).exec();
    res.status(200).json({
      statusCode: 200, 
      status: true,
      message: 'Recipe Updated Successfully',
    });
  } catch (error) {
    next(error);
  }
  };

  const getRecipe = async (req, res, next) => {
    try {
      const {id,userId} = req.body;
      let data;
      if(!id){
        data =  await Recipe.find({userId}).exec();
      }
      data = await Recipe.findOne({ userId,id}).exec();
      res.status(201).json({
        statusCode: 201, 
        status: true, 
        data,
        message: 'Recipe Data Fetched Successfully',
      }); 
    } catch (error) {
      next(error); 
    }
    };
    const removeRecipe = async (req, res, next) => {
      try {
        const {id} = req.body;
        let data;
        if(id){
          data = await Recipe.deleteOne({id}).exec();
        }
        res.status(201).json({
          statusCode: 201, 
          status: true, 
          message: 'Recipe Removed Successfully',
        }); 
      } catch (error) {
        next(error); 
      }
      };
  




module.exports = { addRecipe,editRecipe,getRecipe,removeRecipe };
