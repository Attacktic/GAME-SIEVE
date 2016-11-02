var knex = require('../db/knex');

function getRating(gamertag){
  return knex('gamers').where('gamertag', gamertag)
}
function newRating(oldr, newr, votes){
  return Math.round((Number(oldr) + Number(newr)) / (Number(votes)+1))
}
function createRating(gamer){
  return knex.raw(`insert into gamers values(default, '${gamer.tag}',${gamer.rating}, 1)`)
}

module.exports = {
  getRating: getRating,
  createRating: createRating,
  updateRating: function(gamer){
    return getRating(gamer.tag).then(function(rating){
      if(rating.length !== 0){
        let newr = newRating(rating[0].rating, gamer.rating, rating[0].votes)
        return knex('gamers').where('gamertag', gamer.tag).update({rating:newr, votes:Number(rating[0].votes)+1})
      } else {
        createRating(gamer).then(function(){
          return "created new"
        })
      }
    })
  }
};
