const User = require('../models/User');

module.exports ={
    getUsers(req, res){
        User.find().then((users)=> res.json(users))
        .catch((err)=> res.status(500).json(err));
    },
    getOneUser(req,res){
        User.find({_id: req.params.userId})
            .select()
    }
}