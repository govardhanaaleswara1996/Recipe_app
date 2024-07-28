'use strict';

const express = require('express');
const validator = require('express-joi-validation').createValidator({ passError: true });
const recipeCtrl = require('../controllers/recipe');
const { authorize } = require('../lib/auth');

const {
  USER
} = require('../constants/roles');

const router = express.Router();


router.post('/',authorize([USER]),recipeCtrl.addRecipe);
router.put('/',authorize([USER]),recipeCtrl.editRecipe);
router.delete('/',authorize([USER]),recipeCtrl.removeRecipe);
router.get('/',authorize([USER]),recipeCtrl.getRecipe);
router.get('/search',authorize([USER]),recipeCtrl.searchRecipe);


// router.post('/recipe',recipeCtrl.updateRecipe);
// router.post('/recipe',recipeCtrl.getRecipe);
// router.post('/recipe',recipeCtrl.deleteRecipe);


module.exports = router;
