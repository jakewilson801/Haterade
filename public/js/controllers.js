//
var haterade = angular.module('Haterade', []);

haterade.controller('SelfieController', function ($scope, $http) {
	$scope.selfie = {};  


  $http.get('/selfie').success(function(d) {
    $scope.selfies = d.data; 
  });

  $scope.voteOnSelfie = function(selfie, action) {
  		$scope.selfie.url = selfie.images.standard_resolution.url;

  		switch(action){
  			case 0:
  				$scope.selfie.notASelfie = 1; 
  				$scope.selfie.numYes = 0; 
  				$scope.selfie.numNo = 0; 
  			break; 
  			case 1:
  				$scope.selfie.notASelfie = 0; 
  				$scope.selfie.numYes = 0; 
  				$scope.selfie.numNo = 1; 
  			break;
  			case 2:
  				$scope.selfie.notASelfie = 0;  
  				$scope.selfie.numYes = 1; 
  				$scope.selfie.numNo = 0; 
  			break; 
  		}

		$http.post('/selfie/vote', $scope.selfie)
			.success(function(data) {
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
 

});