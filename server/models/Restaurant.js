const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = mongoose.Schema({   
 	type: String,
 	properties:{
		name: String,
		description: String, 
 		phone: String,
		address: String,
		city: String,
		state: String,
		country: String,
		image: String,
		likes: {
			whos:[{ type: Schema.Types.ObjectId, ref: 'User' }],
			num: Number
		},
		dislikes: {
			whos:[{ type: Schema.Types.ObjectId, ref: 'User' }],
			num: Number
		}
	},
 	geometry:{
		type: {
			type: String, // Don't do `{ location: { type: String } }`
			enum: ['Point'], // 'location.type' must be 'Point'
			required: true
		  },
		  coordinates: {
			type: [Number],
			required: true
	  }	
 	},
})

module.exports = mongoose.model('Restaurant', RestaurantSchema)