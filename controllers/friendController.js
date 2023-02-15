const User = require('../models/User')

module.exports = {
    async addNewFriend(req,res){
        try{
            const userData = await User.findOneAndUpdate(
                {
                    _id: req.params.userId
                },
                {
                    $addToSet: { friends: req.params.friendId }
                },
                {new:true},
                )
                if(!userData){
                    res.status(404).json({message: 'User not found.'})
                }
                res.json(userData);
        }catch(err){
            console.log(err.message)
            res.status(500).json(err);
        }

    },
    async deleteFriend(req, res){
        try{
            const userData = await User.findOneAndUpdate(
                {
                    _id: req.params.userId
                },
                {
                    $pull: { friends: req.params.friendId}
                },
                {new: true},
            )
            if(!userData){
                res.status(404).json({message: 'User not found.'});
            }
            res.json(userData);
        }catch(err){
            console.log(err.message);
            res.status(500).json(err);
        }
    }
}