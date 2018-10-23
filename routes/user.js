const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')

router.get('/',(req,res,next) =>{
	res.status(200).json({
		message: 'Welcome to User CRUD'
	})
})
router.post('/registration',(req,res,next) =>{
	var user = req.body;
	UserModel.findOne({username:user.username},function(err,existingUser){
		if(existingUser == null){
			let newUser = new UserModel()
			newUser.username = user.username
			newUser.password = user.password
			newUser.save((err,userStored)=>{
				if(err) res.status(500).send({message:'Ups! Something went wrong trying to register a new user'})
				res.status(200).send({user:userStored})
			})

		}else{
			res.status(409).send({message:'User already exists!'})
		}
	})


})
module.exports = router