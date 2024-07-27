'use strict';

const express = require('express');
const validator = require('express-joi-validation').createValidator({ passError: true });
const recipeCtrl = require('../controllers/recipe');
const { authorize } = require('../lib/auth');

// const {
//   ADMIN, USER, PROVIDER, AUDITOR, ONSITEADMIN, ANCILLARYSTAFF,
// } = require('../../constants/roles');

const router = express.Router();


router.post('/',recipeCtrl.addRecipe);
router.put('/',recipeCtrl.editRecipe);
router.delete('/',recipeCtrl.removeRecipe);
router.get('/',recipeCtrl.getRecipe);

// router.post('/recipe',recipeCtrl.updateRecipe);
// router.post('/recipe',recipeCtrl.getRecipe);
// router.post('/recipe',recipeCtrl.deleteRecipe);


module.exports = router;
