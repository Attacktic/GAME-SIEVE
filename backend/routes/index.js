var express = require('express');
var router = express.Router();
var q = require('../q/queries.js');

router.post('/update', function(req, res, next) {
  q.updateRating(req.body).then(function(data){
    res.send("done")
  })
});

router.get('/', function(req, res, next){
  res.send("hello")
})

module.exports = router;
