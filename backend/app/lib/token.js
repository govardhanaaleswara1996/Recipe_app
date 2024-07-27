'use strict';

const jwt = require('jsonwebtoken');
const jwtSecret = "secret";

async function generateToken(payLoad, expiresIn) {
  const isObject = typeof payLoad === 'object';

  if (!payLoad) {
    const error = new TypeError('Token Payload Should Not Be Empty');
    throw error;
  }

  if (!isObject) {
    const error = new TypeError('Token Payload Must Be An Object');
    throw error;
  }

  return new Promise((resolve, reject) => {
    jwt.sign(payLoad, jwtSecret, { expiresIn }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
}
async function verifyToken(token) {
  if (!token) {
    const error = new TypeError('Token Should Not Be Empty');
    throw error;
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (error, decodedToken) => {
      if (error) {
        reject(error);
      } else {
        resolve(decodedToken);
      }
    });
  });
}

const tokenVerifyMethod = async (token, boolean) => {
  let data = true;
  if (!token) {
    const error = new TypeError('Token Should Not Be Empty');
    throw error;
  }
    jwt.verify(token, jwtSecret, (error, decodedToken) => {
      if (error) {
        if (error.name !== 'TokenExpiredError') {
          if (boolean === true) {
            const errors = new TypeError('Invalid user token');
            throw errors;
          } else {
            const errors = new TypeError('Invalid refresh token');
            throw errors;
          }
        } else {
          data = false;
        }
      } else {
        data = true;
      }
    });
  
  return data;
};

module.exports = {
  generate: generateToken,
  verify: verifyToken,
  tokenVerifyMethod,
};
