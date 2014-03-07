//
var haterade = angular.module('Haterade', []);

haterade.controller('SelfieController', function ($scope, $http) {
	$scope.selfie = {};  
    $scope.nextUrl = ''; 
    $scope.count = 0; 
    fetchData($http, $scope, 'https://api.instagram.com/v1/tags/selfie/media/recent?access_token=31053992.f59def8.1ec14fa313984721b77ca9067d0c40ef'); 

  $scope.voteOnSelfie = function(selfie, action, count) {
  		console.log(count);
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

		

		$scope.count++; 
		
		if(count == 19){
			fetchData($http, $scope); 
			$scope.count = 0; 
		}

		
	};
 

});

function fetchData(http, scope, url){
	http.post('/selfie', {'nextUrl': url}).success(function(d) {
  		scope.nextUrl = d.pagination.nextUrl; 
    	scope.selfies = d.data; 
  });
}