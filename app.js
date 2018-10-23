const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const UserRoutes = require('./routes/user')
const RestaurantRoutes = require('./routes/restaurant')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req,res,next) => {
	res.header(
		'Access-Control-Allow-Origin','*',
		'Access-Control-Allow-Headers','*'
	);
	if(req.method ==='OPTIONS'){
		res.header('Access-Control-Allow-Methods','POST,GET,DELETE')
		return res.status(200).json({})
	}
	console.log('dtest')
	next()

})

app.use('/user', UserRoutes)
app.use('/restaurant', RestaurantRoutes)


mongoose.connect('mongodb://dacuentas:dacuentas007@ds025419.mlab.com:25419/databasejs',{ useNewUrlParser: true },(err,res)=>{
	if(err) return console.log("Couldn't connect to database")

	const server = app.listen(3000, function () {
    	console.log("app running on port.", server.address().port);
	})
})



module.exports = app