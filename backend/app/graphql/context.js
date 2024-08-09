const jwt = require('jsonwebtoken');

const SECRET_KEY = "secret";

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
};

const context = ({ req }) => {
  const token = req.headers.authorization || '';
  const user = verifyToken(token.replace('Bearer ', ''));
  return { user };
};

module.exports = context;
