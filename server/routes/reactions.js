const express = require('express');
const router = express.Router();
const Reactions = require('../models/Reaction');
const Restaurants = require('../models/Restaurant');

router.get("/", (req, res) => {
	Reactions.find({ }).then(reactions => res.json({ reactions }));
});

router.post('/get', function(req,res){
    const email = req.body.email,
        id = req.body.id; //ID del restaurante;
    var resp = {};
    console.log(id);
    Reactions.findOne({ email: email, _restaurantID:id }, function(err,reaction){
        if(err) console.log(err);
        resp.reaction = reaction;console.log(reaction);
        Restaurants.findById(id,function(err, rest){
            if(err) console.log(err);
            resp.likes = rest.properties.likes.num;
            resp.dislikes = rest.properties.dislikes.num;
            res.json({ resp: resp });
        });
    })
});

router.post('/add', function(req,res){
    const email = req.body.email,
        id = req.body.id, //ID del restaurante;
        r = req.body.reaction;  
    var reaction = new Reactions({
        email:email,
        _restaurantID:id,
        reaction:r
    });
    
    reaction.save(function(err, stored){
        if(err) console.log(err);
        Restaurants.findById(id,function(err,rest){
            if(err) console.log(err);
            // var ld ;
            if(r){
                rest.properties.likes.num++;
            }else{
                rest.properties.dislikes.num++;
            }
            rest.save(function(err,rs){
                if(err) console.log(err);
                if(r) res.json({ num: rs.properties.likes.num });
                else res.json({ num: rs.properties.dislikes.num })
            })
        });
    })
});

module.exports = router