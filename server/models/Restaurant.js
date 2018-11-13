const mongoose = require('mongoose')

const RestaurantSchema = mongoose.Schema({   
 	type: String,
 	properties:{
 		name: String,	
 		phoneFormatted: String,
		phone: Number, 
		address: String,
		city: String,
		country: String,
		crossStreet: String,
		state: String,
	},
 	geometry:{
 		pos_y:Number,
 		pos_x:Number,
 		type_icon: String,	
 	},
})

module.exports = mongoose.model('Restaurant', RestaurantSchema)