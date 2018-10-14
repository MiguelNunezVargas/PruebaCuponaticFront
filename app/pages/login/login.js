
angular.module('cnc-myapp.login', [])
	.controller('LoginCtrl', function ($scope, $resource,$location, AuthenticationService,ProductsService) {
		// reset login status
        AuthenticationService.ClearCredentials();

        $scope.login = function () {
            $scope.dataLoading = true;
            var ValidateUser = AuthenticationService.validateOauth();  
            var respuesta = ValidateUser.validate({
                grant_type: 'password',
                client_id: AuthenticationService.getClientId(),
                client_secret: AuthenticationService.getSecret(),
                username: $scope.username,
                password: $scope.password
            }).$promise.then(function(data){
                //Success            
                AuthenticationService.SetCredentials($scope.username, $scope.password,data.access_token);
                $location.path('/home');
            }, function(error) {
                //Error
                $scope.error = error.data.error_description;
                $scope.dataLoading = false;
            });        
        };
	});