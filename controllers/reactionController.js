const Thought = require('../models/Thought');

module.exports = {
    async postReaction(req, res){
        try{
            const thoughtData = await Thought.findOneAndUpdate(
                {
                    _id: req.params.thoughtId
                },
                {
                    $addToSet: { reactions: req.body}
                },
                {
                    new: true,
                },
            )
            if(!thoughtData){
                console.log(thoughtData)
                return res.status(404).json({message: 'Thought not found'});
            }
            res.json(thoughtData);
        }catch(err){
            console.log(err.message)
            res.status(500).json(err)
        }
    },
    async deleteReaction(req, res){
        try{
            const thoughtData = await Thought.findOneAndUpdate(
                {
                    _id: req.params.thoughtId,
                },
                {
                    $pull: {reactions: {reactionId: req.params.reactionId}},
                },
                {new: true },
            )
            if(!thoughtData){
                return res.status(404).json({message: 'Thought not found'});
            }
            res.json(thoughtData);
        }catch(err){
            res.status(500).json(err) 
        }
    }
}