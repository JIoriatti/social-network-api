const router = require('express').Router();
const {getUsers, getOneUser, postNewUser, updateUser, deleteUser} = require('../../controllers/userController')
const {addNewFriend, deleteFriend} = require('../../controllers/friendController')


router.route('/').get(getUsers).post(postNewUser);
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser)
router.route('/:userId/friends/:friendId').put(addNewFriend).delete(deleteFriend)

module.exports = router;