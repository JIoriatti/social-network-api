const Thought = require('../models/Thought');
const User = require('../models/User')
module.exports = {
    async getThoughts(req, res){
        try{
            const thoughtData = await Thought.find();
            res.json(thoughtData);
        }catch(err){
            console.log(err.message)
            res.status(500).json(err)
        }
    },
    async getOneThought(req, res){
        try{
            const thoughtData = await Thought.findById(req.params.thoughtId);
            if(!thoughtData){
                return res.status(404).json({message: 'Thought not found.'})
            }
            res.json(thoughtData);
        }catch(err){
            res.status(500).json(err)
        }
    },
    async postThought(req, res){
        const {thoughtText, username, userId} = req.body;
        try{
            const thoughtData = await Thought.create({thoughtText, username, userId})
            const updatedThoughtsArray = await User.findOneAndUpdate(
                {
                    _id: userId,
                },
                {
                    $addToSet: { thoughts: thoughtData._id}
                },
                {new: true}
            )
            res.json([thoughtData, updatedThoughtsArray])
        }catch(err){
            res.status(500).json(err)
        }
    },
    async updateThought(req, res){
        const { thoughtText } = req.body;
        try{
            const thoughtData = await Thought.findOneAndUpdate(
                {
                    _id: req.params.thoughtId,
                },
                {
                    thoughtText: thoughtText,
                },
                {
                    new: true,
                },
            )
            if(!thoughtData){
               return res.status(404).json({message: 'Thought not found.'})
            }
            res.json(thoughtData);
        }catch(err){
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res){
        try{
            const thoughtData = await Thought.findOneAndDelete(
                {
                    _id: req.params.thoughtId,
                },
                {new:true},
            )
            if(!thoughtData){
                return res.status(404).json({message: 'Thought not found.'})
            }
            const updatedThoughtsArray = await User.findOneAndUpdate(
                {
                    username: thoughtData.username,
                },
                {
                    $pull: { thoughts: req.params.thoughtId},
                },
                {
                    new:true,
                }
            )
            res.json([thoughtData, updatedThoughtsArray])
        }catch(err){
            res.status(500).json(err)
        }
    }
}