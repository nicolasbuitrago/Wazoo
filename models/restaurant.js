const mongoose = require('mongoose')

const RestaurantSchema = mongoose.Schema({   
 	name: String,
})

module.exports = mongoose.model('Restaurant', RestaurantSchema)