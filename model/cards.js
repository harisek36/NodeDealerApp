const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var cardSchema = new Schema({
    shuffledCards:{
        type:[],
        required:true
    },
    score:{
        type:number,
        required:true
    }

});

const card = module.exports = mongoose.model('Card',cardSchema);