'use strict';

const User = require('../../models/user');
const Recipe = require('../../models/recipe');

const {
  InvalidRecipeError
} = require('../../constants/errors');;


const addRecipe = async (req, res, next) => {
try {
  const {userId} = req.user;
  req.body.userId = userId;
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
    const {userId} = req.user;
    const id = req.body.id;
    delete req.body.id;
    const recipe = await Recipe.findOne({ id ,userId}).exec();
    if (!recipe) {
      const error = InvalidRecipeError;
      return next(error);
    }
    await Recipe.findOneAndUpdate({ id , userId}, req.body).exec();
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
      const {userId} = req.user;
      const {id} = req.body;
      let data;
      if(!id){
        data =  await Recipe.find({userId}, {
          '_id': 0,
          'id': 1,
          'title':1,
          'category': 1,
          'ingredients': 1,
          'instructions': 1,
          'date':1
        }).exec();
      }
      else{
      data = await Recipe.findOne({ userId,id},
          {
          '_id': 0,
          'id': 1,
          'title':1,
          'category': 1,
          'ingredients': 1,
          'instructions': 1,
          'date':1
        }).exec();
    }
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
        const {userId} = req.user;
        const {id} = req.body;
        if(id){
        await Recipe.deleteOne({id,userId}).exec();
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
      const searchRecipe = async (req, res, next) => {
        try {
            const {userId} = req.user;
            const { searchValue } = req.body;
            const trimmedSearchValue = `^${searchValue.toLowerCase()}`;
            const completeAggregation = await Recipe.aggregate([
              {
                $match: {
                  userId: userId,
                  $or: [
                    { title: { $regex:trimmedSearchValue, $options: "i" } },
                    { category: { $regex:trimmedSearchValue, $options: "i" } },
                    { ingredients: { $regex:trimmedSearchValue, $options: "i" } }
                  ]
                }
              },
              {
                $project: {
                  _id: 0,
                  id: 1,
                  title: 1,
                  category: 1,
                  ingredients: 1,
                  instructions: 1,
                  date: 1
                }
              }
            ]);                    
            res.status(201).json({
            statusCode: 201, 
            status: true, 
            data:completeAggregation,
            message: 'Recipe Data Fetched Successfully',
          }); 

        } catch (error) {
          next(error); 
        }
        };




module.exports = { addRecipe,
  editRecipe,
  getRecipe,
  removeRecipe,
  searchRecipe,
 };
