
const { User, Thought } = require('../models');

module.exports = {
    //GET all thoughts
    async getThoughts(req, res) {
        try{
            const thoughts= await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //GET a single thought by id
    async getSingleThought(req, res) {
        try{
            const thought = await Thought.findOne({_id: req.params.thoughtId});

            if (!thought) {
                return res.status(404).json({message: 'no thought with that id'})
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //POST a new thought
    async createThought(req, res) {
        try{
            const thought = await Thought.create(req.body);
            // Update users thought array by id
            return User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: {thoughts: thought._id}},
                {new: true}
            );
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //PUT by thought id
    async updateThought(req, res){
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                { runValidators: true, new: true }
            );
            
            if(!thought) {
                return res.status(404).json({message: 'No thought found with that id'});
            }

            res.json(thought);
        } catch (err) {
            res.status(505).json(err);
        }
    },
    //DELETE by thought id
    async deleteThought(req, res){
        try{
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId});

            if(!thought) {
                return res.status(404).json({message: 'No thought found with that id'});
            }

            res.json({ message: 'Thought deleted' });
        } catch (err) {
            res.status(505).json(err);
        }
    },

//Reactions
    //POST a reaction by thought id
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $addToSet: {reaction: req.params.reactionId} },
                { runValidators: true, new: true}
            );

            if(!thought) {
                return res.status(404).json({message: 'No thought found with that id'});
            }

            res.json(thought);
        } catch (err) {
            res.status(505).json(err);
        }
    },
    //DELETE reaction by id
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: { reactionId: req.params.reactionId}}},
                { runValidators: true, new: true}  
            );

            if(!thought) {
                return res.status(404).json({message: 'No thought found with that id'});
            }

            res.json(thought);
        } catch (err) {
            res.status(505).json(err);
        }
    }
};