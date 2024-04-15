const express = require('express');
const router = express.Router();
const { isAdmin, isValidUser } = require('../controllers/auth/validate');
const userController = require("../controllers/user");

router.post('/create', userController.createUser);
router.post('/makeAdmin', userController.makeAdmin);


module.exports = router;