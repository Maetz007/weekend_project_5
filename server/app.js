var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// turns server on
app.listen(process.env.PORT || 9002, function(){ console.log("IT'S OVER 9000!!!"); });

// base URL path
app.get("/", function(req, res){
  console.log("You Are in L");
  res.sendFile( path.resolve ("views/index.html") );
}); // end URL app.get

// creates static folder
app.use(express.static('public'));

// parses all information passed into server into a json file structure
app.use(bodyParser.json());

// creates connection to database
mongoose.connect('localhost:27017/animals_week5');

// creates template schema structure
var animalSchema = new mongoose.Schema({
  animal_name: String,
  animal_type: String,
  animal_age: String,
  animal_url: String
}); // end animal Schema

// applies template to database
var Cage = mongoose.model('Cage', animalSchema);

// takses info from scripts POST call to add animal to database
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

// gets and returns all animals in zoo database
app.get( '/getAnimals', function(req, res){
  Cage.find().then(function(data){
  res.send(data);
  }); // end animal.find
}); // end app.get getAnimals

// removes animal from zoo database
app.post('/animalRemove', function(req, res){
  var animalId = req.body.id;
  // finds one instance of animal based on database ID
  Cage.findOne({_id: animalId}, function(err, cage) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      // After ID has beend retruned by findOne(), removes animal based on ID
      Cage.remove({_id: animalId}, function(err) {});
      console.log('Animal has been removed from zoo.');
      res.sendStatus(200);
    } // end else
  }); // end if
});// end post animalRemove

// get call to aplhabetize from scripts and returns alphabetized list
app.get('/sortAnimals', function(req, res){
  // first finds all animals then sorts based on animal_name. -1 to sort starting from Z
  Cage.find().sort({animal_name: 1}).then(function(data){
    res.send(data);
  }); // end Cage.sort func
}); // end app.get sortAnimals
