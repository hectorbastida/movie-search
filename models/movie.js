var mongoose=require('mongoose');
var Schema   = mongoose.Schema;

var movieSchema=new Schema({
    title          :{type:String,required:true},
    author            :{type:String},
    description       :{type:String},    
    year              :{type:String},
    genre             :{type:String},
    img: { data: Buffer, contentType: String }
});

var Movie = mongoose.model('movie',movieSchema);
module.exports = Movie;