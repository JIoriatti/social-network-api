const router = require('express').Router();
const { postReaction, deleteReaction } = require('../../controllers/reactionController');
const {getThoughts,getOneThought, postThought, updateThought, deleteThought} = require('../../controllers/thoughtController');
//Combined reaction and thought routes together,
//for some reason mounting onto /thoughts twice regardless of different endpoints
//ended up returning null responses.
router.route('/').get(getThoughts).post(postThought);
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(postReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;