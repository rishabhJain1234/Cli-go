const express = require('express');
const router = express.Router();

const { isAdmin, isValidUser } = require('../controllers/auth/validate');
const serverController = require("../controllers/server");

router.post('/addUpdate', isValidUser, isAdmin, serverController.addOrUpdate);
router.delete('/:alias', isValidUser, isAdmin, serverController.removeServer);
router.get('/send/:alias', isValidUser, serverController.sendUserPrivateKey);

module.exports = router;
