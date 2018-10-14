'use strict';

angular.module('cnc-myapp.functions', [])
	//Se ejecuta al inicio
	.run(['$rootScope', '$location', '$cookieStore', '$http',
	    function ($rootScope, $location, $cookieStore, $http) {
	        // keep user logged in after page refresh
	        $rootScope.globals = $cookieStore.get('globals') || {};
	        if ($rootScope.globals.currentUser) {
	            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
	            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.currentUser.token; // jshint ignore:line
	        }

	        $rootScope.$on('$locationChangeStart', function (event, next, current) {
	            // redirect to login page if not logged in
	            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
	                $location.path('/login');
	            }
	        });
    	}
    ])


	.controller('NavigationCtrl', function ($scope, $location) {
    	$scope.isCurrentPath = function (path) {
	      var cleanPath = $location.path().replace('/','');
	      return cleanPath == path;
	    };    	
    })