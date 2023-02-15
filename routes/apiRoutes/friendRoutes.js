const router = require('express').Router();
const {addNewFriend, deleteFriend} = require('../../controllers/friendController')

router.route('/users/:userId/friends/:friendId').put(addNewFriend).delete(deleteFriend)
module.exports = router;