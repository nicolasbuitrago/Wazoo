const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')

router.get('/',(req,res,next) =>{
	res.status(200).json({
		message: 'Welcome to User CRUD'
	})
});

router.post('/new',(req,res,next) =>{
	var user = req.body;
	console.log(user);
	UserModel.findOne({email:user.email},function(err,existingUser){
		if(existingUser == null){
			let newUser = new UserModel();
			newUser.name = {
				first: user.firstName,
				last: user.lastName
			};
			newUser.email = user.email;
			newUser.passwordHash = user.passwordHash;
			newUser.address = user.address;
			newUser.save((err,userStored)=>{
				if(err) console.log(err);
				console.log(userStored);
				res.status(200).send({user:userStored});
			})

		}else{
			res.status(409).send({message:'User already exists!'});
		}
	});
});

module.exports = router