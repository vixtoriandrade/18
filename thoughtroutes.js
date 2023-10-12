const router = require('express').Router();
const{
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts get all thoughts and post new thought
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId get one, update one, delete one
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;