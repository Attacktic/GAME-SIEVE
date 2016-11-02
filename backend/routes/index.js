var express = require('express');
var router = express.Router();
var q = require('../q/queries.js');

router.post('/update', function(req, res, next) {
  q.updateRating(req.body).then(function(data){
    res.send("Updated!")
  })
});

router.get('/', function(req, res, next){
  res.send("Up and Running.")
})

router.post('/gamers', function(req, res, next){
  q.getRating(req.body.tag).then(function(rating){
    res.json(rating[0].rating)
  })
})

module.exports = router;
