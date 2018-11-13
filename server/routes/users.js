const express = require('express')
const router = express.Router()
const UserModel = require('../models/User')

router.get('/',(req,res,next) =>{
	res.status(200).json({
		message: 'Welcome to User CRUD'
	})
});

router.post('/',(req,res) =>{
	var user = req.body.user;
	console.log(user);
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

module.exports = router