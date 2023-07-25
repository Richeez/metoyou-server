// const express = require('express');
// const ROLES_LIST = require('../../config/roles_list');
// const router = express.Router();
// const { getAllUsers,
//     createNewUser,
//     updateUser,
//     deleteUser,
//     getUser } = require('../../controllers/userController');
// const verifyRoles = require('../../middlewares/verifyRoles');
// router.route('/')
//     .get(
//         /**
//          * ? Do it this way if you choose to secure or verify a specific route
//      verifyJWT, */
//         getAllUsers)
//     .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewUser)
//     .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateUser)
//     .delete(verifyRoles(ROLES_LIST.Admin), deleteUser)
// router.route('/:id')
//     .get(getUser);

// module.exports = router;