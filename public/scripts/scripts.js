var myApp = angular.module( 'myApp', []);

myApp.controller('animalInfo', ['$scope', '$http', function($scope, $http){

  $scope.displayAnimal = function(){
    $http({
      method: 'GET',
      url: '/getAnimals',}).then(function(response){
        $scope.showAnimals = response.data;
      }); // end http GET
    }; // end display animals function

  $scope.displayAnimal();

  $scope.showAnimals = [];

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

  $scope.animalNameInput = '';
  $scope.animalTypeInput = '';
  $scope.animalAgeInput = '';
  $scope.animalUrlInput = '';
  
  $scope.displayAnimal();
}; // end addAnimal function

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

}]); // end controller- animalInfo
