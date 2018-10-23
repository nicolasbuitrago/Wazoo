const express = require('express')
const router = express.Router()
const UserModel = require('../models/restaurant')

router.get('/',(req,res,next) =>{
	res.status(200).json({
		message: 'Welcome to Restaurant CRUD'
	})
})
router.post('/search',(req,res,next) =>{
	res.status(200).json({
		message: 'looking for ' + req.body.name
	})


})
module.exports = router