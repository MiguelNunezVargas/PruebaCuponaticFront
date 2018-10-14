'use strict';

angular.module('cnc-myapp.product', [])
	.controller('ProductCtrl', function ($scope, $resource, ProductsService) {
		$scope.buscarProductos = function(){
			if($scope.productoKey.length >= 4){
				var ProductosSeleccionados = $resource( ProductsService.postBusquedaProductos(),
					 {keyword: $scope.productoKey},	
		  			 {'obtener' : {method: 'POST', isArray:true}}
  				);
				$scope.respProductos = ProductosSeleccionados.obtener({}, function(data){
					if($scope.respProductos.length ==0){
						alert("No se encontraron coincidencias");
					}
				});
			}else{
				alert("La Búsqueda debe ser de más de 4 carácteres");
			}
		}
    });