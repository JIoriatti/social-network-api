const router = require('express').Router();
const {addNewFriend, deleteFriend} = require('../../controllers/friendController')

router.route('/').put(addNewFriend).delete(deleteFriend)
module.exports = router;