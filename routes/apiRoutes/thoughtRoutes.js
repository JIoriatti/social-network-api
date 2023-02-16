const router = require('express').Router();
const {getThoughts,getOneThought, postThought, updateThought, deleteThought} = require('../../controllers/thoughtController');
router.route('/')
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);
router.route('/').get(getThoughts).post(postThought);
module.exports = router;