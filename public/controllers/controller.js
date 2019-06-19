var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


// var refresh = function() {
//   $http.get('/contactlist').success(function(response) {
//     console.log("I got the data I requested");
//     $scope.contactlist = response;
//     $scope.contact = "";
//   });
// };

var refresh = function() {
  $http.get('/checkWatering').success(function(response) {
    console.log("I got the data I requested");
    $scope.contactlist = response;
    $scope.contact = "";
  });
};

refresh();

$scope.checkWatering = function() {
  console.log('check watering');
  $http.get('/checkWatering', $scope.contact).success(function(response) {
    console.log(response);
    refresh();
  });
};


$scope.checkMoisture = function() {
  console.log('check moisture');
  $http.get('/checkMoisture', $scope.contact).success(function(response) {
    console.log(response);
    refresh();
  });
};


$scope.deselect = function() {
  $scope.contact = "";
}

}]);﻿