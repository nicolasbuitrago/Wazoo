const express = require('express')
const router = express.Router()
const RestaurantModel = require('../models/Restaurant')

router.get("/", (req, res) => {
	RestaurantModel.find({ }).then(restaurants => res.json({ restaurants }));
  });

router.get('/getAllRestaurants',(req,res,next) =>{
	RestaurantModel.find(function(err,existingRestaurants){
		res.status(200).json({
			type: "FeatureCollection",
			features: existingRestaurants
		})
	})

})
router.post('/search',(req,res,next) =>{
	res.status(200).json({
		message: 'looking for ' + req.body.name
	})
})
router.post('/addRestaurant',(req,res,next) =>{
	var address = req.body.address;
	RestaurantModel.find(function(err,existingRestaurants){
		var existingRestaurant = false;
		var i;
		for (i = 0; i < existingRestaurants.length; i++) { 
		    if(existingRestaurants[i].properties['address']==req.body.address){
		    	existingRestaurant=true;
		    }
		}
		if(existingRestaurant == false){
			let newRestaurant = new RestaurantModel()
			newRestaurant.type=req.body.type
			newRestaurant.properties['name']=req.body.name
			newRestaurant.properties['phoneFormatted']=req.body.phoneFormatted
			newRestaurant.properties['phone']=req.body.phone
			newRestaurant.properties['address']=address
			newRestaurant.properties['city']=req.body.city
			newRestaurant.properties['country']=req.body.country
			newRestaurant.properties['crossStreet']=req.body.crossStreet
			newRestaurant.properties['state']=req.body.state

			newRestaurant.geometry['pos_x']=req.body.pos_x
			newRestaurant.geometry['pos_y']=req.body.pos_y
			newRestaurant.geometry['type_icon']=req.body.type_icon

			console.log(newRestaurant)

			newRestaurant.save((err,RestaurantStored)=>{
				if(err) res.status(500).send({message:'Ups! Something went wrong trying to adding new Restaurant'})
				res.status(200).send({Restaurant:RestaurantStored})
			})

		}else{
			res.status(409).send({message:'Ups! Addresses Overlaping'})
		}
	})

})

module.exports = router