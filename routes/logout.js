const express = require('express');
const router = express.Router();
const { handleLogout } = require('../controllers/logoutCtrlr');
router.get('/', handleLogout);
module.exports = router;