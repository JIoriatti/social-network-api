const { Schema, model, Types} = require('mongoose');
const Thought = require('./Thought')

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function(v){
            return  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v)
        }
    },
    thoughts: [{type: Types.ObjectId, ref: 'thought'},],
    friends: [{type: Types.ObjectId, ref: 'user'},],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

userSchema
    .virtual('friendCount')
    .get(function(){
        return this.friends.length;
    })

const User = model('user', userSchema);

module.exports = User;