const mongoose=require('mongoose')
const Schema=mongoose.Schema

let UserSchema=Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
})

let StorySchema=Schema({
    Title: String,
    Body: String,
    Date: {
        type: String,
        default: Date.now()
    },
    Author: { type: Schema.Types.ObjectId, ref: 'User' }
})

let CommentSchema=Schema({
    User_id: { type: Schema.Types.ObjectId, ref: 'User' },
    Content: {
        type: String,
        required: true
    },
    Story_id: { type: Schema.Types.ObjectId, ref: 'Story' }
})

let User=mongoose.model('User',UserSchema)
let Story=mongoose.model('Story',StorySchema)
let Comment=mongoose.model('Comment',CommentSchema)

module.exports.User = User;
module.exports.Story = Story;
module.exports.Comment = Comment;