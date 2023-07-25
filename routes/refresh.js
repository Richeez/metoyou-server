const express = require('express');
const router = express.Router();
const { handleRefreshToken } = require('../controllers/refreshTokenCtrlr');
router.get('/', handleRefreshToken);
module.exports = router;