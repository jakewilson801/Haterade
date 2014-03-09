//
var haterade = angular.module('Haterade', []);

haterade.controller('SelfieController', function ($scope, $http) {
	$scope.selfie = {};  
    $scope.nextUrl = ''; 
    $scope.count = 0; 

    fetchData($http, $scope, 'https://api.instagram.com/v1/tags/selfie/media/recent?client_id=339b727c83104de1aecd91778ab4daae');

  	$scope.voteOnSelfie = function(selfie, action, count) {
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

  		$scope.selfie.url = selfie.images.standard_resolution.url;
  		$scope.selfie.parentData = selfie; 
  		$scope.selfie.batchUrl = $scope.nextUrl; 
		$http.post('/selfie/vote', $scope.selfie)
			.success(function(data) {
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
		});
		
		$scope.count++; 
		if(($scope.count - 1) == 19){
			console.log($scope.nextUrl)
			fetchData($http, $scope, $scope.nextUrl); 
			$scope.count = 0; 
		}		
	};
});

function fetchData(http, scope, url){
	 
	http.post('/selfie', {'nextUrl': url}).success(function(d) {
  		scope.nextUrl = d.pagination.next_url; 
    	scope.selfies = d.data;   
  });
}