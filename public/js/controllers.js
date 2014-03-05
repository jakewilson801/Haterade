//
var haterade = angular.module('Haterade', []);

haterade.controller('SelfieController', function ($scope, $http) {
  $http.get('/selfie').success(function(d) {
    $scope.selfies = d.data; 
  });
 

});