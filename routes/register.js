const express = require('express');
const router = express.Router();
const { handleNewUser } = require('../controllers/registerCtrlr');
router.post('/', handleNewUser);
module.exports = router;