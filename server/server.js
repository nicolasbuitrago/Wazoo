const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');


const userRoutes = require('./routes/users');
const restaurantRoutes = require('./routes/restaurants');
const authRoutes = require('./routes/auth');


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

const faker = require('faker');
const rests = require('../features');

app.get('/', function(req, res) {
	const r = [];

rests.features.forEach(element => {
    const p = {
        name: faker.company.companyName(),
        description: faker.company.catchPhrase(),
        phone: faker.phone.phoneNumberFormat(),
        address: faker.address.streetAddress(),
        city:'Barranquilla',
        state:'Atlantico',
        country:'Colombia'
    };
    element.properties = p;
    r.push(element);
});
	res.json(r);
	//res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/restaurant', restaurantRoutes);

mongoose.set('useCreateIndex', true);



//mongo ds025419.mlab.com:25419/databasejs -u dacuentas -p dacuentas007
mongoose.connect('mongodb://dacuentas:dacuentas007@ds025419.mlab.com:25419/databasejs',{ useNewUrlParser: true },(err,res)=>{
	if(err) return console.log("Couldn't connect to database");

	const server = app.listen(8080, function () {
		console.log("Listening on port ", server.address().port);
	})
});
