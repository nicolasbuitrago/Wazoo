const express = require('express')
const router = express.Router();
const UserModel = require('../models/User');

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
		res.json({ favorites: user.favorites});
	});
});

router.post('/favorites/add',(req,res) =>{
	var idRestaurant = req.body.id;
	var userEmail = req.body.email;
	UserModel.findOne({ email: userEmail },function(err,user){
		if(err) console.log(err);
		user.favorites.push(idRestaurant);
		user.save(function(error, stored){
			if (error) {
				console.log("Something wrong when updating data!");
			}else{
				UserModel.findOne({ email: stored.email }).populate('favorites')
				.exec(function(err,user){
					if(err) console.log(err);
					res.json({ favorites: user.favorites});
				});
			}
		});
		
	}) 
	
});

router.post('/favorites/remove',(req,res) =>{
	var idRestaurant = req.body.id;
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
			UserModel.findOne({ email: doc.email }).populate('favorites')
			.exec(function(err,user){
				if(err) console.log(err);
				res.json({ favorites: user.favorites});
			});
		});
		
	}) 
	
});

module.exports = router