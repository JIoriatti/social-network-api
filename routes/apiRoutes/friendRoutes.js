const router = require('express').Router();
const {addNewFriend} = require('../../controllers/friendController')

router.route('/users/:userId/friends/:friendId').put(addNewFriend)
module.exports = router;