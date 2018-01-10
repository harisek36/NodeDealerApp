const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var cardSchema = new Schema({
    shuffledCards:{
        type:[],
        required:true
    },
    score:{
        type:String,
        required:true
    }

});

const card = module.exports = mongoose.model('Card',cardSchema);