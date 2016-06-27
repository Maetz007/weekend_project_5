var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.listen(process.env.PORT || 9002, function(){ console.log("IT'S OVER 9000!!!"); });

app.get("/", function(req, res){
  console.log("You Are in L");
  res.sendFile( path.resolve ("views/index.html") );
}); // end URL app.get

app.use(express.static('public'));

app.use(bodyParser.json());

mongoose.connect('localhost:27017/animals_week5');

var animalSchema = new mongoose.Schema({
  animal_name: String,
  animal_type: String,
  animal_age: String,
  animal_url: String
}); // end animal Schema

var Cage = mongoose.model('Cage', animalSchema);

app.post('/animalAdded', function(req,res){

  var newAnimal = new Cage({
    animal_name: req.body.animal_name,
    animal_type: req.body.animal_type,
    animal_age: req.body.animal_age,
    animal_url: req.body.animal_url
  }); // end newAnimal object

  newAnimal.save(function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      console.log('Animal has been successfully added to zoo!');
      res.sendStatus(200);
    } // end else
  }); // end newAnimal save
}); // end post animalAdded

app.get( '/getAnimals', function(req, res){
  Cage.find().then( function(data){
  res.send(data);
  }); // end animal.find
}); // end app.get

app.post('/animalRemove', function(req, res){
  var animalId = req.body.id;
  Cage.findOne({_id: animalId}, function(err, cage) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      Cage.remove({_id: animalId}, function(err) {});
      console.log('Animal has been removed from zoo.');
      res.sendStatus(200);
    } // end else
  }); // end if
});// end delete route
