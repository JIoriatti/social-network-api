const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');
const friendRoutes = require('./friendRoutes')


router.use('/users', userRoutes);
router.use('/users/:userId/friends/:friendId', friendRoutes );
router.use('/thoughts', thoughtRoutes);


module.exports = router;
