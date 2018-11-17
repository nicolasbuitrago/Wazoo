const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = mongoose.Schema({   
     _userID: {type: Schema.Types.ObjectId, required: true, ref:'User'},
     _restaurantID :{type: Schema.Types.ObjectId, required: true, ref:'Restaurant'},
    comment: String
},
  { timestamps: true }
)

module.exports = mongoose.model('Comment', CommentSchema)