const router = require('express').Router();
const {getUsers, getOneUser, postNewUser, updateUser, deleteUser} = require('../../controllers/userController')


router.route('/').get(getUsers).post(postNewUser);
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser)

module.exports = router;