const mongoose = require('mongoose');

const schema = mongoose.Schema;


const confessionShema = new Schema({
    title:{
        type: String,
        required:true
    },
    snippet:{
        type: String,
        required:true
    },
    body:{
        type: String,
        required:true
    }
}, {timestamps:true});


const Confession = mongoose.model('Confession', confessionShema);

module.exports = Confession;