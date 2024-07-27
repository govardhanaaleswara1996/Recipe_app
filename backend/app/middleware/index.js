'use strict';

const {
  aesDecrypt, aesEncrypt, gallonAesDecrypt, gallonAesEncrypt,
} = require('../lib/Encryption/aes-encrypt');

const httpRequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const isEmpty = Object.keys(data).length === 0;
    if (!isEmpty) {
      const decrypted = await aesDecrypt(req.body.request); // , req.header('Auth-Key')
      req.body = JSON.parse(decrypted);
    }
    next();
  } catch (error) {
    next(error);
  }
};

const httpResponseHandler = async (req, res, next) => {
  try {
    const oldJson = res.json;
    res.json = async (body) => {
      if (body) {
        res.locals.body = body;
        const responseBody = await aesEncrypt(JSON.stringify(body));
        return oldJson.call(res, responseBody);
      }
      return oldJson.call(res, body);
    };
    next();
  } catch (error) {
    next(error);
  }
};

const gallonHttpRequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const isEmpty = Object.keys(data).length === 0;
    if (!isEmpty) {
      const decrypted = await gallonAesDecrypt(req.body.request); // , req.header('Auth-Key')
      req.body = JSON.parse(decrypted);
    }
    next();
  } catch (error) {
    next(error);
  }
};

const gallonHttpResponseHandler = async (req, res, next) => {
  try {
    const oldJson = res.json;
    res.json = async (body) => {
      if (body) {
        res.locals.body = body;
        const responseBody = await gallonAesEncrypt(JSON.stringify(body));
        return oldJson.call(res, responseBody);
      }
      return oldJson.call(res, body);
    };
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  httpRequestHandler,
  httpResponseHandler,
  gallonHttpRequestHandler,
  gallonHttpResponseHandler,
};
