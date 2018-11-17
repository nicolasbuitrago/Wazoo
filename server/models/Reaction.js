const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReactionSchema = mongoose.Schema({   
     email: {type: String, required: true},
     _restaurantID :{type: Schema.Types.ObjectId, required: true, ref:'Restaurant'},
    reaction: Boolean
},
  { timestamps: true }
)

module.exports = mongoose.model('Reaction', ReactionSchema);