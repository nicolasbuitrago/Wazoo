const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const UserRoutes = require('./routes/user');
const RestaurantRoutes = require('./routes/restaurant');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));
app.use((req,res,next) => {
	res.header(
		'Access-Control-Allow-Origin','*',
		'Access-Control-Allow-Headers','*'
	);
	if(req.method ==='OPTIONS'){
		res.header('Access-Control-Allow-Methods','POST,GET,DELETE');
		return res.status(200).json({});
	}
	console.log('dtest');
	next();

});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.use('/user', UserRoutes);
app.use('/restaurant', RestaurantRoutes);


mongoose.connect('mongodb://dacuentas:dacuentas007@ds025419.mlab.com:25419/databasejs',{ useNewUrlParser: true },(err,res)=>{
	if(err) return console.log("Couldn't connect to database");

	const server = app.listen(3000, function () {
    	console.log("Listening on port ", server.address().port);
	})
});
