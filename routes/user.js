const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')

router.get('/',(req,res,next) =>{
	res.status(200).json({
		message: 'Welcome to User CRUD'
	})
})
router.post('/registration',(req,res,next) =>{
	let user = new UserModel()
	user.username = req.body.username
	user.password = req.body.password
	user.save((err,userStored)=>{
		if(err) res.status(500).send({message:'Ups! Something went wrong trying to register a new user'})
		res.status(200).send({user:userStored})
	})

})
module.exports = router