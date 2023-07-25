const express = require('express');
const router = express.Router();
const { handleLogIn } = require('../controllers/authCtrlr');
router.post('/', handleLogIn);
module.exports = router;