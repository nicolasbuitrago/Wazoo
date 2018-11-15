const express = require('express')
const router = express.Router()
const UserModel = require('../models/User');
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;

router.get('/',(req,res) =>{
	res.status(200).json({
		message: 'Welcome to User CRUD'
	})
});

router.post('/',(req,res) =>{
	var user = req.body.user;
	UserModel.findOne({email:user.email},function(err,existingUser){
		if(!existingUser){
			let newUser = new UserModel();
			newUser.name = {
				first: user.firstName,
				last: user.lastName
			};
			newUser.email = user.email;
			newUser.passwordHash = user.password;
			newUser.address = user.address;
			newUser.save((err,userStored)=>{
				if(err) {
					console.log(err);
					res.status(400).json({ errors: {global: 'Ups! Something went wrong trying to adding new User'}});
				}else{
					res.json({ user: userStored.toAuthJSON() });
				}
			});
		}else{
			res.status(409).json({errors:{email:'Email already exists!'}});
		}
	});
});

router.post('/favorites',(req,res) =>{
	// console.log('BODY');
	// console.log(req.body);
	var data = req.body.user;
	// console.log(data);
	UserModel.findOne({ email: data.email }).populate('favorites')
	.exec(function(err,user){
		if(err) console.log(err);
		res.json({ favorities: user.favorites});
	});
});

router.post('/addFavorite',(req,res) =>{
	var idRestaurant = req.body.idRestaurant;
	var userEmail = req.body.email;
	UserModel.findOne({ email: userEmail },function(err,user){
		var list = user.favorites;
		list.push(idRestaurant);
		UserModel.findOneAndUpdate({email: userEmail}, {$set:{favorites:list}}, {new: true}, (err, doc) => {
   		if (err) {
        	console.log("Something wrong when updating data!");
    	}
    		console.log(doc);
    		res.json({ restaurants: doc});
		});
		
	}) 
	
});

router.post('/removeFavorite',(req,res) =>{
	var idRestaurant = req.body.idRestaurant;
	var userEmail = req.body.email;
	UserModel.findOne({ email: userEmail },function(err,user){
		var list = user.favorites;
		var i;
		for (i = 0; i < list.length; i++) { 
    		if(list[i]==idRestaurant){
				list.splice(i, 1);
    		}
		}
		
		UserModel.findOneAndUpdate({email: userEmail}, {$set:{favorites:list}}, {new: true}, (err, doc) => {
   		if (err) {
        	console.log("Something wrong when updating data!");
    	}
    		console.log(doc);
    		res.json({ restaurants: doc});
		});
		
	}) 
	
});





module.exports = router