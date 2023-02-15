const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports ={
    getUsers(req, res){
        User.find().then((users)=> res.json(users))
        .catch((err)=> res.status(500).json(err));
    },
    getOneUser(req,res){
        User.find({_id: req.params.userId})
        //do not return user document version
            .select('-__v')
            .then((user)=>{
                !user ? res.status(404).json({message: 'User not found.'}) : res.json(user);
            })
            .catch((err)=>{
                res.status(500).json(err);
            });
    },
    postNewUser(req, res){
        const { username, email} = req.body;
        User.create({username, email})
            .then((userData)=>{
                res.json(userData)
            })
            .catch((err)=>{
                res.status(500).json(err);
            });
    },
    updateUser(req,res){
        const { username, email } = req.body
        User.findOneAndUpdate(
        // query object, which document to update
        {
            _id: req.params.userId
        },
        //update object, this is the data to be updated in DB
        {
            $set: {username, email},
        },
        //options object, runValidators uses model validation on req.body data
        // new: true returns the updated data instead of the original
        {
            runValidators: true, new: true
        })
        .then((userData)=>{
            !userData ? res.status(404).json({message: 'User not found.'})
            : res.json(userData);
        })
        .catch((err)=>{
            res.status(500).json(err);
        });
    },
    //delete user and associated thoughts
    //.then promise chaining was not working properly, couldn't figure out why
    //switched to async/await
    async deleteUser(req,res){
        try{
            const updatedUser = await User.updateOne({_id: req.params.userId},
                {$unset: {
                    thoughts: ""
                }})
                if(!updatedUser){
                    res.status(404).json({message: 'User not found.'})
                }
            const deletedUser = await User.findOneAndRemove({ _id: req.params.userId })
                if(!deletedUser){
                    res.status(404).json({message: 'User not found.'})
                }
            res.json({message: 'User and thoughts deleted successfully.'})
        }catch(err){
            res.status(500).json(err);
        }
    }
}