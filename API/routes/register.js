const express = require('express');
const router = express.Router();
const registerFun = require('../controllers/registerFun');

const registerRoute = () => {
  router.post('/register', registerFun);
  return router; 
};

module.exports = {
  registerRoute,
};
