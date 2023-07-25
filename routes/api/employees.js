// const express = require('express');
// const ROLES_LIST = require('../../config/roles_list');
// const router = express.Router();
// // const { verifyJWT } = require('../../middlewares/verifyJWT')
// const { getAllEmployees,
//     createNewEmployee,
//     updateEmployee,
//     deleteEmployee,
//     getEmployee } = require('../../controllers/employeesCtrlr');
// const verifyRoles = require('../../middlewares/verifyRoles');
// router.route('/')
//     .get(
//         /**
//          * ? Do it this way if you choose to secure or verify a specific route
//      verifyJWT, */
//         getAllEmployees)
//     .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewEmployee)
//     .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
//     .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee)
// router.route('/:id')
//     .get(getEmployee);

// module.exports = router;