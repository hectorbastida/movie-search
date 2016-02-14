var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var fs = require('fs');
var Movie = require('../models/movie');
mongoose.connect('mongodb://Alexis:root@ds031903.mongolab.com:31903/movie-search');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
//router.get('/movie/:name', findByName);
router.get('/movie', findAllMovies);
router.get('/getGeneral/:query', getGeneral);
router.get('/getByActor/:query', getByActor);
router.get('/getByTitle/:query', getByTitle);
router.get('/getByYear/:query', getByYear);
router.get('/getByGenre/:query', getByGenre);


function getGeneral(req,res,next){

        Movie.find(
            {$or:[
                {'title' : new RegExp('.*'+req.params.query+'.*','i')},
                {'author' : new RegExp('.*'+req.params.query+'.*', "i")},
                {'year' : new RegExp('^'+req.params.query+'')},
                {'genre': new RegExp('^'+req.params.query+'', "i")}
            ]}).lean().exec(function(err, movie) {
            if (!err){
              	for (var i = 0; i < movie.length; i++) {
          			  movie[i].image = 'data:image/jpeg;base64,'+(movie[i].img.data.toString('base64'))
          		  };	              
                res.send(movie.slice().reverse());
            }else{
                console.log('ERROR: ' + err);
                res.send('error');
            }
        });
}


function getByActor(req,res,next){
  Movie.find({ 'author':  new RegExp('.*'+req.params.query+'.*', "i") }).lean().exec(function(err, movie) {
            if (!err){
              	for (var i = 0; i < movie.length; i++) {
          			  movie[i].image = 'data:image/jpeg;base64,'+(movie[i].img.data.toString('base64'))
          		  };	              
                res.send(movie.slice().reverse());
            }else{
                console.log('ERROR: ' + err);
                res.send('error');
            }
        })
}

function getByTitle(req,res,next){
    Movie.find({ 'title':  new RegExp('.*'+req.params.query+'.*', "i") }).lean().exec(function(err, movie) {
            if (!err){
              	for (var i = 0; i < movie.length; i++) {
          			  movie[i].image = 'data:image/jpeg;base64,'+(movie[i].img.data.toString('base64'))
          		  };	              
                res.send(movie.slice().reverse());
            }else{
                console.log('ERROR: ' + err);
                res.send('error');
            }
        })
}
function getByYear(req,res,next){
    Movie.find({ 'year' : new RegExp('^'+req.params.query+'') }).lean().exec(function(err, movie) {
            if (!err){
              	for (var i = 0; i < movie.length; i++) {
          			  movie[i].image = 'data:image/jpeg;base64,'+(movie[i].img.data.toString('base64'))
          		  };	              
                res.send(movie.slice().reverse());
            }else{
                console.log('ERROR: ' + err);
                res.send('error');
            }
        })
}
function getByGenre(req,res,next){
  console.log(req.params.query)
    Movie.find({'genre': new RegExp('^'+req.params.query+'', "i") }).lean().exec(function(err, movie) {
            if (!err){
              	for (var i = 0; i < movie.length; i++) {
          			  movie[i].image = 'data:image/jpeg;base64,'+(movie[i].img.data.toString('base64'))
          		  };	              
                res.send(movie.slice().reverse());
            }else{
                console.log('ERROR: ' + err);
                res.send('error');
            }
        })
}



function findByName(req,res,next){
	res.send('movies by name = '+ req.params.name)
}

function findAllMovies(req, res) {
	Movie.find().lean().exec(function(err,movie){
        if (!err){
        	for (var i = 0; i < movie.length; i++) {
        			movie[i].image = 'data:image/jpeg;base64,'+(movie[i].img.data.toString('base64'))
        		};	
            res.send(movie.slice().reverse());
        }
       else{

            console.log('ERROR: ' + err);
       }		
	})
};



router.get('/save', function(req, res, next) {
var imgPath = '../imgs/term.jpg';
  var newMovie = new Movie({
    title : 'Terminator 2: El Juicio Final',
    author : 'Arnold Schwarzenegger',          
    description: "Sarah Connor, la madre soltera del rebelde John Connor, está ingresada en un psiquiátrico. Tras haber sido informada por un viajero del tiempo de que su hijo se convertiría en el salvador de la humanidad en un futuro amenazado por la diabólica supremacia de las máquinas, se ha convertido en una especie de guerrera que ha vivido por y para la educado de su hijo John, tratando de convertirle en un auténtico soldado aunque sólo tenga 12 años.",          
    year : '1991',
    genre  : 'Acciòn',       
  });


  newMovie.img.data = fs.readFileSync(imgPath);
  newMovie.img.contentType = 'image/jpg';
  newMovie.save(function(err,movie){
  	if (err) throw err;
  		console.error('Movie Saved');
  		  Movie.findById(movie, function (err, doc) {
          res.contentType(doc.img.contentType);
          res.send(doc.img.data);
        });

  })
});


router.get('*',function(re,res,next){
	res.send('Error 404');
})
module.exports = router;
