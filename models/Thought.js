const { Schema, model, Types} = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: [1, 'Thoughts cannot be represented without words, but supposedly they can be by a single letter!'],
        max: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: ()=> new Date(),
    },
    username:{
        type: String,
        required: true,
    },
    reactions:[reactionSchema],
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});

thoughtSchema
    .virtual('reactionCount')
    .get(function(){
        return this.reactions.length;
    });
const Thought = model('thought', thoughtSchema);

module.exports = Thought;