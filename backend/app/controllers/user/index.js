'use strict';

const User = require('../../models/user');
const Recipe = require('../../models/recipe');
const { hash: hashPassword } = require('../../lib/password');
const { generate: generateToken } = require('../../lib/token');
const { match: matchPassword } = require('../../lib/password');
const {
  InvalidUserError,
  InvalidCredentialsError,
  EmailNotVerifiedError,
} = require('../../constants/errors');


const registerUser = async (req, res, next) => {
  try {
    const {userName,password,email} = req.body;
    console.log("userName,password,email",userName,password,email);
    const rawUserName = await User.findOne({ userName}).exec();
    if (rawUserName && Object.keys(rawUserName)) {
      const error = InvalidUserError;
      return next(error);
    }
    const userEmail = await User.findOne({ email }).exec();
    if (userEmail && Object.keys(userEmail)) {
      const error = InvalidUserError;
      return next(error);
    }
    console.log("password",password);
    req.body.password = await hashPassword(password);
    console.log("password",password);
    let user = new User(req.body);
    user = await user.save();
    const userObj = user.toObject();
    delete userObj.password;
    res.status(201).json({
      statusCode: 201, 
      status: true, 
      user: userObj, 
      message: 'User Register Successfully',
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const tokenExpirePeriod = 360000;
    const {userName,password} = req.body;
    const user = await User.findOne({ userName}).exec();
    if (!user) {
      const error = InvalidUserError;
      return next(error);
    }
    const {
      id,
    } = user;
    const isPasswordMatched = await matchPassword(
      password,
      user.password,
    );
    if (!isPasswordMatched) {
      const error = InvalidCredentialsError;
      return next(error);
    }
      const tokenPayload = {
        userId: user.id,
        role: user.role,
      };
      const userToken = await generateToken(tokenPayload, tokenExpirePeriod);
      await User.findOneAndUpdate(
        { id },
        {
          isLogged: true,
        },
      ).exec();
      const resData = {
        id: user.id,
        userName: user.userName,
        email: user.email,
        name: user.name,
        userToken:userToken
      };
     
      res.status(200).json({
        user: resData,
        statusCode: 200,
        status: true,
      });

  } catch (error) {
    next(error);
  }
};


module.exports = { registerUser, login };
