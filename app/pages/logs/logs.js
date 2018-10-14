'use strict';

angular.module('cnc-myapp.logs', [])
	.controller('LogsCtrl', function ($scope, $resource, ProductsService) {
    	var logs = $resource(ProductsService.getBusquedaLogs());
		$scope.users = logs.query();
    });