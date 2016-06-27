var myApp = angular.module( 'myApp', []);

myApp.controller('animalInfo', ['$scope', '$http', function($scope, $http){

  // displayAnimal returns all animals in the database
  $scope.displayAnimal = function(){
    $http({
      method: 'GET',
      url: '/getAnimals',}).then(function(response){
        $scope.showAnimals = response.data;
      }); // end http GET
    }; // end display animals function

  // calls displayAnimal to load any animals stored in the database
  $scope.displayAnimal();

  // local variable scoped to controller animalInfo to hold database array of animals
  $scope.showAnimals = [];

  // addAnimal takes input from user and POSTs it to database through server
  $scope.addAnimal = function(){
    var animalObjSent = {
      animal_name: $scope.animalNameInput,
      animal_type: $scope.animalTypeInput,
      animal_age: $scope.animalAgeInput,
      animal_url: $scope.animalUrlInput
    }; // end animal object to sendFile

    $http({
      method: 'POST',
      url: '/animalAdded',
      data: animalObjSent
    }); // end POST

  // clears inputs by user
  $scope.animalNameInput = '';
  $scope.animalTypeInput = '';
  $scope.animalAgeInput = '';
  $scope.animalUrlInput = '';

  // calls the displayAnimal func to display to DOM
  $scope.displayAnimal();
}; // end addAnimal function

  // deleteAnimal deletes from both showAnimal array and database
  $scope.deleteAnimal = function(index){
    var animalId = {
      id: $scope.showAnimals[index]._id
    }; // end animalId
      $http({
        method: 'POST',
        url: '/animalRemove',
        data: animalId
      }); // end http POST delete
      $scope.showAnimals.splice(index, 1);
  }; // end deleteAnimal

  // sortAnimal func sends call to server to alphabetize animals then updates DOM
  $scope.sortAnimal = function(){
    $http({
      method: 'GET',
      url: '/sortAnimals',}).then(function(response){
        $scope.showAnimals = response.data;
      }); // end http GET
  }; // end sortAnimal

}]); // end controller- animalInfo
