const express = require('express')
const router = express.Router()
const Reactions = require('../models/Reaction')

router.get("/", (req, res) => {
	Reactions.find({ }).then(reactions => res.json({ reactions }));
});

