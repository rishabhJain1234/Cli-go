const express = require('express');
const router = express.Router();
const { isValidUser, isAdmin } = require('../controllers/auth/validate');
const requestController = require("../controllers/request");

router.post('/create', isValidUser, requestController.createRequest);
router.put('/approve', isValidUser, isAdmin, requestController.approveRequest);
router.put('/reject', isValidUser, isAdmin, requestController.rejectRequest);

module.exports = router;
