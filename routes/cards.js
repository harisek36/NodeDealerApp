var express = require('express');
var router = express.Router();

const cards = require('../model/cards');


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});


/* GET play History. */
router.get('/', function(req, res, next) {

  cards.find(function (err,playHistory) {

    res.json(playHistory);
    if(err){
        res.json({msg:'Failed to Get Card History !!'});
    }
  })

});

router.post('/',function (req,res,next) {
    var newCard = new cards({
        shuffledCards:req.body.shuffledCards,
        score:req.body.score
    });

    newCard.save(function (err,user) {
        if(err){
            res.json({msg:'Failed to save game play !!'});
        }
        else{
            res.json({msg:'Card play saved successfully !!'});
        }
    });
});

router.delete('/',function (req,res,next) {

    cards.deleteMany({},function (err,result) {
        if(err){
            res.json({msg:'Failed to Delete all game play !!'});
        }
        else{
            res.json({msg:'Game removed successfully !!'});
        }
    })
});


module.exports = router;
