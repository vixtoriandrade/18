
const { User } = require('../models');

module.exports = {
    //GET all users
    async getUsers(req, res) {
        try{
            const users= await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //GET single user by id
    async getSingleUser(req, res) {
        try{
            const user = await User.findOne({_id: req.params.userId});

            if (!user) {
                return res.status(404).json({message: 'no user with that id'})
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //POST a new user
    async createUser(req, res) {
        try{
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //PUT user by id
    async updateUser(req, res){
        try{
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                { runValidators: true, new: true }
            );
            
            if(!user) {
                return res.status(404).json({message: 'No user found with that id'});
            }

            res.json(user);
        } catch (err) {
            res.status(505).json(err);
        }
    },
    //DELETE user by id
    async deleteUser(req, res){
        try{
            const user = await User.findOneAndRemove({ _id: req.params.userId});

            if(!user) {
                return res.status(404).json({message: 'No user found with that id'});
            }

            res.json({ message: 'User deleted' });
        } catch (err) {
            res.status(505).json(err);
        }
    },
//Friends
    //POST new friend to user by id
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                { $addToSet: {friends: req.params.friendId} },
                { runValidators: true, new: true}
            );

            if(!user) {
                return res.status(404).json({message: 'No user found with that id'});
            }

            res.json(user);
        } catch (err) {
            res.status(505).json(err);
        }
    },
    //DELETE friend by id
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: { friendId: req.params.friendId}}},
                { runValidators: true, new: true}  
            );

            if(!user) {
                return res.status(404).json({message: 'No user found with that id'});
            }

            res.json(user);
        } catch (err) {
            res.status(505).json(err);
        }
    }
};